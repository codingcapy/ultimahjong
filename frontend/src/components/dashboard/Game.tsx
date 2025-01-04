import { Link } from "@tanstack/react-router";
import useGamesStore from "../../store/DashboardStore";
import { useState } from "react";
import { LuEllipsisVertical } from "react-icons/lu";
import axios from "axios";
import DOMAIN from "../../services/endpoint";

type Game = {
    game_id: number;
    year: string;
};

type GameProps = {
    game: Game;
};

export default function Game(props: GameProps) {
    const [showOverlay, setShowOverlay] = useState(
        window.innerWidth < 500 ? true : false
    );
    const [showMenu, setShowMenu] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);
    const [projectTitle, setProjectTitle] = useState(props.game.year);
    const { games, setGames, currentGameId, setCurrentGameId } = useGamesStore(
        (state) => state
    );

    function toggleMenu() {
        setShowMenu(!showMenu);
    }

    async function handleUpdateTitle(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        //@ts-ignore
        const newTitle = (e.target as HTMLFormElement).title.value;
        try {
            await axios.patch(`${DOMAIN}/api/games/${props.game.game_id}`, {
                year: newTitle,
            });
            const res = await axios.get(`${DOMAIN}/api/games`);
            const newGames: Game[] = [];
            console.log(res.data);
            //@ts-ignore
            res.data.forEach((game) => newGames.push(game));
            //@ts-ignore
            setGames([...newGames]);
            setEditMode(false);
            setShowMenu(false);
        } catch (error) {
            console.error("Error updating project title:", error);
        }
    }

    return (
        <div
            className="relative"
            onClick={() => {
                setCurrentGameId(props.game.game_id);
                console.log(props.game.game_id);
                console.log(currentGameId);
            }}
            onMouseEnter={() => setShowOverlay(true)}
            onMouseLeave={() => {
                setShowOverlay(false);
                setShowMenu(false);
            }}
            key={props.game.game_id}
        >
            <Link to="/record">
                <div
                    className="py-10 bg-gray-600 text-center text-white my-2 md:my-0"
                    key={props.game.game_id}
                >
                    {props.game.year}
                </div>
            </Link>
            {showOverlay && (
                <div
                    className="absolute right-0 top-0 p-3 cursor-pointer"
                    onClick={toggleMenu}
                >
                    <LuEllipsisVertical />
                </div>
            )}
            {showMenu && (
                <div className="absolute right-5 top-10 bg-[#242424] border border-[#373541] rounded-xl py-5 px-5">
                    <div
                        className="pb-1 cursor-pointer"
                        onClick={() => setEditMode(true)}
                    >
                        Edit Game Name
                    </div>
                    {editMode && (
                        <div>
                            <form
                                onSubmit={handleUpdateTitle}
                                className="flex flex-col"
                            >
                                <input
                                    name="title"
                                    id="title"
                                    type="text"
                                    value={projectTitle}
                                    onChange={(e) =>
                                        setProjectTitle(e.target.value)
                                    }
                                    className="bg-transparent border border-[#373541] px-1"
                                />
                                <div className="flex">
                                    <button className="pr-2">Update</button>
                                    <button
                                        className="px-2"
                                        onClick={() => setEditMode(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                    <div className="flex my-2">
                        <div
                            className="pl-2 text-[#D2B1FC] cursor-pointer"
                            onClick={() => setDeleteMode(true)}
                        >
                            Delete
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
