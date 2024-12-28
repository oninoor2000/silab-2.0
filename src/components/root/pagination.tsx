import React from "react";
import type { PaginationProps } from "~/typeSchema/root-types";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";

export function SitePagination({
  currentPage,
  totalPages,
  baseActionUrl,
  query,
  sort,
}: PaginationProps) {
  const maxVisiblePages = 5;
  const pageNumbers: (number | string)[] = [];

  // Calculate visible page numbers
  if (totalPages <= maxVisiblePages) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push("...");
      pageNumbers.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pageNumbers.push(1);
      pageNumbers.push("...");
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      pageNumbers.push("...");
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push("...");
      pageNumbers.push(totalPages);
    }
  }

  // Helper function to build URL with preserved parameters
  const buildPageUrl = (page: number) => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    if (query) params.set("query", query);
    if (sort) params.set("sort", sort);
    return `/${baseActionUrl}?${params.toString()}`;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={currentPage > 1 ? buildPageUrl(currentPage - 1) : "#"}
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>

        {pageNumbers.map((pageNumber, index) => (
          <PaginationItem key={index}>
            {pageNumber === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={buildPageUrl(pageNumber as number)}
                isActive={currentPage === pageNumber}
              >
                {pageNumber}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={
              currentPage < totalPages ? buildPageUrl(currentPage + 1) : "#"
            }
            aria-disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
