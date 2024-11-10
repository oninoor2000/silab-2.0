"use client";
import React from "react";
import type { SortSelectProps } from "~/typeSchema/root";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const SortSelect = ({
  sort,
  query,
  baseActionUrl,
  options,
}: SortSelectProps) => {
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleValueChange = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <form
      ref={formRef}
      action={`/${baseActionUrl}`}
      className="w-full md:max-w-xs"
    >
      {/* Preserve query parameter if exists */}
      {query && <input type="hidden" name="query" defaultValue={query} />}

      {/* Always reset to page 1 when sorting changes */}
      <input type="hidden" name="page" defaultValue="1" />

      <Select
        name="sort"
        onValueChange={handleValueChange}
        defaultValue={sort ?? "a-z"}
      >
        <SelectTrigger className="w-full py-5">
          <SelectValue placeholder="Urutkan" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="cursor-pointer"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </form>
  );
};

export default SortSelect;
