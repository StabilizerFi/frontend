import { http, createConfig } from 'wagmi'
import { fantom, fantomTestnet } from 'wagmi/chains'
import { getDefaultConfig } from "connectkit";

export const contracts: { [key: number]: `0x${string}` } = {
  250: "" as `0x${string}`,
  4002: "0x2f999b33b3c3bC7cB7B169B0f73D994Bd6da7B19" as `0x${string}`
}

export const defaultChain = { chainId: 4002, name: "Fantom", symbol: "FTM", logo: "/fantom.png" };

export const pythPriceID = "0x5c6c0d2386e3352356c3ab84434fafb5ea067ac2678a38a338c4a69ddc4bdb0c";
export const hermesEndpoint = "https://hermes.pyth.network";

export const walletConnectId = "9146e4caba1fb054ed247b33de990a92";

export const appName = "Stablizer";

export const nullAddress = "0x0000000000000000000000000000000000000000";

export const config = createConfig(
  getDefaultConfig({
    chains: [fantom, fantomTestnet],
    transports: {
      [fantom.id]: http(),
      [fantomTestnet.id]: http(),
    },
    walletConnectProjectId: walletConnectId,
    appName: appName,
  }),
);
