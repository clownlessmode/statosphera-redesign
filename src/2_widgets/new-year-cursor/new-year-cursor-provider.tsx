import { useEffect } from "react";
import { useSession } from "@entities/session";

export const NewYearCursorProvider = () => {
  const { session } = useSession();

  useEffect(() => {
    const root = document.documentElement;
    const allowedUserIds = [127, 154];
    const shouldHaveCursor = session?.idUser
      ? allowedUserIds.includes(session.idUser)
      : false;

    if (!shouldHaveCursor) {
      root.classList.add("custom-cursor-enabled");
    } else {
      root.classList.remove("custom-cursor-enabled");
    }

    // Cleanup при размонтировании
    return () => {
      root.classList.remove("custom-cursor-enabled");
    };
  }, [session?.idUser]);

  return null;
};
