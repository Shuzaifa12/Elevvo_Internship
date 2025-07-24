import { useJobContext } from '../context/JobContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { jobs, deleteJob } = useJobContext();

  if (jobs.length === 0) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-semibold text-gray-700">No Job Applications Yet</h2>
        <Link
          to="/add"
          className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Your First Job
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Job Applications</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition">
            <h2 className="text-xl font-bold">{job.title}</h2>
            <p className="text-gray-600">{job.company}</p>
            <p className="text-sm text-gray-500">Status: {job.status}</p>
            <p className="text-sm text-gray-500">Applied On: {job.date}</p>
            
            <div className="flex mt-4 space-x-2">
              <Link
                to={`/job/${job.id}`}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
              >
                View
              </Link>
              <button
                onClick={() => deleteJob(job.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
