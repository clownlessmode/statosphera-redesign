import { create } from "zustand";
import { Mail, mails } from "./data";

interface MailState {
  selected: Mail["id"] | null;
  setSelected: (id: Mail["id"] | null) => void;
}

const useMail = create<MailState>((set) => ({
  selected: mails[0].id,
  setSelected: (id) => set({ selected: id }),
}));

export default useMail;
