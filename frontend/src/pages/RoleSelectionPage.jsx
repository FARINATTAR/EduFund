import React, { useState, useEffect } from 'react'; // <-- Corrected import statement
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChooseRole from '../components/RoleSelectionComponent';  

const RoleSelection = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div>
        <Navbar/>

        <div>
            <ChooseRole/>
        </div>

      <div className='w-full'>
        <Footer/>
      </div>
    </div>
  );
};

export default RoleSelection;