export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  baseActionUrl: string;
  query?: string;
  sort?: string;
};

export type SearchFormProps = {
  query?: string;
  sort?: string;
  page?: number;
  baseActionUrl: string;
  placeholder?: string;
};

export type QueryResetButton = {
  sort?: string;
  currentPage?: number;
  baseActionUrl: string;
};

export type SortSelectProps = {
  sort?: string;
  query?: string;
  page?: number;
  baseActionUrl: string;
  defaultSort: string;
  options: { value: string; label: string }[];
};

export type ShareDropdownProps = {
  className?: string;
  text: string;
};

export type renderJsonToHtmlContentProps = {
  content: string;
};
