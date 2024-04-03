import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export function Login() {
    const { login, register } = useKindeAuth();
    return (
        <div>
            <h1>Welcome to Bird Tracker</h1>
            <p>Please login to continue</p>
            <div>
                <button onClick={() => login()}>Login</button>
                <button onClick={() => register()}>Register</button>
            </div>
        </div>
    );
}

const Component = () => {
    const { isAuthenticated } = useKindeAuth();
    if (!isAuthenticated) {
        return <Login />
    }
    return <Outlet />
};

export const Route  = createFileRoute("/_authenticated")({
    component: Component,
});