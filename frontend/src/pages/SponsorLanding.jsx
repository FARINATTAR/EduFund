import React, { useState, useEffect } from 'react';
import { Heart, BookOpen, Home, Users, Mail, User, DollarSign } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SponsorChildLanding = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [activeChild, setActiveChild] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setShowStickyBar(window.scrollY > 2000);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

    const [children, setChildren] = useState([]);

    useEffect(() => {
    axios.get('http://localhost:5000/api/children')
        .then((res) => setChildren(res.data))
        .catch((err) => console.error('Error fetching children:', err));
    }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-x-hidden">
      {/* Section 1: Fullscreen Emotional Story */}
      <section className="h-screen relative flex items-center justify-center">
        <div className="absolute top-6 right-6 flex gap-4 z-20">
  <Link to="/sponsor/signup">
    <button className="bg-white text-orange-600 font-bold px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg">
      Sign Up
    </button>
  </Link>
  <Link to="/sponsor/login">
    <button className="bg-orange-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-orange-700 transition-all duration-300 shadow-lg">
      Login
    </button>
  </Link>
</div>

        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'400\' height=\'300\' viewBox=\'0 0 400 300\'%3E%3Crect width=\'400\' height=\'300\' fill=\'%23f59e0b\'/%3E%3Cpath d=\'M200 150c-30 0-55-25-55-55s25-55 55-55 55 25 55 55-25 55-55 55z\' fill=\'%23d97706\' opacity=\'0.3\'/%3E%3C/svg%3E")',
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div 
            className="mb-8"
            style={{ transform: `translateY(${scrollY * -0.2}px)` }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg mb-6 leading-tight">
              "She walks 2km every day<br />
              <span className="text-amber-400">to watch other kids study."</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 font-light mb-8 max-w-2xl mx-auto">
              You can be the reason she walks inside the classroom.
            </p>
          </div>
          
          <button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-lg text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-4 border-white">
            Sponsor a Child Now
          </button>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Section 2: Transition Quote */}
      <section className="py-32 bg-transparent relative z-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div 
            className="transform transition-all duration-1000"
            style={{ 
              transform: `translateY(${Math.max(0, (scrollY - 800) * -0.3)}px)`,
              opacity: Math.min(1, Math.max(0, (scrollY - 600) / 400))
            }}
          >
            <blockquote className="text-3xl md:text-5xl font-light text-white mb-8 leading-relaxed">
              "Education is not preparation for life;<br />
              <span className="text-amber-400 font-semibold">education is life itself."</span>
            </blockquote>
            <p className="text-xl text-gray-300 font-light">
              Every child deserves the chance to discover their potential
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Riya's Letter & Impact */}
      <section className="py-20 bg-gradient-to-br from-slate-800 to-slate-900 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Left: Riya's Letter */}
            <div className="relative">
              <div className="bg-white p-8 rounded-2xl shadow-2xl border-4 border-amber-400 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="bg-amber-50 p-6 rounded-lg font-mono italic text-gray-800 leading-relaxed">
                  <h3 className="text-2xl font-bold text-amber-800 mb-4">Dear Future Sponsor,</h3>
                  <p className="mb-4">
                    My name is Riya and I am 9 years old. I live with my grandmother in a small house. 
                    Every morning, I help her sell vegetables before going to school.
                  </p>
                  <p className="mb-4">
                    I love to read stories but we don't have books at home. My teacher says I am good 
                    at drawing. I want to become an artist someday and draw beautiful pictures.
                  </p>
                  <p className="mb-4">
                    Thank you for helping children like me. I promise to study hard and make you proud.
                  </p>
                  <p className="text-right font-bold text-amber-800">
                    With love,<br />
                    Riya ♥
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Impact Message */}
            <div className="text-white space-y-8">
              <h2 className="text-4xl font-bold mb-6">Stories Like Riya's</h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Every child has dreams that stretch far beyond their circumstances. 
                Your sponsorship doesn't just provide education - it transforms entire futures.
              </p>
              <button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-4 border-white">
                Sponsor a Child Like Riya
              </button>
            </div>
          </div>

          {/* Impact Numbers */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-red-500 to-red-600 p-8 rounded-2xl shadow-2xl border-4 border-white transform hover:scale-105 transition-all duration-300">
              <div className="text-center text-white">
                <Users className="w-12 h-12 mx-auto mb-4" />
                <div className="text-4xl font-bold mb-2">40M+</div>
                <p className="text-red-100">Indian children need educational support</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 p-8 rounded-2xl shadow-2xl border-4 border-white transform hover:scale-105 transition-all duration-300">
              <div className="text-center text-white">
                <DollarSign className="w-12 h-12 mx-auto mb-4" />
                <div className="text-4xl font-bold mb-2">₹1500</div>
                <p className="text-green-100">monthly keeps a child in school with meals & supplies</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-2xl shadow-2xl border-4 border-white transform hover:scale-105 transition-all duration-300">
              <div className="text-center text-white">
                <Heart className="w-12 h-12 mx-auto mb-4" />
                <div className="text-4xl font-bold mb-2">100%</div>
                <p className="text-blue-100">of donations go directly to children's verified needs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Children Grid */}
      <section className="min-h-screen bg-gradient-to-b from-slate-900 to-black py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
            Meet the Children Waiting for You
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
            {children.map((child, index) => (
                  <Link to={`/donate?child_id=${child.child_id}`} key={child.child_id}>

            <div
                // key={child.id}
                className="relative group cursor-pointer transform hover:scale-105 transition-all duration-500"
                onMouseEnter={() => setActiveChild(index)}
                onMouseLeave={() => setActiveChild(null)}
            >
                <div className="aspect-square bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-4 shadow-2xl border-4 border-white">
                <div className="w-full h-full bg-gradient-to-br from-amber-300 to-orange-400 rounded-xl flex items-center justify-center relative overflow-hidden">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-orange-500" />
                    </div>

                    {/* Overlay */}
                    <div className={`absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center transition-opacity duration-300 ${activeChild === index ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="text-center text-white p-4">
                        <p className="text-lg font-bold mb-2">{child.background}</p>
                        <p className="text-sm text-gray-300">{child.location}</p>
                    </div>
                    </div>
                </div>

                <div className="mt-3 text-center">
                    <h3 className="text-xl font-bold text-white">{child.name}</h3>
                    <p className="text-orange-200">Age {child.age}</p>
                </div>
                </div>
            </div> 
            </Link>
            ))}

          </div>
        </div>
      </section>

      {/* Sticky Bottom Bar */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-amber-500 to-orange-600 p-4 shadow-2xl border-t-4 border-white z-50 transform transition-transform duration-500">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-white">
              <h3 className="text-lg font-bold">Ready to change a life?</h3>
              <p className="text-sm text-orange-100">Start sponsoring a child today</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-3 items-center">
              <input
                type="text"
                placeholder="Your name"
                className="px-4 py-2 rounded-lg border-2 border-white text-gray-900 w-40"
              />
              <input
                type="email"
                placeholder="Email"
                className="px-4 py-2 rounded-lg border-2 border-white text-black placeholder-gray-600 w-40"
              />
              <select className="px-4 py-2 rounded-lg border-2 border-white text-gray-900">
                <option>₹1500/month</option>
                <option>₹3000/month</option>
                <option>₹5000/month</option>
                <option>Custom amount</option>
              </select>
              <button className="bg-white text-orange-600 font-bold py-2 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-300 border-2 border-orange-600">
                Start Sponsoring
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SponsorChildLanding;