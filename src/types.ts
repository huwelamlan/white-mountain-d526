// src/types.ts

export interface Token {
    address: `0x${string}` | null; // null for native tokens
    symbol: string;
    name: string;
    image: string;
    decimals: number;
  }
  