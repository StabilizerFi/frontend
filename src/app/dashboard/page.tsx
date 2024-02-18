"use client";

import styles from "./page.module.css";

import { useBalance, useAccount } from 'wagmi';

import { pythPriceID } from '@/Constants/config';
import { getPrice } from '@/Utils/Pyth/getPrice';

import { useState, useEffect } from "react";

import { defaultChain } from "@/Constants/config";
import { contracts } from "@/Constants/config";

import Link from "next/link";

export default function Dashboard() {
    const [price, setPrice] = useState<string>("0.00000");

    useEffect(() => {
        const fetchPrice = async () => {
            const newPrice = await getPrice(pythPriceID, 5);
            setPrice(newPrice ? newPrice : "0.00000");
        };

        fetchPrice();

        const intervalId = setInterval(fetchPrice, 1000);

        return () => clearInterval(intervalId);
    }, []);
    const { isConnected, chainId } = useAccount();
    const { data } = useBalance({
        address: contracts[isConnected ? chainId ? chainId : defaultChain.chainId : defaultChain.chainId],
        chainId: isConnected ? chainId ? chainId : defaultChain.chainId : defaultChain.chainId
    })
    return (
        <main>
            <div>
                <p className={styles.appHeader}>Dashboard</p>
                <div className={styles.info}>
                    <p className={styles.header}>Open a Loan</p>
                    <p className={styles.headerDetails}>0.49% Fee</p>
                    <p>Loans issue AUSD in exchange for FTM. The amount of AUSD you have to pay back will never change.</p>
                    <Link href="/dashboard/loan/new">
                        <p className={styles.button}>Start</p>
                    </Link>
                </div>
                <div className={styles.info}>
                    <div className={styles.section}>
                        <p className={styles.header}>Live Price Feed</p>
                        <p className={styles.headerDetails}>FTM / USD</p>
                        <p>1 FTM / {price} USD</p>
                    </div>
                    <div className={styles.section}>
                        <p className={styles.header}>Collateral (TVL)</p>
                        <p className={styles.headerDetails}>FTM (USD)</p>
                        <p>{Number(data ? data.value : 0)} FTM ({data ? Number(data.value) * Number(price) : 0} USD)</p>
                    </div>
                </div>
            </div>
        </main>
    );
}