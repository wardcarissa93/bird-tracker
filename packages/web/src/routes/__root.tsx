import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
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
          <p>Login</p>
          <p>Register</p>
        </div>
      </div>
      <div className="line"></div>
      <Outlet />
    </>
  ),
})