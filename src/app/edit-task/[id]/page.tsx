import EditTaskPage from "@/components/edit-task/EditTaskPage";

async function EditTask({
  params,
}: {
  params?: Record<string, string | string[]>;
}) {
  return <EditTaskPage id={params?.id as string} />;
}
export default EditTask;
