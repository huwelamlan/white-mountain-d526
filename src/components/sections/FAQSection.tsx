// src/components/FAQSection.tsx
import React, { useState } from "react";
import FadeUp from "../animations/FadeUp";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is the BlackRock Digital Asset Token (BRDA)?",
    answer:
      "The BlackRock Digital Asset Token (BRDA) is a proprietary cryptocurrency designed to revolutionize asset management by leveraging blockchain technology. It offers investors secure, transparent, and efficient access to a diversified portfolio of high-value assets managed by BlackRock.",
  },
  {
    question: "How can I purchase BRDA tokens?",
    answer:
      `You can purchase BRDA tokens using MetaMask or any compatible decentralized exchange (DEX) wallet. Follow these steps to acquire your BRDA tokens:

1. Set Up Your Wallet:
   - MetaMask: If you don't already have MetaMask, download and install the [MetaMask extension](https://metamask.io/) for your browser. Follow the setup instructions to create a new wallet or import an existing one.
   - Other DEX Wallets: Alternatively, you can use other wallets compatible with decentralized exchanges, such as Trust Wallet, Coinbase Wallet, or WalletConnect-enabled wallets.

2. Fund Your Wallet:
   - Ensure your wallet is funded with the required cryptocurrency (typically Ethereum (ETH) or Binance Coin (BNB), depending on the blockchain BRDA operates on).
   - You can purchase ETH or BNB from reputable exchanges like Coinbase, Binance, or directly within MetaMask using integrated buy options.

3. Connect Your Wallet to a DEX:
   - Visit a BlackRock Digital Asset Token Presale.
   - Click on the "Connect Wallet" button and follow the prompts to connect your MetaMask or preferred DEX wallet.

4. Exchange Cryptocurrency for BRDA Tokens:
   - Once your wallet is connected, navigate to the exchange interface.
   - Select the cryptocurrency you wish to swap (e.g., ETH or BNB) and enter the amount.
   - Review the transaction details, including the exchange rate and any associated fees.
   - Confirm the swap and authorize the transaction in your wallet.

5. Verify Your BRDA Tokens:
   - After the transaction is confirmed, your BRDA tokens will appear in your wallet.
   - You may need to add BRDA as a custom token in your wallet using the contract address for visibility.

6. Secure Your Investment:
   - Consider transferring your BRDA tokens to a secure hardware wallet for enhanced security.
   - Regularly monitor your wallet and stay informed about updates or changes related to BRDA.`,
  },
  {
    question: "What are the utilities of the BRDA token?",
    answer:
      "BRDA tokens provide various utilities, including fractional ownership of investment vehicles, enhanced liquidity, access to exclusive services and benefits, governance and voting rights, seamless cross-border transactions, transparency and compliance features, integration with decentralized finance (DeFi) platforms, reward and loyalty programs, and access to premium data and analytics tools.",
  },
  {
    question: "Is BRDA compliant with financial regulations?",
    answer:
      "Yes, BRDA is developed with regulatory compliance at its core. We have implemented automated compliance protocols within our smart contracts to ensure adherence to all relevant financial regulations. Additionally, our team continuously monitors and updates our compliance strategies to align with evolving legal standards.",
  },
  {
    question: "How does BRDA ensure the security of my investment?",
    answer:
      "BRDA employs robust security measures, including advanced encryption, multi-factor authentication, and secure storage solutions to protect investor assets. We also conduct regular security audits and employ real-time monitoring systems to detect and mitigate potential threats, ensuring the safety and integrity of all transactions.",
  },
  {
    question: "Can I trade BRDA tokens on cryptocurrency exchanges?",
    answer:
      "Yes, once BRDA is officially launched on the mainnet, it will be listed on major cryptocurrency exchanges. This will provide investors with the flexibility to trade BRDA tokens seamlessly, enhancing liquidity and market accessibility.",
  },
  {
    question: "What benefits do BRDA token holders receive?",
    answer:
      "BRDA token holders enjoy a range of benefits, including priority access to new investment products, discounted management fees and transaction costs, personalized investment advice, premium customer support, staking rewards, referral bonuses, and exclusive participation in governance and voting on key investment strategies.",
  },
  {
    question: "How does governance work with BRDA tokens?",
    answer:
      "BRDA tokens grant holders governance and voting rights within the BRDA ecosystem. Token holders can participate in decision-making processes related to investment strategies, fund allocations, and the strategic direction of BlackRock’s blockchain initiatives. This empowers investors to have a direct influence on the management and growth of their investments.",
  },
  {
    question: "What is the total supply of BRDA tokens?",
    answer:
      "The total supply of BRDA tokens is capped at 1,000,000,000 BRDA. This fixed supply ensures scarcity and potential value appreciation as demand for the token grows within the investment and digital finance ecosystems.",
  },
];

const FAQSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-16">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="mt-3 h-1 w-24 bg-gold mx-auto rounded-full"></div>
        </div>

        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <FadeUp key={index} delay={0.2 * index}>
              <div className="bg-gray-900 rounded-2xl shadow-2xl border border-gold">
                <button
                  className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={activeIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-xl font-medium text-white">{faq.question}</span>
                  <span className="text-2xl text-gold">
                    {activeIndex === index ? "-" : "+"}
                  </span>
                </button>
                {activeIndex === index && (
                  <div
                    id={`faq-answer-${index}`}
                    className="px-6 pb-6 text-white text-sm"
                  >
                    {faq.answer.split('\n').map((line, idx) => (
                      <p key={idx} className="mb-2">
                        {line}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
