import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Sparkles, Zap, Shield, Globe, Star, CheckCircle2, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div className="min-h-screen bg-white selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[120px] opacity-60 animate-pulse" />
          <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-purple-50 rounded-full blur-[120px] opacity-60" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100/50 text-indigo-600 text-sm font-bold mb-8 shadow-sm">
                <Star className="w-4 h-4 fill-indigo-600" />
                <span className="uppercase tracking-wider">Trusted by 10,000+ Professionals</span>
              </div>

              <h1 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tightest mb-8 leading-[1.1]">
                Land your dream job with{' '}
                <span className="relative">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                    ResumeAI
                  </span>
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-indigo-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 25 0, 50 5 T 100 5" stroke="currentColor" strokeWidth="8" fill="transparent" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-500 mb-12 leading-relaxed max-w-3xl mx-auto font-medium">
                Our AI-powered platform helps you build a professional, ATS-friendly resume in minutes. No design skills required.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20">
                <Link to="/dashboard" className="w-full sm:w-auto px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl hover:bg-indigo-700 transition-all hover:scale-105 shadow-2xl shadow-indigo-200 flex items-center justify-center gap-3 active:scale-95">
                  Create My Resume
                  <ArrowRight className="w-6 h-6" />
                </Link>
                <button className="w-full sm:w-auto px-10 py-5 bg-white text-gray-900 rounded-2xl font-black text-xl border-2 border-gray-100 hover:border-indigo-100 hover:bg-gray-50 transition-all flex items-center justify-center gap-3 active:scale-95">
                  View Templates
                </button>
              </div>
            </motion.div>

            {/* Interactive UI Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative mx-auto max-w-5xl"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 h-1/4 bottom-0 top-auto" />
              <div className="bg-gray-900 rounded-[32px] p-2 shadow-2xl overflow-hidden group">
                <div className="bg-white rounded-[26px] overflow-hidden border border-gray-100">
                  {/* Browser Bar */}
                  <div className="h-12 bg-gray-50 border-b border-gray-100 flex items-center px-6 justify-between">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="bg-gray-200/50 rounded-lg px-20 py-1.5 text-[10px] text-gray-400 font-bold tracking-widest uppercase">
                      app.resumeai.com
                    </div>
                    <div className="w-10" />
                  </div>
                  {/* Browser Content */}
                  <div className="aspect-[16/10] bg-white p-8 md:p-12 overflow-hidden">
                    <div className="flex flex-col md:flex-row gap-8 h-full text-left">
                      {/* Sidebar Mock */}
                      <div className="w-full md:w-1/3 space-y-6">
                        <div className="relative group/photo">
                          <div className="h-48 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-[32px] border-2 border-dashed border-indigo-100 flex items-center justify-center overflow-hidden">
                            <User className="w-16 h-16 text-indigo-200" />
                          </div>
                          <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-lg border border-indigo-50">
                            <Sparkles className="w-5 h-5 text-indigo-600 animate-pulse" />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="h-4 bg-gray-100/80 rounded-full w-full" />
                          <div className="flex gap-2">
                            <div className="h-3 bg-indigo-50 rounded-full w-12" />
                            <div className="h-3 bg-purple-50 rounded-full w-16" />
                          </div>
                          <div className="h-4 bg-gray-50 rounded-full w-2/3" />
                        </div>
                      </div>

                      {/* Content Mock */}
                      <div className="flex-1 space-y-8">
                        <div className="space-y-4">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-wider">
                            <Sparkles className="w-3 h-3" />
                            AI-Optimized Content
                          </div>
                          <h3 className="text-2xl font-black text-gray-900 leading-tight">Senior Software Engineer</h3>
                          <div className="space-y-3 pt-2">
                            <div className="flex items-start gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 flex-shrink-0" />
                              <p className="text-sm font-medium text-gray-600 leading-relaxed">
                                Spearheaded the development of a cloud-native platform scaling to 1M+ users...
                              </p>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 flex-shrink-0" />
                              <p className="text-sm font-medium text-gray-600 leading-relaxed">
                                Optimized database performance reducing latency by 45% using AI indexing...
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 pt-4">
                          <div className="p-5 bg-gray-50/50 rounded-3xl border border-gray-100">
                            <div className="h-3 bg-gray-200/50 rounded-full w-1/3 mb-4" />
                            <div className="space-y-2">
                              <div className="h-2.5 bg-gray-100 rounded-full w-full" />
                              <div className="h-2.5 bg-gray-100 rounded-full w-3/4" />
                            </div>
                          </div>
                          <div className="p-5 bg-gray-50/50 rounded-3xl border border-gray-100">
                            <div className="h-3 bg-gray-200/50 rounded-full w-1/4 mb-4" />
                            <div className="space-y-2">
                              <div className="h-2.5 bg-gray-100 rounded-full w-full" />
                              <div className="h-2.5 bg-gray-100 rounded-full w-5/6" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Everything you need to succeed</h2>
            <p className="text-lg text-gray-500 font-medium leading-relaxed">
              We've combined powerful AI with professional design to give you a massive edge in the job market.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-10 h-10 text-yellow-500" />,
                title: "AI Generation",
                desc: "Instantly generate professional summaries and work experience descriptions that get noticed.",
                color: "bg-yellow-50"
              },
              {
                icon: <Shield className="w-10 h-10 text-green-500" />,
                title: "ATS Check",
                desc: "Our templates are battle-tested against all major Applicant Tracking Systems to ensure you pass.",
                color: "bg-green-50"
              },
              {
                icon: <Globe className="w-10 h-10 text-blue-500" />,
                title: "One-Click Export",
                desc: "Export your resume to PDF, Word, or share a premium live link with recruiters in seconds.",
                color: "bg-blue-50"
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="p-10 rounded-[32px] bg-white border border-gray-100 hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 group"
              >
                <div className={`mb-8 p-4 rounded-2xl w-fit ${feature.color} group-hover:scale-110 transition-transform duration-500`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-indigo-600 rounded-[48px] p-12 md:p-20 relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-[40%] h-full bg-white/10 -skew-x-12 translate-x-1/2 pointer-events-none" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">Ready to double your interview calls?</h2>
              <p className="text-xl text-indigo-100 mb-12 font-medium">Join thousands of professionals already using ResumeAI to land their next big role.</p>
              <Link to="/dashboard" className="inline-flex items-center gap-3 px-12 py-6 bg-white text-indigo-600 rounded-2xl font-black text-2xl hover:bg-gray-50 transition-all hover:scale-105 shadow-2xl active:scale-95">
                Start Building for Free
                <ArrowRight className="w-7 h-7" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 font-bold text-sm tracking-widest uppercase mb-4 tracking-tight">© 2024 ResumeAI. All rights reserved.</p>
          <div className="flex justify-center gap-8 text-sm font-bold text-gray-500">
            <a href="#" className="hover:text-indigo-600">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600">Terms of Service</a>
            <a href="#" className="hover:text-indigo-600">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;