import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import useAuthStore from "../store/AuthStore";
import { IoMdExit } from "react-icons/io";
import axios from "axios";
import DOMAIN from "../services/endpoint";
import useGamesStore from "../store/DashboardStore";

export const Route = createLazyFileRoute("/record")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { logoutService, authLoading, user } = useAuthStore((state) => state);

  function handleLogout() {
    logoutService();
    navigate({ to: "/" });
  }

  return (
    <main className="flex-1 text-white">
      <div className="flex">
        <div className="hidden md:fixed w-[12%] h-screen bg-black text-white md:flex flex-col justify-between">
          <div className="pt-10 text-center">
            <Link to="/" className="pt-10 text-center font-bold">
              Ultimate MahJong
            </Link>
          </div>
          <div
            className="flex p-10 pb-20 cursor-pointer"
            onClick={handleLogout}
          >
            <IoMdExit className=" py-1 w-[25px] h-[25px]" />
            <div className="pl-2 py-0">Logout</div>
          </div>
        </div>
        <div className="w-[100%] bg-gray-700 min-h-screen p-10 md:pl-72">
          <form className="flex flex-col w-[300px] mx-auto">
            <h1 className="text-center text-xl font-bold mt-5 mb-2">
              Add New Record
            </h1>
            <h2 className="mb-2 text-center text-sm">Add a new record</h2>
            <label htmlFor="">Winner</label>
            <input type="text" className="mb-2" />
            <label htmlFor="">Loser</label>
            <input type="text" className="mb-2" />
            <label htmlFor="">Points</label>
            <input type="text" />
            <button className="bg-green-800 text-white mt-5 px-10 py-2">
              Add
            </button>
          </form>
          <h2 className="text-center text-xl font-bold mt-10 mb-2">Players</h2>
          <h2 className="mb-2 text-center text-sm">
            Summary of players' stats
          </h2>
          <div className="bg-gray-500 grid grid-cols-3">
            <div>Player</div>
            <div>Total Points</div>
            <div>Total $</div>
          </div>
          <div className="grid grid-cols-3">
            <div>Popo</div>
            <div>61</div>
            <div>$10</div>
          </div>
          <div className="grid grid-cols-3">
            <div>Rebecca</div>
            <div>43</div>
            <div>$8</div>
          </div>
          <div className="grid grid-cols-3">
            <div>Stephanie</div>
            <div>1</div>
            <div>$0.1</div>
          </div>
          <div className="grid grid-cols-3">
            <div>Justin</div>
            <div>-10</div>
            <div>$-0.1</div>
          </div>
          <h2 className="text-center text-xl font-bold mt-10 mb-2">Records</h2>
          <h2 className="text-sm text-center mb-2">All records for 2025</h2>
          <div className="bg-gray-500 grid grid-cols-4">
            <div>date</div>
            <div>winner</div>
            <div>loser</div>
            <div>points won</div>
          </div>
          <div className="grid grid-cols-4">
            <div>January 1 2025</div>
            <div>Rebecca</div>
            <div>Stephanie</div>
            <div>3</div>
          </div>
          <div className="grid grid-cols-4">
            <div>January 1 2025</div>
            <div>Rebecca</div>
            <div>Stephanie</div>
            <div>3</div>
          </div>
          <div className="grid grid-cols-4">
            <div>January 1 2025</div>
            <div>Rebecca</div>
            <div>Stephanie</div>
            <div>3</div>
          </div>
          <div className="grid grid-cols-4">
            <div>January 1 2025</div>
            <div>Rebecca</div>
            <div>Stephanie</div>
            <div>3</div>
          </div>
          <div className="grid grid-cols-4">
            <div>January 1 2025</div>
            <div>Rebecca</div>
            <div>Stephanie</div>
            <div>3</div>
          </div>
          <div className="grid grid-cols-4">
            <div>January 1 2025</div>
            <div>Rebecca</div>
            <div>Stephanie</div>
            <div>3</div>
          </div>
          <div className="grid grid-cols-4">
            <div>January 1 2025</div>
            <div>Rebecca</div>
            <div>Stephanie</div>
            <div>3</div>
          </div>
          <div className="grid grid-cols-4">
            <div>January 1 2025</div>
            <div>Rebecca</div>
            <div>Stephanie</div>
            <div>3</div>
          </div>
          <div className="grid grid-cols-4">
            <div>January 1 2025</div>
            <div>Rebecca</div>
            <div>Stephanie</div>
            <div>3</div>
          </div>
          <div className="grid grid-cols-4">
            <div>January 1 2025</div>
            <div>Rebecca</div>
            <div>Stephanie</div>
            <div>3</div>
          </div>
          <div className="grid grid-cols-4">
            <div>January 1 2025</div>
            <div>Rebecca</div>
            <div>Stephanie</div>
            <div>3</div>
          </div>
          <div className="grid grid-cols-4">
            <div>January 1 2025</div>
            <div>Rebecca</div>
            <div>Stephanie</div>
            <div>3</div>
          </div>
          <div className="grid grid-cols-4">
            <div>January 1 2025</div>
            <div>Rebecca</div>
            <div>Stephanie</div>
            <div>3</div>
          </div>
          <div className="grid grid-cols-4">
            <div>January 1 2025</div>
            <div>Rebecca</div>
            <div>Stephanie</div>
            <div>3</div>
          </div>
        </div>
      </div>
    </main>
  );
}
