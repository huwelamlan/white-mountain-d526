// src/components/sections/BrdaTokenSection.tsx
import React, { useState } from "react";
import FadeUp from "../animations/FadeUp";

interface Item {
  id: string;
  title: string;
  description: string[];
}

interface Section {
  id: string;
  title: string;
  description: string;
  items: Item[];
}

const sections: Section[] = [
  {
    id: "why-brda",
    title: "Why BlackRock Digital Asset Token?",
    description:
      "Discover the unique advantages and innovative features that make BlackRock Digital Asset Token the premier digital asset token for modern investors.",
    items: [
      {
        id: "tokenized-investment-vehicles",
        title: "Tokenized Investment Vehicles",
        description: [
          "Fractional Ownership: Invest in high-value assets with smaller, more accessible portions.",
          "Enhanced Liquidity: Trade BRDA tokens seamlessly on leading digital asset exchanges.",
          "Streamlined Processes: Enjoy reduced administrative costs and increased operational efficiency through blockchain automation.",
        ],
      },
      {
        id: "exclusive-services-and-benefits",
        title: "Exclusive Services and Benefits",
        description: [
          "Priority Access: Gain early access to new investment products and exclusive market insights.",
          "Discounted Fees: Benefit from reduced management fees and lower transaction costs.",
          "Dedicated Support: Receive personalized investment advice and premium customer service.",
          "Access to Premium Webinars: Participate in exclusive webinars and workshops tailored for BRDA token holders.",
          "Customized Portfolio Reports: Receive detailed and personalized portfolio analysis reports.",
        ],
      },
      {
        id: "governance-and-voting-rights",
        title: "Governance and Voting Rights",
        description: [
          "Participate in Decision-Making: Use your BRDA tokens to vote on investment strategies and fund allocations.",
          "Influence Corporate Governance: Have a say in the strategic direction of BlackRock’s blockchain initiatives.",
          "Proposal Submission: Submit your own proposals for community voting.",
          "Transparent Voting Process: All votes are recorded on the blockchain for transparency.",
        ],
      },
      {
        id: "cross-border-transactions-and-payments",
        title: "Cross-Border Transactions and Payments",
        description: [
          "Seamless International Investments: Invest across borders effortlessly, bypassing traditional currency barriers.",
          "Reduced Transaction Costs: Save on fees associated with cross-border financial transactions.",
          "Fast Settlements: Experience near-instantaneous settlement times powered by blockchain technology.",
        ],
      },
      {
        id: "transparency-and-compliance",
        title: "Transparency and Compliance",
        description: [
          "Immutable Records: Access clear and unchangeable records of all transactions and holdings.",
          "Automated Compliance: Ensure all investments adhere to relevant financial regulations through smart contract protocols.",
          "Build Trust: Enjoy greater visibility into fund operations and investment processes.",
        ],
      },
      {
        id: "integration-with-defi",
        title: "Integration with Decentralized Finance (DeFi)",
        description: [
          "Institutional-Grade DeFi Products: Access secure and compliant DeFi solutions tailored for institutional investors.",
          "Collaborative Partnerships: Benefit from partnerships with leading DeFi platforms, enhancing your investment options.",
          "Bridging Traditional and Crypto Finance: Seamlessly transition between traditional investment avenues and the cryptocurrency ecosystem.",
        ],
      },
      {
        id: "reward-and-loyalty-programs",
        title: "Reward and Loyalty Programs",
        description: [
          "Loyalty Rewards: Earn BRDA tokens as rewards for long-term investments and client referrals.",
          "Performance-Based Incentives: Receive additional tokens based on the performance of selected funds or investment milestones.",
          "Referral Bonuses: Gain bonus tokens for referring new investors to BRDA.",
          "Milestone Rewards: Unlock exclusive rewards upon reaching certain investment milestones.",
        ],
      },
      {
        id: "data-and-analytics-access",
        title: "Data and Analytics Access",
        description: [
          "Premium Research Reports: Unlock access to in-depth market analysis and proprietary investment research.",
          "Advanced Analytics Tools: Utilize sophisticated tools for portfolio management and risk assessment, exclusive to BRDA token holders.",
          "Real-Time Data Dashboards: Access up-to-date data visualization tools for monitoring your investments.",
          "Customized Analytics: Generate tailored analytics reports based on your investment preferences.",
        ],
      },
      {
        id: "enhanced-security-measures",
        title: "Enhanced Security Measures",
        description: [
          "Robust Security Protocols: Implement advanced encryption and multi-factor authentication to protect investor assets.",
          "Continuous Monitoring: Employ real-time monitoring systems to detect and mitigate potential threats.",
          "Regulatory Adherence: Maintain strict compliance with global security standards to ensure the safety and integrity of all transactions.",
        ],
      },
    ],
  },
];

const BrdaTokenSection: React.FC = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-6 lg:px-12">
        {sections.map((section) => (
          <div key={section.id} className="py-1 px-1">
            <h2 className="text-3xl font-semibold text-center text-white mb-6">
              {section.title}
            </h2>
            <p className="text-white text-center mb-12 whitespace-pre-line">
              {section.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {section.items.map((item, idx) => (
                <FadeUp key={item.id} delay={0.2 * idx}>
                  <div className="flex flex-col justify-between p-6 bg-gray-900 rounded-2xl shadow-3xl transition duration-300 hover:bg-gray-800 h-full">
                    <div>
                      <h3 className="text-xl font-medium text-white mb-4">
                        {item.title}
                      </h3>
                      <ul
                        id={`description-${item.id}`}
                        className={`list-disc list-inside space-y-2 text-white text-sm ${
                          expanded[item.id] ? "" : "line-clamp-4 overflow-hidden"
                        }`}
                      >
                        {item.description.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                      {item.description.length > 2 && (
                        <button
                          onClick={() => toggleExpand(item.id)}
                          className="mt-2 text-white-400 text-sm hover:text-white-300 focus:outline-none"
                          aria-expanded={expanded[item.id] ? "true" : "false"}
                          aria-controls={`description-${item.id}`}
                        >
                          {expanded[item.id] ? "Show Less" : "Read More"}
                        </button>
                      )}
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrdaTokenSection;
