import React, { useState } from "react";
import tokenLogo from "../assets/token-logo.png";
import ethLogo from "../assets/eth-logo.jpg";

const Main = () => {
  const [output, setOutput] = useState("0");

  return (
    <div id="content">
      <div
        className="card mb-4"
        style={{
          overflow: "hidden",
          borderRadius: "50%",
          background: "transparent",
        }}
      >
        <div
          className="card-body"
          style={{
            padding: "100px",
            // background: "rgba($color:#000 ,$alpha:0.5)",
            background: "rgba(0,0,0 ,0.9)",
            // background: " blue",
          }}
        >
          <form
            className="mb-3"
            // onSubmit={(event) => {
            //   event.preventDefault();
            //   let etherAmount;
            //   etherAmount = this.input.value.toString();
            //   etherAmount = window.web3.utils.toWei(etherAmount, "Ether");
            //   this.props.buyTokens(etherAmount);
            // }}
          >
            <div>
              <label className="float-left">
                <b>Input</b>
              </label>
              <span className="float-right text-muted">
                Balance:
                {/* {window.web3.utils.fromWei(this.props.ethBalance, "Ether")} */}
              </span>
            </div>
            <div className="input-group mb-4">
              <input
                type="text"
                onChange={(event) => {
                  // const etherAmount = this.input.value.toString();
                  // this.setState({
                  //   output: etherAmount * 100,
                  // });
                }}
                ref={(input) => {
                  // this.input = input;
                }}
                className="form-control form-control-lg"
                placeholder="0"
                required
                style={{ padding: "40px" }}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <img
                    src={ethLogo}
                    // height="32"
                    alt="eth logo"
                    style={{
                      borderRadius: "50%",
                      width: "50px",
                      height: "50px",
                      margin: "0 10px",
                    }}
                  />
                  ETH
                </div>
              </div>
            </div>
            <div>
              <label className="float-left">
                <b>Output</b>
              </label>
              <span className="float-right text-muted">
                Balance:
                {/* {window.web3.utils.fromWei(this.props.tokenBalance, "Ether")} */}
              </span>
            </div>
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="0"
                // value={this.state.output}
                disabled
                style={{ padding: "40px" }}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <img
                    src={tokenLogo}
                    height="32"
                    alt=""
                    style={{
                      borderRadius: "50%",
                      width: "50px",
                      height: "50px",
                      margin: "0 10px",
                    }}
                  />
                  DApp
                </div>
              </div>
            </div>
            <div className="mb-5">
              <span className="float-left text-muted">Exchange Rate</span>
              <span className="float-right text-muted">1 ETH = 100 DApp</span>
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              style={{ padding: "40px" }}
            >
              SWAP!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Main;
