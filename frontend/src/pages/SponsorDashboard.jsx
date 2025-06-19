import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Heart, FileText, Download, User, Sparkles, BookOpen, Star, Users, Gift } from 'lucide-react';

const SponsorDashboard = () => {
  const { id } = useParams();
  const [sponsor, setSponsor] = useState({});
  const [totalDonated, setTotalDonated] = useState(0);
  const [studentsImpacted, setStudentsImpacted] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [animatedTotal, setAnimatedTotal] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/sponsors/${id}/donations`)
      .then((res) => {
        setSponsor(res.data.sponsor);
        const total = res.data.donations.reduce(
          (sum, d) => sum + parseFloat(d.amount),
          0
        );
        setTotalDonated(total);
        
        // Calculate unique students impacted
        const uniqueStudents = new Set(res.data.donations.map(d => d.child_name)).size;
        setStudentsImpacted(uniqueStudents);
        
        setIsLoading(false);
        
        // Animate the total amount
        animateCounter(total);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [id]);

  const animateCounter = (target) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setAnimatedTotal(target);
        clearInterval(timer);
      } else {
        setAnimatedTotal(Math.floor(current));
      }
    }, 30);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-sky-50 to-emerald-50 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 border-4 border-amber-300 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-xl font-medium text-gray-700">Loading your impact...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-sky-50 to-emerald-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-amber-400 rounded-full"></div>
        <div className="absolute top-32 right-16 w-24 h-24 bg-sky-400 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-28 h-28 bg-emerald-400 rounded-full"></div>
        <div className="absolute bottom-32 right-8 w-20 h-20 bg-amber-400 rounded-full"></div>
        
        {/* Education Icons Background */}
        <BookOpen className="absolute top-1/4 left-1/4 w-16 h-16 text-amber-200 opacity-30" />
        <Star className="absolute top-1/3 right-1/3 w-12 h-12 text-sky-200 opacity-30" />
        <Users className="absolute bottom-1/3 left-1/5 w-14 h-14 text-emerald-200 opacity-30" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header with Animation */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full mb-6 shadow-lg">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-600 via-sky-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Your Impact Dashboard
          </h1>
          <p className="text-xl text-gray-600 font-serif italic max-w-2xl mx-auto leading-relaxed">
            "One child's future is brighter because of you."
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Sponsor Card */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 transform hover:scale-105 transition-all duration-300 animate-slide-up">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              {/* Profile Section */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-gradient-to-br from-amber-400 via-sky-400 to-emerald-400 rounded-full flex items-center justify-center shadow-lg">
                  <User className="w-16 h-16 text-white" />
                </div>
              </div>

              {/* Info Section */}
              <div className="flex-grow text-center md:text-left">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{sponsor.name || 'Dear Sponsor'}</h2>
                <p className="text-lg text-gray-600 mb-6">{sponsor.email}</p>
                
                {/* Impact Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-emerald-100 to-emerald-200 rounded-2xl p-6 text-center">
                    <div className="text-4xl font-bold text-emerald-700 mb-2">
                      ₹{animatedTotal.toLocaleString()}
                    </div>
                    <p className="text-emerald-600 font-medium">Total Donated</p>
                    <div className="mt-2 flex justify-center">
                      <Gift className="w-5 h-5 text-emerald-500" />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-sky-100 to-sky-200 rounded-2xl p-6 text-center">
                    <div className="text-4xl font-bold text-sky-700 mb-2">
                      {studentsImpacted}
                    </div>
                    <p className="text-sky-600 font-medium">Students Impacted</p>
                    <div className="mt-2 flex justify-center">
                      <Users className="w-5 h-5 text-sky-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Thank You Message */}
          <div className="bg-gradient-to-r from-amber-100 via-sky-100 to-emerald-100 rounded-3xl p-8 text-center shadow-xl animate-slide-up-delay">
            <Heart className="w-12 h-12 text-red-500 mx-auto mb-4 animate-pulse" />
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Thank You for Your Kindness!</h3>
            <p className="text-lg text-gray-700 font-serif italic leading-relaxed max-w-2xl mx-auto">
              Your generosity has created ripples of hope and opportunity. Every rupee you've contributed has helped build dreams and transform lives through education.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-3 gap-6 animate-slide-up-delay-2">
            {/* Donate Again Button */}
            <Link
              to={`/donate?sponsor_id=${id}`}
              className="group bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:from-emerald-600 hover:to-teal-600"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-2">Donate Again</h4>
              <p className="text-emerald-100 text-sm">Continue your impact journey</p>
            </Link>

            {/* View Donations Button */}
            <Link
              to={`/sponsor/${id}/donations`}
              className="group bg-white border-2 border-sky-200 text-sky-700 rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:bg-sky-50 hover:border-sky-300"
            >
              <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-sky-200 transition-colors">
                <FileText className="w-8 h-8 text-sky-600" />
              </div>
              <h4 className="text-xl font-bold mb-2">View Donations</h4>
              <p className="text-sky-600 text-sm">See your donation history</p>
            </Link>

            {/* Download CSV Button */}
            <a
              href={`http://localhost:5000/api/sponsors/${id}/donations/export`}
              download
              className="group bg-white border-2 border-amber-200 text-amber-700 rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:bg-amber-50 hover:border-amber-300"
            >
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
                <Download className="w-8 h-8 text-amber-600" />
              </div>
              <h4 className="text-xl font-bold mb-2">Download Report</h4>
              <p className="text-amber-600 text-sm">Get your donation CSV</p>
            </a>
          </div>

          {/* Educational Quote */}
          <div className="text-center py-8 animate-fade-in-delay">
            <blockquote className="text-2xl font-serif italic text-gray-600 max-w-3xl mx-auto leading-relaxed">
              "Education is the most powerful weapon which you can use to change the world."
            </blockquote>
            <cite className="text-gray-500 mt-3 block">— Nelson Mandela</cite>
          </div>
        </div>
      </div>

      {/* Custom Styles for Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.6s both;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }
        
        .animate-slide-up-delay {
          animation: slide-up 0.6s ease-out 0.2s both;
        }
        
        .animate-slide-up-delay-2 {
          animation: slide-up 0.6s ease-out 0.4s both;
        }
      `}</style>
    </div>
  );
};

export default SponsorDashboard;