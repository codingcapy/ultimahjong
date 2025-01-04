import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import useAuthStore from "../store/AuthStore";
import SideNav from "../components/SideNav";
import { useEffect, useState } from "react";
import axios from "axios";
import DOMAIN from "../services/endpoint";
import useGamesStore from "../store/DashboardStore";
import Game from "../components/dashboard/Game";

export type Game = {
    game_id: number;
    year: string;
    created_at: string;
    active: boolean;
};

export const Route = createLazyFileRoute("/dashboard")({
    component: RouteComponent,
});

function RouteComponent() {
    const { user } = useAuthStore((state) => state);
    const { games, setGames, currentGameId, setCurrentGameId } = useGamesStore(
        (state) => state
    );
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate({ to: "/" });
        async function getGames() {
            const res = await axios.get(`${DOMAIN}/api/games`);
            const newGames: Game[] = [];
            console.log(res.data);
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
                        {games &&
                            //@ts-ignore
                            games.map((game) => (
                                <Game game={game} key={game.game_id} />
                            ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
