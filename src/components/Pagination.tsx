import { cn } from "@/lib/utils";
import {
  RiArrowLeftDoubleLine,
  RiArrowLeftSLine,
  RiArrowRightDoubleLine,
  RiArrowRightSLine,
  RiMoreLine,
} from "@remixicon/react";
import { ButtonHTMLAttributes, ReactNode, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type PaginationBtnProps = {
  children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;
const PaginationBtn = ({
  children,
  className,
  ...props
}: PaginationBtnProps) => {
  return (
    <button
      {...props}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-[2px] border border-gray-4 bg-white text-sm hover:border-primary hover:font-medium hover:text-primary disabled:border-gray-4 disabled:text-gray-5",
        className
      )}
    >
      {children}
    </button>
  );
};

type PaginationEllipsisProps = {
  children?: ReactNode;
  direction: "prev" | "next";
} & ButtonHTMLAttributes<HTMLButtonElement>;
const PaginationEllipsis = ({
  className,
  direction,
  ...props
}: PaginationEllipsisProps) => {
  return (
    <button
      {...props}
      className={cn(
        "group flex h-8 w-8 items-center justify-center rounded-[2px]",
        className
      )}
    >
      <RiMoreLine className="group-hover:hidden" />
      {direction === "prev" && (
        <RiArrowLeftDoubleLine className="hidden text-primary group-hover:block" />
      )}
      {direction === "next" && (
        <RiArrowRightDoubleLine className="hidden text-primary group-hover:block" />
      )}
    </button>
  );
};

type PaginationProps = {
  page: number;
  pageSize: number;
  totalItems: number;
  onPageSizeChange: (pageSize: number) => void;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  page,
  pageSize,
  totalItems,
  onPageSizeChange,
  onPageChange,
}: PaginationProps) => {
  const totalPages = useMemo(
    () => Math.ceil(totalItems / pageSize),
    [totalItems, pageSize]
  );

  const itemIndexRange = useMemo(() => {
    const start = page * pageSize + 1;
    const end = Math.min((page + 1) * pageSize, totalItems);

    return `${start}-${end}`;
  }, [page, pageSize, totalItems]);

  const buttonList = useMemo(() => {
    if (totalPages <= 7) {
      return Array(totalPages)
        .fill("")
        .map((_, idx) => idx);
    }

    const prev: (number | string)[] = [];

    const prevPageCount = page;
    if (prevPageCount >= 4) {
      prev.push(...[0, "prev", page - 2, page - 1]);
    } else {
      prev.push(
        ...Array(prevPageCount)
          .fill("")
          .map((_, idx) => idx)
      );
    }

    const next: (number | string)[] = [];

    const nextPageCount = totalPages - page - 1;
    if (nextPageCount >= 4) {
      next.push(...[page + 1, page + 2, "next", totalPages - 1]);
    } else {
      next.push(
        ...Array(nextPageCount)
          .fill("")
          .map((_, idx) => page + 1 + idx)
      );
    }

    return [...prev, page, ...next];
  }, [page, totalPages]);

  const handleOnPrevClick = () => {
    onPageChange(Math.max(page - 5, 0));
  };

  const handleOnNextClick = () => {
    onPageChange(Math.min(page + 5, totalItems - 1));
  };

  return (
    <div className="flex items-center justify-end gap-4 flex-wrap">
      <div className="text-sm text-gray-8">
        {itemIndexRange} of {totalItems} items
      </div>
      <div className="flex gap-2">
        <PaginationBtn onClick={() => onPageChange(0)} disabled={page === 0}>
          <RiArrowLeftSLine className="h-5 w-5" />
        </PaginationBtn>

        {buttonList.map((pageIdx) => {
          if (pageIdx === "prev") {
            return (
              <PaginationEllipsis
                onClick={handleOnPrevClick}
                key={pageIdx}
                direction="prev"
              />
            );
          }

          if (pageIdx === "next") {
            return (
              <PaginationEllipsis
                onClick={handleOnNextClick}
                key={pageIdx}
                direction="next"
              />
            );
          }

          return (
            <PaginationBtn
              onClick={() => onPageChange(Number(pageIdx))}
              key={pageIdx}
              className={cn({
                "border-primary text-primary": page === pageIdx,
              })}
            >
              {Number(pageIdx) + 1}
            </PaginationBtn>
          );
        })}

        <PaginationBtn
          onClick={() => onPageChange(totalPages - 1)}
          disabled={page === totalPages - 1}
        >
          <RiArrowRightSLine className="h-5 w-5" />
        </PaginationBtn>
      </div>

      <Select
        value={pageSize.toString()}
        onValueChange={(v) => {
          onPageChange(0);
          onPageSizeChange(Number(v));
        }}
      >
        <SelectTrigger className="h-8 w-[100px] px-3 py-1">
          <SelectValue placeholder="Select a group" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10">10/page</SelectItem>
          <SelectItem value="20">20/page</SelectItem>
          <SelectItem value="40">40/page</SelectItem>
          <SelectItem value="100">100/page</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

Pagination.displayName = "Pagination";

export default Pagination;
