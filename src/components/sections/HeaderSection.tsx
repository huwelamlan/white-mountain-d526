// src/components/sections/HeaderSection.tsx
import React from "react";
import FadeLeft from "../animations/FadeLeft";
import FadeRight from "../animations/FadeRight";
import BuyForm from "../BuyForm";
import BRDALogo from "../../assets/svg/blackrock.svg";

const HeaderSection = () => {
  return (
    <section className="text-white py-6 lg:py-6">
      <div className="container mx-auto flex flex-col items-center gap-2 px-4 lg:px-0">
        <FadeLeft className="w-full flex justify-center">
          <img
            src={BRDALogo}
            alt="BlackRock Digital Asset Token (BRDA) Logo"
            className="w-full max-w-[200px] h-auto object-contain mb-6 shadow-3xl"
          />
        </FadeLeft>

        <FadeLeft className="w-full">
          <h2 className="mb-6 text-center text-3xl font-bold leading-tight lg:text-5xl">
            Introducing the BlackRock Digital Asset Token |BRDA|
          </h2>
        </FadeLeft>

        <FadeRight className="w-full max-w-md">
          <BuyForm />
        </FadeRight>

        <FadeLeft className="w-full max-w-2xl">
          <p className="text-center text-base leading-relaxed text-white lg:text-lg">
            BlackRock is proud to present the BlackRock Digital Asset Token (BRDA)—a groundbreaking advancement in asset management and digital finance. BRDA merges BlackRock’s unparalleled expertise in managing global assets with cutting-edge blockchain technology, delivering a secure, transparent, and highly efficient investment experience for modern investors.
          </p>
        </FadeLeft>
      </div>
    </section>
  );
};

export default HeaderSection;
