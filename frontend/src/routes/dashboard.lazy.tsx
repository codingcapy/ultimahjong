import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import useAuthStore from "../store/AuthStore";
import { IoMdExit } from "react-icons/io";

export const Route = createLazyFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { loginService, logoutService, authLoading, user } = useAuthStore(
    (state) => state
  );

  function handleLogout() {
    logoutService();
    navigate({ to: "/" });
  }

  return (
    <main className="flex-1 text-white">
      <div className="flex">
        <div className="hidden w-[12%] h-screen bg-black text-white md:flex flex-col justify-between">
          <div className=" pt-10 text-center font-bold">Ultimate MahJong</div>
          <div
            className="flex p-10 pb-20 cursor-pointer"
            onClick={handleLogout}
          >
            <IoMdExit className=" py-1 w-[25px] h-[25px]" />
            <div className="pl-2 py-0">Logout</div>
          </div>
        </div>
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
