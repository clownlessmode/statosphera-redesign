export interface Idea {
  id: number;
  id_user: number;
  title: string;
  description: string;
  likes: number;
  dislikes: number;
  created_at: string;
  updated_at: string;
  status: Status;
  userGrade: VoteType | null;
}

export type Status = "VOTE" | "DENIED" | "IN_PROGRESS" | "DONE";

export type VoteType = "likes" | "dislikes";

export type MyIdeaResponse = Idea[];

export interface IdeasResponse {
  items: Idea[];
  hasMore: boolean;
}

export interface CreateIdeaRequest {
  title: string;
  description: string;
}

export interface UpdateIdeaRequest {
  title: string;
  description: string;
}

export interface VoteRequest {
  grade: VoteType;
}
