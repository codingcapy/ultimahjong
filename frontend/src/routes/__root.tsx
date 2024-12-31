import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import "../index.css";

export const Route = createRootRoute({
  component: () => (
    <div className="flex flex-col min-h-screen">
      <div className="hidden">
        <Link to="/" className="[&.active]:font-bold p-2">
          Home
        </Link>
        <Link to="/about" className="[&.active]:font-bold p-2">
          About
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
