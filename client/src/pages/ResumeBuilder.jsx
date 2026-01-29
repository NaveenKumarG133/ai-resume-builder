import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    Briefcase,
    GraduationCap,
    Wrench,
    FileText,
    Download,
    Sparkles,
    ArrowLeft,
    Plus,
    Trash2,
    X,
    Maximize2,
    Minimize2,
    FolderGit2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { aiRewrite } from '../utils/api';

const ResumeBuilder = () => {
    const [activeTab, setActiveTab] = useState('personal');
    const [zoom, setZoom] = useState(0.85);
    const [resumeData, setResumeData] = useState({
        personal: { fullName: 'John Doe', email: 'john@example.com', phone: '+1 234 567 890', location: 'New York, NY', portfolio: 'portfolio.com' },
        summary: 'Professional software engineer with 5+ years of experience in building scalable web applications...',
        experience: [
            { id: 1, company: 'Tech Corp', role: 'Senior Developer', duration: '2020 - Present', description: 'Led a team of 5 developers' }
        ],
        education: [
            { id: 1, school: 'University of Tech', degree: 'B.S. Computer Science', year: '2016 - 2020', grade: '3.8 CGPA' }
        ],
        projects: [
            { id: 1, title: 'AI Resume Builder', link: 'github.com/project', description: 'Developed a full-stack SaaS application utilizing React and Node.js.' }
        ],
        skills: ['React', 'Node.js', 'Python', 'AWS']
    });

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1280) setZoom(0.65);
            else if (window.innerWidth < 1536) setZoom(0.75);
            else setZoom(0.85);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleInputChange = (section, field, value) => {
        setResumeData(prev => ({
            ...prev,
            [section]: { ...prev[section], [field]: value }
        }));
    };

    const handleAIImprove = async (field, id) => {
        let content = '';
        if (field === 'summary') content = resumeData.summary;
        else if (field === 'experience') {
            const exp = resumeData.experience.find(e => e.id === id);
            content = exp?.description || '';
        } else if (field === 'projects') {
            const proj = resumeData.projects.find(p => p.id === id);
            content = proj?.description || '';
        }

        if (!content) {
            toast.error('Please enter some content first.');
            return;
        }

        toast.promise(
            new Promise(async (resolve, reject) => {
                try {
                    const { data } = await aiRewrite(content, field);
                    if (field === 'summary') {
                        setResumeData(prev => ({ ...prev, summary: data.improvedContent }));
                    } else {
                        setResumeData(prev => ({
                            ...prev,
                            [field]: prev[field].map(item => item.id === id ? { ...item, description: data.improvedContent } : item)
                        }));
                    }
                    resolve();
                } catch (err) {
                    console.error(err);
                    reject(err);
                }
            }),
            {
                loading: 'AI is analyzing and rewriting...',
                success: 'Improved with AI!',
                error: (err) => err?.response?.data?.message || err?.message || 'AI failed to respond. Please check your API key.',
            }
        );
    };

    const addItem = (section) => {
        const id = Date.now();
        if (section === 'experience') {
            setResumeData(prev => ({
                ...prev,
                experience: [...prev.experience, { id, company: '', role: '', duration: '', description: '' }]
            }));
        } else if (section === 'education') {
            setResumeData(prev => ({
                ...prev,
                education: [...prev.education, { id, school: '', degree: '', year: '', grade: '' }]
            }));
        } else if (section === 'projects') {
            setResumeData(prev => ({
                ...prev,
                projects: [...prev.projects, { id, title: '', link: '', description: '' }]
            }));
        } else if (section === 'skills') {
            setResumeData(prev => ({
                ...prev,
                skills: [...prev.skills, '']
            }));
        }
    };

    const removeItem = (section, id) => {
        if (section === 'skills') {
            setResumeData(prev => ({
                ...prev,
                skills: prev.skills.filter((_, index) => index !== id)
            }));
        } else {
            setResumeData(prev => ({
                ...prev,
                [section]: prev[section].filter(item => item.id !== id)
            }));
        }
    };

    const updateItem = (section, id, field, value) => {
        if (section === 'skills') {
            const newSkills = [...resumeData.skills];
            newSkills[id] = value;
            setResumeData(prev => ({ ...prev, skills: newSkills }));
        } else {
            setResumeData(prev => ({
                ...prev,
                [section]: prev[section].map(item => item.id === id ? { ...item, [field]: value } : item)
            }));
        }
    };

    const handleDownloadPDF = () => {
        window.print();
    };

    const tabs = [
        { id: 'personal', icon: <User className="w-5 h-5" />, label: 'Personal' },
        { id: 'summary', icon: <FileText className="w-5 h-5" />, label: 'Summary' },
        { id: 'experience', icon: <Briefcase className="w-5 h-5" />, label: 'Experience' },
        { id: 'projects', icon: <FolderGit2 className="w-5 h-5" />, label: 'Projects' },
        { id: 'education', icon: <GraduationCap className="w-5 h-5" />, label: 'Education' },
        { id: 'skills', icon: <Wrench className="w-5 h-5" />, label: 'Skills' },
    ];

    return (
        <div className="min-h-screen bg-[#f1f5f9] flex flex-col print:bg-white overflow-hidden print:overflow-visible font-sans">
            {/* Custom Print Style Reset - Essential for High Clarity */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @media print {
                    @page { 
                        margin: 0; 
                        size: A4; 
                    }
                    html, body {
                        height: auto;
                        background-color: white !important;
                    }
                    #resume-content {
                        transform: none !important;
                        margin: 0 !important;
                        padding: 2.5cm !important;
                        width: 100% !important;
                        box-shadow: none !important;
                        min-height: 29.7cm !important;
                    }
                    .no-print { display: none !important; }
                    ::-webkit-scrollbar { display: none; }
                }
            ` }} />

            {/* Top Header */}
            <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-[110] print:hidden h-[73px] shrink-0">
                <div className="flex items-center gap-4">
                    <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-all">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div className="hidden sm:block">
                        <h1 className="text-xl font-bold text-gray-900 leading-tight">Untitled Resume</h1>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Draft Auto-saved</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="hidden md:flex items-center gap-2 px-4 py-2 text-indigo-600 font-semibold hover:bg-indigo-50 rounded-xl transition-all">
                        <Sparkles className="w-4 h-4" />
                        AI Review
                    </button>
                    <button
                        onClick={handleDownloadPDF}
                        className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95 transition-transform"
                    >
                        <Download className="w-4 h-4" />
                        <span>Download PDF</span>
                    </button>
                </div>
            </header>

            <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative print:block print:overflow-visible">
                {/* Sidebar Navigation */}
                <aside className="no-print w-full md:w-20 lg:w-64 bg-white border-r border-gray-200 p-4 flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto shrink-0 z-20">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 p-3 rounded-2xl transition-all whitespace-nowrap grow md:grow-0 ${activeTab === tab.id
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'
                                : 'text-gray-500 hover:bg-gray-50'
                                }`}
                        >
                            <span className="shrink-0">{tab.icon}</span>
                            <span className="hidden lg:block font-semibold">{tab.label}</span>
                        </button>
                    ))}
                </aside>

                {/* Split Screens Container */}
                <div className="flex-1 flex overflow-hidden print:block print:overflow-visible relative">
                    {/* Editor Area */}
                    <main className="no-print flex-1 md:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px] overflow-y-auto p-4 md:p-8 lg:p-10 bg-white border-r border-gray-100 relative z-10 shrink-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.2 }}
                                className="max-w-3xl mx-auto space-y-8"
                            >
                                {activeTab === 'personal' && (
                                    <div className="space-y-6">
                                        <h2 className="text-2xl font-black text-gray-900 border-b pb-4">Personal Details</h2>
                                        <div className="grid gap-5">
                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Full Name</label>
                                                <input
                                                    type="text"
                                                    value={resumeData.personal.fullName}
                                                    onChange={(e) => handleInputChange('personal', 'fullName', e.target.value)}
                                                    className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl outline-none transition-all font-medium"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                                                    <input
                                                        type="email"
                                                        value={resumeData.personal.email}
                                                        onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
                                                        className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl outline-none transition-all font-medium"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Phone</label>
                                                    <input
                                                        type="text"
                                                        value={resumeData.personal.phone}
                                                        onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
                                                        className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl outline-none transition-all font-medium"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Location</label>
                                                <input
                                                    type="text"
                                                    value={resumeData.personal.location}
                                                    onChange={(e) => handleInputChange('personal', 'location', e.target.value)}
                                                    className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl outline-none transition-all font-medium"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'summary' && (
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center border-b pb-4">
                                            <h2 className="text-2xl font-black text-gray-900">Professional Summary</h2>
                                            <button
                                                onClick={() => handleAIImprove('summary')}
                                                className="flex items-center gap-2 text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl font-bold text-xs hover:bg-indigo-100 transition-all border border-indigo-100"
                                            >
                                                <Sparkles className="w-4 h-4" />
                                                AI Rewrite
                                            </button>
                                        </div>
                                        <textarea
                                            rows="10"
                                            value={resumeData.summary}
                                            onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
                                            className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-[24px] outline-none transition-all font-medium resize-none leading-relaxed"
                                            placeholder="Write a brief professional summary..."
                                        />
                                    </div>
                                )}

                                {activeTab === 'experience' && (
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center border-b pb-4">
                                            <h2 className="text-2xl font-black text-gray-900">Experience</h2>
                                            <button
                                                onClick={() => addItem('experience')}
                                                className="flex items-center gap-2 text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl font-bold text-xs hover:bg-indigo-100 transition-all border border-indigo-100"
                                            >
                                                <Plus className="w-4 h-4" />
                                                Add Work
                                            </button>
                                        </div>
                                        <div className="space-y-5">
                                            {resumeData.experience.map((exp) => (
                                                <div key={exp.id} className="p-6 bg-white border-2 border-gray-100 rounded-[32px] space-y-4 relative group shadow-sm hover:border-indigo-100 transition-all">
                                                    <button
                                                        onClick={() => removeItem('experience', exp.id)}
                                                        className="absolute top-6 right-6 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        <div className="space-y-1">
                                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Company</label>
                                                            <input
                                                                value={exp.company}
                                                                onChange={(e) => updateItem('experience', exp.id, 'company', e.target.value)}
                                                                className="w-full p-3 bg-gray-50 rounded-xl outline-none font-semibold focus:bg-gray-100 transition-all"
                                                            />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Role</label>
                                                            <input
                                                                value={exp.role}
                                                                onChange={(e) => updateItem('experience', exp.id, 'role', e.target.value)}
                                                                className="w-full p-3 bg-gray-50 rounded-xl outline-none font-semibold focus:bg-gray-100 transition-all"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Duration</label>
                                                        <input
                                                            value={exp.duration}
                                                            onChange={(e) => updateItem('experience', exp.id, 'duration', e.target.value)}
                                                            className="w-full p-3 bg-gray-50 rounded-xl outline-none font-semibold focus:bg-gray-100 transition-all"
                                                            placeholder="2022 - Present"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Description</label>
                                                        <div className="relative">
                                                            <textarea
                                                                rows="4"
                                                                value={exp.description}
                                                                onChange={(e) => updateItem('experience', exp.id, 'description', e.target.value)}
                                                                className="w-full p-4 bg-gray-50 rounded-2xl outline-none font-medium resize-none leading-relaxed"
                                                            />
                                                            <button
                                                                onClick={() => handleAIImprove('experience', exp.id)}
                                                                className="absolute bottom-3 right-3 p-2 bg-white text-indigo-600 rounded-lg hover:shadow-md transition-all border border-gray-100"
                                                                title="AI Polish"
                                                            >
                                                                <Sparkles className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'projects' && (
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center border-b pb-4">
                                            <h2 className="text-2xl font-black text-gray-900">Projects</h2>
                                            <button
                                                onClick={() => addItem('projects')}
                                                className="flex items-center gap-2 text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl font-bold text-xs hover:bg-indigo-100 transition-all border border-indigo-100"
                                            >
                                                <Plus className="w-4 h-4" />
                                                Add Project
                                            </button>
                                        </div>
                                        <div className="space-y-5">
                                            {resumeData.projects.map((proj) => (
                                                <div key={proj.id} className="p-6 bg-white border-2 border-gray-100 rounded-[32px] space-y-4 relative group shadow-sm hover:border-indigo-100 transition-all">
                                                    <button
                                                        onClick={() => removeItem('projects', proj.id)}
                                                        className="absolute top-6 right-6 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        <div className="space-y-1">
                                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Project Title</label>
                                                            <input
                                                                value={proj.title}
                                                                onChange={(e) => updateItem('projects', proj.id, 'title', e.target.value)}
                                                                className="w-full p-3 bg-gray-50 rounded-xl outline-none font-semibold focus:bg-gray-100 transition-all"
                                                                placeholder="e.g. E-commerce Platform"
                                                            />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Link (Optional)</label>
                                                            <input
                                                                value={proj.link}
                                                                onChange={(e) => updateItem('projects', proj.id, 'link', e.target.value)}
                                                                className="w-full p-3 bg-gray-50 rounded-xl outline-none font-semibold focus:bg-gray-100 transition-all"
                                                                placeholder="github.com/..."
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Description</label>
                                                        <div className="relative">
                                                            <textarea
                                                                rows="4"
                                                                value={proj.description}
                                                                onChange={(e) => updateItem('projects', proj.id, 'description', e.target.value)}
                                                                className="w-full p-4 bg-gray-50 rounded-2xl outline-none font-medium resize-none leading-relaxed"
                                                                placeholder="What did you build?"
                                                            />
                                                            <button
                                                                onClick={() => handleAIImprove('projects', proj.id)}
                                                                className="absolute bottom-3 right-3 p-2 bg-white text-indigo-600 rounded-lg hover:shadow-md transition-all border border-gray-100"
                                                                title="AI Polish"
                                                            >
                                                                <Sparkles className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'education' && (
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center border-b pb-4">
                                            <h2 className="text-2xl font-black text-gray-900">Education</h2>
                                            <button
                                                onClick={() => addItem('education')}
                                                className="flex items-center gap-2 text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl font-bold text-xs hover:bg-indigo-100 transition-all border border-indigo-100"
                                            >
                                                <Plus className="w-4 h-4" />
                                                Add Education
                                            </button>
                                        </div>
                                        <div className="space-y-5">
                                            {resumeData.education.map((edu) => (
                                                <div key={edu.id} className="p-6 bg-white border-2 border-gray-100 rounded-[32px] space-y-4 relative group shadow-sm hover:border-indigo-100 transition-all">
                                                    <button
                                                        onClick={() => removeItem('education', edu.id)}
                                                        className="absolute top-6 right-6 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">School / University</label>
                                                        <input
                                                            value={edu.school}
                                                            onChange={(e) => updateItem('education', edu.id, 'school', e.target.value)}
                                                            className="w-full p-3 bg-gray-50 rounded-xl outline-none font-semibold focus:bg-gray-100 transition-all"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        <div className="space-y-1">
                                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Degree</label>
                                                            <input
                                                                value={edu.degree}
                                                                onChange={(e) => updateItem('education', edu.id, 'degree', e.target.value)}
                                                                className="w-full p-3 bg-gray-50 rounded-xl outline-none font-semibold focus:bg-gray-100 transition-all"
                                                            />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Year</label>
                                                            <input
                                                                value={edu.year}
                                                                onChange={(e) => updateItem('education', edu.id, 'year', e.target.value)}
                                                                className="w-full p-3 bg-gray-50 rounded-xl outline-none font-semibold focus:bg-gray-100 transition-all"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Grade (CGPA / Percentage)</label>
                                                        <input
                                                            value={edu.grade}
                                                            onChange={(e) => updateItem('education', edu.id, 'grade', e.target.value)}
                                                            placeholder="e.g. 9.0 CGPA or 85%"
                                                            className="w-full p-3 bg-gray-50 rounded-xl outline-none font-semibold focus:bg-gray-100 transition-all"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'skills' && (
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center border-b pb-4">
                                            <h2 className="text-2xl font-black text-gray-900">Skills</h2>
                                            <button
                                                onClick={() => addItem('skills')}
                                                className="flex items-center gap-2 text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl font-bold text-xs hover:bg-indigo-100 transition-all border border-indigo-100"
                                            >
                                                <Plus className="w-4 h-4" />
                                                Add Skill
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 gap-3">
                                            {resumeData.skills.map((skill, index) => (
                                                <div key={index} className="flex items-center gap-3 group">
                                                    <input
                                                        value={skill}
                                                        onChange={(e) => updateItem('skills', index, null, e.target.value)}
                                                        placeholder="e.g. JavaScript"
                                                        className="flex-1 p-4 bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl outline-none transition-all font-semibold"
                                                    />
                                                    <button
                                                        onClick={() => removeItem('skills', index)}
                                                        className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </main>

                    {/* Preview Area */}
                    <div className="flex-1 bg-slate-100 p-8 lg:p-12 overflow-auto print:overflow-visible flex justify-center items-start print:p-0 print:bg-white min-w-0 z-0">
                        <div
                            id="resume-content"
                            className="bg-white shadow-2xl min-h-[1122px] w-[794px] p-16 origin-top print:shadow-none print:m-0 transition-transform duration-300 ease-out mx-auto"
                            style={{
                                transform: `scale(${zoom})`,
                                // Offset the margin for the scaled element in the editor
                                marginBottom: `calc(${(zoom - 1) * 1122}px + 2rem)`,
                            }}
                        >
                            {/* Standard A4 is approx 794px wide at 96dpi */}
                            {/* Header */}
                            <div className="text-center mb-10">
                                <h1 className="text-4xl font-black text-gray-900 mb-4 uppercase tracking-tighter leading-none">{resumeData.personal.fullName || 'Full Name'}</h1>
                                <div className="flex justify-center flex-wrap gap-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                    <span>{resumeData.personal.email || 'email@example.com'}</span>
                                    {resumeData.personal.phone && (
                                        <>
                                            <span className="text-indigo-200">|</span>
                                            <span>{resumeData.personal.phone}</span>
                                        </>
                                    )}
                                    {resumeData.personal.location && (
                                        <>
                                            <span className="text-indigo-200">|</span>
                                            <span>{resumeData.personal.location}</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Summary */}
                            {resumeData.summary && (
                                <div className="mb-8">
                                    <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.25em] mb-3 border-b-2 border-indigo-50 pb-1.5 text-left">Professional Summary</h3>
                                    <p className="text-[13px] text-gray-700 leading-relaxed text-justify">{resumeData.summary}</p>
                                </div>
                            )}

                            {/* Experience */}
                            {resumeData.experience.some(e => e.company || e.role) && (
                                <div className="mb-8">
                                    <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.25em] mb-5 border-b-2 border-indigo-50 pb-1.5 text-left">Work Experience</h3>
                                    <div className="space-y-6 text-left">
                                        {resumeData.experience.map(exp => (
                                            <div key={exp.id}>
                                                <div className="flex justify-between items-baseline mb-0.5">
                                                    <h4 className="text-base font-black text-gray-900 uppercase tracking-tight">{exp.company || 'Company Name'}</h4>
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{exp.duration}</span>
                                                </div>
                                                <p className="text-[11px] font-bold text-indigo-500 uppercase tracking-widest mb-2">{exp.role || 'Job Title'}</p>
                                                <p className="text-[13px] text-gray-600 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Projects */}
                            {resumeData.projects.some(p => p.title) && (
                                <div className="mb-8">
                                    <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.25em] mb-5 border-b-2 border-indigo-50 pb-1.5 text-left">Key Projects</h3>
                                    <div className="space-y-6 text-left">
                                        {resumeData.projects.map(proj => (
                                            <div key={proj.id}>
                                                <div className="flex justify-between items-baseline mb-0.5">
                                                    <h4 className="text-base font-black text-gray-900 uppercase tracking-tight">{proj.title || 'Project Title'}</h4>
                                                    <span className="text-[10px] font-medium text-indigo-400 lowercase tracking-tight">{proj.link}</span>
                                                </div>
                                                <p className="text-[13px] text-gray-600 leading-relaxed whitespace-pre-wrap">{proj.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Education */}
                            {resumeData.education.some(e => e.school || e.degree) && (
                                <div className="mb-8">
                                    <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.25em] mb-5 border-b-2 border-indigo-50 pb-1.5 text-left">Education</h3>
                                    <div className="space-y-4 text-left">
                                        {resumeData.education.map(edu => (
                                            <div key={edu.id}>
                                                <div className="flex justify-between items-baseline mb-0.5">
                                                    <h4 className="font-black text-gray-900 uppercase tracking-tight">{edu.school || 'University Name'}</h4>
                                                    <div className="flex items-center gap-3">
                                                        {edu.grade && <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{edu.grade}</span>}
                                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{edu.year}</span>
                                                    </div>
                                                </div>
                                                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">{edu.degree || 'Degree'}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Skills */}
                            {resumeData.skills.some(s => s) && (
                                <div className="text-left">
                                    <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.25em] mb-5 border-b-2 border-indigo-50 pb-1.5 text-left">Technical Skills</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {resumeData.skills.filter(s => s).map((skill, i) => (
                                            <span key={i} className="bg-gray-50 border border-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Zoom Controls */}
                        <div className="fixed bottom-8 right-8 flex flex-col gap-2 no-print z-50">
                            <button
                                onClick={() => setZoom(z => Math.min(z + 0.1, 1.2))}
                                className="p-3 bg-white shadow-xl rounded-full border border-gray-100 hover:bg-gray-50 transition-all active:scale-95"
                            >
                                <Maximize2 className="w-5 h-5 text-gray-600" />
                            </button>
                            <button
                                onClick={() => setZoom(z => Math.max(z - 0.1, 0.4))}
                                className="p-3 bg-white shadow-xl rounded-full border border-gray-100 hover:bg-gray-50 transition-all active:scale-95"
                            >
                                <Minimize2 className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeBuilder;
