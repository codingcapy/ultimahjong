import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import useAuthStore from "../store/AuthStore";
import SideNav from "../components/SideNav";
import { useEffect, useState } from "react";
import axios from "axios";
import DOMAIN from "../services/endpoint";
import Game from "../components/dashboard/Game";
import TopNav from "../components/TopNav";
import { getGamesQueryOptions } from "../lib/api/games";
import { useQuery } from "@tanstack/react-query";
import GameComponent from "../components/dashboard/Game";

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
    const navigate = useNavigate();
    const { data: games } = useQuery(getGamesQueryOptions());

    useEffect(() => {
        if (!user) navigate({ to: "/" });
    }, [user]);

    return (
        <main className="flex-1 text-white">
            <TopNav />
            <div className="flex">
                <SideNav />
                <div className="w-[100%] bg-gray-700 h-screen p-10">
                    <div className="md:grid grid-cols-5 gap-3">
                        {games &&
                            games.map(
                                (game) =>
                                    game.active && (
                                        <GameComponent
                                            game={game}
                                            key={game.gameId}
                                        />
                                    )
                            )}
                    </div>
                </div>
            </div>
        </main>
    );
}
