// =================================================================================
// A reusable placeholder for pages that are not yet fully built.

const PagePlaceholder = ({ title, description }: { title: string, description: string }) => (
    <div className="space-y-4">
        <header><h1 className="text-3xl font-bold text-black">{title}</h1></header>
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
            <h3 className="text-xl font-semibold text-gray-700">Coming Soon</h3>
            <p className="text-gray-500 mt-2">{description}</p>
        </div>
    </div>
);

export default PagePlaceholder;
