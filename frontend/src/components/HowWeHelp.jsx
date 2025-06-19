import React from 'react';
import { ShoppingCart, DollarSign, Handshake } from 'lucide-react';

const HowYouCanHelp = () => {
  const helpSections = [
    {
      icon: <ShoppingCart className="text-yellow-400 w-14 h-14" />,
      title: "Leftovers to Life 🍲",
      description:
        "Hosting an event? Running a restaurant? Instead of letting good food go to waste, let's put it to good use.",
      stats: [
        "Feed families with your extra meals",
        "Quick pickups. Real impact. Zero waste.",
      ],
      extraText:
        "With just a few clicks, schedule a pickup and feed someone in need. No red tape, no hassle — just impact.",
      bgGradient: "from-[#fde68a]/50 to-[#fcd34d]/60",
      buttonText: "Donate Surplus Food",
    },
    {
      icon: <DollarSign className="text-green-400 w-14 h-14" />,
      title: "Community Funds 💸",
      description:
        "Your contributions help fund education, healthcare, and basic needs for underprivileged communities.",
      stats: [
        "Even a small donation can create lasting change",
        "Support long-term solutions to fight hunger",
      ],
      bgGradient: "from-[#34d399]/20 to-[#065f46]/30",
      buttonText: "Contribute",
    },
    {
      icon: <Handshake className="text-blue-400 w-14 h-14" />,
      title: "Partner With Us 🤝",
      description:
        "Businesses, NGOs, and changemakers—join us in making a larger impact. Let's create a hunger-free world together.",
      stats: [
        "Collaborate on food drives and fundraising",
        "Leverage networks to expand impact",
      ],
      bgGradient: "from-[#60a5fa]/20 to-[#1e3a8a]/30",
      buttonText: "Partner Now",
    },
  ];

  return (
    <div className="bg-[#f0f4ff] text-white py-24 px-6">
      {/* Heading */}
      <h2 className="text-5xl text-black font-extrabold text-center mb-16 font-poppins">
        Be the Change: <span className="text-yellow-500">Make an Impact Today!</span>
      </h2>

      {/* Help Cards */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        {helpSections.map((section, index) => (
          <div
            key={index}
            className={`relative rounded-3xl p-8 bg-gradient-to-br ${section.bgGradient}
              border border-white/10 shadow-xl backdrop-blur-sm transition transform 
              hover:scale-105 hover:shadow-yellow-400/40 flex flex-col h-full`}
          >
            {/* Glass effect overlay */}
            <div className="absolute inset-0 bg-white/5 rounded-3xl backdrop-blur-md z-0" />

            {/* Content */}
            <div className="relative z-10 space-y-6 text-black flex flex-col flex-grow">
              <div className="flex items-center space-x-4 mb-4">
                {section.icon}
                <h3 className="text-3xl font-bold">{section.title}</h3>
              </div>
              <p className="text-lg text-black/90">{section.description}</p>
              {section.extraText && (
                <p className="text-gray-700 text-base">{section.extraText}</p>
              )}
              <ul className="space-y-3">
                {section.stats.map((stat, statIndex) => (
                  <li key={statIndex} className="flex items-center text-black/80">
                    <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full mr-3" />
                    {stat}
                  </li>
                ))}
              </ul>
              <button className="mt-auto px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl transition shadow-md">
                {section.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Volunteer CTA */}
      <div className="mt-20 flex justify-center">
        <button className="w-full max-w-3xl py-4 text-2xl font-semibold bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition shadow-md">
          Become a Volunteer
        </button>
      </div>
    </div>
  );
};

export default HowYouCanHelp;