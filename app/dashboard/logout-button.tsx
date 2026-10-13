"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleLogout() {
    setPending(true);
    await createClient().auth.signOut();
    router.replace("/");
    router.refresh();
  }

  return (
    <button type="button" onClick={handleLogout} disabled={pending} style={styles.button}>
      {pending ? "Signing out…" : "Sign out"}
    </button>
  );
}

const styles: Record<string, React.CSSProperties> = {
  button: {
    width: "100%",
    marginTop: 14,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "transparent",
    color: "#bac4d7",
    padding: "9px 12px",
    borderRadius: 10,
    cursor: "pointer",
  },
};
