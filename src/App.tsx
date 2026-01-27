import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

function App() {
  const [currentImage, setCurrentImage] = useState(0);

  const carouselImages = [
    'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/8294554/pexels-photo-8294554.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/2085831/pexels-photo-2085831.jpeg?auto=compress&cs=tinysrgb&w=1920'
  ];

  const assignments = [
    {
      id: 1,
      title: 'Assignment 1',
      description: 'Content coming soon...',
      section: 'Section 1'
    },
    {
      id: 2,
      title: 'Assignment 2',
      description: 'Content coming soon...',
      section: 'Section 2'
    }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
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

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">Assignments</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {assignments.map((assignment) => (
            <div
              key={assignment.id}
              className="group relative bg-gradient-to-br from-slate-900/90 to-blue-900/30 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20 hover:border-blue-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/5 rounded-2xl transition-all duration-300" />

              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-xl">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-blue-400 text-sm font-medium tracking-wider uppercase">
                      {assignment.section}
                    </p>
                    <h3 className="text-2xl font-bold text-white">
                      {assignment.title}
                    </h3>
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50">
                  <p className="text-gray-400 text-center italic">
                    {assignment.description}
                  </p>
                </div>
              </div>
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

export default App;
