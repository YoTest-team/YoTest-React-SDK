import React, { useState } from "react";
import "./App.css";

import useYoTest from "../src/yo-test";

function App() {
  const [count, setCount] = useState(0);

  const YoTest = useYoTest({ accessId: "TODO" });

  return <div className="App">{YoTest.ui}</div>;
}

export default App;
