import { Link } from "@tanstack/react-router";
import useGamesStore from "../../store/DashboardStore";
import { useState } from "react";
import { LuEllipsisVertical } from "react-icons/lu";

type Game = {
    game_id: number;
    year: string;
};

type GameProps = {
    game: Game;
};

export default function Game(props: GameProps) {
    const [showOverlay, setShowOverlay] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);
    const [projectTitle, setProjectTitle] = useState(props.game.year);
    const { currentGameId, setCurrentGameId } = useGamesStore((state) => state);

    function toggleMenu(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        e.preventDefault();
        setShowMenu(!showMenu);
    }

    return (
        <Link
            to="/record"
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
            className="relative"
        >
            <div
                className="py-10 bg-gray-600 text-center text-white my-2 md:my-0"
                key={props.game.game_id}
            >
                {props.game.year}
            </div>
            {showOverlay && (
                <LuEllipsisVertical className="absolute right-3 top-3 " />
            )}
        </Link>
    );
}
