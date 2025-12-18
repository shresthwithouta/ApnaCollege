"use client";

import { signOut } from "next-auth/react";
import Button from "./Button";

export default function LogoutButton() {
  return (
    <Button
      variant="primary"
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="rounded-full"
    >
      Logout
    </Button>
  );
}
