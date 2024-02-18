"use client";

import styles from "./page.module.css";
import { useState, useEffect } from "react";

import Image from 'next/image'
import Link from "next/link";

import {
  useAccount,
  useDisconnect,
  useSwitchChain,
} from 'wagmi';

import { config } from "@/Constants/config";

import { Overlay } from "../Overlay/page";

import Minidenticon from "../Minidenticon/page";

const chainDetails = [
  { name: "Fantom", chainId: 250, logo: "/fantom.png" },
  { name: "Fantom Testnet", chainId: 4002, logo: "/fantom.png" }
]

import { defaultChain } from "@/Constants/config";

import ConnectButton from "../ConnectButton/page";

import { ConnectKitButton } from "connectkit";

export function Navbar() {
  const [connectOpen, setConnectOpen] = useState<boolean>(false);
  const [connectMenuOpen, setConnectMenuOpen] = useState<boolean>(false);
  const [networkMenuOpen, setNetworkMenuOpen] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [tempNetwork, setTempNetwork] = useState<string>(defaultChain.name);
  const [menusOpen, setMenusOpen] = useState<boolean[]>([false, false]);

  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const toggleConnectOpen = () => {
    setConnectOpen(!connectOpen);
  };

  const toggleConnectMenuOpen = () => {
    if (!connectMenuOpen) {
      setNetworkMenuOpen(false);
      setMenusOpen([]);
    }
    setConnectMenuOpen(!connectMenuOpen);
  };

  const toggleNetworkMenuOpen = () => {
    if (!networkMenuOpen) {
      setConnectMenuOpen(false);
      setMenusOpen([]);
    }
    setNetworkMenuOpen(!networkMenuOpen);
  };

  const toggleMenu = (index: number) => {
    if (!menusOpen[index]) {
      const updatedMenusOpen: boolean[] = [];
      setConnectMenuOpen(false);
      setNetworkMenuOpen(false);
      updatedMenusOpen[index] = !updatedMenusOpen[index];
      setMenusOpen(updatedMenusOpen);
    } else {
      const updatedMenusOpen: boolean[] = [];
      setConnectMenuOpen(false);
      setNetworkMenuOpen(false);
      setMenusOpen(updatedMenusOpen);
    }
  };

  function dropdownAction(func: () => void): void {
    func();
    setMenusOpen([]);
    setConnectMenuOpen(false);
    setNetworkMenuOpen(false);
  }


  const { chain } = useAccount();
  const { switchChain } =
    useSwitchChain()
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <nav>
      {!isConnected && connectOpen && <Overlay onClick={toggleConnectOpen} />}
      <div className={styles.toShow}>
      </div>
      <div className={styles.navbar}>
        {(isClient ? isConnected ?
          <div className={styles.connectButtonContainer}>
            <div className={`${styles.navbarLi}`} onClick={toggleConnectMenuOpen}>
              <Minidenticon username={String(address)} saturation={90} width={30} height={30} lightness={50} />
              <p className={`${styles.connectText} ${styles.toHide}`}>{address ? (address?.slice(0, 6) + "..." + address?.slice(-4)) : "Error"}</p>
          
            </div>
            <div className={`${styles.dropdown} ${connectMenuOpen ? styles.connectMenuOpen : styles.connectMenuClosed}`}>
              <p className={styles.dropdownOption} onClick={() => dropdownAction(() => disconnect())}>Disconnect</p>
              <Link href="/app/mytokens">
                <p className={styles.dropdownOption}>My Tokens</p>
              </Link>
            </div>
          </div>
          :
          <ConnectButton/>
          :
          <div className={`${styles.navbarLi} ${styles.connectButton}`}>
            <p className={styles.connectText}>Loading...</p>
          </div>
        )}
        {(isClient ? isConnected ?
          <div className={styles.connectButtonContainer}>
            <div className={`${styles.navbarLi}`} onClick={toggleNetworkMenuOpen}>
              <Image
                src={chainDetails.find((chain_) => chain_.name === (chain && chain.name))?.logo || defaultChain.logo}
                alt={chainDetails.find((chain_) => chain_.name === (chain && chain.name))?.name || defaultChain.name}
                width={23}
                height={23}
                className={styles.chainIcon}
              />
              <p className={`${styles.connectText} ${styles.toHide}`}>{chain ? config.chains.map(item => Number(item.id)).includes(chain.id) ? chain.name : "Unsupported" : "Error"}</p>
            </div>
            <div className={`${styles.dropdown} ${networkMenuOpen ? styles.connectMenuOpen : styles.connectMenuClosed}`}>
              {chainDetails.map((chain) => (
                <p
                  key={chain.chainId}
                  className={styles.dropdownOption}
                  onClick={() => dropdownAction(() => switchChain({
                    chainId: chain.chainId,
                  }))}
                >
                  <Image src={chain.logo} alt={chain.name} className={styles.chainLogo} height={30} width={30} />
                  {chain.name}
                </p>
              ))}
            </div>
          </div>
          :
          <div className={styles.connectButtonContainer}>
            <div className={`${styles.navbarLi}`} onClick={toggleNetworkMenuOpen}>
              <Image
                src={chainDetails.find((chain) => chain.name === tempNetwork)?.logo || defaultChain.logo}
                alt={chainDetails.find((chain) => chain.name === tempNetwork)?.name || defaultChain.name}
                width={23}
                height={23}
                className={styles.chainIcon}
              />
              <p className={`${styles.connectText} ${styles.toHide}`}>{tempNetwork}</p>
            </div>
            <div className={`${styles.dropdown} ${networkMenuOpen ? styles.connectMenuOpen : styles.connectMenuClosed}`}>
              {chainDetails.map((chain) => (
                <p
                  key={chain.chainId}
                  className={styles.dropdownOption}
                  onClick={() => dropdownAction(() => setTempNetwork(chain.name))}
                >
                  <Image src={chain.logo} alt={chain.name} className={styles.chainLogo} height={23} width={23} />
                  {chain.name}
                </p>
              ))}
            </div>
          </div>
          :
          <div className={`${styles.navbarLi} ${styles.connectButtonWhite}`}>
            <Image
              src={defaultChain.logo}
              alt={defaultChain.name}
              width={23}
              height={23}
              className={styles.chainIcon}
            />
            <p className={`${styles.connectText} ${styles.toHide}`}>{defaultChain.name}</p>
          </div>
        )}
        <Link href="/dashboard" className={`${styles.navLeft} ${styles.navbarLi}`}>
          <p>stabilizer</p>
        </Link>
      </div>
    </nav>
  );
};