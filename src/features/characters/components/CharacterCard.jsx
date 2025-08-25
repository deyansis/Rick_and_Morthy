import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CharacterCard({ character }) {
  return (
    <motion.div
      key={character.id}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        to={`/character/${character.id}`}
        className="group bg-[#242d3a] rounded-xl shadow-lg hover:shadow-cyan-400/40 transition-all duration-300 cursor-pointer overflow-hidden"
      >
        <img
          src={character.image}
          alt={character.name}
          className="rounded-t-xl w-200 h-61 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="p-4">
          <h2 className="text-lg font-bold text-yellow-400">{character.name}</h2>
          <p
            className={`text-sm mt-1 ${
              character.status === "Alive"
                ? "text-black-400"
                : character.status === "Dead"
                ? "text-red-400"
                : "text-black"
            }`}
          >
            {character.status} — {character.species}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
