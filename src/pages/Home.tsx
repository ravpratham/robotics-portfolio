import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, BookOpen, Plus, Trash2 } from 'lucide-react';
import { useAssignments } from '../hooks/useAssignments';

function Home() {
  const navigate = useNavigate();
  const { assignments, deleteAssignment, addAssignment } = useAssignments();
  const [currentImage, setCurrentImage] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);
  const assignmentsRef = useRef<HTMLDivElement | null>(null);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    section: '',
    description: '',
    youtubeUrl: ''
  });

  const carouselImages = [
    'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/8294554/pexels-photo-8294554.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/2085831/pexels-photo-2085831.jpeg?auto=compress&cs=tinysrgb&w=1920'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const handleAddAssignment = () => {
    if (newAssignment.title && newAssignment.section) {
      addAssignment({
        title: newAssignment.title,
        section: newAssignment.section,
        description: newAssignment.description || 'Content coming soon...',
        content: '',
        youtubeUrl: newAssignment.youtubeUrl || ''
      });
      setNewAssignment({ title: '', section: '', description: '', youtubeUrl: '' });
      setShowAddForm(false);
    }
  };

  const handleDeleteAssignment = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this assignment?')) {
      deleteAssignment(id);
    }
  };

  const scrollToAssignments = () => {
    assignmentsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about-section');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Navbar */}
      <nav className="bg-slate-950/80 backdrop-blur-md border-b border-blue-500/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-start">
            {/* Left side - Name and Registration Number */}
            <div>
              <h1 className="text-2xl font-bold text-white">PRATHAM RAV</h1>
              <p className="text-blue-400 text-sm font-medium">RA2311003011323</p>
            </div>

            {/* Right side - About Me and Assignments Link */}
            <div className="flex flex-col items-end gap-4 max-w-md">
              
              <div className="flex gap-3">
                <button
                  onClick={scrollToHome}
                  className="px-4 py-2 text-white text-sm font-semibold rounded-lg border border-blue-400/50 hover:bg-blue-500/10 transition-all"
                >
                  Home
                </button>
                <button
                  onClick={scrollToAbout}
                  className="px-4 py-2 text-white text-sm font-semibold rounded-lg border border-blue-400/50 hover:bg-blue-500/10 transition-all"
                >
                  About Me
                </button>
                <button
                  onClick={scrollToAssignments}
                  className="px-4 py-2 text-white text-sm font-semibold rounded-lg border border-blue-400/50 hover:bg-blue-500/10 transition-all"
                >
                  Assignments
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative">
        <div className="absolute inset-0 bg-black/40 z-10" />

        <div className="relative h-screen overflow-hidden">
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImage ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Robotics ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="text-center px-4">
              <h1 className="text-7xl md:text-9xl font-bold text-white mb-6 tracking-tight">
                Introduction to
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Robotics
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 font-light">
                Portfolio of Learning & Innovation
              </p>
            </div>
          </div>

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full transition-all"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full transition-all"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImage
                    ? 'bg-white w-8'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about-section" className="bg-slate-900/50 backdrop-blur-sm border-y border-blue-500/20 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image - Replaced with Stylish Text */}
            <div className="relative flex items-center justify-center min-h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl blur-3xl" />
              <div className="relative">
                <h3 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 text-center leading-tight">
                  ACADEMIC<br />PORTFOLIO<br />ASSIGNMENTS
                </h3>
              </div>
            </div>

            {/* About Text */}
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">About Me</h2>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mb-8" />
              </div>
              
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  I am a Computer Science and Engineering student with a strong interest in artificial intelligence, machine learning, and intelligent systems that solve real-world problems. I enjoy building practical, end-to-end applications that combine software development with data-driven and AI-based decision-making.
                </p>
                
                <p>
                  My academic and project experience spans areas such as AI-powered applications, data analysis, and web-based systems. I have worked on projects involving machine learning models, database-driven applications, and interactive web interfaces, with a focus on clarity, usability, and real-world relevance rather than purely theoretical solutions.
                </p>
                
                <p>
                  I am particularly interested in how AI and automation can improve efficiency in domains like education, agriculture, and sustainability. Through my projects, I aim to design systems that are reliable, scalable, and easy for users to interact with, while maintaining a strong technical foundation.
                </p>
                
                <p>
                  I am continuously learning new technologies and improving my problem-solving skills, with the goal of contributing to impactful software and AI-driven products in the future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20" ref={assignmentsRef}>
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">Assignments</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto mb-6" />
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/50"
          >
            <Plus className="w-5 h-5" />
            Add Assignment
          </button>
        </div>

        {showAddForm && (
          <div className="mb-8 bg-gradient-to-br from-slate-900/90 to-blue-900/30 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">New Assignment</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  value={newAssignment.title}
                  onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="Assignment Title"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Section</label>
                <input
                  type="text"
                  value={newAssignment.section}
                  onChange={(e) => setNewAssignment({ ...newAssignment, section: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="Section Name"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Description</label>
                <textarea
                  value={newAssignment.description}
                  onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="Brief description"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">YouTube Video URL (Optional)</label>
                <input
                  type="url"
                  value={newAssignment.youtubeUrl}
                  onChange={(e) => setNewAssignment({ ...newAssignment, youtubeUrl: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/... or https://youtube.com/shorts/..."
                />
                <p className="text-gray-500 text-sm mt-1">
                  Optional: Add a YouTube video URL or Shorts URL. You can also add it later in the assignment detail page.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleAddAssignment}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all"
                >
                  Add Assignment
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setNewAssignment({ title: '', section: '', description: '', youtubeUrl: '' });
                  }}
                  className="px-6 py-2 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {assignments.map((assignment) => (
            <div
              key={assignment.id}
              onClick={() => navigate(`/assignment/${assignment.id}`)}
              className="group relative bg-gradient-to-br from-slate-900/90 to-blue-900/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-blue-500/20 hover:border-blue-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer h-80"
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/5 transition-all duration-300" />

              {/* Card Header with Title and Delete Button */}
              <div className="relative h-48 bg-gradient-to-br from-blue-600/40 to-cyan-600/20 p-6 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-blue-300 text-xs font-medium tracking-widest uppercase mb-2">
                      {assignment.section}
                    </p>
                    <h3 className="text-3xl font-bold text-white leading-tight line-clamp-2">
                      {assignment.title}
                    </h3>
                  </div>
                  <button
                    onClick={(e) => handleDeleteAssignment(assignment.id, e)}
                    className="ml-3 p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all flex-shrink-0"
                    aria-label="Delete assignment"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Card Content and Read More */}
              <div className="relative px-6 py-4 bg-slate-900/50 h-32 flex flex-col justify-between">
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                  {assignment.description}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/assignment/${assignment.id}`);
                  }}
                  className="self-start text-blue-400 text-xs font-semibold uppercase tracking-wide hover:text-cyan-400 transition-colors mt-2"
                >
                  Read More →
                </button>
              </div>

              {/* View Details hint */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </div>
          ))}
        </div>
      </div>

      <footer className="border-t border-blue-500/20 bg-slate-950/50 backdrop-blur-sm py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            Introduction to Robotics Portfolio
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
