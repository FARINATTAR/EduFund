import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User, Mail, ArrowRight } from 'lucide-react';

const SponsorLogin = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/sponsors/login', { email });
      const sponsorId = res.data.sponsor.sponsor_id;
      navigate(`/sponsor/${sponsorId}/dashboard`);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-sky-50 to-emerald-50 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5 z-0">
        <div className="absolute top-16 left-16 w-24 h-24 bg-amber-300 rounded-full" />
        <div className="absolute bottom-20 right-12 w-28 h-28 bg-sky-300 rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-emerald-300 rounded-full" />
      </div>

      <div className="relative z-10 max-w-md mx-auto px-6 py-10 min-h-screen flex flex-col justify-center">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full mb-6 shadow-lg">
            <User className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Sponsor Login</h2>
          <p className="text-gray-600 font-serif italic">
            "Welcome back, thank you for your continued support."
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 animate-slide-up">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-transparent transition bg-white text-gray-900 placeholder-gray-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-sky-500 to-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg hover:from-sky-600 hover:to-emerald-600 transition duration-300 flex items-center justify-center font-semibold"
            >
              Login
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </form>

          {/* Error Message */}
          {message && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl animate-slide-up-delay">
              <p className="text-red-600 text-sm text-center">{message}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 animate-slide-up-delay-2">
          <p className="text-gray-600 text-sm">
            Making a difference, one donation at a time
          </p>
        </div>
      </div>

      {/* Animations */}
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

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }

        .animate-slide-up-delay {
          animation: slide-up 0.6s ease-out 0.3s both;
        }

        .animate-slide-up-delay-2 {
          animation: slide-up 0.6s ease-out 0.5s both;
        }
      `}</style>
    </div>
  );
};

export default SponsorLogin;