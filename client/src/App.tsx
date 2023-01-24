import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Menu from "./Components/Menu/Menu";
import Footer from "./Components/Footer/Footer";
import { getUserCountry, getDateSpecificGlobalIdx } from "./Util/requests";
import { parseDate } from "./Util/Utility";
import { useState, useEffect } from "react";
//@ts-ignore
import Home from "./Pages/Home";
//@ts-ignore
import About from "./Pages/About";
//@ts-ignore
import Transparency from "./Pages/Transparency";


import React from "react";

import { Clicked, UserCountry, IDX } from "../Types";

export default function App() {
  const [innerWidth, setInnerWidth] = useState<number | undefined>(); //change this!
  const [clicked, setClicked] = useState<Clicked>({
    name: "world",
    "Alpha-2": "world",
  });
  const [mobile, setMobile] = useState<boolean>(false);
  const [menu, setMenu] = useState<boolean>(false);
  const [userCountry, setUserCountry] = useState<UserCountry | undefined>(
    undefined
  );
  const [idx, setIdx] = useState<{[key:string]: IDX}>();

  // eslint-disable-next-line no-restricted-globals
  // screen.orientation.lock('portrait')

  function handleWindowSizeChange() {
    window.innerWidth <= 500 ? setMobile(true) : setMobile(false);
    setInnerWidth(window.innerWidth);
  }

  useEffect(() => {
    window.innerWidth <= 500 ? setMobile(true) : setMobile(false);
    window.addEventListener("resize", handleWindowSizeChange);

    const date = parseDate(new Date());
    getUserCountry(setUserCountry);

    getDateSpecificGlobalIdx(date, setIdx as any);

    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return (
    <div id="global-container">
      <Router>
        <Navbar setMenu={setMenu} mobile={mobile} />
        {menu ? (
          <Menu
            idx={idx as any}
            setMenu={setMenu}
            userCountry={userCountry}
            setClicked={setClicked}
          />
        ) : (
          ""
        )}
        <div id="sub-container" className={mobile ? "mobile-padding" : ""}>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  idx={idx}
                  mobile={mobile}
                  innerWidth={innerWidth}
                  setClicked={setClicked}
                  clicked={clicked}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/transparency" element={<Transparency />} />
          </Routes>
          <Footer />
        </div>
      </Router>
      {/* <span>{userCountry ? 'You currently are in ' + userCountry.country_name : ':)'}</span> */}
    </div>
  );
}
