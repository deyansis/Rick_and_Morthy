// src/features/comments/NewCommentForm.jsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "./commentSchema";
import { FaStar } from "react-icons/fa";

export default function NewCommentForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(commentSchema),
  });

  // Obtenemos el rating seleccionado
  const rating = watch("rating") || 0;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 bg-white/50 p-6 rounded-xl shadow-lg w-full max-w-md"
    >
      {/* Nombre */}
      <label className="font-semibold text-black">Nombre:</label>
      <input
        {...register("author")}
        className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-black"
        placeholder="Tu nombre"
      />
      {errors.author && <span className="text-red-400">{errors.author.message}</span>}

      {/* Correo */}
      <label className="font-semibold text-black">Correo:</label>
      <input
        {...register("email")}
        className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-black"
        placeholder="correo@ejemplo.com"
      />
      {errors.email && <span className="text-red-400">{errors.email.message}</span>}

      {/* Comentario */}
      <label className="font-semibold text-black">Comentario:</label>
      <textarea
        {...register("text")}
        className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-black"
        rows={4}
        placeholder="Escribe tu comentario..."
      />
      {errors.text && <span className="text-red-400">{errors.text.message}</span>}

      {/* Calificación */}
      <label className="font-semibold text-black">Calificación:</label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <FaStar
            key={i}
            size={24}
            className="cursor-pointer"
            color={i <= rating ? "#FFD700" : "#C0C0C0"}
            // ✅ Importante: habilitamos validación al seleccionar
            onClick={() => setValue("rating", i, { shouldValidate: true })}
          />
        ))}
      </div>
      {errors.rating && <span className="text-red-400">{errors.rating.message}</span>}

      {/* Botón */}
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-black px-4 py-2 rounded-lg shadow-md transition-all"
      >
        Agregar comentario
      </button>
    </form>
  );
}
