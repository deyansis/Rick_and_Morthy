import { useParams, useNavigate } from "react-router-dom";
import NewCommentForm from "./NewCommentForm";
import { useAddCommentMutation } from "../../../../services/commentsApi";


export default function NewCommentFormPage() {
  const { id } = useParams(); // characterId
  const navigate = useNavigate();
  const [addComment] = useAddCommentMutation();

  const handleSubmit = async (data) => {
    try {
      await addComment({ characterId: id, text: data.text }).unwrap();
      navigate(`/character/${id}`); // Volver a la página de detalles
    } catch (error) {
      console.error("Error al agregar comentario:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#878ead] p-6">
      <NewCommentForm onSubmit={handleSubmit} />
    </div>
  );
}
