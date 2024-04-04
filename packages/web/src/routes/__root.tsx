import { createRootRoute, Link, Outlet } from '@tanstack/react-router';

// import { useKindeAuth } from '@kinde-oss/kinde-auth-react';

export const Route = createRootRoute({
  component: () => (
    <>
      <div id="nav-bar">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/add-bird" className="[&.active]:font-bold">
          Add Bird
        </Link>
        <Link to="/my-birds">
          My Birds
        </Link>
        <Link to="/profile">
          My Profile
        </Link>
      </div>
      <hr />
      <Outlet />
    </>
  ),
})