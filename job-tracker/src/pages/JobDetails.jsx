import { useParams, useNavigate, Link } from 'react-router-dom';
import { useJobContext } from '../context/JobContext';
import { useEffect, useState } from 'react';

export default function JobDetails() {
  const { id } = useParams();
  const { jobs, deleteJob } = useJobContext();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const selectedJob = jobs.find((job) => job.id === id);
    if (selectedJob) {
      setJob(selectedJob);
    } else {
      navigate('/'); // Redirect to Dashboard if not found
    }
  }, [id, jobs, navigate]);

  if (!job) return null;

  const handleDelete = () => {
    deleteJob(id);
    navigate('/');
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{job.title}</h1>

      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <p><strong>Company:</strong> {job.company}</p>
        <p><strong>Status:</strong> {job.status}</p>
        <p><strong>Applied On:</strong> {job.date}</p>
        {job.notes && <p><strong>Notes:</strong> {job.notes}</p>}
      </div>

      <div className="flex mt-6 space-x-4">
        <Link
          to={`/edit/${job.id}`}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
