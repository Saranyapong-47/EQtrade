// hooks/useCurrentUser.ts
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export function useCurrentUser(): string | null {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      console.log("👤 Firebase user:", user);
      setUserId(user?.uid ?? null);
    });
    return () => unsub(); // ✅ cleanup
  }, []);

  return userId;
}
