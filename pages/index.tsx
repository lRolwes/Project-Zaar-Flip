/*
This file displays the migration component. 
It allows users to migrate their PRTC tokens to Zaar tokens.
*/
import Image from "next/image";
import Link from "next/link";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import toast, { Toaster } from "react-hot-toast";
import { formatEther } from "viem";
import React, { useEffect, useState } from "react";
import {
  useSimulateZaarflipFlip,
  useSimulateZaarflipAddAcceptedToken,
} from "@/generated";
import { writeContract } from "@wagmi/core";
import { useWriteZaarflipFlip } from "@/generated";
import { config } from "@/config";
import { abi } from "@/abis/abi";
import { Header } from "@/components/header";
import { HomePageBanner } from "@/components/HomePageBanner";

const Home: React.FC = () => {
  const size = "w-16 h-16 sm:w-20 sm:h-20 md:w-[350px] md:h-[350px]";
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center w-full relative">
        <Image
          width={1125}
          height={414}
          alt="Zaar Coin Reflection"
          src="/zaar_coin_reflection.png"
          className=" absolute -z-10 top-[160px] w-full left-0 md:top-[290px]   mix-blend-plus-lighter"
        />
        <Image
          width={1125}
          height={414}
          alt="Zaar Coin Reflection"
          src="/zaar_coin_reflection.png"
          className="absolute -z-10 top-[160px] md:top-[290px] w-full left-0 mix-blend-color-dodge"
        />
        <div className={`mt-24 zaar-coin zaar-loading-coin ${size}`}>
          <div className={`zaar-coin-heads ${size}`}></div>
          <div className={`zaar-coin-tails ${size}`}></div>
        </div>

        {/* <Image
          height={800}
          width={800}
          src="/old-zaar-coins/zaar-flip-heads.png"
          alt="Zaar-flip coin"
          className="w-[430px] mt-24"
        /> */}
        <div className="text-[40px] mt-8 text-white mix-blend-overlay">
          THE FUN NETWORK
        </div>
      </div>
      <div className="flex flex-col w-full items-center text-white text-lg mt-10">
        Choose your next move
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-transform duration-300 rotate-180 scale-75`}
        >
          <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"></path>
        </svg>
        
        <div className="flex w-full flew flex-col md:flex-row items-center justify-center gap-10 my-10">
        <Link
              href="/zaar-flip"
              className="hover:cursor-pointer transition duration-300 hover:scale-105 hover:text-white"
            >
          <div className="flex flex-col items-center p-5 px-10 md:p-5 bg-dark-gray rounded w-[400px] h-[350px] md:h-[300px]">
            
              <Image
                src="/logo.png"
                alt="Zaar Flip Logo"
                width={500}
                height={500}
                className="mb-2 text-white w-[200px]"
              />
            Choose a side, choose your odds, and flip up to 10 coins your way. Become the house by staking INIT in order to share in the upside / downside of Zaar Flip while earning revenue from all play. Feeling lucky?
          </div>
          </Link>

            <Link
              href="/zlinko"
              className="hover:cursor-pointer transition duration-300 hover:scale-105 hover:text-white"
            >
                        <div className="flex flex-col items-center p-5 bg-dark-gray rounded w-[400px] h-[300px]">

              <Image
                src="/zlinko/zaar-zlinko.png"
                alt="Zaar Zlinko Logo"
                width={500}
                height={500}
                className="mt-5 mb-9 text-white w-[200px]"
              />
            Select your level of degeneracy and up to 16 rows, each with corresponding bet miltipliers. Are you lucky enough?
          </div>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Home;
