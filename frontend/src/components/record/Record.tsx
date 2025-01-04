import axios from "axios";
import { useState } from "react";
import { LuEllipsisVertical } from "react-icons/lu";
import DOMAIN from "../../services/endpoint";

type RecordType = {
    record_id: number;
    created_at: string;
    winner: string;
    loser: string;
    points: number;
};

type RecordProps = {
    record: RecordType;
};

export default function Record(props: RecordProps) {
    const [showMenu, setShowMenu] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);

    function toggleMenu() {
        setShowMenu(!showMenu);
    }

    async function handleDeleteRecord(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            await axios.post(`${DOMAIN}/api/records/${props.record.record_id}`);
            const res = await axios.get(`${DOMAIN}/api/records/`);
            const newRecords: RecordType[] = [];
            console.log(res.data);
            //@ts-ignore
            res.data.forEach((record) => newRecords.push(record));
            //@ts-ignore
            //setRecords([...newRecords]);
            setEditMode(false);
            setShowMenu(false);
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    }

    return (
        <div>
            {deleteMode && (
                <div className="fixed z-[201] py-5 px-2 md:px-5 rounded-lg bg-[#1A1A1A] top-[20%] md:top-[20%] left-[5%] md:left-[40%] flex flex-col w-[90%] md:w-[30%]">
                    <div className="text-xl py-5 font-bold ">
                        Delete For Eternity
                    </div>
                    <div className="">
                        You are about to permanently delete{" "}
                        <span className="text-[#D2B1FD]">
                            {props.record.record_id}
                        </span>
                        . This <br /> record will be gone forever.
                    </div>
                    <div className="mx-auto py-2">
                        <form>
                            <input
                                name="content"
                                id="content"
                                defaultValue="[this message was deleted]"
                                className="hidden"
                            />
                            <div className="flex ">
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
            <div
                className="grid grid-cols-5 relative"
                key={props.record.record_id}
            >
                <div>{props.record.created_at.slice(0, 10)}</div>
                <div>{props.record.winner}</div>
                <div>{props.record.loser}</div>
                <div>{props.record.points}</div>
                <div className="py-2">
                    <LuEllipsisVertical
                        onClick={toggleMenu}
                        className="cursor-pointer"
                    />
                </div>
                {showMenu && (
                    <div className="absolute right-5 md:right-44 top-10 md:top-0 bg-[#242424] border border-[#373541] rounded-xl py-5 px-5 z-10">
                        <div
                            className="pb-1 cursor-pointer"
                            onClick={() => setEditMode(true)}
                        >
                            Edit
                        </div>
                        {editMode && (
                            <div>
                                <form className="flex flex-col">
                                    <input
                                        name="title"
                                        id="title"
                                        type="text"
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
        </div>
    );
}
