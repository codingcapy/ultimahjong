import { Link, useNavigate } from "@tanstack/react-router";
import { IoMdExit } from "react-icons/io";
import useAuthStore from "../store/AuthStore";
import useGamesStore from "../store/DashboardStore";

export default function TopNav() {
    const navigate = useNavigate();
    const { logoutService, authLoading, user } = useAuthStore((state) => state);

    function handleLogout() {
        logoutService();
        navigate({ to: "/" });
    }
    return (
        <div className="md:hidden flex justify-between w-full bg-black fixed top-0 left-0">
            <Link to="/" className="text-center font-bold py-2 px-2">
                Ultimate MahJong
            </Link>
            <div
                className="flex cursor-pointer text-white px-2 py-2"
                onClick={handleLogout}
            >
                <IoMdExit className="w-[25px] h-[25px]" />
                <div className="pl-2 py-0">Logout</div>
            </div>
        </div>
    );
}
