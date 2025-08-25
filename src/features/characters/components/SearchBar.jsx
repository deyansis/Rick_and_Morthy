export default function SearchBar({ searchTerm, setSearchTerm, setPage }) {
  return (
    <div className="mt-4 w-full md:w-1/2">
      <input
        type="text"
        placeholder="🔍 Buscar personaje..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setPage(1);
        }}
        className="w-full border border-blue-600 bg-[#303b4b] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-md transition-all duration-300"
      />
    </div>
  );
}
