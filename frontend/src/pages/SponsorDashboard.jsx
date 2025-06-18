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
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Donation History</h2>
      <p><strong>Name:</strong> {sponsor.name}</p>
      <p><strong>Email:</strong> {sponsor.email}</p>

      <h3 className="text-xl font-semibold mt-6 mb-3">Donations:</h3>
      {donations.length === 0 ? (
        <p className="text-gray-600">No donations yet.</p>
      ) : (
        <ul className="space-y-2">
          {donations.map((d, i) => (
            <li key={i} className="p-3 border rounded">
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
