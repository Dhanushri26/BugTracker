import React from 'react';
import { Bug, Users, Zap, Shield } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-info-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-primary-600 p-2 rounded-lg shadow-sm">
                <Bug className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-neutral-900">BugTracker Pro</h1>
            </div>
            <button
              onClick={onGetStarted}
              className="btn-primary px-6"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-6 tracking-tight">
            Track Bugs with
            <span className="text-primary-600 block">Precision & Ease</span>
          </h2>
          <p className="text-xl text-neutral-600 mb-10 max-w-3xl mx-auto">
            Streamline your development workflow with our comprehensive bug tracking system. 
            Organize, prioritize, and resolve issues efficiently with our intuitive interface.
          </p>
          <button
            onClick={onGetStarted}
            className="btn-primary px-8 py-3 text-lg font-semibold shadow-elevated hover:scale-[1.02] active:scale-[0.99] transition-transform"
          >
            Start Tracking Bugs
          </button>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 card">
            <div className="bg-info-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-info-600" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">Lightning Fast</h3>
            <p className="text-neutral-600">
              Report and track bugs instantly with our streamlined interface designed for speed and efficiency.
            </p>
          </div>
          {/* Login part */}
          

          <div className="text-center p-8 card">
            <div className="bg-success-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-success-600" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">Team Collaboration</h3>
            <p className="text-neutral-600">
              Work together seamlessly with shared bug reports, comments, and real-time status updates.
            </p>
          </div>

          <div className="text-center p-8 card">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">Secure & Reliable</h3>
            <p className="text-neutral-600">
              Your data is protected with enterprise-grade security and backed up with reliable infrastructure.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-t border-neutral-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-neutral-600">
            <p>&copy; 2025 BugTracker Pro. Built for developers, by developers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}