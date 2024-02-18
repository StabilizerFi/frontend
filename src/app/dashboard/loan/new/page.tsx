"use client";

import styles from "./page.module.css";

import { getPrice } from "@/Utils/Pyth/getPrice";
import { useState, useEffect } from "react";
import { useWriteContract, useAccount, useReadContract } from "wagmi";
import { stabilizerUSDABI } from "@/Constants/ABIs/stabilizerUSD";
import { getPriceUpdateData } from "@/Utils/Pyth/getPriceUpdateData";
import { contracts, defaultChain, pythPriceID } from "@/Constants/config";
import { nullAddress } from "@/Constants/config";
import { getNewLoanMessage } from "@/Utils/getNewLoanMessage";

export default function NewLoan() {
    const [price, setPrice] = useState<string>("0.00000");
    const [collateral, setCollateral] = useState<number>(0);
    const [stable, setStable] = useState<number>(0);
    const { data: hash, writeContractAsync } = useWriteContract();
    const [isClient, setIsClient] = useState(false);

    const { isConnected, chainId } = useAccount();

    const fees = (((collateral) * 0.001));
    const realCollateral = (collateral - fees);
    const collateralRatio = (Number(price) * realCollateral / stable * 100);

    const { data } = useReadContract({
        abi: stabilizerUSDABI,
        address: contracts[isConnected ? chainId ? chainId : defaultChain.chainId : defaultChain.chainId],
        functionName: 'getMinimumCollateral',
        args: [BigInt(stable * 10 ** 18)]
      })

    const write = async () => {
        const priceUpdateData = await getPriceUpdateData(pythPriceID);
        await writeContractAsync({
            address: contracts[isConnected ? chainId ? chainId : defaultChain.chainId : defaultChain.chainId],
            abi: stabilizerUSDABI,
            functionName: 'openLoan',
            args: [BigInt(stable * 10 ** 18), nullAddress, nullAddress, priceUpdateData as `0x${string}`[]],
            value: BigInt(collateral * 10 ** 18),
        });
    }



    useEffect(() => {
        // nextjs client
        setIsClient(true);
        // price
        const fetchPrice = async () => {
            const newPrice = await getPrice(pythPriceID, 8);
            setPrice(newPrice ? newPrice : "0.00000");
        };

        fetchPrice();

        const intervalId = setInterval(fetchPrice, 1000);

        return () => clearInterval(intervalId);
    }, []);

    // input
    const onCollateralChange = (e: any) => {
        setCollateral(e.target.value);
    }

    const onStableChange = (e: any) => {
        setStable(e.target.value);
    }

    const { isValid, errorMessage } = getNewLoanMessage(collateral, stable, Number(price), Number(data));

    return (
        <main>
            <p className={styles.appHeader}>New Loan</p>
            <div className={styles.info}>
                <div className={styles.sections}>
                    <div className={styles.section}>
                        <p className={styles.header}>Open a Loan</p>
                        <p className={styles.headerDetails}>0.10% Fee</p>
                        <div className={styles.inputBox}>
                            <p className={styles.inputDesc}>Collateral*</p>
                            <input onChange={onCollateralChange} className={styles.input} type="number" placeholder="0" disabled={!isClient}></input>
                            <p className={styles.inputName}>FTM</p>
                        </div>
                        <div className={styles.inputBox}>
                            <p className={styles.inputDesc}>Borrow</p>
                            <input onChange={onStableChange} className={`${styles.input}`} type="number" placeholder="0" disabled={!isClient}></input>
                            <p className={styles.inputName}>USD</p>
                        </div>
                    </div>
                    <div className={styles.section}>
                        <p className={styles.header}>Overview</p>
                        <p className={styles.headerDetails}>Stats</p>
                        <p className={styles.statName}>Collateral Ratio (CR)</p>
                        <p className={styles.stat}>{!(!Number.isFinite(collateralRatio) || Number.isNaN(collateralRatio)) ? collateralRatio.toFixed(2) + "%" : "N/A"}</p>
                        <p className={styles.statName}>Minimum CR</p>
                        <p>{((Number(data) / 10**24) * 100 / stable).toFixed(2)}%</p>
                        <p className={styles.statName}>Fees</p>
                        <p className={styles.stat}>{Number(fees.toFixed(5))} FTM</p>
                        <p className={styles.statName}>Collateral</p>
                        <p className={styles.stat}>{Number(realCollateral.toFixed(5))} FTM</p>
                        {!isValid && <p>{errorMessage}</p>}
                        <button disabled={!isValid} className={`${styles.button} ${!isValid && styles.disabled}`} onClick={() => write()}>Open Loan</button>
                    </div>
                </div>
            </div>
        </main>
    )
}