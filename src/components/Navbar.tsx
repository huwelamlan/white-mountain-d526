// src/components/NavBar.tsx
import { ReactComponent as Logo } from "../assets/svg/logo.svg";
import { ReactComponent as WalletIcon } from "../assets/svg/wallet.svg";
import config from "../config";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount } from "wagmi";

const navigationLinks = [
  { name: "How to buy", href: "#how-to-buy" },
  { name: "Roadmap", href: "#roadmap" },
  { name: "Tokenomics", href: "#tokenomics" },
  { name: "Utilities", href: "#utilities" },
];

export default function NavBar() {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();

  return (
    <header className="container px-4 lg:px-0">
      <div className="flex items-center justify-between py-6">
        <Logo className="h-12 lg:h-16" />
        <div className="flex items-center gap-2">
          <button
            onClick={() => open()}
            className="flex items-center gap-2 rounded-full bg-gold py-2 px-4 text-m font-semibold text-black transition-opacity duration-200 hover:opacity-75 lg:py-4 lg:text-base"
          >
            {isConnected ? (
              <span className="flex items-center justify-center gap-2 text-white">
                <span>
                  {address?.slice(0, 6)}...
                  <span className="hidden lg:inline">
                    {address?.slice(address.length - 6, address.length)}
                  </span>
                </span>
              </span>
            ) : (
              <>
                <WalletIcon className="h-6 w-6" />
                <span className="text-white">Connect Wallet</span>
              </>
            )}
          </button>
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-white/0 to-white/20" />
    </header>
  );
}
