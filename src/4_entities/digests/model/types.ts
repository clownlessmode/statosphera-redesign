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
  id: string;
  pages: string[];
  name_daydjest: string;
  type: string;
};

export type DigestRequest = {
  title: string;
  type: string;
  description: string;
  files: File[];
  cover: File;
};

export type CreateDigestResponse = {
  id: string;
  title: string;
  type: string;
  description: string;
  pach_cdn: string[];
  cover: string;
  create_add: string;
};

export type DeleteDigestResponse = {
  message: string;
};
