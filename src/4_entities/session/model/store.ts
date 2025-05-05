import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Session, SessionStore } from "./types";

export const useSessionStore = create<SessionStore>()(
  persist<SessionStore>(
    (set) => ({
      session: null,
      setSession: (session: Session) => set({ session }),
      clearSession: () => set({ session: null }),
    }),
    {
      name: "session",
    }
  )
);

// — опционально, для удобства в компонентах —
const useSession = () => {
  const session = useSessionStore((s) => s.session);
  const setSession = useSessionStore((s) => s.setSession);
  const clearSession = useSessionStore((s) => s.clearSession);
  return { session, setSession, clearSession };
};
export default useSession;
