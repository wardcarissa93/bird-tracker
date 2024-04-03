import { createFileRoute, Outlet } from "@tanstack/react-router";

export function Login() {
    return (
        <div>
            <h1>Welcome to Bird Tracker</h1>
            <p>Please login to continue</p>
            <div>
                <button>Login</button>
                <button>Register</button>
            </div>
        </div>
    );
}

const Component = () => {
    const isAuthenticated = true;
    if (!isAuthenticated) {
        return <Login />
    }
    return <Outlet />
};

export const Route  = createFileRoute("/_authenticated")