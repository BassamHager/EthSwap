import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";
import EthSwap from "../abis/EthSwap.json";
import Token from "../abis/Token.json";
// components
import Navbar from "./Navbar";
import Main from "./Main";

const App = () => {
  const [account, setAccount] = useState("");
  const [ethBalance, setEthBalance] = useState("");
  const [token, setToken] = useState({});
  const [ethSwap, setEthSwap] = useState({});
  const [tokenBalance, setTokenBalance] = useState("0");
  const [loading, setLoading] = useState(true);

  const loadBlockchainData = useCallback(async () => {
    try {
      const web3 = new Web3(window.web3.currentProvider);

      const accounts = await web3.eth.getAccounts();
      web3.eth.defaultAccount = accounts[0];
      setAccount(accounts[0]);

      const ethBal = await web3.eth.getBalance(account);
      setEthBalance(ethBal);

      // load Token
      const { networks, abi } = Token;
      const networkId = await web3.eth.net.getId();
      const tokenData = networks[networkId];
      if (tokenData) {
        const token = new web3.eth.Contract(abi, tokenData.address);
        setToken(token);
        const tokenBal = await token.methods.balanceOf(account).call();
        setTokenBalance(tokenBal.toString());
      } else window.alert("Token contract not deployed to detected network!");

      // load EthSwap
      const ethSwapData = EthSwap.networks[networkId];
      if (ethSwapData) {
        const ethSwap = new web3.eth.Contract(abi, ethSwapData.address);
        setEthSwap(ethSwap);
        console.log(ethSwap);
      } else window.alert("EthSwap contract not deployed to detected network!");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
    setLoading(false);
  }, [account]);

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
  }, [loadBlockchainData]);

  return (
    <div>
      <Navbar acc={account || "#"} />
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
            <div className="content mr-auto ml-auto">
              {!loading ? (
                <Main />
              ) : (
                <h2 id="loader" className="text-center">
                  Loading...
                </h2>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
