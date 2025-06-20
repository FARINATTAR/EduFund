// import React, { useState } from "react";
// import {
//   UserPlus,
//   Mail,
//   Lock,
//   Phone,
//   MapPin,
//   Calendar,
//   Users,
//   Eye,
//   EyeOff,
//   CheckCircle,
//   XCircle,
//   X
// } from "lucide-react";

// const Toast = ({ message, type, onClose }) => {
//   return (
//     <div className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg backdrop-blur-xl border animate-slide-down ${
//       type === 'success' 
//         ? 'bg-emerald-50/90 border-emerald-200 text-emerald-800' 
//         : 'bg-red-50/90 border-red-200 text-red-800'
//     }`}>
//       <div className="flex items-center gap-3">
//         {type === 'success' ? (
//           <CheckCircle className="w-5 h-5 text-emerald-600" />
//         ) : (
//           <XCircle className="w-5 h-5 text-red-600" />
//         )}
//         <span className="font-medium">{message}</span>
//         <button
//           onClick={onClose}
//           className="ml-2 text-gray-500 hover:text-gray-700 transition-colors"
//         >
//           <X className="w-4 h-4" />
//         </button>
//       </div>
//     </div>
//   );
// };

// const SponsorSignup = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//     gender: "",
//     dateOfBirth: "",
//     street: "",
//     area: "",
//     pincode: "",
//     role: "sponsor",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [toast, setToast] = useState(null);

//   const showToast = (message, type) => {
//     setToast({ message, type });
//     setTimeout(() => setToast(null), 5000); // Auto hide after 5 seconds
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("[SponsorSignup] Submitting form with data:", formData);
    
//     try {
//       const response = await fetch("http://localhost:5000/api/sponsors/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         showToast(`Signup successful! Your ID: ${data.sponsorId}`, 'success');
        
//         // Reset form after successful signup
//         setFormData({
//           name: "",
//           email: "",
//           password: "",
//           phone: "",
//           gender: "",
//           dateOfBirth: "",
//           street: "",
//           area: "",
//           pincode: "",
//           role: "sponsor",
//         });
//       } else {
//         throw new Error(data.message || 'Signup failed');
//       }
//     } catch (error) {
//       console.error("[SponsorSignup] Signup failed:", error.message);
//       const errorMessage = error.message || "Signup failed. Please try again.";
//       showToast(errorMessage, 'error');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-amber-50 via-sky-50 to-emerald-50 relative overflow-hidden flex items-center justify-center py-10">
//       {/* Toast Notification */}
//       {toast && (
//         <Toast
//           message={toast.message}
//           type={toast.type}
//           onClose={() => setToast(null)}
//         />
//       )}

//       {/* Decorative Background */}
//       <div className="absolute inset-0 opacity-5 z-0">
//         <div className="absolute top-16 left-16 w-24 h-24 bg-amber-300 rounded-full" />
//         <div className="absolute bottom-20 right-12 w-28 h-28 bg-sky-300 rounded-full" />
//         <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-emerald-300 rounded-full" />
//         <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-amber-200 rounded-full" />
//         <div className="absolute bottom-1/3 left-1/3 w-12 h-12 bg-sky-200 rounded-full" />
//       </div>

//       {/* Signup Form */}
//       <div className="relative z-10 w-full max-w-xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 animate-slide-up">
//         <div className="text-center mb-6">
//           <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-amber-400 to-sky-400 rounded-full shadow-lg mb-4">
//             <UserPlus className="w-10 h-10 text-white" />
//           </div>
//           <h2 className="text-3xl font-bold text-gray-800 mb-1">Sponsor Signup</h2>
//           <p className="text-gray-600 font-serif italic">"Together, let's support a child's future."</p>
//         </div>

//         <div className="space-y-4">
//           {/* Name */}
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Users className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Name"
//               className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-sky-400 focus:border-transparent"
//               required
//             />
//           </div>

//           {/* Email */}
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Mail className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Email"
//               className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-sky-400 focus:border-transparent"
//               required
//             />
//           </div>

//           {/* Password with toggle */}
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Lock className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Password"
//               className="pl-10 pr-10 w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-sky-400 focus:border-transparent"
//               required
//             />
//             <div
//               className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
//             </div>
//           </div>

//           {/* Phone */}
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Phone className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="text"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               placeholder="Phone"
//               className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-sky-400 focus:border-transparent"
//               required
//             />
//           </div>

//           {/* Street */}
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <MapPin className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="text"
//               name="street"
//               value={formData.street}
//               onChange={handleChange}
//               placeholder="Street"
//               className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-sky-400 focus:border-transparent"
//               required
//             />
//           </div>

//           {/* Area */}
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <MapPin className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="text"
//               name="area"
//               value={formData.area}
//               onChange={handleChange}
//               placeholder="Area"
//               className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-sky-400 focus:border-transparent"
//               required
//             />
//           </div>

//           {/* Pincode */}
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <MapPin className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="text"
//               name="pincode"
//               value={formData.pincode}
//               onChange={handleChange}
//               placeholder="Pincode"
//               className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-sky-400 focus:border-transparent"
//               required
//             />
//           </div>

//           {/* Gender Select */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
//             <select
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-sky-400 focus:border-transparent"
//               required
//             >
//               <option value="">Select Gender</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//             </select>
//           </div>

//           {/* DOB */}
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Calendar className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="date"
//               name="dateOfBirth"
//               value={formData.dateOfBirth}
//               onChange={handleChange}
//               className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-sky-400 focus:border-transparent"
//               required
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             onClick={handleSubmit}
//             className="w-full bg-gradient-to-r from-amber-500 to-sky-500 text-white px-6 py-4 rounded-xl shadow-lg hover:from-amber-600 hover:to-sky-600 transition duration-300 font-semibold text-lg"
//           >
//             Sign Up
//           </button>
//         </div>
//       </div>

//       {/* Animations */}
//       <style jsx>{`
//         @keyframes slide-up {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes slide-down {
//           from {
//             opacity: 0;
//             transform: translateY(-20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .animate-slide-up {
//           animation: slide-up 0.6s ease-out;
//         }

//         .animate-slide-down {
//           animation: slide-down 0.4s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SponsorSignup;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 🧠 import navigate hook at the top

import {
  UserPlus,
  Mail,
  Lock,
  Phone,
  MapPin,
  Calendar,
  Users,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  X
} from "lucide-react";

const Toast = ({ message, type, onClose }) => {
  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg backdrop-blur-xl border animate-slide-down ${
      type === 'success' 
        ? 'bg-emerald-50/90 border-emerald-200 text-emerald-800' 
        : 'bg-red-50/90 border-red-200 text-red-800'
    }`}>
      <div className="flex items-center gap-3">
        {type === 'success' ? (
          <CheckCircle className="w-5 h-5 text-emerald-600" />
        ) : (
          <XCircle className="w-5 h-5 text-red-600" />
        )}
        <span className="font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

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

  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
const navigate = useNavigate(); // 🔁 initialize it before using

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    // Prevent double submission
    if (isLoading) return;
    
    setIsLoading(true);
    console.log("[SponsorSignup] Submitting form with data:", formData);
    
    try {
      const response = await fetch("http://localhost:5000/api/sponsors/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("[SponsorSignup] Response status:", response.status);
      
      // Check if response is ok first
      if (!response.ok) {
        // Try to get error message from response
        let errorMessage = 'Signup failed';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (jsonError) {
          console.error("[SponsorSignup] Error parsing error response:", jsonError);
          errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      // console.log("[SponsorSignup] Success response:", data);

// showToast(data.message || 'Signup successful!', 'success');
if (data.success) {
  showToast(data.message || "Signup successful!", "success");
  setTimeout(() => navigate("/sponsor/login"), 2000);
} else {
  showToast(data.message || "Signup failed!", "error");
}
      
      // Reset form after successful signup
      setFormData({
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

    } catch (error) {
      console.error("[SponsorSignup] Signup failed:", error);
      showToast(error.message || "Signup failed. Please try again.", 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-sky-50 to-emerald-50 relative overflow-hidden flex items-center justify-center py-10">
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5 z-0">
        <div className="absolute top-16 left-16 w-24 h-24 bg-amber-300 rounded-full" />
        <div className="absolute bottom-20 right-12 w-28 h-28 bg-sky-300 rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-emerald-300 rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-amber-200 rounded-full" />
        <div className="absolute bottom-1/3 left-1/3 w-12 h-12 bg-sky-200 rounded-full" />
      </div>

      {/* Signup Form */}
      <div className="relative z-10 w-full max-w-xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 animate-slide-up">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-amber-400 to-sky-400 rounded-full shadow-lg mb-4">
            <UserPlus className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-1">Sponsor Signup</h2>
          <p className="text-gray-600 font-serif italic">"Together, let's support a child's future."</p>
        </div>

        <div className="space-y-4">
          {/* Name */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Users className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-sky-400 focus:border-transparent"
              required
              disabled={isLoading}
            />
          </div>

          {/* Email */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-sky-400 focus:border-transparent"
              required
              disabled={isLoading}
            />
          </div>

          {/* Password with toggle */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="pl-10 pr-10 w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-sky-400 focus:border-transparent"
              required
              disabled={isLoading}
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
            </div>
          </div>

          {/* Phone */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-sky-400 focus:border-transparent"
              required
              disabled={isLoading}
            />
          </div>

          {/* Street */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              placeholder="Street"
              className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-sky-400 focus:border-transparent"
              required
              disabled={isLoading}
            />
          </div>

          {/* Area */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="Area"
              className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-sky-400 focus:border-transparent"
              required
              disabled={isLoading}
            />
          </div>

          {/* Pincode */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Pincode"
              className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-sky-400 focus:border-transparent"
              required
              disabled={isLoading}
            />
          </div>

          {/* Gender Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-sky-400 focus:border-transparent"
              required
              disabled={isLoading}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* DOB */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-sky-400 focus:border-transparent"
              required
              disabled={isLoading}
            />
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className={`w-full px-6 py-4 rounded-xl shadow-lg font-semibold text-lg transition duration-300 ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed text-gray-200' 
                : 'bg-gradient-to-r from-amber-500 to-sky-500 text-white hover:from-amber-600 hover:to-sky-600'
            }`}
          >
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }

        .animate-slide-down {
          animation: slide-down 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SponsorSignup;