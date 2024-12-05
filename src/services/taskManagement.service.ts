import https from ".";

export type TaskManagementRes = {
  id: string;
  name: string;
  desc?: string;
  status: string;
};

export type TaskManagementReq = {
  name: string;
  desc?: string;
  status?: string;
};

export const getTaskManagement = async ({
  keyword,
  status,
  page,
  pageSize,
}: {
  keyword: string;
  status: string;
  page: number;
  pageSize: number;
}) => {
  const res = await https.get<{ data: TaskManagementRes[]; items: number }>(
    "/task-management",
    {
      params: {
        //  Can't use name_like for partial matching. Refer this docs https://github.com/typicode/json-server/issues/1509
        name: keyword,
        status,
        _page: page,
        _per_page: pageSize,
      },
    }
  );
  return res.data;
};

export const addTask = async (data: TaskManagementReq) => {
  await https.post("/task-management", data);
};

export const putTask = async ({
  id,
  data,
}: {
  id: string;
  data: TaskManagementReq;
}) => {
  const res = await https.put(`/task-management/${id}`, data);
  return res.data;
};

export const getTask = async (id?: string) => {
  const res = await https.get(`/task-management/${id}`);
  return res.data;
};

export const deleteTask = async (id: string) => {
  await https.delete(`/task-management/${id}`);
};
