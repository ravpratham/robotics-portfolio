import React from 'react';
import HeroSection from '../components/HeroSection';
import AssignmentsSection from '../components/AssignmentsSection';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">
      <HeroSection />
      <AssignmentsSection />
      <Footer />
    </div>
  );
};

export default Home;