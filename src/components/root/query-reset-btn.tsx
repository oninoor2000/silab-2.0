"use client";
import React from "react";
import Link from "next/link";
import type { QueryResetButton } from "~/typeSchema/root-types";

import { X } from "lucide-react";
import { Button } from "../ui/button";

const QueryResetButton = ({
  sort,
  currentPage,
  baseActionUrl,
}: QueryResetButton) => {
  const reset = () => {
    const form = document.getElementById("search-form") as HTMLFormElement;
    if (form) form.reset();
  };

  // Buat URLSearchParams baru untuk query parameters
  const params = new URLSearchParams();
  if (sort) params.set("sort", sort);
  if (currentPage) params.delete("page");

  return (
    <Button
      asChild
      type="reset"
      size="default"
      onClick={reset}
      className="h-[42px] w-[42px]"
    >
      <Link
        href={`/${baseActionUrl}${params.toString() ? `?${params.toString()}` : ""}`}
        className="flex items-center justify-center"
      >
        <X className="h-5 w-5 stroke-current" />
      </Link>
    </Button>
  );
};

export default QueryResetButton;
