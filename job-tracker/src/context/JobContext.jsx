import { createContext, useContext, useEffect, useState } from 'react';

const JobContext = createContext();

export function JobProvider({ children }) {
  const [jobs, setJobs] = useState(() => {
    const localData = localStorage.getItem('jobs');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (job) => {
    setJobs([...jobs, { ...job, id: Date.now().toString() }]);
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

 const updateJob = (updatedJob) => {
  const updatedJobs = jobs.map(job =>
    job.id === updatedJob.id ? updatedJob : job
  );
  setJobs(updatedJobs);
  localStorage.setItem('jobs', JSON.stringify(updatedJobs));
};

  const getJob = (id) => {
    return jobs.find((job) => job.id === id);
  };

  return (
    <JobContext.Provider value={{ jobs, addJob, deleteJob, updateJob, getJob }}>
      {children}
    </JobContext.Provider>
  );
}

export function useJobContext() {
  return useContext(JobContext);
}
