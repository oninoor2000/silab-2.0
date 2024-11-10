import React from "react";
import type { SearchFormProps } from "~/typeSchema/root";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

import QueryResetButton from "./query-reset-btn";

const SearchForm = ({
  query,
  sort,
  page,
  placeholder,
  baseActionUrl,
}: SearchFormProps) => {
  return (
    <form
      id="search-form"
      action={`/${baseActionUrl}`}
      className="flex w-full gap-2 md:max-w-sm"
    >
      <Input
        name="query"
        defaultValue={query}
        className="py-5 pr-8"
        placeholder={placeholder ? `Cari ${placeholder}` : "Cari"}
      />

      <Input name="page" value="1" className="py-5 pr-8" type="hidden" />

      {sort && (
        <Input
          name="sort"
          defaultValue={sort}
          className="py-5 pr-8"
          type="hidden"
        />
      )}

      <Button type="submit" size="default" className="h-[42px] w-[42px]">
        <Search className="h-5 w-5 stroke-current" />
      </Button>
      {query && (
        <QueryResetButton
          currentPage={page}
          sort={sort}
          baseActionUrl="laboratorium"
        />
      )}
    </form>
  );
};

export default SearchForm;
