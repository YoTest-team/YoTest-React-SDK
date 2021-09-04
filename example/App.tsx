import React from "react";
import useYoTest from "../YoTest";
import "./App.css";

function App() {
  const { captcha } = useYoTest({
    accessId: "TODO",
    product: "custom",
    area: ".App",
    bgColor: "red",
    style: {
      width: 300,
      height: 40,
    },
    onSuccess({ token, verified }) {
      console.log("success", token, verified);
    },
    onError({ code, message }) {
      console.log("error", code, message);
    },
  });

  return <div className="App">{captcha}</div>;
}

export default App;
