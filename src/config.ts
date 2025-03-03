// src/config.ts

import { Chain, mainnet, bsc } from "wagmi/chains";
import { Token } from "./types"; // Import Token from types.ts

// Define the Config interface
interface Config {
  chains: Chain[];
  presaleStartTime: number;
  presaleContract: { [chainId: number]: `0x${string}` };
  saleToken: { [chainId: number]: Token };
  displayPrice: { [chainId: number]: string };
  extraSoldAmount: number;
  whitelistedTokens: { [chainId: number]: Token[] };
  networkIcons: { [chainId: number]: string };
}

const config: Config = {
  // Supported chains
  chains: [mainnet, bsc],

  // Presale start time (Unix timestamp)
  presaleStartTime: 1680912000,

  // Presale contract addresses on each chain
  presaleContract: {
    [bsc.id]: "0x37e49830a9E1e990F304A7cD8463fD86D5a8B1be",     // BSC mainnet presale
    [mainnet.id]: "0xDc49afbB185ae5ddA355E4a2c79aE1f20DcEb5D2", // ETH mainnet presale
  },

  // Sale token details on each chain
  saleToken: {
    [bsc.id]: {
      address: "0xAB920cD82336B9B5B115B4fb3FE02179a732e321",
      symbol: "BRDA",
      name: "BlackRock Digital Asset Token",
      image: "/img/tokens/logo.svg",
      decimals: 18,
    },
    [mainnet.id]: {
      address: "0x96147D6De325AC9ada8a254b4f8c3f59daF271dB",
      symbol: "BRDA",
      name: "BlackRock Digital Asset Token",
      image: "/img/tokens/logo.svg",
      decimals: 18,
    },
  },

  // Token used for displaying prices on the UI
  displayPrice: {
    [bsc.id]: "USDT",
    [mainnet.id]: "USDT",
  },

  // Extra tokens sold to artificially display in the UI
  extraSoldAmount: 15929321,

  // Whitelisted tokens for each chain
  whitelistedTokens: {
    [bsc.id]: [
      {
        address: null, // Native BNB
        symbol: "BNB",
        name: "Binance Coin",
        image: "/img/tokens/bnb.webp",
        decimals: 18,
      },
      {
        address: "0x0555E30da8f98308EdB960aa94C0Db47230d2B9c", // BSC BTC
        symbol: "WBTC",
        name: "Wrapped Bitcoin",
        image: "/img/tokens/wbtc.svg",
        decimals: 18,
      },
      {
        address: "0x55d398326f99059fF775485246999027B3197955", // BSC USDT
        symbol: "USDT",
        name: "Binance-Peg USDT",
        image: "/img/tokens/usdt.webp",
        decimals: 18,
      },
      
      {
        address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d", // BSC USDC
        symbol: "USDC",
        name: "Binance-Peg USDC",
        image: "/img/tokens/usdc.svg",
        decimals: 18,
      },
      {
        address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8", // BSC ETH
        symbol: "ETH",
        name: "Binance-Peg Ethereum",
        image: "/img/tokens/eth.svg",
        decimals: 18,
      },



     
    ],



    [mainnet.id]: [
      {
        address: null,
        symbol: "ETH",
        name: "Ethereum",
        image: "/img/tokens/eth.svg",
        decimals: 18,
      },
      {
        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        symbol: "USDT",
        name: "Tether USD",
        image: "/img/tokens/tethernew_32.webp",
        decimals: 6,
      },

      {
        address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        symbol: "USDC",
        name: "USDC",
        image: "/img/tokens/usdc.webp",
        decimals: 6,
      },


      {
        address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
        symbol: "WBTC",
        name: "Wrapped Bitcoin",
        image: "/img/tokens/wbtc.svg",
        decimals: 18,
      },
     
    ],
  },

  // Network Icons Mapping
  networkIcons: {
    [bsc.id]: "/img/network/bnb-icon.svg",      // Path to BNB icon
    [mainnet.id]: "/img/network/eth-icon.svg",  // Path to ETH icon
  },
};

export default config;
