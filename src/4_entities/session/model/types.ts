export interface Session {
  auth: boolean;
  idRole: number;
  idStore: number[];
  idUser: number;
  isAdminProduct: boolean;
  isGrillProject: boolean;
  role: string;
  school: boolean;
  userName: string;
}

export interface SessionStore {
  session: Session | null;
  setSession: (session: Session) => void;
  clearSession: () => void;
}
