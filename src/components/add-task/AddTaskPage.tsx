"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import TaskInfoForm, {
  useTaskInfoForm,
} from "@/components/add-task/TaskInfoForm";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { addTask } from "@/services/taskManagement.service";

const AddTaskPage = () => {
  const form = useTaskInfoForm();

  const toast = useToast();

  const router = useRouter();

  const { mutate: handleCreateTask, isLoading } = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      form.reset();
      toast.toast({
        description: "Add task successfully",
      });
    },
    onError: () => {
      toast.toast({
        variant: "destructive",
        description:
          "An error occurred while trying to add task, please try again later",
      });
    },
  });

  useEffect(() => {
    form.control._disableForm(isLoading);
  }, [isLoading, form]);

  const handleAddTask = () => {
    const data = form.getValues();
    handleCreateTask(data);
  };

  const onClickCancel = () => {
    router.back();
  };

  return (
    <div className="h-fit flex-1 p-6 shadow-lg">
      <TaskInfoForm taskInfoForm={form} />
      <div className="w-full flex gap-4 justify-end">
        <Button onClick={onClickCancel} disabled={isLoading} type="button">
          Cancel
        </Button>
        <Button
          disabled={isLoading}
          type="submit"
          onClick={form.handleSubmit(handleAddTask)}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default AddTaskPage;
