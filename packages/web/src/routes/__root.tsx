import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <>
      <div id="nav-bar">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}
        <Link to="/search" className="[&.active]:font-bold">
          Search
        </Link>
        <Link to="/add-bird" className="[&.active]:font-bold">
          Add Bird
        </Link>
        <Link to="/my-birds" className="[&.active]:font-bold">
          My Birds
        </Link>
      </div>
      <hr />
      <Outlet />
    </>
  ),
})