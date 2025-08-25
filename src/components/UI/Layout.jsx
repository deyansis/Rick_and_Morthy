import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#1f2244] text-white">
      {/* Opcional: Navbar */}
      <Outlet />
    </div>
  );
}
