import React, { useEffect, useMemo, useState } from 'react'
import supabase from '../lib/supabase'

type NftStatus = 'All' | 'Available' | 'Owned' | 'Retired'

type Nft = {
  id: string
  tonnes: number
  iot_source: string | null
  registry_serial: string | null
  status: NftStatus
  owner_address: string
  is_iot_verified: boolean
  is_registry_certified: boolean
}

const NftMarketplacePage: React.FC = () => {
  const [nfts, setNfts] = useState<Nft[]>([])
  const [filter, setFilter] = useState<NftStatus>('All')
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [addForm, setAddForm] = useState({
    tonnes: '',
    iot_source: '',
    registry_serial: '',
    is_iot_verified: false,
    is_registry_certified: false,
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getWalletAddress = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      console.log(user + " user")
      if (user) {
        const { data, error } = await supabase
          .from('users')
          .select('wallet_address')
          .eq('user_id', user.id)
          .single()
        console.log(data + " wallet address")

        if (error) {
          console.error('Error fetching wallet:', error)
        } else {
          setWalletAddress(data.wallet_address)
        }
      }
    }
    getWalletAddress()
  }, [])

  useEffect(() => {
    // Fetch all NFTs
    const fetchNfts = async () => {
      setLoading(true)
      const { data, error } = await supabase.from('nfts').select('*')
      if (!error && data) setNfts(data)
      setLoading(false)
    }
    fetchNfts()
  }, [])

  const filteredNfts = useMemo(() => {
    if (filter === 'All') return nfts
    return nfts.filter((nft) => nft.status === filter)
  }, [filter, nfts])

  const handleBuy = async (nft: Nft) => {
    if (nft.owner_address === walletAddress) {
      alert("You can't buy your own NFT.")
      return
    }
    const { error } = await supabase
      .from('nfts')
      .update({ status: 'Owned', owner_address: walletAddress })
      .eq('id', nft.id)
    if (error) {
      alert('Error buying NFT')
    } else {
      setNfts((prev) =>
        prev.map((item) =>
          item.id === nft.id
            ? {
                ...item,
                status: 'Owned',
                owner_address: walletAddress ?? ''
              }
            : item
        )
      )
    }
  }

  const handleSell = async (nft: Nft) => {
    const { error } = await supabase
      .from('nfts')
      .update({ status: 'Available' })
      .eq('id', nft.id)
    if (error) {
      alert('Error selling NFT')
    } else {
      setNfts((prev) =>
        prev.map((item) =>
          item.id === nft.id ? { ...item, status: 'Available' } : item
        )
      )
    }
  }

  const handleAddListing = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!walletAddress) {
      alert('Wallet address not found')
      return
    }
    setLoading(true)
    const { data, error } = await supabase.from('nfts').insert([
      {
        tonnes: parseFloat(addForm.tonnes),
        iot_source: addForm.iot_source || null,
        registry_serial: addForm.registry_serial || null,
        status: 'Available',
        owner: walletAddress,
        is_iot_verified: addForm.is_iot_verified,
        is_registry_certified: addForm.is_registry_certified,
      },
    ]).select('*')
    setLoading(false)
    if (error) {
      alert('Error adding listing')
    } else if (data && data[0]) {
      setNfts((prev) => [data[0], ...prev])
      setShowAdd(false)
      setAddForm({
        tonnes: '',
        iot_source: '',
        registry_serial: '',
        is_iot_verified: false,
        is_registry_certified: false,
      })
    }
  }

  const NftTag = ({ text, color }: { text: string; color: 'blue' | 'green' }) => {
    const colorClasses = {
      blue: 'bg-blue-100 text-blue-800',
      green: 'bg-green-100 text-green-800',
    }
    return <span className={`px-2 py-1 text-xs font-semibold rounded-full ${colorClasses[color]}`}>{text}</span>
  }

  const NftCard = ({ nft }: { nft: Nft }) => {
    const showBuy = nft.status === 'Available' && nft.owner_address !== walletAddress
    const showOwned = nft.status === 'Owned' && nft.owner_address === walletAddress

    return (
      <div className="bg-white p-5 rounded-lg shadow-sm border flex flex-col">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-xl text-gray-800">NFT-{nft.id}</h3>
          <div className="flex flex-col items-end space-y-2">
            {nft.is_iot_verified && <NftTag text="IoT Verified" color="blue" />}
            {nft.is_registry_certified && <NftTag text="Registry Certified" color="green" />}
          </div>
        </div>

        <div className="mt-4 space-y-2 text-sm text-gray-700 flex-grow">
          <p className="text-2xl font-bold text-black">
            {nft.tonnes.toFixed(2)} <span className="text-lg text-gray-600">tCO₂e</span>
          </p>
          <p><strong>IoT Source:</strong> {nft.iot_source || 'N/A'}</p>
          <p><strong>Registry Serial:</strong> {nft.registry_serial || 'N/A'}</p>
        </div>

        <div className="mt-4 text-sm border-t pt-4">
          <p><strong>Status:</strong> <span className="font-semibold">{nft.status}</span></p>
          <p className="truncate"><strong>Owner:</strong> <span className="font-mono text-xs">{nft.owner_address}</span></p>
        </div>

        <div className="mt-4">
          {showBuy && (
            <button onClick={() => handleBuy(nft)} className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
              Buy NFT
            </button>
          )}

          {showOwned && (
            <button onClick={() => handleSell(nft)} className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Sell NFT
            </button>
          )}

          {nft.status === 'Retired' && (
            <button disabled className="w-full bg-gray-400 text-white font-bold py-2 px-4 rounded-lg cursor-not-allowed">
              Retired
            </button>
          )}
        </div>
      </div>
    )
  }

  const FilterButton = ({ label, isActive, onClick }: { label: NftStatus, isActive: boolean, onClick: () => void }) => (
    <button onClick={onClick} className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
      {label}
    </button>
  )

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-black">NFT Marketplace & Vault</h1>
          <p className="text-gray-600 mt-1">Buy, sell, and manage your carbon credit NFTs.</p>
        </div>
        <button
          className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg shadow hover:bg-green-700 transition-colors"
          onClick={() => setShowAdd((v) => !v)}
        >
          + Add Listing
        </button>
      </header>

      {showAdd && (
        <form onSubmit={handleAddListing} className="bg-white p-6 rounded-lg shadow-sm border flex flex-col gap-4 max-w-lg mx-auto">
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Tonnes (tCO₂e)</label>
            <input type="number" step="0.01" min="0" required className="border rounded px-3 py-2" value={addForm.tonnes} onChange={e => setAddForm(f => ({ ...f, tonnes: e.target.value }))} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold">IoT Source</label>
            <input type="text" className="border rounded px-3 py-2" value={addForm.iot_source} onChange={e => setAddForm(f => ({ ...f, iot_source: e.target.value }))} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Registry Serial</label>
            <input type="text" className="border rounded px-3 py-2" value={addForm.registry_serial} onChange={e => setAddForm(f => ({ ...f, registry_serial: e.target.value }))} />
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={addForm.is_iot_verified} onChange={e => setAddForm(f => ({ ...f, is_iot_verified: e.target.checked }))} /> IoT Verified
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={addForm.is_registry_certified} onChange={e => setAddForm(f => ({ ...f, is_registry_certified: e.target.checked }))} /> Registry Certified
            </label>
          </div>
          <div className="flex gap-4 justify-end">
            <button type="button" className="px-4 py-2 rounded bg-gray-200" onClick={() => setShowAdd(false)}>Cancel</button>
            <button type="submit" className="px-4 py-2 rounded bg-green-600 text-white font-bold" disabled={loading}>{loading ? 'Adding...' : 'Add Listing'}</button>
          </div>
        </form>
      )}

      <section className="bg-white p-4 rounded-lg shadow-sm border flex items-center space-x-4">
        <h3 className="text-md font-semibold text-gray-800">Filter by:</h3>
        <div className="flex space-x-2">
          {['All', 'Available', 'Owned', 'Retired'].map((status) => (
            <FilterButton key={status} label={status as NftStatus} isActive={filter === status} onClick={() => setFilter(status as NftStatus)} />
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNfts.map((nft) => (
          <NftCard key={nft.id} nft={nft} />
        ))}
      </section>
    </div>
  )
}

export default NftMarketplacePage
