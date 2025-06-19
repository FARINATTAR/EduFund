// import React, { useState } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Eye, EyeOff, UserPlus, Mail, Lock, Phone, User, MapPin, Calendar } from 'lucide-react';
// import { useAuth } from '../context/AuthContext.jsx';

// function Signup() {
//     const [signupInfo, setSignupInfo] = useState({
//         name: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//         phone: '',
//         gender: '',
//         dateOfBirth: '',
//         street: '',
//         area: '',
//         pincode: ''
//     });
//     const [isLoading, setIsLoading] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//     const { login } = useAuth();
//     const navigate = useNavigate();
//     const location = useLocation();

//     const redirectPath = location.state?.from || new URLSearchParams(location.search).get('redirect') || '/';

//     const API_URL = import.meta.env.VITE_API_URL || "https://weexistproject.onrender.com";

//     const togglePasswordVisibility = (field) => {
//         if (field === 'password') {
//             setShowPassword(!showPassword);
//         } else {
//             setShowConfirmPassword(!showConfirmPassword);
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setSignupInfo((prev) => ({ ...prev, [name]: value }));
//     };

// const handleSignup = async (e) => {
//     e.preventDefault();

//     const {
//         name, email, password, confirmPassword, phone,
//         gender, dateOfBirth, street, area, pincode
//     } = signupInfo;

//     // 🔒 Field validation
//     if (!name || !email || !password || !confirmPassword ||
//         !phone || !gender || !dateOfBirth || !street || !area || !pincode) {
//         return toast.error('All fields are required.', { position: 'top-right', autoClose: 3000 });
//     }

//     if (password !== confirmPassword) {
//         return toast.error('Passwords do not match.', { position: 'top-right', autoClose: 3000 });
//     }

//     setIsLoading(true);
//     try {
//         const response = await fetch(`${API_URL}/auth/register`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 name,
//                 email,
//                 password,
//                 phone,
//                 gender,
//                 dateOfBirth,
//                 address: {
//                     street,
//                     area,
//                     pincode
//                 },
//                 role: "sponsor"  // use "sponsor" here since this is sponsor signup
//             }),
//         });

//         const result = await response.json();
//         console.log("Signup response:", result);

//         if (result.success) {
//             toast.success(result.message || 'Signup successful!', {
//                 position: 'top-right',
//                 autoClose: 2000
//             });

//             setTimeout(() => {
//                 navigate(`/login?redirect=${encodeURIComponent(redirectPath)}`, {
//                     state: { from: redirectPath }
//                 });
//             }, 1000);
//         } else {
//             toast.error(result.error?.details?.[0]?.message || result.message, {
//                 position: 'top-right',
//                 autoClose: 3000
//             });
//         }
//     } catch (err) {
//         toast.error(err.message || 'Something went wrong.', {
//             position: 'top-right',
//             autoClose: 3000
//         });
//     } finally {
//         setIsLoading(false);
//     }
// };


//     return (
//         <div className="min-h-screen bg-gradient-to-br from-amber-50 via-sky-50 to-emerald-50 relative overflow-hidden">
//             {/* Decorative Background */}
//             <div className="absolute inset-0 opacity-5 z-0">
//                 <div className="absolute top-16 left-16 w-24 h-24 bg-amber-300 rounded-full" />
//                 <div className="absolute bottom-20 right-12 w-28 h-28 bg-sky-300 rounded-full" />
//                 <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-emerald-300 rounded-full" />
//                 <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-amber-200 rounded-full" />
//                 <div className="absolute bottom-1/3 left-1/3 w-12 h-12 bg-sky-200 rounded-full" />
//             </div>

//             <div className="relative z-10 max-w-2xl mx-auto px-6 py-10">
//                 {/* Header */}
//                 <div className="text-center mb-8 animate-fade-in">
//                     <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full mb-6 shadow-lg">
//                         <UserPlus className="w-10 h-10 text-white" />
//                     </div>
//                     <h1 className="text-4xl font-bold text-gray-800 mb-2">Create Account</h1>
//                     <p className="text-gray-600 font-serif italic">
//                         "Join us in making a difference together."
//                     </p>
//                 </div>

//                 {/* Signup Form */}
//                 <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 animate-slide-up">
//                     <form onSubmit={handleSignup} className="space-y-6">
//                         {/* Personal Information Section */}
//                         <div className="space-y-4">
//                             <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2">Personal Information</h3>
                            
//                             {/* Full Name */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
//                                 <div className="relative">
//                                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                         <User className="h-5 w-5 text-gray-400" />
//                                     </div>
//                                     <input
//                                         onChange={handleChange}
//                                         type="text"
//                                         name="name"
//                                         placeholder="Enter your full name"
//                                         value={signupInfo.name}
//                                         className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-transparent transition bg-white text-gray-900 placeholder-gray-500"
//                                     />
//                                 </div>
//                             </div>

//                             {/* Email */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
//                                 <div className="relative">
//                                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                         <Mail className="h-5 w-5 text-gray-400" />
//                                     </div>
//                                     <input
//                                         onChange={handleChange}
//                                         type="email"
//                                         name="email"
//                                         placeholder="Enter your email"
//                                         value={signupInfo.email}
//                                         className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-transparent transition bg-white text-gray-900 placeholder-gray-500"
//                                     />
//                                 </div>
//                             </div>

//                             {/* Phone */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
//                                 <div className="relative">
//                                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                         <Phone className="h-5 w-5 text-gray-400" />
//                                     </div>
//                                     <input
//                                         onChange={handleChange}
//                                         type="text"
//                                         name="phone"
//                                         placeholder="Enter your phone number"
//                                         value={signupInfo.phone}
//                                         className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-transparent transition bg-white text-gray-900 placeholder-gray-500"
//                                     />
//                                 </div>
//                             </div>

//                             {/* Gender and DOB Row */}
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
//                                     <select
//                                         name="gender"
//                                         onChange={handleChange}
//                                         value={signupInfo.gender}
//                                         className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-transparent transition bg-white text-gray-900"
//                                     >
//                                         <option value="">Select Gender</option>
//                                         <option value="male">Male</option>
//                                         <option value="female">Female</option>
//                                         <option value="other">Other</option>
//                                     </select>
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
//                                     <div className="relative">
//                                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                             <Calendar className="h-5 w-5 text-gray-400" />
//                                         </div>
//                                         <input
//                                             onChange={handleChange}
//                                             type="date"
//                                             name="dateOfBirth"
//                                             value={signupInfo.dateOfBirth}
//                                             className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-transparent transition bg-white text-gray-900"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Security Section */}
//                         <div className="space-y-4">
//                             <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2">Security</h3>
                            
//                             {/* Password */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
//                                 <div className="relative">
//                                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                         <Lock className="h-5 w-5 text-gray-400" />
//                                     </div>
//                                     <input
//                                         onChange={handleChange}
//                                         type={showPassword ? "text" : "password"}
//                                         name="password"
//                                         placeholder="Create a password"
//                                         value={signupInfo.password}
//                                         className="pl-10 pr-12 w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-transparent transition bg-white text-gray-900 placeholder-gray-500"
//                                     />
//                                     <button
//                                         type="button"
//                                         onClick={() => togglePasswordVisibility('password')}
//                                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
//                                     >
//                                         {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                                     </button>
//                                 </div>
//                             </div>

//                             {/* Confirm Password */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
//                                 <div className="relative">
//                                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                         <Lock className="h-5 w-5 text-gray-400" />
//                                     </div>
//                                     <input
//                                         onChange={handleChange}
//                                         type={showConfirmPassword ? "text" : "password"}
//                                         name="confirmPassword"
//                                         placeholder="Confirm your password"
//                                         value={signupInfo.confirmPassword}
//                                         className="pl-10 pr-12 w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-transparent transition bg-white text-gray-900 placeholder-gray-500"
//                                     />
//                                     <button
//                                         type="button"
//                                         onClick={() => togglePasswordVisibility('confirm')}
//                                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
//                                     >
//                                         {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Address Section */}
//                         <div className="space-y-4">
//                             <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2">Address Information</h3>
                            
//                             {/* Street */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
//                                 <div className="relative">
//                                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                         <MapPin className="h-5 w-5 text-gray-400" />
//                                     </div>
//                                     <input
//                                         onChange={handleChange}
//                                         type="text"
//                                         name="street"
//                                         placeholder="Enter street address"
//                                         value={signupInfo.street}
//                                         className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-transparent transition bg-white text-gray-900 placeholder-gray-500"
//                                     />
//                                 </div>
//                             </div>

//                             {/* Area and Pincode Row */}
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">Area</label>
//                                     <input
//                                         onChange={handleChange}
//                                         type="text"
//                                         name="area"
//                                         placeholder="Enter area"
//                                         value={signupInfo.area}
//                                         className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-transparent transition bg-white text-gray-900 placeholder-gray-500"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
//                                     <input
//                                         onChange={handleChange}
//                                         type="text"
//                                         name="pincode"
//                                         placeholder="Enter pincode"
//                                         value={signupInfo.pincode}
//                                         className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-transparent transition bg-white text-gray-900 placeholder-gray-500"
//                                     />
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Submit Button */}
//                         <button
//                             type="submit"
//                             disabled={isLoading}
//                             className={`w-full bg-gradient-to-r from-sky-500 to-emerald-500 text-white px-6 py-4 rounded-xl shadow-lg hover:from-sky-600 hover:to-emerald-600 transition duration-300 font-semibold text-lg
//                             ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
//                         >
//                             {isLoading ? 'Creating Account...' : 'Create Account'}
//                         </button>

//                         {/* Login Link */}
//                         <div className="text-center">
//                             <p className="text-gray-600">
//                                 Already have an account?{' '}
//                                 <Link to="/sponsor/login" className="text-sky-600 hover:text-sky-800 font-semibold transition">
//                                     Sign In
//                                 </Link>
//                             </p>
//                         </div>
//                     </form>
//                 </div>
//             </div>

//             <ToastContainer />

//             {/* Animations */}
//             <style >{`
//                 @keyframes fade-in {
//                     from { opacity: 0; transform: translateY(20px); }
//                     to { opacity: 1; transform: translateY(0); }
//                 }

//                 @keyframes slide-up {
//                     from { opacity: 0; transform: translateY(30px); }
//                     to { opacity: 1; transform: translateY(0); }
//                 }

//                 .animate-fade-in {
//                     animation: fade-in 0.8s ease-out;
//                 }

//                 .animate-slide-up {
//                     animation: slide-up 0.6s ease-out;
//                 }
//             `}</style>
//         </div>
//     );
// }

// export default Signup;

import React, { useState } from "react";
import axios from "axios";

const SponsorSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    street: "",
    area: "",
    pincode: "",
    role: "sponsor",
  });

  const handleChange = (e) => {
    // Log each field change
    console.log("[SponsorSignup] Field changed:", e.target.name, "=", e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Log form data before submit
    console.log("[SponsorSignup] Submitting form with data:", formData);
    try {
      const res = await axios.post("http://localhost:5000/api/sponsors/signup", formData);
      console.log("[SponsorSignup] Signup API response:", res.data);
      alert("Signup successful! ID: " + res.data.sponsorId);
    } catch (error) {
      console.error("[SponsorSignup] Signup failed:", error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white shadow rounded space-y-4">
      <h2 className="text-xl font-semibold text-center text-gray-900">Sponsor Signup</h2>

      {["name", "email", "password", "phone", "street", "area", "pincode"].map((field) => (
        <input
          key={field}
          type={field === "password" ? "password" : "text"}
          name={field}
          value={formData[field]}
          onChange={handleChange}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          className="w-full border p-2 rounded text-gray-900 placeholder-gray-500"
          required
        />
      ))}

      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        className="w-full border p-2 rounded text-gray-900"
        required
      >
        <option value="" disabled>Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <input
        type="date"
        name="dateOfBirth"
        value={formData.dateOfBirth}
        onChange={handleChange}
        className="w-full border p-2 rounded text-gray-900"
        required
      />

      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Sign Up
      </button>
    </form>
  );
}

export default SponsorSignup;
