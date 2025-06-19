import React, { useState, useEffect } from 'react';
import '../../src/ChooseRole.css'; // Ensure this path is correct based on your project structure
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';
import SponsorChildLanding from '../pages/SponsorLanding';
const ChooseRole = () => {
  const navigate = useNavigate();
  const [stage] = useState(0);
  const [currentImageIndex] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [followerPos, setFollowerPos] = useState({ x: 0, y: 0 });
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    const moveHandler = e => {
      setCursorPos({ x: e.clientX - 10, y: e.clientY - 10 });
      setTimeout(() => {
        setFollowerPos({ x: e.clientX - 20, y: e.clientY - 20 });
      }, 100);
    };
    document.addEventListener('mousemove', moveHandler);
    return () => document.removeEventListener('mousemove', moveHandler);
  }, []);

  useEffect(() => {
    document.querySelectorAll('.role-card, .mega-cta').forEach(el => {
      el.addEventListener('mouseenter', () => {
        document.querySelector('.cursor').style.transform = 'scale(2)';
        document.querySelector('.cursor-follower').style.transform = 'scale(1.5)';
      });
      el.addEventListener('mouseleave', () => {
        document.querySelector('.cursor').style.transform = 'scale(1)';
        document.querySelector('.cursor-follower').style.transform = 'scale(1)';
      });
    });
    const opts = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible'));
    }, opts);
    document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
  }, []);

  const handleCardClick = role => {
    setSelectedRole(role);
    document.querySelectorAll('.role-card').forEach(c => {
      c.style.opacity = '0.5'; c.style.transform = 'scale(0.95)'; c.style.boxShadow = '';
    });
    const card = document.querySelector(`[data-role="${role}"]`);
    card.style.opacity = '1';
    card.style.transform = 'scale(1.05) rotateY(0deg) rotateX(0deg)';
    card.style.boxShadow = '0 0 50px rgba(255, 107, 107, 0.6)';
    setTimeout(() => {
      document.querySelectorAll('.role-card').forEach(c => {
        c.style.opacity = '1'; c.style.transform = ''; c.style.boxShadow = '';
      });
    }, 2000);
  };

  const startJourney = () => {
    if (selectedRole) {
      // Optional animation
      document.body.style.transition = 'all 1s ease';
      document.body.style.background = 'radial-gradient(circle, #ff6b6b, #000)';

      // Navigate after slight delay
      setTimeout(() => {
        switch (selectedRole) {
          case 'volunteer':
            navigate('/volunteer/profile');
            break;
          case 'food-donor':
            navigate('/donor/profile');
            break;
          case 'child-sponsor':
            navigate('/sponsor/profile');
            break;
          case 'fund-donor':
            navigate('/fund/profile');
            break;
          default:
            alert('🚀 Role selected but no page set.');
        }
      }, 800);
    } else {
      // Handle no role selected
      const section = document.querySelector('.roles-section');
      section.style.animation = 'shake 0.5s ease-in-out';
      setTimeout(() => {
        section.style.animation = '';
        section.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  };


  // Particle system
  useEffect(() => {
    const interval = setInterval(() => {
      const particle = document.createElement('div');
      Object.assign(particle.style, {
        position: 'fixed', width: '2px', height: '2px', background: '#ff6b6b', borderRadius: '50%', pointerEvents: 'none',
        left: Math.random() * window.innerWidth + 'px', top: window.innerHeight + 'px', zIndex: '1000', opacity: '0.8'
      });
      document.body.appendChild(particle);
      const anim = particle.animate([
        { transform: 'translateY(0px)', opacity: 0.8 },
        { transform: `translateY(-${window.innerHeight + 100}px)`, opacity: 0 }
      ], { duration: Math.random() * 3000 + 2000, easing: 'linear' });
      anim.onfinish = () => particle.remove();
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Custom cursors */}
      <div className="cursor" style={{ left: cursorPos.x, top: cursorPos.y }}></div>
      <div className="cursor-follower" style={{ left: followerPos.x, top: followerPos.y }}></div>

      {/* Main content */}
      <div className="animated-bg">
        <div className="orb"></div><div className="orb"></div><div className="orb"></div>
      </div>
    <section className="hero">
    <h1 className="glitch-text">Be the Reason Someone Smiles Today</h1>
    <p className="subtitle">Choose how you want to give back — feed families, support children, or uplift communities.</p>

    </section>

      <section className="roles-section">
        <div className="roles-grid">
{[
  {
    icon: '🍱',
    title: 'Food Donor',
    role: 'food-donor',
    desc: 'Partner with us to donate excess food from your home, event, or restaurant. One act can fill many plates.',
    stats: '1.2K MEALS SHARED',
    cta: 'Donate Food',
  },
  {
    icon: '🤝',
    title: 'Volunteer',
    role: 'volunteer',
    desc: 'Support us on-ground or remotely — help in verifying needs, delivering food, or organizing local drives.',
    stats: '500+ ACTIVE VOLUNTEERS',
    cta: 'Join as Volunteer',
  },
  {
    icon: '🎓',
    title: 'Sponsor a Child',
    role: 'child-sponsor',
    desc: 'Support a child’s education, nutrition, and dreams. Change one life, and you change generations.',
    stats: '2.4K LIVES SPONSORED',
    cta: 'Sponsor Now',
  },
  {
    icon: '💖',
    title: 'Community Fund Donor',
    role: 'fund-donor',
    desc: 'Contribute to our Community Fund for urgent medical, educational, and family needs. Every rupee counts.',
    stats: '₹10L+ RAISED',
    cta: 'Support the Fund',
  }
].map(({ icon, title, role, desc, stats, cta }, idx) => (
  <div
    key={idx}
    className="role-card fade-in"
    data-role={role}
    onClick={() => handleCardClick(role)}
  >
    <div className="role-header">
      <div className="role-icon">{icon}</div>
      <h3 className="role-title">{title}</h3>
    </div>
    <div className="role-content">
      <p className="role-description">{desc}</p>
      <div className="role-stats">{stats}</div>
<button
  className="role-cta"
  onClick={(e) => {
    e.stopPropagation(); // prevent triggering the card click again
    switch (role) {
      case 'child-sponsor':
        navigate('/sponsor-a-child'); // 👈 Navigates to sponsor landing page
        break;
        handleCardClick(role);
    }
  }}

>
  {cta}
</button>
    </div>
  </div>
))}

        </div>
      </section>
      <section className="final-cta">
        <h2 className="final-message">Ready to rewrite someone's story?</h2>
        <button className="mega-cta" onClick={startJourney}>IGNITE MY IMPACT →</button>
      </section>
    </>
  );
};

export default ChooseRole;
