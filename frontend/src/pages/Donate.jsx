// import React, { useState, useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import axios from 'axios';

// const Donate = () => {
//   const [searchParams] = useSearchParams();
//   const initialChildId = searchParams.get('child_id') || '';
//   const initialSponsorId = searchParams.get('sponsor_id') || '';

//   const [sponsorId, setSponsorId] = useState(initialSponsorId);
//   const [childId, setChildId] = useState(initialChildId);
//   const [amount, setAmount] = useState('');
//   const [message, setMessage] = useState('');

//   const handleDonate = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post('http://localhost:5000/api/donate', {
//         sponsor_id: sponsorId,
//         child_id: childId,
//         amount: amount
//       });

//       setMessage(res.data.message);
//       setSponsorId('');
//       setChildId('');
//       setAmount('');
//     } catch (err) {
//       setMessage(err.response?.data?.error || 'Donation failed');
//     }
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
//       <h2 className="text-xl font-bold mb-4">Make a Donation</h2>
//       <form onSubmit={handleDonate} className="space-y-4">
//         <input
//           type="number"
//           placeholder="Sponsor ID"
//           value={sponsorId}
//           onChange={(e) => setSponsorId(e.target.value)}
//           className="border p-2 w-full"
//         />
//         <input
//           type="number"
//           placeholder="Child ID"
//           value={childId}
//           onChange={(e) => setChildId(e.target.value)}
//           className="border p-2 w-full"
//         />
//         <input
//           type="number"
//           placeholder="Amount"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-2 w-full"
//         />
//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
//           Donate
//         </button>
//       </form>
//       {message && <p className="mt-4 text-green-700 font-semibold">{message}</p>}
//     </div>
//   );
// };

// export default Donate;

// import React, { useState, useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import axios from 'axios';
// import { Heart, DollarSign, User, Users, ArrowRight, Sparkles, BookOpen, GraduationCap, Star, MapPin, Target } from 'lucide-react';

// const Donate = () => {
//   const [searchParams] = useSearchParams();
//   const initialChildId = searchParams.get('child_id') || '';
//   const initialSponsorId = searchParams.get('sponsor_id') || '';

//   const [sponsorId, setSponsorId] = useState(initialSponsorId);
//   const [childId, setChildId] = useState(initialChildId);
//   const [childInfo, setChildInfo] = useState(null);
//   const [sponsorInfo, setSponsorInfo] = useState(null);
//   const [amount, setAmount] = useState('');
//   const [message, setMessage] = useState('');
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [hoveredAmount, setHoveredAmount] = useState(null);

//   const fetchChildInfo = (id) => {
//     if (id) {
//       setChildInfo({
//         id: id,
//         verified: true
//       });
//     } else {
//       setChildInfo(null);
//     }
//   };

//   const fetchSponsorInfo = (id) => {
//     if (id) {
//       setSponsorInfo({
//         name: "Sarah Williams",
//         email: "sarah.williams@email.com",
//         totalDonated: 1250,
//         studentsSupported: 3
//       });
//     } else {
//       setSponsorInfo(null);
//     }
//   };

//   useEffect(() => {
//     fetchChildInfo(childId);
//   }, [childId]);

//   useEffect(() => {
//     fetchSponsorInfo(sponsorId);
//   }, [sponsorId]);

//   const handleDonate = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const res = await axios.post('http://localhost:5000/api/donate', {
//         sponsor_id: sponsorId,
//         child_id: childId,
//         amount: amount
//       });

//       setMessage(res.data.message);
//       setShowSuccess(true);
      
//       // Clear form after successful donation
//       setTimeout(() => {
//         setSponsorId('');
//         setChildId('');
//         setAmount('');
//         setChildInfo(null);
//         setSponsorInfo(null);
//         setShowSuccess(false);
//         setMessage('');
//       }, 4000);

//     } catch (err) {
//       setMessage(err.response?.data?.error || 'Donation failed');
//       setShowSuccess(false);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const donationImpacts = {
//     25: { books: 2, meals: 5, supplies: "1 month" },
//     50: { books: 5, meals: 12, supplies: "2 months" },
//     100: { books: 10, meals: 25, supplies: "3 months" },
//     250: { books: 25, meals: 60, supplies: "6 months" }
//   };

//   if (showSuccess) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
//         <div className="absolute inset-0 opacity-30">
//           <div className="w-full h-full bg-gradient-to-r from-purple-500/10 to-pink-500/10"></div>
//         </div>
        
//         <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center max-w-lg w-full transform animate-pulse border border-white/20">
//           <div className="w-24 h-24 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
//             <Sparkles className="w-12 h-12 text-white" />
//           </div>
//           <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6">
//             You're Amazing!
//           </h2>
//           <p className="text-gray-700 text-xl mb-8 leading-relaxed">{message}</p>
//           <div className="space-y-4">
//             <button 
//               onClick={() => {
//                 setShowSuccess(false);
//                 setSponsorId('');
//                 setChildId('');
//                 setAmount('');
//                 setChildInfo(null);
//                 setSponsorInfo(null);
//                 setMessage('');
//               }}
//               className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 px-8 rounded-full font-semibold text-lg hover:scale-105 transition-transform shadow-lg"
//             >
//               Make Another Donation
//             </button>
//             <button className="w-full text-emerald-600 py-4 px-8 font-semibold hover:bg-emerald-50 rounded-full transition-all border border-emerald-200">
//               View Impact Dashboard
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
//       {/* Animated Background */}
//       <div className="absolute inset-0">
//         <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
//         <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
//         <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
//       </div>

//       <div className="relative z-10 container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-4">
//             Transform Lives Through Education
//           </h1>
//           <p className="text-xl text-gray-300 max-w-2xl mx-auto">
//             Every contribution creates ripples of change in a student's educational journey
//           </p>
//         </div>

//         <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 items-start">
//           {/* Mission & Impact Side */}
//           <div className="lg:col-span-5 space-y-6">
//             <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
//               <div className="text-center mb-6">
//                 <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <Target className="w-10 h-10 text-white" />
//                 </div>
//                 <h3 className="text-3xl font-bold text-white mb-2">Our Mission</h3>
//                 <p className="text-purple-200">Empowering students through education</p>
//               </div>
//               <div className="space-y-4">
//                 <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
//                   <h4 className="font-semibold text-purple-200 mb-2 flex items-center gap-2">
//                     <BookOpen className="w-4 h-4" />
//                     Educational Support
//                   </h4>
//                   <p className="text-gray-200 text-sm leading-relaxed">
//                     Providing essential learning materials, books, and supplies to students in need
//                   </p>
//                 </div>
                
//                 <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
//                   <h4 className="font-semibold text-blue-200 mb-2 flex items-center gap-2">
//                     <GraduationCap className="w-4 h-4" />
//                     Academic Excellence
//                   </h4>
//                   <p className="text-gray-200 text-sm">
//                     Supporting students to achieve their full academic potential
//                   </p>
//                 </div>

//                 <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
//                   <h4 className="font-semibold text-pink-200 mb-3 flex items-center gap-2">
//                     <Star className="w-4 h-4" />
//                     Global Impact
//                   </h4>
//                   <div className="grid grid-cols-2 gap-4 text-center">
//                     <div>
//                       <p className="text-2xl font-bold text-white">10,000+</p>
//                       <p className="text-gray-300 text-xs">Students Helped</p>
//                     </div>
//                     <div>
//                       <p className="text-2xl font-bold text-white">500+</p>
//                       <p className="text-gray-300 text-xs">Schools Reached</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Student Verification */}
//             {childInfo && (
//               <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-xl rounded-3xl p-6 border border-emerald-400/30">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
//                     <User className="w-4 h-4 text-white" />
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-emerald-200">Student Verified</h4>
//                     <p className="text-emerald-300 text-sm">ID: {childInfo.id}</p>
//                   </div>
//                 </div>
//                 <p className="text-emerald-100 text-sm">
//                   This student has been verified and is part of our educational support program.
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* Donation Interface */}
//           <div className="lg:col-span-7 space-y-6">
//             <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
//               {/* Sponsor Info Display */}
//               {sponsorInfo && (
//                 <div className="mb-8 p-6 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl border border-indigo-300/20">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <div className="flex items-center gap-3 mb-2">
//                         <Users className="w-6 h-6 text-indigo-300" />
//                         <span className="font-semibold text-indigo-200 text-lg">Welcome back!</span>
//                       </div>
//                       <p className="text-white font-bold text-xl">{sponsorInfo.name}</p>
//                       <p className="text-indigo-200 text-sm">{sponsorInfo.email}</p>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-indigo-200 text-sm">Total Impact</p>
//                       <p className="text-white font-bold text-2xl">${sponsorInfo.totalDonated}</p>
//                       <p className="text-indigo-200 text-xs">{sponsorInfo.studentsSupported} students supported</p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <div className="text-center mb-8">
//                 <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
//                   <Heart className="w-10 h-10 text-white" />
//                 </div>
//                 <h2 className="text-4xl font-bold text-white mb-2">Make Your Impact</h2>
//                 <p className="text-gray-300">Choose your contribution level</p>
//               </div>

//               <form onSubmit={handleDonate} className="space-y-6">
//                 {/* ID Inputs */}
//                 <div className="grid md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-purple-200 font-medium mb-3">Sponsor ID</label>
//                     <input
//                       type="text"
//                       placeholder="Enter your sponsor ID"
//                       value={sponsorId}
//                       onChange={(e) => setSponsorId(e.target.value)}
//                       className="w-full px-6 py-4 bg-white/20 border border-white/30 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all placeholder-gray-400 text-white backdrop-blur-sm"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-purple-200 font-medium mb-3">Student ID (Optional)</label>
//                     <input
//                       type="text"
//                       placeholder="Enter student ID to support"
//                       value={childId}
//                       onChange={(e) => setChildId(e.target.value)}
//                       className="w-full px-6 py-4 bg-white/20 border border-white/30 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all placeholder-gray-400 text-white backdrop-blur-sm"
//                     />
//                   </div>
//                 </div>

//                 {/* Amount Selection Cards */}
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//                   {Object.entries(donationImpacts).map(([amt, impact]) => (
//                     <div
//                       key={amt}
//                       className={`relative cursor-pointer transition-all duration-300 ${
//                         amount === amt || hoveredAmount === amt
//                           ? 'transform scale-105'
//                           : 'hover:scale-102'
//                       }`}
//                       onClick={() => setAmount(amt)}
//                       onMouseEnter={() => setHoveredAmount(amt)}
//                       onMouseLeave={() => setHoveredAmount(null)}
//                     >
//                       <div className={`p-6 rounded-2xl border-2 transition-all ${
//                         amount === amt
//                           ? 'bg-gradient-to-br from-purple-500/30 to-pink-500/30 border-purple-400 shadow-lg'
//                           : 'bg-white/10 border-white/20 hover:border-purple-400/50'
//                       }`}>
//                         <div className="text-center">
//                           <p className="text-3xl font-bold text-white mb-2">${amt}</p>
//                           <div className="space-y-1 text-xs text-gray-300">
//                             <p>{impact.books} books</p>
//                             <p>{impact.meals} meals</p>
//                             <p>{impact.supplies} supplies</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Custom Amount */}
//                 <div>
//                   <label className="block text-purple-200 font-medium mb-3">Custom Amount</label>
//                   <div className="relative">
//                     <DollarSign className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
//                     <input
//                       type="number"
//                       placeholder="Enter custom amount"
//                       value={amount}
//                       onChange={(e) => setAmount(e.target.value)}
//                       className="w-full pl-16 pr-6 py-4 bg-white/20 border border-white/30 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all placeholder-gray-400 text-white backdrop-blur-sm text-lg"
//                       min="1"
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* Donation Button */}
//                 <button
//                   type="submit"
//                   disabled={isLoading || !sponsorId || !amount}
//                   className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white py-6 px-8 rounded-2xl font-bold text-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 relative overflow-hidden"
//                 >
//                   {isLoading ? (
//                     <>
//                       <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                       Processing Your Kindness...
//                     </>
//                   ) : (
//                     <>
//                       Create Impact Now
//                       <ArrowRight className="w-6 h-6" />
//                     </>
//                   )}
//                 </button>

//                 {/* Impact Preview */}
//                 {amount && donationImpacts[amount] && (
//                   <div className="mt-6 p-6 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl border border-emerald-400/30">
//                     <h4 className="font-semibold text-emerald-200 mb-3 text-center">Your ${amount} Impact:</h4>
//                     <div className="grid grid-cols-3 gap-4 text-center">
//                       <div>
//                         <p className="text-2xl font-bold text-emerald-300">{donationImpacts[amount].books}</p>
//                         <p className="text-emerald-200 text-sm">Books</p>
//                       </div>
//                       <div>
//                         <p className="text-2xl font-bold text-emerald-300">{donationImpacts[amount].meals}</p>
//                         <p className="text-emerald-200 text-sm">Meals</p>
//                       </div>
//                       <div>
//                         <p className="text-2xl font-bold text-emerald-300">{donationImpacts[amount].supplies}</p>
//                         <p className="text-emerald-200 text-sm">Supplies</p>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </form>

//               {message && !showSuccess && (
//                 <div className="mt-6 p-4 bg-red-500/20 border border-red-400/30 rounded-2xl backdrop-blur-sm">
//                   <p className="text-red-200 text-center font-medium">{message}</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Donate;

// import React, { useState, useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import axios from 'axios';
// import { Heart, DollarSign, User, Users, ArrowRight, Sparkles, BookOpen, GraduationCap, Star, MapPin, Target } from 'lucide-react';

// const Donate = () => {
//   const [searchParams] = useSearchParams();
//   const initialChildId = searchParams.get('child_id') || '';
//   const initialSponsorId = searchParams.get('sponsor_id') || '';

//   const [sponsorId, setSponsorId] = useState(initialSponsorId);
//   const [childId, setChildId] = useState(initialChildId);
//   const [childInfo, setChildInfo] = useState(null);
//   const [sponsorInfo, setSponsorInfo] = useState(null);
//   const [amount, setAmount] = useState('');
//   const [message, setMessage] = useState('');
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [hoveredAmount, setHoveredAmount] = useState(null);
//   const [loadingSponsors, setLoadingSponsors] = useState(false);
//   const [sponsorError, setSponsorError] = useState('');

//   // Updated fetchChildInfo to make real API call
//   const fetchChildInfo = async (id) => {
//     if (id) {
//       try {
//         // Make API call to fetch child details
//         const response = await axios.get(`http://localhost:5000/api/child/${id}`);
//         setChildInfo({
//           id: id,
//           verified: true,
//           ...response.data
//         });
//       } catch (error) {
//         console.error('Error fetching child info:', error);
//         setChildInfo({
//           id: id,
//           verified: false,
//           error: 'Student not found or verification failed'
//         });
//       }
//     } else {
//       setChildInfo(null);
//     }
//   };

//   // Updated fetchSponsorInfo to make real API call
//   const fetchSponsorInfo = async (id) => {
//     if (id) {
//       setLoadingSponsors(true);
//       setSponsorError('');
      
//       try {
//         // Make API call to fetch sponsor details
//         const response = await axios.get(`http://localhost:5000/api/sponsor/${id}`);
//         setSponsorInfo(response.data);
//       } catch (error) {
//         console.error('Error fetching sponsor info:', error);
//         setSponsorError('Sponsor not found or unable to fetch details');
//         setSponsorInfo(null);
//       } finally {
//         setLoadingSponsors(false);
//       }
//     } else {
//       setSponsorInfo(null);
//       setSponsorError('');
//     }
//   };

//   useEffect(() => {
//     fetchChildInfo(childId);
//   }, [childId]);

//   useEffect(() => {
//     fetchSponsorInfo(sponsorId);
//   }, [sponsorId]);

//   const handleDonate = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const res = await axios.post('http://localhost:5000/api/donate', {
//         sponsor_id: sponsorId,
//         child_id: childId,
//         amount: amount
//       });

//       setMessage(res.data.message);
//       setShowSuccess(true);
      
//       // Clear form after successful donation
//       setTimeout(() => {
//         setSponsorId('');
//         setChildId('');
//         setAmount('');
//         setChildInfo(null);
//         setSponsorInfo(null);
//         setShowSuccess(false);
//         setMessage('');
//         setSponsorError('');
//       }, 4000);

//     } catch (err) {
//       setMessage(err.response?.data?.error || 'Donation failed');
//       setShowSuccess(false);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const donationImpacts = {
//     25: { books: 2, meals: 5, supplies: "1 month" },
//     50: { books: 5, meals: 12, supplies: "2 months" },
//     100: { books: 10, meals: 25, supplies: "3 months" },
//     250: { books: 25, meals: 60, supplies: "6 months" }
//   };

//   if (showSuccess) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
//         <div className="absolute inset-0 opacity-30">
//           <div className="w-full h-full bg-gradient-to-r from-purple-500/10 to-pink-500/10"></div>
//         </div>
        
//         <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center max-w-lg w-full transform animate-pulse border border-white/20">
//           <div className="w-24 h-24 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
//             <Sparkles className="w-12 h-12 text-white" />
//           </div>
//           <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6">
//             You're Amazing!
//           </h2>
//           <p className="text-gray-700 text-xl mb-8 leading-relaxed">{message}</p>
//           <div className="space-y-4">
//             <button 
//               onClick={() => {
//                 setShowSuccess(false);
//                 setSponsorId('');
//                 setChildId('');
//                 setAmount('');
//                 setChildInfo(null);
//                 setSponsorInfo(null);
//                 setMessage('');
//                 setSponsorError('');
//               }}
//               className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 px-8 rounded-full font-semibold text-lg hover:scale-105 transition-transform shadow-lg"
//             >
//               Make Another Donation
//             </button>
//             <button className="w-full text-emerald-600 py-4 px-8 font-semibold hover:bg-emerald-50 rounded-full transition-all border border-emerald-200">
//               View Impact Dashboard
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
//       {/* Animated Background */}
//       <div className="absolute inset-0">
//         <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
//         <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
//         <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
//       </div>

//       <div className="relative z-10 container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-4">
//             Transform Lives Through Education
//           </h1>
//           <p className="text-xl text-gray-300 max-w-2xl mx-auto">
//             Every contribution creates ripples of change in a student's educational journey
//           </p>
//         </div>

//         <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 items-start">
//           {/* Mission & Impact Side */}
//           <div className="lg:col-span-5 space-y-6">
//             <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
//               <div className="text-center mb-6">
//                 <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <Target className="w-10 h-10 text-white" />
//                 </div>
//                 <h3 className="text-3xl font-bold text-white mb-2">Our Mission</h3>
//                 <p className="text-purple-200">Empowering students through education</p>
//               </div>
//               <div className="space-y-4">
//                 <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
//                   <h4 className="font-semibold text-purple-200 mb-2 flex items-center gap-2">
//                     <BookOpen className="w-4 h-4" />
//                     Educational Support
//                   </h4>
//                   <p className="text-gray-200 text-sm leading-relaxed">
//                     Providing essential learning materials, books, and supplies to students in need
//                   </p>
//                 </div>
                
//                 <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
//                   <h4 className="font-semibold text-blue-200 mb-2 flex items-center gap-2">
//                     <GraduationCap className="w-4 h-4" />
//                     Academic Excellence
//                   </h4>
//                   <p className="text-gray-200 text-sm">
//                     Supporting students to achieve their full academic potential
//                   </p>
//                 </div>

//                 <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
//                   <h4 className="font-semibold text-pink-200 mb-3 flex items-center gap-2">
//                     <Star className="w-4 h-4" />
//                     Global Impact
//                   </h4>
//                   <div className="grid grid-cols-2 gap-4 text-center">
//                     <div>
//                       <p className="text-2xl font-bold text-white">10,000+</p>
//                       <p className="text-gray-300 text-xs">Students Helped</p>
//                     </div>
//                     <div>
//                       <p className="text-2xl font-bold text-white">500+</p>
//                       <p className="text-gray-300 text-xs">Schools Reached</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Student Verification */}
//             {childInfo && (
//               <div className={`backdrop-blur-xl rounded-3xl p-6 border ${
//                 childInfo.verified 
//                   ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-emerald-400/30'
//                   : 'bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-400/30'
//               }`}>
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                     childInfo.verified ? 'bg-emerald-500' : 'bg-red-500'
//                   }`}>
//                     <User className="w-4 h-4 text-white" />
//                   </div>
//                   <div>
//                     <h4 className={`font-semibold ${
//                       childInfo.verified ? 'text-emerald-200' : 'text-red-200'
//                     }`}>
//                       {childInfo.verified ? 'Student Verified' : 'Student Not Found'}
//                     </h4>
//                     <p className={`text-sm ${
//                       childInfo.verified ? 'text-emerald-300' : 'text-red-300'
//                     }`}>
//                       ID: {childInfo.id}
//                     </p>
//                   </div>
//                 </div>
//                 <p className={`text-sm ${
//                   childInfo.verified ? 'text-emerald-100' : 'text-red-100'
//                 }`}>
//                   {childInfo.verified 
//                     ? 'This student has been verified and is part of our educational support program.'
//                     : (childInfo.error || 'Unable to verify this student ID.')
//                   }
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* Donation Interface */}
//           <div className="lg:col-span-7 space-y-6">
//             <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
//               {/* Sponsor Info Display */}
//               {loadingSponsors && (
//                 <div className="mb-8 p-6 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl border border-indigo-300/20">
//                   <div className="flex items-center justify-center">
//                     <div className="w-6 h-6 border-2 border-indigo-300/30 border-t-indigo-300 rounded-full animate-spin mr-3"></div>
//                     <span className="text-indigo-200">Loading sponsor information...</span>
//                   </div>
//                 </div>
//               )}

//               {sponsorError && (
//                 <div className="mb-8 p-6 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl border border-red-400/30">
//                   <div className="flex items-center gap-3">
//                     <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
//                       <span className="text-white text-sm">!</span>
//                     </div>
//                     <span className="text-red-200">{sponsorError}</span>
//                   </div>
//                 </div>
//               )}

//               {sponsorInfo && !loadingSponsors && (
//                 <div className="mb-8 p-6 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl border border-indigo-300/20">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <div className="flex items-center gap-3 mb-2">
//                         <Users className="w-6 h-6 text-indigo-300" />
//                         <span className="font-semibold text-indigo-200 text-lg">Welcome back!</span>
//                       </div>
//                       <p className="text-white font-bold text-xl">{sponsorInfo.name}</p>
//                       <p className="text-indigo-200 text-sm">{sponsorInfo.email}</p>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-indigo-200 text-sm">Total Impact</p>
//                       <p className="text-white font-bold text-2xl">${sponsorInfo.totalDonated || 0}</p>
//                       <p className="text-indigo-200 text-xs">{sponsorInfo.studentsSupported || 0} students supported</p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <div className="text-center mb-8">
//                 <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
//                   <Heart className="w-10 h-10 text-white" />
//                 </div>
//                 <h2 className="text-4xl font-bold text-white mb-2">Make Your Impact</h2>
//                 <p className="text-gray-300">Choose your contribution level</p>
//               </div>

//               <form onSubmit={handleDonate} className="space-y-6">
//                 {/* ID Inputs */}
//                 <div className="grid md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-purple-200 font-medium mb-3">Sponsor ID</label>
//                     <input
//                       type="text"
//                       placeholder="Enter your sponsor ID"
//                       value={sponsorId}
//                       onChange={(e) => setSponsorId(e.target.value)}
//                       className="w-full px-6 py-4 bg-white/20 border border-white/30 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all placeholder-gray-400 text-white backdrop-blur-sm"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-purple-200 font-medium mb-3">Student ID (Optional)</label>
//                     <input
//                       type="text"
//                       placeholder="Enter student ID to support"
//                       value={childId}
//                       onChange={(e) => setChildId(e.target.value)}
//                       className="w-full px-6 py-4 bg-white/20 border border-white/30 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all placeholder-gray-400 text-white backdrop-blur-sm"
//                     />
//                   </div>
//                 </div>

//                 {/* Amount Selection Cards */}
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//                   {Object.entries(donationImpacts).map(([amt, impact]) => (
//                     <div
//                       key={amt}
//                       className={`relative cursor-pointer transition-all duration-300 ${
//                         amount === amt || hoveredAmount === amt
//                           ? 'transform scale-105'
//                           : 'hover:scale-102'
//                       }`}
//                       onClick={() => setAmount(amt)}
//                       onMouseEnter={() => setHoveredAmount(amt)}
//                       onMouseLeave={() => setHoveredAmount(null)}
//                     >
//                       <div className={`p-6 rounded-2xl border-2 transition-all ${
//                         amount === amt
//                           ? 'bg-gradient-to-br from-purple-500/30 to-pink-500/30 border-purple-400 shadow-lg'
//                           : 'bg-white/10 border-white/20 hover:border-purple-400/50'
//                       }`}>
//                         <div className="text-center">
//                           <p className="text-3xl font-bold text-white mb-2">${amt}</p>
//                           <div className="space-y-1 text-xs text-gray-300">
//                             <p>{impact.books} books</p>
//                             <p>{impact.meals} meals</p>
//                             <p>{impact.supplies} supplies</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Custom Amount */}
//                 <div>
//                   <label className="block text-purple-200 font-medium mb-3">Custom Amount</label>
//                   <div className="relative">
//                     <DollarSign className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
//                     <input
//                       type="number"
//                       placeholder="Enter custom amount"
//                       value={amount}
//                       onChange={(e) => setAmount(e.target.value)}
//                       className="w-full pl-16 pr-6 py-4 bg-white/20 border border-white/30 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all placeholder-gray-400 text-white backdrop-blur-sm text-lg"
//                       min="1"
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* Donation Button */}
//                 <button
//                   type="submit"
//                   disabled={isLoading || !sponsorId || !amount}
//                   className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white py-6 px-8 rounded-2xl font-bold text-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 relative overflow-hidden"
//                 >
//                   {isLoading ? (
//                     <>
//                       <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                       Processing Your Kindness...
//                     </>
//                   ) : (
//                     <>
//                       Create Impact Now
//                       <ArrowRight className="w-6 h-6" />
//                     </>
//                   )}
//                 </button>

//                 {/* Impact Preview */}
//                 {amount && donationImpacts[amount] && (
//                   <div className="mt-6 p-6 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl border border-emerald-400/30">
//                     <h4 className="font-semibold text-emerald-200 mb-3 text-center">Your ${amount} Impact:</h4>
//                     <div className="grid grid-cols-3 gap-4 text-center">
//                       <div>
//                         <p className="text-2xl font-bold text-emerald-300">{donationImpacts[amount].books}</p>
//                         <p className="text-emerald-200 text-sm">Books</p>
//                       </div>
//                       <div>
//                         <p className="text-2xl font-bold text-emerald-300">{donationImpacts[amount].meals}</p>
//                         <p className="text-emerald-200 text-sm">Meals</p>
//                       </div>
//                       <div>
//                         <p className="text-2xl font-bold text-emerald-300">{donationImpacts[amount].supplies}</p>
//                         <p className="text-emerald-200 text-sm">Supplies</p>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </form>

//               {message && !showSuccess && (
//                 <div className="mt-6 p-4 bg-red-500/20 border border-red-400/30 rounded-2xl backdrop-blur-sm">
//                   <p className="text-red-200 text-center font-medium">{message}</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Donate;

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
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
      
      // Clear form after successful donation
      setTimeout(() => {
        setSponsorId('');
        setChildId('');
        setAmount('');
        setChildInfo(null);
        setSponsorInfo(null);
        setShowSuccess(false);
        setMessage('');
        setSponsorError('');
      }, 4000);

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
      <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-gradient-to-r from-purple-500/10 to-pink-500/10"></div>
        </div>
        
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center max-w-lg w-full transform animate-pulse border border-white/20">
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
            <button className="w-full text-emerald-600 py-4 px-8 font-semibold hover:bg-emerald-50 rounded-full transition-all border border-emerald-200">
              View Impact Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-4">
            Transform Lives Through Education
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Every contribution creates ripples of change in a student's educational journey
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 items-start">
          {/* Mission & Impact Side */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Our Mission</h3>
                <p className="text-purple-200">Empowering students through education</p>
              </div>
              <div className="space-y-4">
                <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
                  <h4 className="font-semibold text-purple-200 mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Educational Support
                  </h4>
                  <p className="text-gray-200 text-sm leading-relaxed">
                    Providing essential learning materials, books, and supplies to students in need
                  </p>
                </div>
                
                <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
                  <h4 className="font-semibold text-blue-200 mb-2 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Academic Excellence
                  </h4>
                  <p className="text-gray-200 text-sm">
                    Supporting students to achieve their full academic potential
                  </p>
                </div>

                <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
                  <h4 className="font-semibold text-pink-200 mb-3 flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Global Impact
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-white">10,000+</p>
                      <p className="text-gray-300 text-xs">Students Helped</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">500+</p>
                      <p className="text-gray-300 text-xs">Schools Reached</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Student Verification */}
            {childInfo && (
              <div className={`backdrop-blur-xl rounded-3xl p-6 border ${
                childInfo.verified 
                  ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-emerald-400/30'
                  : 'bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-400/30'
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    childInfo.verified ? 'bg-emerald-500' : 'bg-red-500'
                  }`}>
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${
                      childInfo.verified ? 'text-emerald-200' : 'text-red-200'
                    }`}>
                      {childInfo.verified ? 'Student Verified' : 'Student Not Found'}
                    </h4>
                    <p className={`text-sm ${
                      childInfo.verified ? 'text-emerald-300' : 'text-red-300'
                    }`}>
                      ID: {childInfo.id}
                    </p>
                  </div>
                </div>
                {childInfo.verified && (
                  <div className="space-y-2">
                    <p className="text-emerald-100 font-medium">
                      <span className="text-emerald-200">Name:</span> {childInfo.name}
                    </p>
                    <p className="text-emerald-100">
                      <span className="text-emerald-200">Age:</span> {childInfo.age}
                    </p>
                    <p className="text-emerald-100">
                      <span className="text-emerald-200">School:</span> {childInfo.school}
                    </p>
                    <p className="text-emerald-100 text-sm">
                      This student has been verified and is part of our educational support program.
                    </p>
                  </div>
                )}
                {!childInfo.verified && (
                  <p className="text-red-100 text-sm">
                    {childInfo.error || 'Unable to verify this student ID.'}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Donation Interface */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              {/* Sponsor Info Display */}
              {loadingSponsors && (
                <div className="mb-8 p-6 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl border border-indigo-300/20">
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-indigo-300/30 border-t-indigo-300 rounded-full animate-spin mr-3"></div>
                    <span className="text-indigo-200">Loading sponsor information...</span>
                  </div>
                </div>
              )}

              {sponsorError && (
                <div className="mb-8 p-6 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl border border-red-400/30">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">!</span>
                    </div>
                    <span className="text-red-200">{sponsorError}</span>
                  </div>
                </div>
              )}

              {sponsorInfo && !loadingSponsors && (
                <div className="mb-8 p-6 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl border border-indigo-300/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Users className="w-6 h-6 text-indigo-300" />
                        <span className="font-semibold text-indigo-200 text-lg">Welcome back!</span>
                      </div>
                      <p className="text-white font-bold text-xl">{sponsorInfo.name}</p>
                      <p className="text-indigo-200 text-sm">{sponsorInfo.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-indigo-200 text-sm">Total Impact</p>
                      <p className="text-white font-bold text-2xl">₹{parseFloat(sponsorInfo.totalDonated || 0).toFixed(2)}</p>
                      <p className="text-indigo-200 text-xs">{sponsorInfo.studentsSupported || 0} students supported</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-white mb-2">Make Your Impact</h2>
                <p className="text-gray-300">Choose your contribution level</p>
              </div>

              <form onSubmit={handleDonate} className="space-y-6">
                {/* ID Inputs */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-purple-200 font-medium mb-3">Sponsor ID</label>
                    <input
                      type="text"
                      placeholder="Enter your sponsor ID"
                      value={sponsorId}
                      onChange={(e) => setSponsorId(e.target.value)}
                      className="w-full px-6 py-4 bg-white/20 border border-white/30 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all placeholder-gray-400 text-white backdrop-blur-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-purple-200 font-medium mb-3">Student ID (Optional)</label>
                    <input
                      type="text"
                      placeholder="Enter student ID to support"
                      value={childId}
                      onChange={(e) => setChildId(e.target.value)}
                      className="w-full px-6 py-4 bg-white/20 border border-white/30 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all placeholder-gray-400 text-white backdrop-blur-sm"
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
                          ? 'bg-gradient-to-br from-purple-500/30 to-pink-500/30 border-purple-400 shadow-lg'
                          : 'bg-white/10 border-white/20 hover:border-purple-400/50'
                      }`}>
                        <div className="text-center">
                          <p className="text-3xl font-bold text-white mb-2">₹{amt}</p>
                          <div className="space-y-1 text-xs text-gray-300">
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
                  <label className="block text-purple-200 font-medium mb-3">Custom Amount</label>
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl font-bold">₹</span>
                    <input
                      type="number"
                      placeholder="Enter custom amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full pl-16 pr-6 py-4 bg-white/20 border border-white/30 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all placeholder-gray-400 text-white backdrop-blur-sm text-lg"
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
                  className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white py-6 px-8 rounded-2xl font-bold text-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 relative overflow-hidden"
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
                  <div className="mt-6 p-6 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl border border-emerald-400/30">
                    <h4 className="font-semibold text-emerald-200 mb-3 text-center">Your ₹{amount} Impact:</h4>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-emerald-300">{donationImpacts[amount].books}</p>
                        <p className="text-emerald-200 text-sm">Books</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-emerald-300">{donationImpacts[amount].meals}</p>
                        <p className="text-emerald-200 text-sm">Meals</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-emerald-300">{donationImpacts[amount].supplies}</p>
                        <p className="text-emerald-200 text-sm">Supplies</p>
                      </div>
                    </div>
                  </div>
                )}
              </form>

              {message && !showSuccess && (
                <div className="mt-6 p-4 bg-red-500/20 border border-red-400/30 rounded-2xl backdrop-blur-sm">
                  <p className="text-red-200 text-center font-medium">{message}</p>
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