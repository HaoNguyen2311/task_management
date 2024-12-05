"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Status } from "@/app/task-management/page";

const TASK_INFO_FORM_SCHEMA = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  desc: z.string().optional(),
  status: z.string().optional(),
});

const STATUS_LIST = [Status.Complete, Status.Incomplete];

export const useTaskInfoForm = () => {
  return useForm<z.infer<typeof TASK_INFO_FORM_SCHEMA>>({
    resolver: zodResolver(TASK_INFO_FORM_SCHEMA),
    mode: "onChange",
    defaultValues: {
      name: "",
      desc: "",
      status: "",
    },
  });
};

type TaskInfoFormProps = {
  taskInfoForm: ReturnType<typeof useTaskInfoForm>;
  isEdit?: boolean;
};

const TaskInfoForm = ({ taskInfoForm, isEdit }: TaskInfoFormProps) => {
  const { control } = taskInfoForm;
  return (
    <Form {...taskInfoForm}>
      <form>
        <p className="text-lg font-bold">Task Information</p>
        <p className="mb-6 mt-2 text-sm font-light">
          Fill in the task information manually.
        </p>

        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="desc"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isEdit && (
          <FormField
            control={control}
            name="status"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger ref={field.ref}>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_LIST.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </form>
    </Form>
  );
};

export default TaskInfoForm;
