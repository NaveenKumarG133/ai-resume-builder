import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, MoreVertical, FileText, Clock, Trash2, Edit2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [resumes, setResumes] = useState([
    { id: '1', title: 'Software Engineer Resume', lastModified: '2 hours ago', status: 'Draft' },
    { id: '2', title: 'Product Manager 2024', lastModified: '3 days ago', status: 'Completed' },
  ]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      setResumes(prev => prev.filter(r => r.id !== id));
      toast.success('Resume deleted successfully');
    }
  };

  const filteredResumes = resumes.filter(r =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Resumes</h1>
            <p className="text-gray-500">Manage and create your professional resumes</p>
          </div>

          <Link to="/builder" className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
            <Plus className="w-5 h-5" />
            Create New
          </Link>
        </header>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your resumes..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
          />
        </div>

        {/* Resume Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Create New Card */}
          <Link to="/builder" className="group rounded-3xl border-2 border-dashed border-gray-200 p-8 flex flex-col items-center justify-center text-center hover:border-indigo-400 hover:bg-indigo-50/50 transition-all gap-4 min-h-[300px]">
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus className="w-8 h-8" />
            </div>
            <div>
              <p className="font-bold text-gray-900">Create New Resume</p>
              <p className="text-sm text-gray-500">Start from a template or AI</p>
            </div>
          </Link>

          {/* Resume Items */}
          <AnimatePresence>
            {filteredResumes.map((resume) => (
              <motion.div
                key={resume.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                    <FileText className="w-8 h-8" />
                  </div>
                  <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">{resume.title}</h3>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {resume.lastModified}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${resume.status === 'Completed' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                    }`}>
                    {resume.status}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Link to={`/builder/${resume.id}`} className="flex-1 inline-flex justify-center items-center gap-2 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl font-medium transition-all">
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(resume.id)}
                    className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;