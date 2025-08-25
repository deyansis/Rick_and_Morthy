import { useState } from "react";
import { useGetCharactersQuery } from "../services/characterApi";
import CharacterList from "../features/characters/components/CharacterList";
import SearchBar from "../features/characters/components/SearchBar";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useGetCharactersQuery({ page });

  if (isLoading)
    return (
      <p className="text-center text-cyan-400 text-lg mt-10 animate-pulse">
        Cargando personajes...
      </p>
    );

  if (isError)
    return (
      <p className="text-center text-red-500 text-lg mt-10">
        Ocurrió un error 😢
      </p>
    );

  // Filtrado simple por nombre
  const filteredCharacters = data.results.filter((char) =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1f2244] via-[#2b2641] to-[#21243a] text-white pb-6 px-7">
      <header className="mb-8 p-4 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
          Rick & Morty Universe 🌌
        </h1>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setPage={setPage}
        />
      </header>

      {/* Si no hay personajes después del filtrado */}
      {filteredCharacters.length === 0 ? (
        <p className="text-center text-red-400 text-xl mt-6 animate-pulse">
          ❌ No se encontraron personajes con ese nombre
        </p>
      ) : (
        <CharacterList characters={filteredCharacters} />
      )}

      {/* Paginación */}
      <div className="flex justify-center mt-8 gap-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg shadow-md disabled:bg-gray-500 transition-all"
        >
          ← Anterior
        </button>

        <span className="text-white text-lg flex items-center gap-2">
          Página {page} / {data?.info?.pages || 1}
        </span>

        <button
          onClick={() =>
            setPage((prev) => Math.min(prev + 1, data?.info?.pages))
          }
          disabled={page === data?.info?.pages}
          className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg shadow-md disabled:bg-gray-500 transition-all"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}
