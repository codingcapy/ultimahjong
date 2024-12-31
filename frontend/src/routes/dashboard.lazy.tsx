import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import useAuthStore from "../store/AuthStore";
import SideNav from "../components/SideNav";

export const Route = createLazyFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex-1 text-white">
      <div className="flex">
        <SideNav />
        <div className="w-[100%] bg-gray-700 h-screen p-10">
          <div className="md:grid grid-cols-5 gap-3">
            <div className="py-10 bg-gray-600 text-center text-white my-2 md:my-0">
              2025
            </div>
            <div className="py-10 bg-gray-600  text-center text-white my-2 md:my-0">
              2025
            </div>
            <div className="py-10 bg-gray-600  text-center text-white my-2 md:my-0">
              2025
            </div>
            <div className="py-10 bg-gray-600  text-center text-white my-2 md:my-0">
              2025
            </div>
            <div className="py-10 bg-gray-600  text-center text-white my-2 md:my-0">
              2025
            </div>
            <div className="py-10 bg-gray-600  text-center text-white my-2 md:my-0">
              2025
            </div>
            <div className="py-10 bg-gray-600  text-center text-white my-2 md:my-0">
              2025
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
