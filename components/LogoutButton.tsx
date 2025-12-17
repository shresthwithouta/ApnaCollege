"use client";

import { signOut } from "next-auth/react";
import Button from "./Button";

export default function LogoutButton() {
  return (
    <Button
      variant="ghost"
      onClick={() => signOut({ callbackUrl: "/login" })}
    >
      Logout
    </Button>
  );
}
