import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Heart, DollarSign, User, Users, ArrowRight, Sparkles, BookOpen, GraduationCap, Star, MapPin, Target } from 'lucide-react';

const Donate = () => {
  const [searchParams] = useSearchParams();
  const initialChildId = searchParams.get('child_id') || '';
  const initialSponsorId = searchParams.get('sponsor_id') || '';

  const [sponsorId, setSponsorId] = useState(initialSponsorId);
  const [childId, setChildId] = useState(initialChildId);
  const [childInfo, setChildInfo] = useState(null);
  const [sponsorInfo, setSponsorInfo] = useState(null);
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredAmount, setHoveredAmount] = useState(null);
  const [loadingSponsors, setLoadingSponsors] = useState(false);
  const [sponsorError, setSponsorError] = useState('');
  const navigate = useNavigate();

  // Updated fetchChildInfo to use your backend endpoint
  const fetchChildInfo = async (id) => {
    if (id) {
      try {
        // Make API call to your children route
        const response = await axios.get(`http://localhost:5000/api/children/${id}`);
        setChildInfo({
          id: id,
          verified: true,
          ...response.data
        });
      } catch (error) {
        console.error('Error fetching child info:', error);
        setChildInfo({
          id: id,
          verified: false,
          error: 'Student not found or verification failed'
        });
      }
    } else {
      setChildInfo(null);
    }
  };

  // Updated fetchSponsorInfo to use your backend endpoint
  const fetchSponsorInfo = async (id) => {
    if (id) {
      setLoadingSponsors(true);
      setSponsorError('');
      
      try {
        // Make API call to your sponsor route
        const response = await axios.get(`http://localhost:5000/api/sponsors/${id}`);
        
        // Get sponsor donations to calculate total donated and students supported
        const donationsResponse = await axios.get(`http://localhost:5000/api/sponsors/${id}/donations`);
        
        // Fix: Ensure amounts are properly converted to numbers before summing
        const totalDonated = donationsResponse.data.donations.reduce((sum, donation) => {
          return sum + parseFloat(donation.amount || 0);
        }, 0);
        
        const studentsSupported = new Set(donationsResponse.data.donations.map(d => d.child_name)).size;
        
        setSponsorInfo({
          ...response.data,
          totalDonated: totalDonated.toFixed(2), // Format to 2 decimal places
          studentsSupported
        });
      } catch (error) {
        console.error('Error fetching sponsor info:', error);
        setSponsorError('Sponsor not found or unable to fetch details');
        setSponsorInfo(null);
      } finally {
        setLoadingSponsors(false);
      }
    } else {
      setSponsorInfo(null);
      setSponsorError('');
    }
  };

  useEffect(() => {
    fetchChildInfo(childId);
  }, [childId]);

  useEffect(() => {
    fetchSponsorInfo(sponsorId);
  }, [sponsorId]);

  const handleDonate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/donate', {
        sponsor_id: sponsorId,
        child_id: childId,
        amount: parseFloat(amount) // Ensure amount is sent as number
      });

      setMessage(res.data.message);
      setShowSuccess(true);

    } catch (err) {
      setMessage(err.response?.data?.error || 'Donation failed');
      setShowSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const donationImpacts = {
    25: { books: 2, meals: 5, supplies: "1 month" },
    50: { books: 5, meals: 12, supplies: "2 months" },
    100: { books: 10, meals: 25, supplies: "3 months" },
    250: { books: 25, meals: 60, supplies: "6 months" }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-sky-50 to-emerald-50 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-gradient-to-r from-amber-200/20 to-emerald-200/20"></div>
        </div>
        
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center max-w-lg w-full transform animate-pulse border border-amber-200/30">
          <div className="w-24 h-24 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6">
            You're Amazing!
          </h2>
          <p className="text-gray-700 text-xl mb-8 leading-relaxed">{message}</p>
          <div className="space-y-4">
            <button 
              onClick={() => {
                setShowSuccess(false);
                setSponsorId('');
                setChildId('');
                setAmount('');
                setChildInfo(null);
                setSponsorInfo(null);
                setMessage('');
                setSponsorError('');
              }}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 px-8 rounded-full font-semibold text-lg hover:scale-105 transition-transform shadow-lg"
            >
              Make Another Donation
            </button>
            <button
              className="w-full text-emerald-600 py-4 px-8 font-semibold hover:bg-emerald-50 rounded-full transition-all border border-emerald-200"
              onClick={() => {
                if (sponsorId) {
                  navigate(`/sponsor/${sponsorId}/dashboard`);
                }
              }}
            >
              View Impact Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-sky-50 to-emerald-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-sky-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-amber-600 via-sky-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Transform Lives Through Education
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Every contribution creates ripples of change in a student's educational journey
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 items-start">
          {/* Mission & Impact Side */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-amber-200/30 shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-amber-800 mb-2">Our Mission</h3>
                <p className="text-amber-600">Empowering students through education</p>
              </div>
              <div className="space-y-4">
                <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
                  <h4 className="font-semibold text-amber-700 mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Educational Support
                  </h4>
                  <p className="text-amber-600 text-sm leading-relaxed">
                    Providing essential learning materials, books, and supplies to students in need
                  </p>
                </div>
                
                <div className="bg-sky-50 rounded-2xl p-4 border border-sky-100">
                  <h4 className="font-semibold text-sky-700 mb-2 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Academic Excellence
                  </h4>
                  <p className="text-sky-600 text-sm">
                    Supporting students to achieve their full academic potential
                  </p>
                </div>

                <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                  <h4 className="font-semibold text-emerald-700 mb-3 flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Global Impact
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-emerald-800">10,000+</p>
                      <p className="text-emerald-600 text-xs">Students Helped</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-emerald-800">500+</p>
                      <p className="text-emerald-600 text-xs">Schools Reached</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Student Verification */}
            {childInfo && (
              <div className={`backdrop-blur-xl rounded-3xl p-6 border ${
                childInfo.verified 
                  ? 'bg-emerald-50/70 border-emerald-200/50'
                  : 'bg-red-50/70 border-red-200/50'
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    childInfo.verified ? 'bg-emerald-500' : 'bg-red-500'
                  }`}>
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${
                      childInfo.verified ? 'text-emerald-700' : 'text-red-700'
                    }`}>
                      {childInfo.verified ? 'Student Verified' : 'Student Not Found'}
                    </h4>
                    <p className={`text-sm ${
                      childInfo.verified ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      ID: {childInfo.id}
                    </p>
                  </div>
                </div>
                {childInfo.verified && (
                  <div className="space-y-2">
                    <p className="text-emerald-800 font-medium">
                      <span className="text-emerald-600">Name:</span> {childInfo.name}
                    </p>
                    <p className="text-emerald-800">
                      <span className="text-emerald-600">Age:</span> {childInfo.age}
                    </p>
                    <p className="text-emerald-800">
                      <span className="text-emerald-600">School:</span> {childInfo.school}
                    </p>
                    <p className="text-emerald-700 text-sm">
                      This student has been verified and is part of our educational support program.
                    </p>
                  </div>
                )}
                {!childInfo.verified && (
                  <p className="text-red-700 text-sm">
                    {childInfo.error || 'Unable to verify this student ID.'}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Donation Interface */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-amber-200/30 shadow-2xl">
              {/* Sponsor Info Display */}
              {loadingSponsors && (
                <div className="mb-8 p-6 bg-sky-50/70 rounded-2xl border border-sky-200/50">
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-sky-400 border-t-transparent rounded-full animate-spin mr-3"></div>
                    <span className="text-sky-700">Loading sponsor information...</span>
                  </div>
                </div>
              )}

              {sponsorError && (
                <div className="mb-8 p-6 bg-red-50/70 rounded-2xl border border-red-200/50">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">!</span>
                    </div>
                    <span className="text-red-700">{sponsorError}</span>
                  </div>
                </div>
              )}

              {sponsorInfo && !loadingSponsors && (
                <div className="mb-8 p-6 bg-gradient-to-r from-amber-50/70 to-sky-50/70 rounded-2xl border border-amber-200/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Users className="w-6 h-6 text-amber-600" />
                        <span className="font-semibold text-amber-700 text-lg">Welcome back!</span>
                      </div>
                      <p className="text-amber-800 font-bold text-xl">{sponsorInfo.name}</p>
                      <p className="text-amber-600 text-sm">{sponsorInfo.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-amber-600 text-sm">Total Impact</p>
                      <p className="text-amber-800 font-bold text-2xl">₹{parseFloat(sponsorInfo.totalDonated || 0).toFixed(2)}</p>
                      <p className="text-amber-600 text-xs">{sponsorInfo.studentsSupported || 0} students supported</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-amber-800 mb-2">Make Your Impact</h2>
                <p className="text-gray-600">Choose your contribution level</p>
              </div>

              <form onSubmit={handleDonate} className="space-y-6">
                {/* ID Inputs */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-amber-700 font-medium mb-3">Sponsor ID</label>
                    <input
                      type="text"
                      placeholder="Enter your sponsor ID"
                      value={sponsorId}
                      onChange={(e) => setSponsorId(e.target.value)}
                      className="w-full px-6 py-4 bg-white/80 border border-amber-200 rounded-2xl focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all placeholder-gray-400 text-gray-700 backdrop-blur-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-amber-700 font-medium mb-3">Student ID (Optional)</label>
                    <input
                      type="text"
                      placeholder="Enter student ID to support"
                      value={childId}
                      onChange={(e) => setChildId(e.target.value)}
                      className="w-full px-6 py-4 bg-white/80 border border-amber-200 rounded-2xl focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all placeholder-gray-400 text-gray-700 backdrop-blur-sm"
                    />
                  </div>
                </div>

                {/* Amount Selection Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {Object.entries(donationImpacts).map(([amt, impact]) => (
                    <div
                      key={amt}
                      className={`relative cursor-pointer transition-all duration-300 ${
                        amount === amt || hoveredAmount === amt
                          ? 'transform scale-105'
                          : 'hover:scale-102'
                      }`}
                      onClick={() => setAmount(amt)}
                      onMouseEnter={() => setHoveredAmount(amt)}
                      onMouseLeave={() => setHoveredAmount(null)}
                    >
                      <div className={`p-6 rounded-2xl border-2 transition-all ${
                        amount === amt
                          ? 'bg-gradient-to-br from-amber-100 to-emerald-100 border-amber-400 shadow-lg'
                          : 'bg-white/60 border-amber-200 hover:border-amber-400'
                      }`}>
                        <div className="text-center">
                          <p className="text-3xl font-bold text-amber-800 mb-2">₹{amt}</p>
                          <div className="space-y-1 text-xs text-gray-600">
                            <p>{impact.books} books</p>
                            <p>{impact.meals} meals</p>
                            <p>{impact.supplies} supplies</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Custom Amount */}
                <div>
                  <label className="block text-amber-700 font-medium mb-3">Custom Amount</label>
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 transform -translate-y-1/2 text-amber-600 text-xl font-bold">₹</span>
                    <input
                      type="number"
                      placeholder="Enter custom amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full pl-16 pr-6 py-4 bg-white/80 border border-amber-200 rounded-2xl focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all placeholder-gray-400 text-gray-700 backdrop-blur-sm text-lg"
                      min="1"
                      step="0.01"
                      required
                    />
                  </div>
                </div>

                {/* Donation Button */}
                <button
                  type="submit"
                  disabled={isLoading || !sponsorId || !amount}
                  className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500 text-white py-6 px-8 rounded-2xl font-bold text-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 relative overflow-hidden"
                >
                  {isLoading ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing Your Kindness...
                    </>
                  ) : (
                    <>
                      Create Impact Now
                      <ArrowRight className="w-6 h-6" />
                    </>
                  )}
                </button>

                {/* Impact Preview */}
                {amount && donationImpacts[amount] && (
                  <div className="mt-6 p-6 bg-gradient-to-r from-emerald-50/70 to-teal-50/70 rounded-2xl border border-emerald-200/50">
                    <h4 className="font-semibold text-emerald-700 mb-3 text-center">Your ₹{amount} Impact:</h4>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-emerald-800">{donationImpacts[amount].books}</p>
                        <p className="text-emerald-600 text-sm">Books</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-emerald-800">{donationImpacts[amount].meals}</p>
                        <p className="text-emerald-600 text-sm">Meals</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-emerald-800">{donationImpacts[amount].supplies}</p>
                        <p className="text-emerald-600 text-sm">Supplies</p>
                      </div>
                    </div>
                  </div>
                )}
              </form>

              {message && !showSuccess && (
                <div className="mt-6 p-4 bg-red-50/70 border border-red-200/50 rounded-2xl backdrop-blur-sm">
                  <p className="text-red-700 text-center font-medium">{message}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;