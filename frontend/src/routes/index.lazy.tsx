import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import mjimg from "/mjimg.jpg";
import { useEffect, useState } from "react";
import useAuthStore from "../store/AuthStore";
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";

export const Route = createLazyFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const [notification, setNotification] = useState("");
  const { loginService, authLoading, user } = useAuthStore((state) => state);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!!user) {
      navigate({ to: "/dashboard" });
    }
  }, [user]);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = (e.target as HTMLFormElement).email.value;
    const password = (e.target as HTMLFormElement).password.value;
    console.log(email);
    console.log(password);
    if (!email || !password) return;
    loginService(email, password);
    if (!user) {
      setTimeout(() => {
        setNotification("Invalid login credentials");
      }, 700);
    }
  }

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  return (
    <main className="flex-1">
      <div className="md:flex">
        <div className="md:w-[30%] flex flex-col mx-auto ">
          <h1 className="pt-5 text-lg mx-auto text-center md:pt-20 font-bold z-10 text-white md:text-black">
            Ultimate MahJong
          </h1>
          <form
            onSubmit={handleLogin}
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
            <label htmlFor="Password" className="text-white md:text-black">
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
              Login
            </button>
            <Link className="text-right text-sm mb-10 mt-2 text-white md:text-gray-500">
              Forgot Password
            </Link>
          </form>
          <div className="text-center text-gray-500">
            Don't have an account?
            <Link
              to="/register"
              className="[&.active]:font-bold pl-2 text-black"
            >
              Register
            </Link>
          </div>
          <p className="text-center w-[300px]">{notification}</p>
        </div>
        <div className="md:w-[70%] absolute top-0 left-0 md:relative">
          <div className="md:hidden fixed m-2 top-0 left-0 w-[96%] h-[257px] rounded-2xl bg-black opacity-50"></div>
          <img src={mjimg} alt="" className="w-[100%] p-2 rounded-2xl" />
        </div>
      </div>
    </main>
  );
}
