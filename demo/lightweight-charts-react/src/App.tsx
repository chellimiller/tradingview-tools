import React from "react";
import logo from "./logo.svg";
import { Chart, CrosshairMode } from "lightweight-charts-react";
import "./App.css";

const chartOptions = {
  width: 600,
  height: 300,
  layout: {
    backgroundColor: "#000000",
    textColor: "rgba(255, 255, 255, 0.9)",
  },
  grid: {
    vertLines: {
      color: "rgba(197, 203, 206, 0.5)",
    },
    horzLines: {
      color: "rgba(197, 203, 206, 0.5)",
    },
  },
  crosshair: {
    mode: CrosshairMode.Normal,
  },
  rightPriceScale: {
    borderColor: "rgba(197, 203, 206, 0.8)",
  },
  timeScale: {
    borderColor: "rgba(197, 203, 206, 0.8)",
  },
};

function App() {
  return (
    <div className="App">
      <Chart {...chartOptions}></Chart>
    </div>
  );
}

export default App;
