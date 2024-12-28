export type Params = Promise<{ slug: string }>;

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;
