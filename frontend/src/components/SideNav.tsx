import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import useAuthStore from "../store/AuthStore";
import { IoMdExit } from "react-icons/io";
import { useCreateGameMutation } from "../lib/api/games";

export default function SideNav() {
    const navigate = useNavigate();
    const { logoutService, authLoading, user } = useAuthStore((state) => state);
    const { mutate: createGame } = useCreateGameMutation();

    function handleLogout() {
        logoutService();
        navigate({ to: "/" });
    }

    async function handleCreateGame(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const year = "New Game";
        const new_project = { year };
        createGame(new_project);
    }

    return (
        <div className="hidden w-[12%] h-screen bg-black text-white md:flex flex-col justify-between">
            <div className="pt-10 text-center">
                <Link to="/" className="pt-10 text-center font-bold">
                    Ultimate MahJong
                </Link>
                <form onSubmit={handleCreateGame}>
                    <button className="m-10 py-2 px-5 bg-green-500 rounded">
                        New Game
                    </button>
                </form>
            </div>
            <div
                className="flex p-10 pb-20 cursor-pointer"
                onClick={handleLogout}
            >
                <IoMdExit className=" py-1 w-[25px] h-[25px]" />
                <div className="pl-2 py-0">Logout</div>
            </div>
        </div>
    );
}
