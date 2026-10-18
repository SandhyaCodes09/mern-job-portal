import API from "../api";

// Create new job
export const createJob = async (jobData) => {
  const res = await API.post("/jobs", jobData);
  return res.data;
};

// Get logged-in employer jobs
export const getEmployerJobs = async () => {
  const res = await API.get("/jobs/employer/jobs");
  return res.data;
};

// Update job
export const updateJob = async (id, jobData) => {
  const res = await API.put(`/jobs/${id}`, jobData);
  return res.data;
};

// Delete job
export const deleteJob = async (id) => {
  const res = await API.delete(`/jobs/${id}`);
  return res.data;
};


