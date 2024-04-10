import { createFileRoute } from "@tanstack/react-router";

import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export const Route = createFileRoute("/_authenticated/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { logout, user } = useKindeAuth();
  return (
    <div id="profile-component">
        <h2>Hi, {user?.given_name}</h2>
        <div id="user-email">
          <p>Your Email:</p>
          <p>{user?.email}</p>
        </div>
        <button id="logout-button" onClick={() => logout()}>Logout</button>
    </div>
  );
}