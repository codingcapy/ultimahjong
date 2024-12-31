import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import useAuthStore from "../store/AuthStore";
import { IoMdExit } from "react-icons/io";
import axios from "axios";
import DOMAIN from "../services/endpoint";

export default function SideNav() {
  const navigate = useNavigate();
  const { logoutService, authLoading, user } = useAuthStore((state) => state);

  function handleLogout() {
    logoutService();
    navigate({ to: "/" });
  }

  async function handleCreateGame() {
    try {
      const year = "New Game";
      const new_project = { year };
      const res = await axios.post(`${DOMAIN}/api/games`, new_project);
      if (res.data?.success && res.data.content.project_id) {
      } else {
        throw new Error("Project ID not found in response");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="hidden w-[12%] h-screen bg-black text-white md:flex flex-col justify-between">
      <div className="pt-10 text-center font-bold">
        <Link to="/" className="pt-10 text-center font-bold">
          Ultimate MahJong
        </Link>
        <form action="">
          <button>New Game</button>
        </form>
      </div>
      <div className="flex p-10 pb-20 cursor-pointer" onClick={handleLogout}>
        <IoMdExit className=" py-1 w-[25px] h-[25px]" />
        <div className="pl-2 py-0">Logout</div>
      </div>
    </div>
  );
}
