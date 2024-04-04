import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { useKindeAuth } from '@kinde-oss/kinde-auth-react';

const RootComponent = () => {
  const { isAuthenticated } = useKindeAuth();

  return (
    <>
      <div id="nav-bar">
        <Link to="/">
          Home
        </Link>
        <Link to="/add-bird">
          Add Bird
        </Link>
        <Link to="/my-birds">
          My Birds
        </Link>
        {isAuthenticated && (
          <Link to="/profile">
            My Profile
          </Link>
        )}
      </div>
      <hr />
      <Outlet />
    </>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
