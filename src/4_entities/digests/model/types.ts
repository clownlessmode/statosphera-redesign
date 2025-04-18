export type GetDigestsResponse = {
  id: string;
  title: string;
  type: string;
  create_add: string;
  description: string;
  count: number;
  cover: string;
}[];

export type GetDigestResponse = {
  daydjest: {
    id: string;
    pages: string[];
    title: string;
    type: string;
  }[];
};
