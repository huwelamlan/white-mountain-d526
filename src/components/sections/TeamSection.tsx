// src/components/TeamSection.tsx
import React from "react";
import LarryFink from "../../assets/img/larry-fink.png";
import RobKapito from "../../assets/img/rob-kapito.png";
import CathyWoods from "../../assets/img/cathy-woods.png";
import RickRieder from "../../assets/img/rick-rieder.png";
import MarkWiedman from "../../assets/img/mark-wiedman.png";
import FadeUp from "../animations/FadeUp";

const TeamSection: React.FC = () => {
  const team = [
    {
      name: "Larry Fink",
      role: "Chairman and CEO",
      img: LarryFink,
      linkedin: "https://www.linkedin.com/in/larryfink",
      twitter: "https://twitter.com/larryfink",
      telegram: undefined,
    },
    {
      name: "Rob Kapito",
      role: "President",
      img: RobKapito,
      linkedin: "https://www.linkedin.com/in/robkapito",
      twitter: "https://twitter.com/robkapito",
      telegram: undefined,
    },
    {
      name: "Cathy Woods",
      role: "CEO of ARK Invest",
      img: CathyWoods,
      linkedin: "https://www.linkedin.com/in/cathywoods",
      twitter: "https://twitter.com/cathywoods",
      telegram: undefined,
    },
    {
      name: "Rick Rieder",
      role: "Chief Investment Officer, Global Fixed Income",
      img: RickRieder,
      linkedin: "https://www.linkedin.com/in/rickrieder",
      twitter: "https://twitter.com/rickrieder",
      telegram: undefined,
    },
    {
      name: "Mark Wiedman",
      role: "Global Head of Alternative Investments",
      img: MarkWiedman,
      linkedin: "https://www.linkedin.com/in/markwiedman",
      twitter: "https://twitter.com/markwiedman",
      telegram: undefined,
    },
  ];

  return (
    <section id="team" className="py-16 text-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-semibold mb-4">Our Team</h2>
          <p className="text-gray-400">
            Meet the dedicated professionals driving our success.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {team.map((member, index) => (
            <FadeUp key={index} delay={0.2 * index}>
              <div className="flex flex-col items-center bg-gray-800 rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105">
                <div className="w-32 h-32 mb-6 overflow-hidden rounded-full border-4 border-gold">
                  {member.img ? (
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                      <span className="text-white text-xl">No Image</span>
                    </div>
                  )}
                </div>
                <div className="text-center px-4">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-gray-400 mb-4">{member.role}</p>
                  <div className="flex justify-center space-x-4">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gold transition-colors duration-200"
                        aria-label={`${member.name} on LinkedIn`}
                      >
                        {/* LinkedIn icon can be added here */}
                      </a>
                    )}
                    {member.twitter && (
                      <a
                        href={member.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gold transition-colors duration-200"
                        aria-label={`${member.name} on Twitter`}
                      >
                        {/* Twitter icon can be added here */}
                      </a>
                    )}
                    {member.telegram && (
                      <a
                        href={member.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gold transition-colors duration-200"
                        aria-label={`${member.name} on Telegram`}
                      >
                        {/* Telegram icon can be added here */}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
