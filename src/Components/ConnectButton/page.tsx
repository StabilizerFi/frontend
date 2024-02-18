import { ConnectKitButton } from "connectkit";
import styles from "./page.module.css"

export default function ConnectButton() {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, hide, address, ensName, chain }) => {
        return (
          <div onClick={show} className={styles.connectButton}>
            <p>{isConnected ? address : "Connect"}</p>
          </div>
        );
      }}
    </ConnectKitButton.Custom>
  )
}