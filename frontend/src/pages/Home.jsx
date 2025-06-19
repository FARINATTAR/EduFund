import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Earth from '../models/Earth';
import HungerImpactSection from '../Components/WhyWeExist';
import HowYouCanHelp from '../Components/HowWeHelp';
import BadgesSection from '../Components/BadgesSection';
import CTASection from '../Components/CTASection';
import Footer from '../Components/Footer'

const Home = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className="bg-blue-50 min-h-screen w-full text-white flex flex-col items-center">
      <Navbar />
      
      {/* Centered Content */}
      <div className="flex flex-col items-center justify-center mt-20 md:mt-18 space-y-12 text-center">
        {/* Animated Headings */}
        <h1 className={`quicksand-regular text-5xl md:text-7xl text-yellow-600 transition-all duration-1000 ease-out transform ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          TOGETHER WE THRIVE TOGETHER
        </h1>
        <h2 className={`quicksand-regular text-4xl md:text-6xl font-bold text-yellow-600 transition-all duration-1000 ease-out delay-500 transform ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          WE EXIST
        </h2>
        <p className='font-dela-gothic1 text-yellow-600 -mt-[15px]'>
          WeExist is not just a platform, it’s a network of hope. Whether you have extra food, want to volunteer, or sponsor a child’s education — we’ve got you covered.
        </p>
        
        {/* Earth Model - Centered Properly */}
        <div className="w-full h-[500px] flex justify-center items-center -mt-15">
          <Earth />
        </div>

        <div>
          <HungerImpactSection/>
        </div>

        <div>
          <HowYouCanHelp/>
        </div>

        {/* <div>
          <ImpactTracker/>
        </div> */}
      </div>

      <div>
        <BadgesSection/>
      </div>

      <div>
        <CTASection/>
      </div>

      <div className='w-full'>
        <Footer/>
      </div>
    </div>
  );
};

export default Home;
