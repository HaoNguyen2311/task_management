import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { RiDeleteBinLine, RiEditLine } from "@remixicon/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

import DeleteModal, { DeleteModalRef } from "@/components/DeleteModal";
import {
  deleteTask,
  TaskManagementRes,
} from "@/services/taskManagement.service";
import { TASK_LIST_KEY } from "@/app/task-management/page";
import { useToast } from "@/hooks/use-toast";

type ActionsProps = {
  taskManagementData: TaskManagementRes;
};

const Actions = ({ taskManagementData }: ActionsProps) => {
  const deleteModalRef = useRef<DeleteModalRef>(null);

  const router = useRouter();

  const queryClient = useQueryClient();

  const toast = useToast();

  const { mutate: onDeleteTask } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      toast.toast({ description: "Delete task successfully" });
      queryClient.invalidateQueries({
        queryKey: [TASK_LIST_KEY],
      });
    },
    onError: () => {
      toast.toast({
        variant: "destructive",
        description:
          "An error occurred while trying to delete task, please try again later",
      });
    },
  });

  const handleDelete = () => {
    if (taskManagementData) {
      onDeleteTask(taskManagementData.id);
    }
  };

  const onClickDelete = () => {
    deleteModalRef.current?.open();
  };

  const onClickEdit = () => {
    router.push(`/edit-task/${taskManagementData.id}`);
  };

  return (
    <div className="flex items-center justify-between">
      <DeleteModal
        ref={deleteModalRef}
        onDelete={handleDelete}
        title="Remove Car"
        desc={
          <span className="text-base font-light">
            Are you sure you want to remove{" "}
            <span className="font-normal">{taskManagementData.name} </span>?
            This action cannot be undone.
          </span>
        }
      />
      <Button onClick={onClickEdit} variant="ghost">
        <RiEditLine className="h-4 w-4 text-gray-10" />
      </Button>
      <Separator orientation="vertical" className="h-4" />
      <Button onClick={onClickDelete} variant="ghost">
        <RiDeleteBinLine className="h-4 w-4 text-gray-10" />
      </Button>
    </div>
  );
};

export default Actions;
