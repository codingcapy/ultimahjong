import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import mjimg2 from "/mjimg2.jpg";
import { useState } from "react";
import useAuthStore from "../store/AuthStore";
import axios from "axios";
import DOMAIN from "../services/endpoint";
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";
import { useCreateUserMutation } from "../lib/api/users";

export const Route = createLazyFileRoute("/register")({
    component: RouteComponent,
});

function RouteComponent() {
    const navigate = useNavigate();
    const [notification, setNotification] = useState("");
    const { loginService, authLoading, user } = useAuthStore((state) => state);
    const [showPassword, setShowPassword] = useState(false);
    const { mutate: createUser } = useCreateUserMutation();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(DOMAIN);
        // const token = captchaRef.current.getValue();
        // captchaRef.current.reset();
        // if (!token)
        //     return setNotification("Please confirm that you are human!");
        const email = (e.target as HTMLFormElement).email.value;
        const password = (e.target as HTMLFormElement).password.value;
        console.log(email, password);
        createUser(
            { email, password },
            {
                onSuccess: () => {
                    loginService(email, password);
                    if (authLoading) setNotification("Loading...");
                },
                onError: (errorMessage) =>
                    setNotification(errorMessage.toString()),
            }
        );
    }

    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
    }

    return (
        <main className="flex-1">
            <div className="md:flex">
                <div className="md:w-[30%] flex flex-col mx-auto ">
                    <h1 className="pt-5 text-lg mx-auto text-center md:pt-20 font-bold z-10 text-white md:text-black">
                        Create an account
                    </h1>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col mx-auto z-10 w-[300px]"
                    >
                        <label htmlFor="" className="text-white md:text-black">
                            Email
                        </label>
                        <input
                            className="border"
                            type="email"
                            id="email"
                            name="email"
                            required
                        />
                        <label
                            htmlFor="Password"
                            className="text-white md:text-black"
                        >
                            Password
                        </label>
                        <div className="flex border relative">
                            <input
                                className="w-[100%]"
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-2 top-1 text-gray-400"
                            >
                                {showPassword ? (
                                    <LuEyeClosed className="" />
                                ) : (
                                    <LuEye className="" />
                                )}
                            </button>
                        </div>
                        <button className="bg-green-800 text-white mt-10 px-10 py-2">
                            Register
                        </button>
                    </form>
                    <div className=" mt-20 text-center text-gray-500">
                        Already have an account?
                        <Link to="/" className="font-bold pl-2 text-black">
                            Login
                        </Link>
                    </div>
                </div>
                <div className="md:w-[70%] absolute top-0 left-0 md:relative">
                    <div className="md:hidden fixed m-2 top-0 left-0 w-[96%] h-[257px] rounded-2xl bg-black opacity-50"></div>
                    <img
                        src={mjimg2}
                        alt=""
                        className="w-[100%] p-2 rounded-2xl"
                    />
                </div>
            </div>
        </main>
    );
}
