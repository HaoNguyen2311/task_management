"use client";

import { getTask, putTask } from "@/services/taskManagement.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import TaskInfoForm, { useTaskInfoForm } from "../add-task/TaskInfoForm";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const EditTaskPage = ({ id }: { id: string }) => {
  const form = useTaskInfoForm();

  const { data: taskData, isFetching } = useQuery({
    queryKey: ["taskData", id],
    queryFn: () => getTask(id),
  });

  const toast = useToast();

  const router = useRouter();

  const { mutate: handleUpdateTask, isLoading } = useMutation({
    mutationFn: putTask,
    onSuccess: () => {
      toast.toast({
        description: "Edit task successfully",
      });
    },
    onError: () => {
      toast.toast({
        variant: "destructive",
        description:
          "An error occurred while trying to edit task, please try again later",
      });
    },
  });

  useEffect(() => {
    form.reset(taskData);
  }, [taskData, form]);

  useEffect(() => {
    form.control._disableForm(isLoading || isFetching);
  }, [isLoading, isFetching, form]);

  const handleAddTask = () => {
    const data = form.getValues();
    handleUpdateTask({ id, data });
  };

  const onClickCancel = () => {
    router.back();
  };

  return (
    <div className="h-fit flex-1 p-6 shadow-lg">
      <TaskInfoForm isEdit taskInfoForm={form} />
      <div className="w-full flex gap-4 justify-end">
        <Button onClick={onClickCancel} disabled={isLoading} type="button">
          Cancel
        </Button>
        <Button
          disabled={isLoading}
          type="submit"
          onClick={form.handleSubmit(handleAddTask)}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default EditTaskPage;
