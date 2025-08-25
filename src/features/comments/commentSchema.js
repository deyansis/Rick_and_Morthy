import { z } from "zod";

export const commentSchema = z.object({
  author: z.string().min(4, "El nombre debe tener al menos 4 caracteres"),
  email: z.string().email("Debe ser un correo válido"),
  text: z.string().min(1, "El comentario no puede estar vacío"),
  rating: z.preprocess(
    (value) => Number(value),
    z.number().min(1, "Debes dar al menos 1 estrella").max(5, "Máximo 5 estrellas")
  ),
  characterId: z.number().optional(), // ✅ lo ponemos opcional, porque lo agregamos en el handleAddComment
});
