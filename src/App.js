import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
//1. import plugin and web3 module
import { Web3 } from "web3";
import { ChainlinkPlugin, MainnetPriceFeeds } from "@chainsafe/web3-plugin-chainlink";

function App() {
  // render the result in the front end
  const [btcPrice, setBtcPrice] = useState("0000000");

  //2. Initialize the web3 instance
  const web3 = new Web3(window.ethereum);

  //3. Register the plugin
  web3.registerPlugin(new ChainlinkPlugin());

  async function getPrice() {
    //4. use plugin
    const result = await web3.chainlink.getPrice(MainnetPriceFeeds.EtcUsd);

    setBtcPrice(result.answer.toString().substring(0, 5));
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <button onClick={getPrice}>get Price from Chainlink Plugin</button>

        <p>Price of BTC: {btcPrice}</p>
      </header>
    </div>
  );
}

export default App;
