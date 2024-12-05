"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { RiAddLine } from "@remixicon/react";

import Pagination from "@/components/Pagination";
import SearchInput from "@/components/SearchInput";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getTaskManagement } from "@/services/taskManagement.service";
import { useDebounce } from "@/hooks/useDebounce";
import Actions from "@/components/task-management/Actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";

const DEFAULT_FILTER_ITEM = {
  label: "All",
  value: "all",
};

export enum Status {
  "Complete" = "Complete",
  "Incomplete" = "Incomplete",
}

export const TASK_LIST_KEY = "taskList";

const TaskManagement = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [status, setStatus] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);

  const router = useRouter();

  const debouncedSearch = useDebounce(searchKeyword, 300);

  const {
    data: taskManagementList,
    isFetched,
    isFetching,
  } = useQuery({
    queryKey: [TASK_LIST_KEY, debouncedSearch, status, page, pageSize],
    queryFn: () =>
      getTaskManagement({
        keyword: debouncedSearch,
        status: status,
        page: page + 1,
        pageSize,
      }),
  });

  const onChangeFilterBy = (value: Status) => {
    if (value === DEFAULT_FILTER_ITEM.value) {
      setStatus("");
      setSearchKeyword("");
      return;
    }

    setStatus(value);
    setSearchKeyword("");
  };

  const onClickAddTask = () => {
    router.push("/add-task");
  };

  return (
    <div className="mt-10 px-8">
      <p className="text-xl font-bold">Task Management</p>
      <div className="mb-4 mt-4 gap-2 flex justify-between flex-wrap">
        <SearchInput
          placeholder="Search by name"
          onChange={(value) => setSearchKeyword(value)}
        />
        <div className="flex gap-4 ml-auto">
          <Button onClick={onClickAddTask} variant="secondary">
            <RiAddLine /> Add Task
          </Button>
          <Select
            defaultValue={DEFAULT_FILTER_ITEM.value}
            onValueChange={onChangeFilterBy}
          >
            <SelectTrigger className="flex w-fit gap-3 text-sm font-light">
              <SelectValue placeholder="Filter By" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={Status.Complete}>
                  {Status.Complete}
                </SelectItem>
                <SelectItem value={Status.Incomplete}>
                  {Status.Incomplete}
                </SelectItem>
                <SelectItem
                  key={DEFAULT_FILTER_ITEM.label}
                  value={DEFAULT_FILTER_ITEM.value}
                >
                  All
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {isFetched && taskManagementList?.data?.length === 0 && (
        <div className="flex min-h-48 items-center justify-center text-center text-lg">
          Task Management Listing empty
        </div>
      )}
      {isFetching && <Loader aria-busy={true} aria-hidden={false} />}

      {!!taskManagementList?.data?.length && (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {taskManagementList.data.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.name}</TableCell>
                  <TableCell className="font-medium">{task.desc}</TableCell>
                  <TableCell className="font-medium">{task.status}</TableCell>
                  <TableCell className="font-medium w-24">
                    <Actions taskManagementData={task} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="p-4">
            <Pagination
              page={page}
              pageSize={pageSize}
              totalItems={taskManagementList.items || 0}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default TaskManagement;
