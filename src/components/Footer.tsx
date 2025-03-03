// src/components/Footer.tsx
import { ReactComponent as Logo } from "../assets/svg/logo.svg";

const footerLinks = [
  {
    title: "Company",
    links: [
      {
        name: "About BlackRock.",
        href: "https://www.blackrock.com/us/individual/about-us/about-blackrock",
      },
      {
        name: "Privacy Policy",
        href: "https://www.blackrock.com/corporate/compliance/privacy-policy",
      },
      {
        name: "Terms of Service",
        href: "https://www.blackrock.com/corporate/compliance/terms-and-conditions",
      },
      {
        name: "Contact",
        href: "https://www.blackrock.com/us/individual/resources/contact-us",
      },
    ],
  },
  {
    title: "Funds",
    links: [
      { name: "Mutual funds", href: "https://www.blackrock.com/us/individual/products/investment-funds#/?productView=mutualFunds&&style=44341|44342" },
      { name: "iShares ETFs", href: "https://www.blackrock.com/us/individual/products/investment-funds#/?productView=ishares&&style=44341|44342" },
      { name: "Cash Alternatives", href: "https://www.blackrock.com/us/individual/products/investment-funds#/?productView=all&&style=44341|44342&&fac=43542" },
      { name: "Multi-asset funds", href: "https://www.blackrock.com/us/individual/products/investment-funds#/?productView=all&&style=44341|44342&&fac=43569|43589|43619|43625|43768|43778|43586|61455|OTHR43521" },
    ],
  },
  {
    title: "Active Strategies",
    links: [
      { name: "BlackRock Impact Opportunities", href: "https://www.blackrock.com/us/individual/investment-ideas/alternative-investments/blackrock-impact-opportunities" },
      { name: "Fixed Income", href: "https://www.blackrock.com/us/individual/investment-ideas/active-fixed-income" },
      { name: "Fundamental Equities", href: "https://www.blackrock.com/us/individual/investment-ideas/fundamental-equities" },
      { name: "Systematic Investing", href: "https://www.blackrock.com/us/individual/investment-ideas/systematic-investing" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-transparent">
      <div className="h-px bg-gradient-to-r from-white/20 to-white/0" />
      <div className="container px-4 pt-12 lg:px-0 lg:pt-24">
        <div className="mb-6 grid grid-cols-1 gap-8 lg:mb-12 lg:grid-cols-3 lg:gap-32">
          <div className="order-last flex flex-col items-center gap-8 text-center lg:order-first lg:items-start lg:text-left">
            <Logo className="h-24" />
          </div>
          <div className="col-span-1 grid grid-cols-1 gap-8 text-center lg:col-span-2 lg:grid-cols-3 lg:text-left">
            {footerLinks.map((link, index) => (
              <div key={index}>
                <h6 className="mb-4 text-xl lg:text-2xl">{link.title}</h6>
                <ul className="flex flex-col gap-4">
                  {link.links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        target="_blank"
                        className="text-sm text-white transition-all duration-300 hover:opacity-75 lg:text-base"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="h-px bg-white/10" />
        <div className="flex flex-wrap items-center justify-center gap-4 py-6 lg:justify-between">
          <span className="text-white/50">
            Copyright ©2025 BlackRock. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
