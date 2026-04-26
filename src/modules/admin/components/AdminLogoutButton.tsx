"use client";

import { useState } from "react";

export function AdminLogoutButton() {
  const [isPending, setIsPending] = useState(false);

  const handleLogout = async () => {
    setIsPending(true);

    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } finally {
      window.location.href = "/sign-in";
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isPending}
      className="rounded border border-white/30 bg-white/10 px-3 py-2 text-xs font-bold text-white/90 hover:bg-white/20 disabled:opacity-70"
    >
      {isPending ? "Signing out..." : "Sign Out"}
    </button>
  );
}
