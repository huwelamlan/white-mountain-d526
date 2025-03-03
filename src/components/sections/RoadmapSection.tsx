// src/components/RoadmapSection.tsx
import React from "react";
import FadeUp from "../animations/FadeUp";

const roadmap = [
  {
    steps: [
      "Conduct comprehensive market research and feasibility study",
      "Engage with stakeholders and form an advisory board",
      "Design tokenomics including supply, distribution, and utility",
      "Develop regulatory compliance strategy",
    ],
    date: "2024 Q1 - Q2",
    done: true,
  },
  {
    steps: [
      "Develop and deploy secure smart contracts",
      "Plan integration strategies with BlackRock’s platforms (e.g., investment portals, asset management tools)",
      "Conduct third-party security audits",
      "Finalize token distribution model and mechanisms",
      "Establish mechanisms for token burn or buyback",
    ],
    date: "2024 Q3 - Q4",
    done: true,
  },
  {
    steps: [
      "Release BRDA in a beta environment to select users",
      "Launch community programs and educational initiatives",
      "Host webinars, AMAs, and workshops for community engagement",
      "Form strategic partnerships with payment gateways and cryptocurrency exchanges",
      "Gather and analyze feedback from beta users",
    ],
    date: "2025 Q1",
    done: true,
  },
  {
    steps: [
      "Officially launch BRDA on the mainnet",
      "Deploy seamless integration within BlackRock’s platforms for transactions",
      "Execute global marketing campaigns and influencer partnerships",
      "List BRDA on major cryptocurrency exchanges",
      "Introduce staking rewards, referral bonuses, and incentive programs",
    ],
    date: "2025 Q2",
    done: true,
  },
  {
    steps: [
      "Launch a token-based marketplace for investment products, data analytics, and digital services",
      "Provide SDKs and developer tools for third-party integrations",
      "Implement decentralized governance features for token holders",
      "Establish global partnerships with financial institutions and payment providers",
      "Collaborate with research institutions, fintech, and cloud computing sectors",
    ],
    date: "2025 Q3 - Q4",
    done: true,
  },
  {
    steps: [
      "Enhance scalability with layer-2 solutions or more scalable blockchains",
      "Conduct regular security audits and implement the latest security practices",
      "Continuously improve user interface and token-related features",
      "Maintain open channels for user feedback and adapt to emerging trends",
      "Implement sustainability initiatives and eco-friendly blockchain solutions",
    ],
    date: "2026 Q1",
    done: true,
  },
];

const RoadmapSection = () => {
  return (
    <section id="roadmap" className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-semibold text-white">Roadmap</h2>
          <div className="mt-3 h-1 w-24 bg-gold mx-auto rounded-full"></div>
        </div>
        <div className="flex flex-col space-y-16">
          {roadmap.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <FadeUp key={`roadmap-item-${index}`} delay={0.3 * index}>
                <div className="flex flex-col items-center md:flex-row">
                  {isEven ? (
                    <div className="hidden md:flex md:w-1/2 md:justify-end md:pr-8">
                      <div className="bg-gray-900 p-6 rounded-2xl shadow-2xl border border-gold w-full max-w-md">
                        <p className="text-gold font-medium text-lg mb-3">
                          {item.date}
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-white text-sm">
                          {item.steps.map((step, stepIndex) => (
                            <li key={`step-${index}-${stepIndex}`}>{step}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="hidden md:flex md:w-1/2 md:justify-start md:pl-8"></div>
                  )}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-14 h-14 flex items-center justify-center text-white font-semibold rounded-full ${
                        item.done ? "bg-gold" : "bg-gray-400"
                      } mb-4`}
                    >
                      {index + 1}
                    </div>
                    <div
                      className={`w-1 h-4 ${
                        index === roadmap.length - 1
                          ? "bg-gold opacity-50"
                          : "bg-gold"
                      }`}
                    />
                  </div>
                  {!isEven ? (
                    <div className="hidden md:flex md:w-1/2 md:justify-start md:pl-8">
                      <div className="bg-gray-900 p-6 rounded-2xl shadow-2xl border border-gold w-full max-w-md">
                        <p className="text-gold font-medium text-lg mb-3">
                          {item.date}
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-white text-sm">
                          {item.steps.map((step, stepIndex) => (
                            <li key={`step-${index}-${stepIndex}`}>{step}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="hidden md:flex md:w-1/2 md:justify-end md:pr-8"></div>
                  )}
                  <div className="md:hidden flex flex-col items-center w-full">
                    <div className="bg-gray-900 p-6 rounded-2xl shadow-2xl border border-gold w-full max-w-md">
                      <p className="text-gold font-medium text-lg mb-3 text-center">
                        {item.date}
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-white text-sm">
                        {item.steps.map((step, stepIndex) => (
                          <li key={`step-${index}-${stepIndex}`}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
