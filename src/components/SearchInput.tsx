import { RiSearchLine } from "@remixicon/react";
import { Input } from "./ui/input";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SearchInputProps = {
  className?: string;
  icon?: ReactNode;
  onChange: (value: string) => void;
  placeholder?: string;
};

const SearchInput = ({
  className,
  icon,
  onChange,
  placeholder,
}: SearchInputProps) => {
  return (
    <div className="w-full md:w-fit flex items-center rounded border border-gray-3 bg-white shadow-sm focus-within:border-black">
      {icon ?? <RiSearchLine className="ml-4 h-5 w-5 text-gray-500" />}
      <Input
        className={cn(
          "w-full rounded-full border-none px-4 py-2 leading-tight text-gray-700 focus:outline-none focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:ring-offset-transparent",
          className
        )}
        id="search"
        type="text"
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "Search..."}
      />
    </div>
  );
};

export default SearchInput;
