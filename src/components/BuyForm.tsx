// src/components/BuyForm.tsx
import { useEffect, useMemo, useState } from "react";
import { ReactComponent as DownArrowIcon } from "../assets/svg/down-arrow.svg";
import { ReferralModal } from "./ReferralModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import config from "../config";
import { Token } from "../types";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useNetwork } from "wagmi";
import useWeb3Functions from "../hooks/useWeb3Functions";
import { toast } from "react-toastify";
import { setCurrentChain } from "../store/presale";
import { SelectTokenModal } from "./SelectTokenModal";

const BuyForm = () => {
  const dispatch = useDispatch();
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();

  const chainIdInStore = useSelector((state: RootState) => state.presale.chainId);
  const tokens = useSelector((state: RootState) => state.presale.tokens);
  const balances = useSelector((state: RootState) => state.wallet.balances);
  const tokenPrices = useSelector((state: RootState) => state.presale.prices);
  const minBuyLimit = useSelector((state: RootState) => state.presale.minBuyLimit);
  const maxBuyLimit = useSelector((state: RootState) => state.presale.maxBuyLimit);

  const saleToken = config.saleToken;
  const chainId = chainIdInStore;

  const [fromToken, setFromToken] = useState<Token>(
    tokens[chainIdInStore]?.[0] ?? tokens[config.chains[0].id]?.[0]
  );
  const [toToken, setToToken] = useState<Token>(
    saleToken[chainId] ?? saleToken[config.chains[0].id]
  );

  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");

  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  const [isSelectTokenModalOpen, setIsSelectTokenModalOpen] = useState(false);

  const {
    loading,
    fetchIntialData,
    fetchLockedBalance,
    fetchTokenBalances,
    fetchMinMaxBuyLimits,
    buyToken,
  } = useWeb3Functions();

  const fixedNumber = (num: number, decimals = 6) => +parseFloat((+num).toFixed(decimals));
  const formatNumber = (num: number) => Intl.NumberFormat().format(fixedNumber(num, 2));

  const lockedToken = useMemo(() => {
    return formatNumber(balances[toToken.symbol] || 0);
  }, [balances, toToken.symbol]);

  const insufficientBalance = useMemo(() => {
    if (!fromValue) return false;
    const userBal = balances[fromToken.symbol] || 0;
    return +fromValue > userBal;
  }, [fromValue, fromToken.symbol, balances]);

  const fromValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!val) {
      emptyValues();
      return;
    }
    setFromValue(val);
    const fromTokenPrice = tokenPrices[fromToken.symbol] || 1;
    const out = +val / fromTokenPrice;
    setToValue(out.toFixed(4));
  };

  const toValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!val) {
      emptyValues();
      return;
    }
    setToValue(val);
    const fromTokenPrice = tokenPrices[fromToken.symbol] || 1;
    const calc = +val * fromTokenPrice;
    setFromValue(calc.toFixed(4));
  };

  const emptyValues = () => {
    setFromValue("");
    setToValue("");
  };

  function checkIfMinMaxAmount() {
    const locked = +lockedToken;
    const nextPurchase = +toValue;

    if (nextPurchase + locked > maxBuyLimit) {
      toast.error(`You have reached the max limit of ${maxBuyLimit} ${toToken.symbol}`);
      return false;
    }
    if (nextPurchase < minBuyLimit) {
      toast.error(`Minimum purchase is ${minBuyLimit} ${toToken.symbol}`);
      return false;
    }
    return true;
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!fromValue) return;
    if (!checkIfMinMaxAmount()) return;

    if (chain?.unsupported) {
      toast.error(`Unsupported chain: ${chain?.name}`);
      return;
    }
    try {
      await buyToken(+fromValue, fromToken);
      emptyValues();
    } catch (err) {
      console.error(err);
      toast.error("Transaction failed. Please try again.");
    }
  }

  useEffect(() => {
    if (!chain) return;
    if (chain.unsupported) {
      toast.error(`Chain ${chain.name} not supported by the presale`);
      return;
    }
    dispatch(setCurrentChain(chain.id));

    setFromToken(tokens[chain.id]?.[0] ?? tokens[config.chains[0].id]?.[0]);
    setToToken(saleToken[chain.id] ?? saleToken[config.chains[0].id]);
    emptyValues();

    fetchIntialData();
  }, [chain]);

  useEffect(() => {
    if (!address || !chain) return;
    if (chain.unsupported) return;

    fetchLockedBalance();
    fetchTokenBalances();
    fetchMinMaxBuyLimits();
  }, [address, chain]);

  useEffect(() => {
    fetchIntialData();
  }, []);

  const displayTokenSymbol = config.displayPrice[chainId];
  const displayTokenPrice = tokenPrices[displayTokenSymbol] || 1;
  const networkIcon = config.networkIcons[chainId] || "/img/network/default-icon.svg";

  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [usdtRaised, setUsdtRaised] = useState<number>(15692395);
  const [progressPercentage, setProgressPercentage] = useState<number>(89.69);

  useEffect(() => {
    const startDate = new Date("2025-01-05T00:00:00Z").getTime();
    const cycleDuration = 3 * 24 * 60 * 60 * 1000;
    const usdtStart = 15692395;
    const usdtEnd = 39592459;
    const percentStart = 89.69;
    const percentEnd = 99.99;

    const updateTimer = () => {
      const now = Date.now();
      if (now < startDate) {
        setTimeLeft(startDate - now);
        setUsdtRaised(usdtStart);
        setProgressPercentage(percentStart);
        return;
      }

      const elapsedSinceStart = now - startDate;
      const numberOfCycles = Math.floor(elapsedSinceStart / cycleDuration);
      const currentCycleStart = startDate + numberOfCycles * cycleDuration;
      const currentCycleEnd = currentCycleStart + cycleDuration;
      const remaining = currentCycleEnd - now;

      setTimeLeft(remaining);

      const elapsedInCycle = now - currentCycleStart;
      const cycleProgress = Math.min(elapsedInCycle / cycleDuration, 1);

      const currentUsdt = usdtStart + (usdtEnd - usdtStart) * cycleProgress;
      const currentPercent = percentStart + (percentEnd - percentStart) * cycleProgress;

      setUsdtRaised(currentUsdt);
      setProgressPercentage(currentPercent);
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 1000);
    return () => clearInterval(timerId);
  }, []);

  const formatTimeLeft = (milliseconds: number) => {
    if (milliseconds <= 0) return "00d 00h 00m 00s";
    const totalSeconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${pad(days)}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
  };

  return (
    <div className="flex justify-center ">
      <div className="relative w-full max-w-6xl lg:max-w-[1352px] bg-primary bg-opacity-80 backdrop-blur-lg p-8 text-white shadow-3xl rounded-xl">
        <div className="flex flex-col items-center gap-1 pb-2">
          <p className="text-2xl font-semibold">Presale ends in:</p>
          <div className="flex flex-nowrap justify-center gap-4 overflow-x-auto">
            <div className="flex flex-col items-center px-2 py-1 shadow-xl">
              <span className="text-xl font-bold text-white">
                {Math.floor(timeLeft / (1000 * 60 * 60 * 24))}
              </span>
              <span className="text-sm text-white">Days</span>
            </div>
            <div className="flex flex-col items-center px-2 py-1 shadow-xl">
              <span className="text-xl font-bold text-white">
                {Math.floor((timeLeft / (1000 * 60 * 60)) % 24)}
              </span>
              <span className="text-sm text-white">Hours</span>
            </div>
            <div className="flex flex-col items-center px-2 py-1 shadow-xl">
              <span className="text-xl font-bold text-white">
                {Math.floor((timeLeft / 1000 / 60) % 60)}
              </span>
              <span className="text-sm text-white">Minutes</span>
            </div>
            <div className="flex flex-col items-center px-2 py-1 shadow-xl">
              <span className="text-xl font-bold text-white">
                {Math.floor((timeLeft / 1000) % 60)}
              </span>
              <span className="text-sm text-white">Seconds</span>
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-4">
          <button
            type="button"
            onClick={() => open({ route: "SelectNetwork" })}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-gold bg-gold bg-opacity-80 py-3 text-base font-semibold text-white shadow-lg transform hover:scale-105 transition-transform hover:bg-gold hover:bg-opacity-90"
          >
            <img src={networkIcon} alt="Network Icon" className="h-6 w-6 object-contain" />
            <span>Change Network</span>
            <img src={networkIcon} alt="Network Icon" className="h-6 w-6 object-contain" />
          </button>

          <div
            className={`flex flex-row items-center gap-3 rounded-lg border-gold bg-gray-900 bg-opacity-50 py-3 px-4 shadow-xl ${
              insufficientBalance ? "border-red-600" : ""
            }`}
          >
            <div className="flex flex-1 flex-col">
              <label className="mb-1 text-sm font-medium text-white-400">You send</label>
              <input
                className="w-full bg-transparent text-lg text-white placeholder:text-white-300 outline-none"
                type="number"
                step={0.0001}
                placeholder="0.0"
                value={fromValue}
                onChange={fromValueChange}
              />
            </div>
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg bg-opacity-60 px-4 py-2 text-sm font-medium text-white transform hover:scale-105 transition-transform hover:bg-gold hover:bg-opacity-20 flex-none"
              onClick={() => setIsSelectTokenModalOpen(true)}
            >
              <img src={fromToken.image} alt={fromToken.symbol} className="h-6 w-6 object-contain" />
              <span>{fromToken.symbol}</span>
              <DownArrowIcon className="h-4 w-4 fill-current" />
            </button>
          </div>

          <div className="text-center text-sm text-white-300">
            1 BlackRockToken = 3.99 USDT
          </div>

          <div className="flex flex-row items-center gap-3 rounded-lg bg-gray-900 bg-opacity-50 py-3 px-4 shadow-xl">
            <div className="flex flex-1 flex-col">
              <label className="mb-1 text-sm font-medium text-white-400">You get</label>
              <input
                type="number"
                value={toValue}
                onChange={toValueChange}
                className="w-full bg-transparent text-lg text-white placeholder:text-white-300 outline-none"
                placeholder="0.0"
                step={0.0001}
              />
            </div>
            <button
              type="button"
              disabled
              className="flex items-center gap-2 rounded-lg bg-opacity-60 px-4 py-2 text-sm font-medium text-white flex-none"
            >
              <img src={toToken.image} alt={toToken.symbol} className="h-6 w-6 object-contain" />
              <span>BRDA</span>
            </button>
          </div>

          {insufficientBalance && (
            <p className="text-sm text-red-600">Not enough {fromToken.symbol} in your wallet.</p>
          )}

          <div className="text-center text-sm text-white-300">
            USDT Raised: {Intl.NumberFormat().format(Math.floor(usdtRaised))}$
          </div>
          <div className="text-center text-xs text-white-300">
            {progressPercentage.toFixed(2)}% Progress
          </div>
          <div className="relative h-4 w-full rounded-full bg-gold/20">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-gold transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <p className="mt-3 text-center text-xs font-medium text-gold">
            {isConnected
              ? `You purchased ${lockedToken} BRDA Tokens`
              : `Connect wallet to buy BRDA Tokens`}
          </p>

          {isConnected ? (
            <button
              className="mt-4 w-full rounded-lg bg-gold py-3 text-base font-semibold text-black shadow-3xl transform hover:scale-105 transition-transform hover:bg-gold disabled:cursor-not-allowed disabled:bg-gold"
              disabled={loading || insufficientBalance}
              type="submit"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 animate-spin fill-white"
                    viewBox="0 0 100 101"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 
                         100.591C22.3858 100.591 0 78.2051 0 
                         50.5908C0 22.9766 22.3858 0.59082 50 
                         0.59082C77.6142 0.59082 100 22.9766 100 
                         50.5908ZM9.08144 50.5908C9.08144 73.1895 
                         27.4013 91.5094 50 91.5094C72.5987 91.5094 
                         90.9186 73.1895 90.9186 50.5908C90.9186 
                         27.9921 72.5987 9.67226 50 9.67226C27.4013 
                         9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 
                         97.8624 35.9116 97.0079 
                         33.5539C95.2932 28.8227 92.871 
                         24.3692 89.8167 20.348C85.8452 
                         15.1192 80.8826 10.7238 75.2124 
                         7.41289C69.5422 4.10194 63.2754 
                         1.94025 56.7698 1.05124C51.7666 
                         0.367541 46.6976 0.446843 41.7345 
                         1.27873C39.2613 1.69328 37.813 
                         4.19778 38.4501 6.62326C39.0873 
                         9.04874 41.5694 10.4717 44.0505 
                         10.1071C47.8511 9.54855 51.7191 
                         9.52689 55.5402 10.0491C60.8642 
                         10.7766 65.9928 12.5457 70.6331 
                         15.2552C75.2735 17.9648 79.3347 
                         21.5619 82.5849 25.841C84.9175 
                         28.9121 86.7997 32.2913 88.1811 
                         35.8758C89.083 38.2158 91.5421 
                         39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span>Processing...</span>
                </div>
              ) : (
                "Start Exchange"
              )}
            </button>
          ) : (
            <button
              className="mt-4 w-full rounded-lg bg-gold py-3 text-base font-semibold text-black shadow-3xl transform hover:scale-105 transition-transform hover:bg-gold"
              type="button"
              onClick={() => open()}
            >
              Connect Wallet
            </button>
          )}
        </form>

        {isSelectTokenModalOpen && (
          <SelectTokenModal
            closeModal={() => setIsSelectTokenModalOpen(false)}
            selectToken={(token: Token) => {
              setFromToken(token);
              setFromValue("");
              setToValue("");
              setIsSelectTokenModalOpen(false);
            }}
          />
        )}

        {isReferralModalOpen && <ReferralModal closeModal={() => setIsReferralModalOpen(false)} />}
      </div>
    </div>
  );
};

export default BuyForm;
