// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom'; // ⬅️ Added Link here
// import axios from 'axios';

// const SponsorDonations = () => {
//   const { id } = useParams();
//   const [sponsor, setSponsor] = useState({});
//   const [donations, setDonations] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/api/sponsors/${id}/donations`)
//       .then((res) => {
//         setSponsor(res.data.sponsor);
//         setDonations(res.data.donations);
//       })
//       .catch((err) => console.error(err));
//   }, [id]);

//   return (
//     <div className="p-6 max-w-2xl mx-auto bg-gray-50 min-h-screen">
//       {/* ⬅️ Return to Dashboard Button */}
//       <div className="mb-4">
//         <Link
//           to={`/sponsor/${id}/dashboard`}
//           className="inline-block text-sm text-blue-600 hover:underline"
//         >
//           ⬅️ Back to Dashboard
//         </Link>
//       </div>

//       <h2 className="text-3xl font-bold mb-4 text-center">Donation History</h2>

//       <div className="bg-white p-4 rounded shadow mb-6">
//         <p><strong>Name:</strong> {sponsor.name}</p>
//         <p><strong>Email:</strong> {sponsor.email}</p>
//         <p><strong>Total Donated:</strong> ₹{sponsor.total_donated}</p>
//       </div>

//       <div className="mb-4 flex justify-between items-center">
//         <h3 className="text-xl font-semibold">Your Donations</h3>
//         <a
//           href={`http://localhost:5000/api/sponsors/${id}/donations/export`}
//           className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
//           download
//         >
//           ⬇️ Download CSV
//         </a>
//       </div>

//       {donations.length === 0 ? (
//         <p className="text-gray-600">No donations yet.</p>
//       ) : (
//         <ul className="space-y-3">
//           {donations.map((d, i) => (
//             <li key={i} className="bg-white border rounded p-4 shadow-sm">
//               <p><strong>Child:</strong> {d.child_name}</p>
//               <p><strong>Amount:</strong> ₹{d.amount}</p>
//               <p><strong>Date:</strong> {new Date(d.donation_date).toLocaleDateString()}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default SponsorDonations;
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FileText, Download, User, ArrowLeft } from 'lucide-react';

const SponsorDonations = () => {
  const { id } = useParams();
  const [sponsor, setSponsor] = useState({});
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/sponsors/${id}/donations`)
      .then((res) => {
        setSponsor(res.data.sponsor);
        setDonations(res.data.donations);
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-sky-50 to-emerald-50 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5 z-0">
        <div className="absolute top-16 left-16 w-24 h-24 bg-amber-300 rounded-full" />
        <div className="absolute bottom-20 right-12 w-28 h-28 bg-sky-300 rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-emerald-300 rounded-full" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-10">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to={`/sponsor/${id}/dashboard`}
            className="inline-flex items-center text-sky-600 hover:text-sky-800 transition"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full mb-6 shadow-lg">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Your Donations</h2>
          <p className="text-gray-600 font-serif italic">
            "Every donation is a step toward a brighter future."
          </p>
        </div>

        {/* Sponsor Info */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 mb-8 border border-white/50 animate-slide-up">
          <div className="flex items-center mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-400 via-sky-400 to-emerald-400 rounded-full flex items-center justify-center shadow-md mr-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{sponsor.name || "Sponsor"}</h3>
              <p className="text-sm text-gray-600">{sponsor.email}</p>
            </div>
          </div>
          <p className="text-md text-gray-700">
            <strong>Total Donated:</strong> ₹{sponsor.total_donated || 0}
          </p>
        </div>

        {/* Download Button */}
        <div className="flex justify-end mb-6 animate-slide-up-delay">
          <a
            href={`http://localhost:5000/api/sponsors/${id}/donations/export`}
            download
            className="inline-flex items-center bg-white border border-amber-300 text-amber-700 px-4 py-2 rounded-xl shadow hover:bg-amber-100 transition"
          >
            <Download className="w-5 h-5 mr-2" />
            Download CSV
          </a>
        </div>

        {/* Donation List */}
        <div className="space-y-4 animate-slide-up-delay-2">
          {donations.length === 0 ? (
            <p className="text-center text-gray-600 italic">No donations yet.</p>
          ) : (
            donations.map((d, i) => (
              <div
                key={i}
                className="bg-white/90 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow hover:shadow-lg transition"
              >
                <p className="text-lg text-gray-800 font-semibold mb-2">
                  🎓 Child: {d.child_name}
                </p>
                <p className="text-gray-700 mb-1">Amount: ₹{d.amount}</p>
                <p className="text-gray-700">Date: {new Date(d.donation_date).toLocaleDateString()}</p>
              </div>
            ))
          )}
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

export default SponsorDonations;
