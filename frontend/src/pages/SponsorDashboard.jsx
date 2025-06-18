import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SponsorDonations = () => {
  const { id } = useParams();
  const [sponsor, setSponsor] = useState({});
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/sponsors/${id}/donations`)
      .then((res) => {
        setSponsor(res.data.sponsor);
        setDonations(res.data.donations);
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div className="p-6 max-w-2xl mx-auto bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-4 text-center">Donation History</h2>

      <div className="bg-white p-4 rounded shadow mb-6">
        <p><strong>Name:</strong> {sponsor.name}</p>
        <p><strong>Email:</strong> {sponsor.email}</p>
        <p><strong>Total Donated:</strong> ₹{sponsor.total_donated}</p>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-xl font-semibold">Your Donations</h3>
        <a
          href={`http://localhost:5000/api/sponsors/${id}/donations/export`}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          download
        >
          ⬇️ Download CSV
        </a>
      </div>

      {donations.length === 0 ? (
        <p className="text-gray-600">No donations yet.</p>
      ) : (
        <ul className="space-y-3">
          {donations.map((d, i) => (
            <li key={i} className="bg-white border rounded p-4 shadow-sm">
              <p><strong>Child:</strong> {d.child_name}</p>
              <p><strong>Amount:</strong> ₹{d.amount}</p>
              <p><strong>Date:</strong> {new Date(d.donation_date).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SponsorDonations;
