import { create } from "zustand";
import { Session, SessionStore } from "./types";
import { persist } from "zustand/middleware";

const useSessionStore = create<SessionStore>()(
  persist(
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

const useSession = () => {
  const session = useSessionStore((state) => state.session);
  const setSession = useSessionStore((state) => state.setSession);
  const clearSession = useSessionStore((state) => state.clearSession);

  return { session, setSession, clearSession };
};

export default useSession;
