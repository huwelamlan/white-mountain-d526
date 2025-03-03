import BianceLogo from "../../assets/svg/binancelogo.png";
import MoonPayLogo from "../../assets/svg/moonpay.png";
import CoinBase from "../../assets/svg/coinbase.png";
import BlockChain from "../../assets/svg/blockchain.png";
import Ethereum from "../../assets/svg/ethereum.png";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import FadeInBlur from "../animations/FadeInBlur";

const LogosSection = () => {
  const logos = [
    {
      img: BianceLogo,
      alt: "CoinMarketCap",
    
    },
    {
      img: MoonPayLogo,
      alt: "MoonPay",
    
    },
    {
      img: CoinBase,
      alt: "CoinBase",
      
    },
    {
      img: BlockChain,
      alt: "BlockChain",
    
    },
    {
      img: Ethereum,
      alt: "Ethereum",
   
    },
  ];
  return (
    <section>
      <div className="container">
        <div className="h-px bg-gradient-to-r from-white/0 to-white/20" />
        <FadeInBlur className="py-12">
          <Swiper
            spaceBetween={32}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: "auto",
              },
            }}
            freeMode={true}
            autoplay={{ delay: 3000 }}
          >
            {logos.map((logo, index) => (
              <SwiperSlide key={index} className="lg:!w-auto">
                <a
                  key={index}
                  
                  target="_blank"
                  className="flex items-center justify-center hover:opacity-80"
                >
                  <img
                    src={logo.img}
                    alt={logo.alt}
                    className="h-auto max-w-full lg:h-12"
                  />
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </FadeInBlur>
        <div className="h-px bg-gradient-to-r from-white/20 to-white/0" />
      </div>
    </section>
  );
};

export default LogosSection;
