// src/components/SelectTokenModal.tsx
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { createTeleporter } from "react-teleporter";
import { ReactComponent as CloseIcon } from "../assets/svg/close.svg";
import { RootState } from "../store";
import { Token } from "../types";

type Props = {
  closeModal: () => void;
  selectToken: (token: Token) => void;
};

const SelectTokenModalTeleport = createTeleporter();

export function SelectTokenModalTarget() {
  return <SelectTokenModalTeleport.Target />;
}

export function SelectTokenModal({ closeModal, selectToken }: Props) {
  const chainId = useSelector((state: RootState) => state.presale.chainId);
  const tokens = useSelector(
    (state: RootState) => state.presale.tokens[chainId]
  ) as Token[];
  const dialog = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");

  const filteredTokens = tokens.filter(
    (token) =>
      token.symbol.toLowerCase().includes(search.toLowerCase()) ||
      token.name.toLowerCase().includes(search.toLowerCase()) ||
      !search
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const clickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    const childElement = dialog.current;
    if (
      event.target instanceof HTMLElement &&
      !childElement?.contains(event.target)
    ) {
      closeModal();
    }
  };

  return (
    <SelectTokenModalTeleport.Source>
      <div
        className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-[10px] sm:p-14"
        onClick={clickOutside}
      >
        <div
          ref={dialog}
          role="dialog"
          aria-modal="true"
          className="w-full max-w-[370px] sm:max-w-lg lg:max-w-xl rounded-2xl bg-gray-900 bg-opacity-80 p-4 sm:p-6 md:p-7 lg:p-8 backdrop-blur-xl overflow-hidden transition-transform duration-300 ease-in-out scale-100"
        >
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-2xl font-semibold uppercase text-white sm:text-3xl">
              Select Token
            </h4>
            <button
              className="text-white hover:text-gold focus:outline-none"
              onClick={closeModal}
              aria-label="Close Modal"
            >
              <CloseIcon className="h-6 w-6" />
            </button>
          </div>
          <input
            type="text"
            className="my-4 w-full rounded-xl border-2 bg-gray-800 py-2.5 px-6 text-white placeholder:text-gray-400 focus:ring-2"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {filteredTokens.length > 0 ? (
            <ul className="max-h-[60vh] sm:max-h-[70vh] md:max-h-[80vh] overflow-y-auto bg-opacity-70">
              {filteredTokens.map((token, index) => (
                <li
                  key={index}
                  className="flex cursor-pointer items-center gap-4 rounded-xl py-2 px-4 transition-all duration-200 hover:bg-white-700"
                  onClick={() => selectToken(token)}
                >
                  <img
                    src={token.image}
                    alt={`${token.symbol} logo`}
                    width="40"
                    height="40"
                    className="h-10 w-10 rounded-full p-1 flex-shrink-0"
                    loading="lazy"
                  />
                  <p className="flex flex-col font-medium text-white">
                    {token.symbol}
                    <span className="text-xs font-light text-gray-400">
                      {token.name}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-400">No tokens found</p>
          )}
        </div>
      </div>
    </SelectTokenModalTeleport.Source>
  );
}
