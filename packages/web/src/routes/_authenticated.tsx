import { createFileRoute, Outlet } from '@tanstack/react-router';
import { useKindeAuth } from '@kinde-oss/kinde-auth-react';

export function Login() {
    const { login, register } = useKindeAuth();
    return (
        <div id="login-register-component">
            <div id="app-title">
                <h1>Welcome to </h1>
                <h1>Bird Tracker</h1>
            </div>
            <p>Please login to continue.</p>
            <div id="login-register-buttons">
                <button id="login-button" onClick={() => login()}>Login</button>
                <button id="register-button" onClick={() => register()}>Register</button>
            </div>
        </div>
    );
}

const Component = () => {
    const { isAuthenticated } = useKindeAuth();
    if (!isAuthenticated) {
        return <Login/>
    } 
    return <Outlet/>
};

export const Route = createFileRoute("/_authenticated")({
    component: Component,
});