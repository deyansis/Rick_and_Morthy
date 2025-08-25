import { Routes, Route } from "react-router-dom";
import Layout from "../components/UI/Layout";
import Home from "../pages/Home";
import CharacterDetail from "../features/characters/pages/CharacterDetailPage";

import NewCommentFormPage from "../features/characters/components/comments/NewCommentFormPage";
import NotFound from "../pages/NotFound";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="character/:id" element={<CharacterDetail />} />
        <Route path="character/:id/new-comment" element={<NewCommentFormPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
