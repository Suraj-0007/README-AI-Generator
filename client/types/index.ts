// types/index.ts

export interface GenerateReadmeRequest {
  repoUrl: string;
  template: string;
}

export interface GenerateReadmeResponse {
  readme: string;
}
