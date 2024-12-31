import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import useAuthStore from "../store/AuthStore";
import SideNav from "../components/SideNav";
import { useEffect, useState } from "react";
import axios from "axios";
import DOMAIN from "../services/endpoint";
import useGamesStore from "../store/DashboardStore";

export const Route = createLazyFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const { games, setGames } = useGamesStore((state) => state);

  useEffect(() => {
    async function getGames() {
      const res = await axios.get(`${DOMAIN}/api/games`);
      //@ts-ignore
      const newGames = [];
      //@ts-ignore
      res.data.forEach((game) => newGames.push(game));
      //@ts-ignore
      setGames([...newGames]);
    }
    getGames();
  }, []);

  return (
    <main className="flex-1 text-white">
      <div className="flex">
        <SideNav />
        <div className="w-[100%] bg-gray-700 h-screen p-10">
          <div className="md:grid grid-cols-5 gap-3">
            {
              //@ts-ignore
              games.map((game) => (
                <Link to="/record">
                  <div
                    className="py-10 bg-gray-600 text-center text-white my-2 md:my-0"
                    key={
                      //@ts-ignore
                      game.game_id
                    }
                  >
                    {
                      //@ts-ignore
                      game.year
                    }
                  </div>
                </Link>
              ))
            }
          </div>
        </div>
      </div>
    </main>
  );
}
