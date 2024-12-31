import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import useAuthStore from "../store/AuthStore";
import { IoMdExit } from "react-icons/io";
import axios from "axios";
import DOMAIN from "../services/endpoint";
import useGamesStore from "../store/DashboardStore";
import { useState } from "react";

export const Route = createLazyFileRoute("/record")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { logoutService, authLoading, user } = useAuthStore((state) => state);
  const [notification, setNotification] = useState("");
  const { currentGameId } = useGamesStore((state) => state);

  function handleLogout() {
    logoutService();
    navigate({ to: "/" });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const winner = (e.target as HTMLFormElement).winner.value;
      const loser = (e.target as HTMLFormElement).loser.value;
      const points = (e.target as HTMLFormElement).points.value;
      const game_id = currentGameId;
      const newRecord = { game_id, winner, loser, points };
      const res = await axios.post(`${DOMAIN}/api/records`, newRecord);
      if (res.data.success) {
        setNotification("Success!");
      } else {
        setNotification("Failure");
      }
    } catch (err) {
      setNotification("There was an issue adding record :(");
    }
  }

  console.log(currentGameId);

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
          <form
            className="flex flex-col w-[300px] mx-auto"
            onSubmit={handleSubmit}
          >
            <h1 className="text-center text-xl font-bold mt-5 mb-2">
              Add New Record
            </h1>
            <h2 className="mb-2 text-center text-sm">Add a new record</h2>
            <label htmlFor="winner">Winner</label>
            <select
              className="mb-2 text-black"
              id="winner"
              name="winner"
              required
            >
              <option value="Popo">Popo</option>
              <option value="Rebecca">Rebecca</option>
              <option value="Stephanie">Stephanie</option>
              <option value="Justin">Justin</option>
            </select>
            <label htmlFor="loser">Loser</label>
            <select
              className="mb-2 text-black"
              id="loser"
              name="loser"
              required
            >
              <option value="Popo">Popo</option>
              <option value="Rebecca">Rebecca</option>
              <option value="Stephanie">Stephanie</option>
              <option value="Justin">Justin</option>
            </select>
            <label htmlFor="points">Points</label>
            <input
              className="text-black"
              type="number"
              id="points"
              name="points"
              required
            />
            <button className="bg-green-800 text-white mt-5 px-10 py-2">
              Add
            </button>
          </form>
          <div
            className={
              notification === "Success!"
                ? "py-2 text-center text-green-500"
                : "py-2 text-center text-red-500"
            }
          >
            {notification}
          </div>
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
