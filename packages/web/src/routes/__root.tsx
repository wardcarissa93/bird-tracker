import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { useKindeAuth } from '@kinde-oss/kinde-auth-react';

// Renaming "component" to "RootRouteComponent" to follow naming conventions
export const Route = createRootRoute({
  component: RootRouteComponent, // Using the renamed component here
});

function RootRouteComponent() {
  const { login, register } = useKindeAuth();

  return (
    <>
      <div id="nav-bar">
        <div id="left-nav-bar">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>
          <Link to="/add-bird" className="[&.active]:font-bold">
            Add Bird
          </Link>
          <Link to="/my-birds" className="[&.active]:font-bold">
            My Birds
          </Link>
        </div>
        <div id="right-nav-bar">
          <p onClick={() => login()}>Login</p>
          <p onClick={() => register()}>Register</p>
        </div>
      </div>
      <div className="line"></div>
      <Outlet />
    </>
  );
}

