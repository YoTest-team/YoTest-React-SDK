import React, { useState } from "react";
import "./App.css";

import useYoTest from "../src/yo-test";

function App() {
  const YoTest = useYoTest({ accessId: "TODO", product: "popup" });

  return <div className="App">{YoTest.ui}</div>;
}

export default App;
