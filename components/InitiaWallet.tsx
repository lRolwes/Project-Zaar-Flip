import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useWallet } from "@initia/react-wallet-widget";
import { useAccount, useDisconnect, useBalance } from "wagmi";
import { getAccount } from "@wagmi/core";
import { config } from "./../config";
import { FaWallet } from "react-icons/fa";
import { FaCog, FaUser, FaSignOutAlt } from "react-icons/fa";

export const InitiaWallet = () => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);
  const { disconnect: wagmiDisconnect } = useDisconnect();
  const [currentVanity, setCurrentVanity] = React.useState("");
  const [currentProfileImage, setCurrentProfileImage] = useState<string>("");
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleLogout = async () => {
    try {
      await wagmiDisconnect();
      await initiaDisconnect();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const {
    account,
    view,
    address,
    wallet,
    isLoading,
    onboard,
    disconnect: initiaDisconnect,
  } = useWallet();

  const { address: wagmiAddress, isConnected } = useAccount();

  const displayAddr = (addr: string) => {
    const firstFive = addr.slice(0, 5); // Get the first 5 characters
    const lastThree = addr.slice(-3); // Get the last 3 characters

    return `${firstFive}...${lastThree}`;
  };

  useEffect(() => {
    if (!wagmiAddress) return;
    fetch(`./api/getProfile?ownerAddress=${wagmiAddress}`)
      .then((response) => response.json())
      .then((data) => {
        setCurrentVanity(
          data.uName === "" ? displayAddr(wagmiAddress) : data.uName
        );
        if (data?.profPicUrl) setCurrentProfileImage(data.profPicUrl);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, [wagmiAddress, account, isConnected]);

  const toggleDropDown = () => {
    setProfileMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setProfileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
    //   {...(!isLoading && {
    //     "aria-hidden": true,
    //     style: {
    //       opacity: 0,
    //       pointerEvents: "none",
    //       userSelect: "none",
    //     },
    //   })}
    >
      {(() => {
        if (!wallet) {
          return (
            <button
              onClick={onboard}
              className="bg-yellow text-black flex flex-row items-center justify-center space-x-2 px-4 py-2 text-sm rounded-sm font-bold uppercase gradient-button hover:bg-white border-2 transition duration-500"
            >
              <FaWallet />
              <p>Connect</p>
            </button>
          );
        }

        return (
          <div className="flex items-center text-gray -mr-5 relative">
            
            {/* <div className="group">
              <button
                onClick={openChainModal}
                style={{ display: "flex", alignItems: "center" }}
                type="button"
                className="mr-2 flex items-center justify-center rounded cursor-pointer px-2 py-5 text-sm font-medium text-gray border border-dark-gray-all h-10 md:flex ml-6 gap-1 divide-x-1 divide-gray-300"
              >
                <span className="mr-2">{account.displayBalance}</span>
                {chain.hasIcon && (
                  <div
                    style={{
                      background: chain.iconBackground,
                      width: 25,
                      height: 25,
                      borderRadius: 999,
                      overflow: "hidden",
                      marginRight: 4,
                    }}
                  >
                    {chain.iconUrl && (
                      <Image
                        alt={chain.name ?? "Chain icon"}
                        src={chain.iconUrl}
                        style={{ width: 25, height: 25 }}
                        width={25}
                        height={25}
                      />
                    )}
                  </div>
                )}
              </button>
            </div> */}

            <div
              className="relative z-30 w-[150px] "
              // onMouseEnter={handleMouseEnter}
              //onMouseLeave={handleMouseLeave}
              ref={dropdownRef}
            >
              <button
                type="button"
                onClick={toggleDropDown}
                className="flex items-center justify-center rounded cursor-pointer px-2 py-2 text-sm font-medium text-gray-700 border border-dark-gray-all md:flex w-full gap-2 min-w-[100px]"
                ref={buttonRef}
                aria-expanded={profileMenuOpen}
                aria-haspopup="true"
              >
                <div className=" text-yellow-400">{currentVanity}</div>
              </button>
              <div
                className={`relative z-[100] absolute left-0  w-full bg-black border border-dark-gray-all rounded-sm shadow-lg transition-opacity duration-300 ${profileMenuOpen ? "block opacity-100 visible" : "hidden opacity-0 invisible"} uppercase`}
              >
                <Link
                  href="/profile"
                  className="relative z-[100] block py-3 px-4 text-sm text-light-green border-b border-dark-gray hover:bg-gray-900 hover:text-white flex flex-row"
                >
                  <FaUser className="mr-2" />
                  <p className="bg-black">Profile</p>
                </Link>
                <Link
                  href="/settings"
                  className="relative z-[100] block px-4 py-3 text-sm text-light-green border-b border-dark-gray hover:bg-gray-900 hover:text-white flex flex-row"
                >
                  <FaCog className="mr-2" />
                  Settings
                </Link>
                {/* <a href="#" className="block px-4 py-3 text-sm text-light-green border-b border-dark-gray hover:bg-gray-900 hover:text-white"><i className="fal fa-eye text-gray mr-2"></i>Watchlist</a> */}
                {/* <a href="settings.html" className="block px-4 py-3 text-sm text-light-green border-b border-dark-gray hover:bg-gray-900 hover:text-white"><i className="far fa-cog text-gray mr-2"></i>Settings</a> */}
                <div
                  onClick={() => {
                    handleLogout();
                  }}
                  className="relative z-[100] hover:cursor-pointer block px-4 py-3 text-sm text-light-green hover:bg-gray-900 hover:text-white flex flex-row"
                >
                  <FaSignOutAlt className="mr-2" />
                  Log Out
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
