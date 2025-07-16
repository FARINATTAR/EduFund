import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChildrenList = () => {
  const [children, setChildren] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/children`)
      .then((res) => setChildren(res.data))
      .catch((err) => console.error('Error fetching children:', err));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Children Needing Sponsorship</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {children.map((child) => (
          <div key={child.child_id} className="bg-white border p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{child.name} (Age {child.age})</h3>
            <p><strong>Background:</strong> {child.background}</p>
            <p><strong>Education Status:</strong> {child.education_status}</p>
            <a
              href={`/donate?child_id=${child.child_id}`}
              className="inline-block mt-3 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
            >
              Sponsor this Child
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChildrenList;
