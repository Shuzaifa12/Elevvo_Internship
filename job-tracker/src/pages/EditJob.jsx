import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useJobContext } from '../context/JobContext';

export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs, updateJob } = useJobContext();
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    status: 'Applied',
    date: '',
    notes: ''
  });

  useEffect(() => {
    const jobToEdit = jobs.find(job => job.id === id);
    if (jobToEdit) {
      setFormData(jobToEdit);
    } else {
      navigate('/');
    }
  }, [id, jobs, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateJob(formData);
    navigate('/');
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Job Application</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4">
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option>Applied</option>
          <option>Interviewing</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="notes"
          placeholder="Additional Notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Job
        </button>
      </form>
    </div>
  );
}
