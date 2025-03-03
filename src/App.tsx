import { ethereumClient } from "./utils/wagmi";
import { Web3Modal } from "@web3modal/react";

import { ReferralModalTarget } from "./components/ReferralModal";
import HeaderSection from "./components/sections/HeaderSection";
import LogosSection from "./components/sections/LogosSection";
import Navbar from "./components/Navbar";
import HowToBuySection from "./components/sections/HowToBuySection";
import RoadmapSection from "./components/sections/RoadmapSection";
import TokenomicsSection from "./components/sections/TokenomicsSection";

import Footer from "./components/Footer";
import { useEffect } from "react";
import WebglFluidAnimation from "./components/WebglFluidAnimation";
import StatsSection from "./components/sections/StatsSection";
import { SelectTokenModalTarget } from "./components/SelectTokenModal";
import { useAccount, useDisconnect } from "wagmi";
import { useDispatch } from "react-redux";
import { fetchReferralCode } from "./utils/apis";
import { setUser } from "./store/wallet";
import { BuyWIthCardModalTarget } from "./components/BuyWithCardModal";
import BrdaTokenSection from "./components/sections/BrdaTokenSection";
import TeamSection from "./components/sections/TeamSection";
import FAQSection from "./components/sections/FAQSection";

const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;

function App() {
  const { address, isConnected } = useAccount();
  const dispatch = useDispatch();

  useEffect(() => {
    const searchParams = new URLSearchParams(window?.location.search);
    const referralId = searchParams.get("ref");
    if (referralId?.length === 6) {
      localStorage.setItem("ref", referralId);
    }
  }, []);

  useEffect(() => {
    if (!isConnected) return;

    signIn();
  }, [isConnected]);

  const signIn = async () => {
    try {
      const { user } = await fetchReferralCode(address as string);
      dispatch(setUser({ ...user }));
    } catch (e) {
      console.log(e);
      useDisconnect();
    }
  };

  useEffect(() => {
    let newEvent: any;

    window.addEventListener("mousemove", (event: any) => {
      newEvent = new event.constructor(event.type, event);
    });

    document.addEventListener("mousemove", (event: any) => {
      if (event.isTrusted && newEvent) {
        document.getElementById("webgl-fluid")?.dispatchEvent(newEvent);
      }
    });
  }, []);
  return (
    <>
      <Navbar />
      <main id="main" className="flex flex-col">
        <HeaderSection />
        <LogosSection />
        <BrdaTokenSection />
        <RoadmapSection />
        <TokenomicsSection />
        <HowToBuySection />
        <SelectTokenModalTarget />
        <TeamSection />
        <FAQSection />
        <Footer />
      </main>
      <SelectTokenModalTarget />
      <ReferralModalTarget />
      <BuyWIthCardModalTarget />
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      <WebglFluidAnimation />
    </>
  );
}

export default App;
