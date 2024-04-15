import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { useKindeAuth } from '@kinde-oss/kinde-auth-react';

// Renaming "component" to "RootRouteComponent" to follow naming conventions
export const Route = createRootRoute({
  component: RootRouteComponent, // Using the renamed component here
});

function RootRouteComponent() {
  const { login, logout, register, isAuthenticated } = useKindeAuth();
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div id="nav-bar">
        <div id="left-nav-bar">
          <Link to="/">
            Home
          </Link>
          <Link to="/add-bird">
            Add Bird
          </Link>
          <Link to="/my-birds">
            My Birds
          </Link>
        </div>
        {!isAuthenticated && (
          <div id="right-nav-bar">
            <p onClick={() => login()}>Login</p>
            <p onClick={() => register()}>Register</p>
          </div>
        )}
        {isAuthenticated && (
          <div id="right-nav-bar">
            <p>
              <Link to="/profile">
                My Profile
              </Link>
            </p>
            <p onClick={() => logout()}>Logout</p>
          </div>
        )}
      </div>
      <div className="line"></div>
      <Outlet />
      <footer>
        <p>&copy; {currentYear} - Carissa Ward</p>
      </footer>
    </>
  );
}