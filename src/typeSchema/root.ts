export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseActionUrl: string;
  query?: string;
  sort?: string;
}

export interface SearchFormProps {
  query?: string;
  sort?: string;
  page?: number;
  baseActionUrl: string;
  placeholder?: string;
}

export interface QueryResetButton {
  sort?: string;
  currentPage?: number;
  baseActionUrl: string;
}

export interface SortSelectProps {
  sort?: string;
  query?: string;
  page?: number;
  baseActionUrl: string;
  options: { value: string; label: string }[];
}

export interface ShareDropdownProps {
  className?: string;
  text: string;
}
