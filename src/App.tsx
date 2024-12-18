import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Contact from './components/Contact';

export default function App() {
  return (
    <div className="bg-white">
      <Hero />
      <Features />
      <HowItWorks />
      <Contact />
      
      <footer className="mt-32 bg-gray-900 sm:mt-56">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex flex-col items-center space-y-4 md:order-2 md:flex-row md:space-x-6 md:space-y-0">
            <a href="#" className="text-gray-400 hover:text-gray-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              Terms of Service
            </a>
            <a href="mailto:support@aireply.example.com" className="text-gray-400 hover:text-gray-300">
              Contact Support
            </a>
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-gray-400">
              &copy; {new Date().getFullYear()} AI Email Reply Generator. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}