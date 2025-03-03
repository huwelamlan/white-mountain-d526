// src/hooks/useWeb3Functions.ts

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAccount, useNetwork, usePublicClient } from "wagmi";
import {
  readContract,
  prepareWriteContract,
  writeContract,
  waitForTransaction,
} from "wagmi/actions";
import { parseUnits, formatUnits } from "viem";
import { toast } from "react-toastify";

import config from "../config";
import { presaleAbi } from "../contracts/presaleABI";
import {
  setTokenPrice,
  setTotalTokensforSale,
  setTotalTokensSold,
  setMinBuyLimit,
  setMaxBuyLimit,
} from "../store/presale";
import { setBalance } from "../store/wallet";
import { storeTransaction, storeReferralTransaction } from "../utils/apis";

import type { RootState } from "../store";

const zeroAddress = "0x0000000000000000000000000000000000000000" as const;

export default function useWeb3Functions() {
  const dispatch = useDispatch();
  const { address } = useAccount();
  const { chain } = useNetwork();

  // Dynamic publicClient for balance checks
  const publicClient = usePublicClient({ chainId: chain?.id });

  // Fallback to first chain if chain is undefined
  const chainId = chain?.id ?? config.chains[0].id;
  const tokens = useSelector((state: RootState) => state.presale.tokens);

  const [loading, setLoading] = useState(false);

  // Sale token decimals (assumed 18 for uniformity)
  const saleTokenDecimals = config.saleToken[chainId]?.decimals ?? 18;

  // Helper functions
  function format(value: bigint, decimals?: number) {
    return parseFloat(formatUnits(value, decimals ?? saleTokenDecimals));
  }

  function parse(value: string | number, decimals?: number) {
    return parseUnits(`${value}`, decimals ?? saleTokenDecimals);
  }

  // Fetch Presale Data
  async function fetchIntialData() {
    setLoading(true);
    try {
      const presaleAddr = config.presaleContract[chainId];
      if (!presaleAddr) return;

      // Fetch totalTokensSold
      const sold = (await readContract({
        address: presaleAddr,
        abi: presaleAbi,
        functionName: "totalTokensSold",
      })) as bigint;

      // Fetch totalTokensforSale
      const forSale = (await readContract({
        address: presaleAddr,
        abi: presaleAbi,
        functionName: "totalTokensforSale",
      })) as bigint;

      dispatch(setTotalTokensSold(format(sold)));
      dispatch(setTotalTokensforSale(format(forSale)));

      // Fetch token prices
      await fetchTokenPrices();
    } catch (error) {
      console.error("fetchInitialData error:", error);
    }
    setLoading(false);
  }

  // Fetch Token Prices with Uniform Decimal Parsing
  async function fetchTokenPrices() {
    try {
      const presaleAddr = config.presaleContract[chainId];
      if (!presaleAddr) return;

      const chainTokens = tokens[chainId];
      for await (const token of chainTokens) {
        if (!token.address) {
          // Native token rate
          const rate = (await readContract({
            address: presaleAddr,
            abi: presaleAbi,
            functionName: "rate",
          })) as bigint;

          // **Fixed** to parse with 18 decimals
          const price = parseFloat(formatUnits(rate, 18));
          dispatch(setTokenPrice({ symbol: token.symbol, price }));
        } else {
          // ERC-20 token rate
          const rate = (await readContract({
            address: presaleAddr,
            abi: presaleAbi,
            functionName: "tokenPrices",
            args: [token.address],
          })) as bigint;

          // **Fixed** to parse with 18 decimals
          const price = parseFloat(formatUnits(rate, 18));
          dispatch(setTokenPrice({ symbol: token.symbol, price }));
        }
      }
    } catch (error) {
      console.error("fetchTokenPrices error:", error);
    }
  }

  // Fetch Min and Max Buy Limits
  async function fetchMinMaxBuyLimits() {
    try {
      const presaleAddr = config.presaleContract[chainId];
      if (!presaleAddr) return;

      const [minVal, maxVal] = (await Promise.all([
        readContract({
          address: presaleAddr,
          abi: presaleAbi,
          functionName: "minBuyLimit",
        }),
        readContract({
          address: presaleAddr,
          abi: presaleAbi,
          functionName: "maxBuyLimit",
        }),
      ])) as [bigint, bigint];

      dispatch(setMinBuyLimit(format(minVal)));
      dispatch(setMaxBuyLimit(format(maxVal)));
    } catch (error) {
      console.error("fetchMinMaxBuyLimits error:", error);
    }
  }

  // Fetch Total Tokens Sold (if needed elsewhere)
  async function fetchTotalTokensSold() {
    try {
      const presaleAddr = config.presaleContract[chainId];
      if (!presaleAddr) return;

      const sold = (await readContract({
        address: presaleAddr,
        abi: presaleAbi,
        functionName: "totalTokensSold",
      })) as bigint;

      dispatch(setTotalTokensSold(format(sold)));
    } catch (error) {
      console.error("fetchTotalTokensSold error:", error);
    }
  }

  // Fetch User’s Locked Balance (Presale Tokens)
  async function fetchLockedBalance() {
    try {
      if (!address) return;
      const presaleAddr = config.presaleContract[chainId];
      if (!presaleAddr) return;

      // buyersAmount(address) -> [amount, isClaimed?]
      const [lockedAmount] = (await readContract({
        address: presaleAddr,
        abi: presaleAbi,
        functionName: "buyersAmount",
        args: [address],
      })) as [bigint, boolean] | [bigint];

      // Store in wallet state for the sale token
      const saleSym = config.saleToken[chainId]?.symbol;
      if (saleSym) {
        dispatch(setBalance({ symbol: saleSym, balance: format(lockedAmount) }));
      }
    } catch (error) {
      console.error("fetchLockedBalance error:", error);
    }
  }

  // Fetch User Balances (Native + ERC-20)
  async function fetchTokenBalances() {
    try {
      if (!address || !publicClient) return;
      const chainTokens = tokens[chainId];

      for await (const token of chainTokens) {
        if (!token.address) {
          // Native token balance (ETH/BNB)
          const bal = await publicClient.getBalance({
            address: address as `0x${string}`,
          });
          const userBal = parseFloat(formatUnits(bal, token.decimals));
          dispatch(setBalance({ symbol: token.symbol, balance: userBal }));
        } else {
          // ERC-20 token balance
          const result = (await readContract({
            address: token.address,
            abi: [
              {
                name: "balanceOf",
                type: "function",
                stateMutability: "view",
                inputs: [{ name: "account", type: "address" }],
                outputs: [{ name: "", type: "uint256" }],
              },
            ],
            functionName: "balanceOf",
            args: [address as `0x${string}`],
          })) as bigint;

          const userBal = parseFloat(formatUnits(result, token.decimals));
          dispatch(setBalance({ symbol: token.symbol, balance: userBal }));
        }
      }
    } catch (error) {
      console.error("fetchTokenBalances error:", error);
    }
  }

  // Approve Token Spending if Needed
  async function approveIfNeeded(
    fromToken: Token,
    spender: `0x${string}`,
    amountNeeded: bigint
  ) {
    // Native tokens do not require approval
    if (!fromToken.address) return true;

    try {
      // Check current allowance
      const allowance = (await readContract({
        address: fromToken.address,
        abi: [
          {
            name: "allowance",
            type: "function",
            stateMutability: "view",
            inputs: [
              { name: "owner", type: "address" },
              { name: "spender", type: "address" },
            ],
            outputs: [{ name: "", type: "uint256" }],
          },
        ],
        functionName: "allowance",
        args: [address as `0x${string}`, spender],
      })) as bigint;

      if (allowance >= amountNeeded) {
        return true;
      }

      // Prepare and send "approve" transaction
      const prepared = await prepareWriteContract({
        address: fromToken.address,
        abi: [
          {
            name: "approve",
            type: "function",
            stateMutability: "nonpayable",
            inputs: [
              { name: "spender", type: "address" },
              { name: "amount", type: "uint256" },
            ],
            outputs: [],
          },
        ],
        functionName: "approve",
        value: 0n,
        args: [
          spender,
          parseUnits("9999999999999999999999999999", fromToken.decimals),
        ],
      });

      const txResult = await writeContract(prepared.request);
      toast.info(`Approving spend: ${txResult.hash}`);
      await waitForTransaction({ hash: txResult.hash });
      toast.success("Approved successfully!");
      return true;
    } catch (error) {
      toast.error("Approve transaction failed");
      console.error(error);
      return false;
    }
  }

  // Buy Token Function
  async function buyToken(amount: number, fromToken: Token) {
    let success = false;
    if (!address) return { success };
    const presaleAddr = config.presaleContract[chainId];
    if (!presaleAddr) return { success };

    setLoading(true);
    try {
      // Convert user input to BigInt considering token decimals
      const amountToBuy = parseUnits(`${amount}`, fromToken.decimals);

      // Approve if necessary
      const ok = await approveIfNeeded(fromToken, presaleAddr, amountToBuy);
      if (!ok) throw new Error("User did not approve or it failed.");

      // Prepare the "buyToken" call
      const prepared = await prepareWriteContract({
        address: presaleAddr,
        abi: presaleAbi,
        functionName: "buyToken",
        args: [fromToken.address ?? zeroAddress, amountToBuy],
        value: fromToken.address ? 0n : amountToBuy, // Only send ETH if paying with native token
      });

      // Send transaction
      const txResult = await writeContract(prepared.request);
      toast.info(`Transaction sent: ${txResult.hash}`);
      await waitForTransaction({ hash: txResult.hash });
      toast.success("Transaction confirmed!");

      // Fetch the amount of presale tokens purchased
      const purchasedAmount = (await readContract({
        address: presaleAddr,
        abi: presaleAbi,
        functionName: "getTokenAmount",
        args: [fromToken.address ?? zeroAddress, amountToBuy],
      })) as bigint;

      const purchasedNumber = parseFloat(
        formatUnits(purchasedAmount, config.saleToken[chainId].decimals)
      );

      // Store transaction in backend
      await storeTransaction({
        wallet_address: address,
        purchased_amount: purchasedNumber,
        paid_amount: amount,
        transaction_hash: txResult.hash,
        paid_with: fromToken.symbol,
      });

      await storeReferralTransaction({
        purchased_amount: purchasedNumber,
        paid: amount,
        transaction_hash: txResult.hash,
        payable_token: fromToken.symbol,
      });

      // Refresh balances and total tokens sold
      await fetchLockedBalance();
      await fetchTotalTokensSold();
      await fetchTokenBalances();

      toast.success(`Purchased ${purchasedNumber} ${config.saleToken[chainId].symbol}!`);
      success = true;
    } catch (error) {
      console.error("buyToken error:", error);
    }
    setLoading(false);
    return { success };
  }

  // Optional: Add Token to Wallet (Not Implemented)
  async function addTokenAsset(token: Token) {
    toast.info("Add Token feature not implemented in this snippet.");
  }

  return {
    loading,
    fetchIntialData,
    fetchLockedBalance,
    fetchTokenBalances,
    fetchMinMaxBuyLimits,
    buyToken,
    addTokenAsset,
  };
}
