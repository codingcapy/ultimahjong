import { Link } from "@tanstack/react-router";
import useGamesStore from "../../store/DashboardStore";
import { useState } from "react";
import { LuEllipsisVertical } from "react-icons/lu";
import { Game } from "../../../../schema/games";
import { useDeleteGameMutation } from "../../lib/api/games";

export default function GameComponent(props: { game: Game }) {
    const { game } = props;
    const [showOverlay, setShowOverlay] = useState(
        window.innerWidth < 500 ? true : false
    );
    const [showMenu, setShowMenu] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);
    const [projectTitle, setProjectTitle] = useState(game.year || "");
    const { games, setGames, currentGameId, setCurrentGameId } = useGamesStore(
        (state) => state
    );
    const { mutate: deleteGame } = useDeleteGameMutation();

    function toggleMenu() {
        setShowMenu(!showMenu);
    }

    async function handleUpdateTitle(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const newTitle = (e.target as HTMLFormElement).projecttitle.value;
        // try {
        //     await axios.patch(`${DOMAIN}/api/games/${props.game.gameId}`, {
        //         year: newTitle,
        //     });
        //     const res = await axios.get(`${DOMAIN}/api/games`);
        //     const newGames: Game[] = [];
        //     console.log(res.data);
        //     res.data.forEach((game) => newGames.push(game));
        //     setGames([...newGames]);
        //     setEditMode(false);
        //     setShowMenu(false);
        // } catch (error) {
        //     console.error("Error updating project title:", error);
        // }
    }

    async function handleDeleteProject(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        deleteGame({ gameId: game.gameId || 0 });
    }

    return (
        <div
            className="relative"
            onClick={() => {
                setCurrentGameId(props.game.gameId);
                console.log(props.game.gameId);
                console.log(currentGameId);
            }}
            onMouseEnter={() => window.innerWidth > 500 && setShowOverlay(true)}
            onMouseLeave={() => {
                window.innerWidth > 500 && setShowOverlay(false);
                window.innerWidth > 500 && setShowMenu(false);
            }}
            key={props.game.gameId}
        >
            {deleteMode && (
                <div className="fixed z-[201] py-5 px-2 md:px-5 rounded-lg bg-[#1A1A1A] top-[20%] md:top-[10%] left-[5%] md:left-[35%] flex flex-col w-[90%]">
                    <div className="text-xl py-5 font-bold ">
                        Delete For Eternity
                    </div>
                    <div className="">
                        You are about to permanently delete{" "}
                        <span className="text-[#D2B1FD]">
                            {props.game.year}
                        </span>
                        . This <br /> game will be gone forever.
                    </div>
                    <div className="mx-auto py-2">
                        <form onSubmit={handleDeleteProject}>
                            <input
                                name="content"
                                id="content"
                                defaultValue="[this message was deleted]"
                                className="hidden"
                            />
                            <div className="flex md:pl-64">
                                <button
                                    className="md:block md:pb-1 edit-btn cursor-pointer px-5 py-2 md:my-2 mx-2 bg-[#BABABA] rounded hover:bg-[#fafafa] transition-all ease duration-300 text-black tracking-widest"
                                    onClick={() => setDeleteMode(false)}
                                >
                                    CANCEL
                                </button>
                                <button className="md:block delete-btn cursor-pointer px-5 py-2 md:my-2 bg-[#DD4B63] rounded hover:bg-red-600 transition-all ease duration-300 tracking-widest">
                                    DELETE
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {deleteMode && (
                <div
                    className="fixed inset-0 bg-black z-[200] opacity-70"
                    onClick={() => setDeleteMode(false)}
                ></div>
            )}
            <Link to="/record">
                <div
                    className="py-10 bg-gray-600 text-center text-white my-2 md:my-0"
                    key={props.game.gameId}
                >
                    {props.game.year}
                </div>
            </Link>
            {showOverlay && (
                <div
                    className="absolute right-0 top-0 p-3 cursor-pointer z-10"
                    onClick={toggleMenu}
                >
                    <LuEllipsisVertical />
                </div>
            )}
            {showMenu && (
                <div className="absolute right-5 top-10 bg-[#242424] border border-[#373541] rounded-xl py-5 px-5 z-10">
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
                                    name="projecttitle"
                                    id="projecttitle"
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
                            className="text-[#D2B1FC] cursor-pointer"
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
