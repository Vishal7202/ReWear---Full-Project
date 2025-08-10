// src/pages/LandingPage.jsx
import React from 'react';
import Home from './Home';
import HowItWorks from './HowItWorks';
import Community from './Community';
import Contact from './Contact';

const LandingPage = () => {
  return (
    <main className="pt-20 max-w-4xl mx-auto px-4 space-y-32">
      <section id="home"><Home /></section>
      <section id="how-it-works"><HowItWorks /></section>
      <section id="community"><Community /></section>
      <section id="contact"><Contact /></section>
    </main>
  );
};

export default LandingPage;
