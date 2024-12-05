import EditTaskPage from "@/components/edit-task/EditTaskPage";

type EditTaskProps = {
  params: {
    id: string;
  };
};

async function EditTask({ params }: EditTaskProps) {
  const { id } = await params;

  return <EditTaskPage id={id as string} />;
}

export default EditTask;
