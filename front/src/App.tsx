import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import LayoutHeader from "./layout/LayoutHeader";
import LayoutBody from "./layout/LayoutBody";
import LayoutFooter from "./layout/LayoutFooter";
import ArticleContext from "./contexts/ArticleContext";

function App() {
  const [counter, setCounter] = useState(0);
  const af = useContext(ArticleContext);
  af.setRenderFn(setCounter);

  useEffect(() => {
    console.log("app just rendered. counter = ", counter);
  });

  return (
    <Router>
      {/* <div>counter = {counter}</div> */}
      <div className="App">
        <LayoutHeader />
        <LayoutBody />
        <LayoutFooter />
      </div>
    </Router>
  );
}

export default App;
