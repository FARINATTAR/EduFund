// import React, { useState } from 'react';
// import axios from 'axios';

// const Donate = () => {
//   const [sponsorId, setSponsorId] = useState('');
//   const [childId, setChildId] = useState('');
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

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const Donate = () => {
  const [searchParams] = useSearchParams();
  const initialChildId = searchParams.get('child_id') || '';

  const [sponsorId, setSponsorId] = useState('');
  const [childId, setChildId] = useState(initialChildId);
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleDonate = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/donate', {
        sponsor_id: sponsorId,
        child_id: childId,
        amount: amount
      });

      setMessage(res.data.message);
      setSponsorId('');
      setChildId('');
      setAmount('');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Donation failed');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Make a Donation</h2>
      <form onSubmit={handleDonate} className="space-y-4">
        <input
          type="number"
          placeholder="Sponsor ID"
          value={sponsorId}
          onChange={(e) => setSponsorId(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="number"
          placeholder="Child ID"
          value={childId}
          onChange={(e) => setChildId(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Donate
        </button>
      </form>
      {message && <p className="mt-4 text-green-700 font-semibold">{message}</p>}
    </div>
  );
};

export default Donate;
