import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";
import Navbar from "./Navbar";

const App = () => {
  const [account, setAccount] = useState("");
  const [ethBalance, setEthBalance] = useState("");

  const loadBlockchainData = useCallback(async () => {
    try {
      const web3 = new Web3(window.web3.currentProvider);

      const accounts = await web3.eth.getAccounts();
      web3.eth.defaultAccount = accounts[0];
      setAccount(accounts[0]);

      const ethBal = await web3.eth.getBalance(account);
      setEthBalance(ethBal);

      console.log(ethBalance);
    } catch (error) {
      console.error(error);
    }
  }, [account, ethBalance]);

  const loadWeb3 = async () => {
    window.addEventListener("load", async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          // Acccounts now exposed
          window.web3.eth.sendTransaction({
            /* ... */
          });
        } catch (error) {
          // User denied account access...
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        // console.log(window.web3);
        // Acccounts always exposed
        window.web3.eth.sendTransaction({
          /* ... */
        });
      }
      // Non-dapp browsers...
      else {
        console.log(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }
    });
  };

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, [loadBlockchainData, loadWeb3]);

  return (
    <div>
      <Navbar acc={account || "#"} />
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
            <div className="content mr-auto ml-auto">
              <h1>one</h1>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
