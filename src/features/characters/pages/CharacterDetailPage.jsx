import { useParams, Link } from "react-router-dom";
import {
  useGetCharacterByIdQuery,
} from "../characterApi";
import {
  useGetCommentsByCharacterQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
} from "../../comments/commentsApi";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import NewCommentForm from "../../comments/NewCommentForm";
import {
  FaHeart,
  FaSkull,
  FaQuestion,
  FaVenusMars,
  FaGlobe,
  FaTv,
  FaIdBadge,
  FaCalendarAlt,
  FaStar,
  FaTimes,
} from "react-icons/fa";
import { useGetCountryByNameQuery } from "../../../services/countriesApi";

export default function CharacterDetailPage() {
  const { id } = useParams();
  const characterId = Number(id);

  // Rick & Morty API
  const {
    data: character,
    isLoading,
    isError,
  } = useGetCharacterByIdQuery(characterId);

  // Comments API
  const { data: comments = [], refetch } =
    useGetCommentsByCharacterQuery(characterId);
  const [addComment] = useAddCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const [episodeNames, setEpisodeNames] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Country API → solo llamamos si el planeta es "Earth"
  const countryName =
    character?.origin?.name?.toLowerCase().includes("earth")
      ? "United States"
      : null;
  const {
    data: countryData,
    isLoading: countryLoading,
    isError: countryError,
  } = useGetCountryByNameQuery(countryName, {
    skip: !countryName,
  });

  // Traer nombres de episodios
  useEffect(() => {
    if (character) {
      const fetchEpisodes = async () => {
        const firstFive = character.episode.slice(0, 5);
        const data = await Promise.all(
          firstFive.map((url) => fetch(url).then((res) => res.json()))
        );
        setEpisodeNames(data.map((ep) => `${ep.episode} - ${ep.name}`));
      };
      fetchEpisodes();
    }
  }, [character]);

  // Agregar comentario
  const handleAddComment = async (data) => {
    try {
      const payload = {
        ...data,
        characterId,
        createdAt: new Date().toISOString(),
      };

      await addComment(payload).unwrap();
      refetch();
      setShowModal(false);
    } catch (err) {
      console.error("Error al agregar comentario:", err);
      alert("Hubo un error al agregar tu comentario");
    }
  };

  // Eliminar comentario
  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId).unwrap();
      refetch();
    } catch (err) {
      console.error("Error al eliminar comentario", err);
    }
  };

  // Loading & error states
  if (isLoading)
    return (
      <p className="text-center text-cyan-400 text-lg mt-10 animate-pulse">
        Cargando personaje...
      </p>
    );
  if (isError)
    return (
      <p className="text-center text-red-500 text-lg mt-10">
        Error al cargar 😢
      </p>
    );
  if (!character)
    return (
      <p className="text-center text-gray-400 text-lg mt-10">
        Personaje no encontrado.
      </p>
    );

  return (
    <div className="min-h-screen p-6 flex flex-col items-center relative overflow-hidden bg-[#878ead]">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl w-full flex flex-col lg:flex-row gap-6"
      >
        {/* Columna izquierda */}
        <div className="lg:w-1/3 flex flex-col gap-4">
          <motion.img
            src={character.image}
            alt={character.name}
            className="w-full h-auto rounded-2xl shadow-2xl object-cover"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            className="bg-white/30 backdrop-blur-lg border border-white/50 rounded-2xl shadow-lg p-4 text-black"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="flex items-center gap-2">
              <FaCalendarAlt />
              <span className="font-semibold">Creado el:</span>
              {new Date(character.created).toLocaleDateString()}
            </p>
          </motion.div>
          <div className="mt-2 flex justify-center">
            <Link
              to="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-black px-5 py-2 rounded-lg shadow-md transition-all duration-300"
            >
              ← Volver al listado
            </Link>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="lg:w-2/3 flex flex-col gap-4">
          {/* Información básica */}
          <motion.div
            className="bg-white/30 backdrop-blur-lg border border-white/50 rounded-2xl shadow-lg p-4 text-black"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-cyan-700 mb-3">
              {character.name}
            </h2>
            <p className="flex items-center gap-2">
              <FaIdBadge />
              <span className="font-semibold">ID:</span> {character.id}
            </p>
            <p className="flex items-center gap-2">
              <span className="font-semibold">Estado:</span>
              {character.status === "Alive" ? (
                <span className="text-green-600 flex items-center gap-1">
                  <FaHeart /> {character.status}
                </span>
              ) : character.status === "Dead" ? (
                <span className="text-red-600 flex items-center gap-1">
                  <FaSkull /> {character.status}
                </span>
              ) : (
                <span className="text-gray-600 flex items-center gap-1">
                  <FaQuestion /> {character.status}
                </span>
              )}
            </p>
            <p className="flex items-center gap-2">
              <span className="font-semibold">Especie:</span>{" "}
              {character.species}
            </p>
            <p className="flex items-center gap-2">
              <FaVenusMars />{" "}
              <span className="font-semibold">Género:</span> {character.gender}
            </p>
          </motion.div>

          {/* Ubicación y país */}
          <motion.div
            className="bg-white/30 backdrop-blur-lg border border-white/50 rounded-2xl shadow-lg p-4 text-black"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="flex items-center gap-2">
              <FaGlobe /> <span className="font-semibold">Origen:</span>{" "}
              {character.origin.name}
            </p>
            <p className="flex items-center gap-2">
              <FaGlobe /> <span className="font-semibold">Ubicación:</span>{" "}
              {character.location.name}
            </p>

            {/* Datos del país */}
            {countryLoading ? (
              <p className="mt-2 text-gray-600">Cargando info del país...</p>
            ) : countryError ? (
              <p className="mt-2 text-red-500">No hay info del país</p>
            ) : (
              countryData && (
                <div className="flex items-center gap-2 mt-3">
                  <img
                    src={countryData[0].flags.svg}
                    alt={countryData[0].name.common}
                    className="w-6 h-4"
                  />
                  <span>{countryData[0].name.common}</span>
                  <span>🌎 {countryData[0].region}</span>
                  <span>👥 {countryData[0].population.toLocaleString()}</span>
                </div>
              )
            )}
          </motion.div>

          {/* Episodios */}
          <motion.div
            className="bg-white/30 backdrop-blur-lg border border-white/50 rounded-2xl shadow-lg p-4 text-black"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="flex items-center gap-2">
              <FaTv />{" "}
              <span className="font-semibold">Número de episodios:</span>{" "}
              {character.episode.length}
            </p>
            <span className="font-semibold">Primeros 5 episodios:</span>
            <ul className="list-disc list-inside ml-4 mt-1">
              {episodeNames.map((ep, idx) => (
                <li key={idx} className="text-black-700 text-sm">
                  {ep}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Comentarios */}
          <motion.div
            className="bg-white/30 backdrop-blur-lg border border-black/50 rounded-2xl shadow-lg p-4 text-black mt-6 w-full max-w-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-lg font-bold mb-4 text-center">Comentarios</h3>

            {comments.length === 0 ? (
              <p className="text-gray-600 text-center">
                No hay comentarios aún.
              </p>
            ) : (
              <ul className="list-none space-y-3">
                {comments.map((c) => (
                  <li
                    key={c.id}
                    className="flex justify-between items-start border-b border-gray-300 pb-2 last:border-none"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-black">
                        {c.author}:{" "}
                        <span className="font-normal text-gray-800">
                          {c.text}
                        </span>
                      </p>
                      <div className="flex mt-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            size={16}
                            color={i < c.rating ? "#FFD700" : "#C0C0C0"}
                          />
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteComment(c.id)}
                      className="ml-3 text-red-500 hover:text-red-700"
                    >
                      <FaTimes />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowModal(true)}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-black px-4 py-2 rounded-lg shadow-md transition-all duration-300"
              >
                Añadir comentario
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-lg w-11/12 max-w-md relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              <FaTimes />
            </button>
            <NewCommentForm onSubmit={handleAddComment} />
          </motion.div>
        </div>
      )}
    </div>
  );
}
