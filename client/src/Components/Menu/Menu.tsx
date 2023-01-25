import "./Menu.css";
//@ts-ignore
import { generateColor } from "../../Util/Utility";
import { useState, useEffect } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import React from "react";

import { MenuProps, ISO2, Clicked } from "../../../Types";

export default function Menu({
  setMenu,
  userCountry,
  idx,
  setClicked,
}: MenuProps) {
  // if (!userCountry) return;

  const imgURL = process.env.PUBLIC_URL + "/assets/32x32/";

  // const arrItem: string =
  //   window.localStorage.getItem("arr") === null
  //     ? ""
      // : (window.localStorage.getItem("arr") as string);

  const arrItem = window.localStorage.getItem("arr") ?? "";

  const localArr = window.localStorage.getItem(arrItem);

  const [list, setList] = useState<ISO2[]>([]);
  const [deleteMode, setDeleteMode] = useState<boolean>(false);

  const initialDisplayIndexesState: ISO2[] =
    localArr === null && userCountry !== undefined
      ? [
          { name: "World", code: "world" },
          { name: userCountry.country_name, code: userCountry.country_code },
        ]
      // : [JSON.parse(localArr)] as ISO2[];
        : [JSON.parse(localArr ?? "")] as ISO2[];  //ZOD
    
  const [displayedIndexes, setDisplayIndexes] = useState<ISO2[]>(
    initialDisplayIndexesState
  );

  const ISO2List: string = process.env.PUBLIC_URL + "/assets/ISO2.json";

  useEffect(() => {
    fetch(ISO2List)
      .then((res) => res.json())
      .then((codes) => {
        setList(codes);
      });
  }, []);

  function parse(index: number) {
    const temp: number = index * 10;
    return temp;
  }

  function storeToLocaleStorage(arrOfIdx: ISO2[]) {
    const stringified = JSON.stringify(arrOfIdx);
    window.localStorage.setItem("arr", stringified);
  }

  function handleSubmit(e: ISO2) {
    const tempArr = [...displayedIndexes];
    tempArr.push(e);
    storeToLocaleStorage(tempArr);
    setDisplayIndexes(tempArr);
  }

  function handleSelect(obj: Clicked) {
    setMenu(false);
    setClicked(obj);
  }

  function handleDelete(country: Clicked) {
    const tempArr = [...displayedIndexes];
    const newTemp = tempArr.filter((x) => x.name !== country.name);
    storeToLocaleStorage(newTemp);
    setDisplayIndexes(newTemp);
  }

  return (
    <div id="global-menu-container">
      <div id="menu-container">
        <div id="menu-content-container">
          <button id="edit-countries" onClick={() => setDeleteMode((d) => !d)}>
            Edit Countries
          </button>
          {displayedIndexes.map((display) => {
            try {
              return (
                <button
                  type="button"
                  onClick={() =>
                    deleteMode
                      ? handleDelete({
                          name: display.name,
                          "Alpha-2": display.code,
                        })
                      : handleSelect({
                          name: display.name,
                          "Alpha-2": display.code,
                        })
                  }
                  key={display.code}
                  className="indicator-menu-container"
                  id={deleteMode ? "delete" : ""}
                >
                  <div id="menu-left-container">
                    {
                      <img
                        title="flag-menu" 
                        className="flag-menu"
                        src={imgURL + display.code.toLowerCase() + ".png"}
                        width={15}
                        height={15}
                      ></img>
                    }
                    <span className="indicator-menu">
                      {display.name} index :
                    </span>
                  </div>
                  <span
                    className="indicator-menu menu-index"
                    style={{
                      backgroundColor: generateColor(idx[display.code]), 
                    }}
                  >
                    {parse(idx[display.code].global)}
                  </span>
                </button>
              );
            } catch {
              return (
                <button
                  onClick={() =>
                    deleteMode
                      ? handleDelete({
                          name: display.name,
                          "Alpha-2": display.code,
                        })
                      : handleSelect({
                          name: display.name,
                          "Alpha-2": display.code,
                        })
                  }
                  key={display.code}
                  className="indicator-menu-container"
                  id={deleteMode ? "delete" : ""}
                >
                  <span className="indicator-menu">
                    {display.name} index :{" "}
                  </span>
                  <span
                    className="indicator-menu menu-index"
                    style={{ backgroundColor: generateColor(undefined) }}
                  >
                    N/A
                  </span>
                </button>
              );
            }
          })}
          <hr style={{ width: "100%", marginTop: "15px" }} />
          <div id="buttons-menu">
            <div id="search-bar-styler">
              <ReactSearchAutocomplete
                placeholder="Add a Country"
                key="auto-complete"
                items={list}
                onSelect={handleSubmit}
              />
            </div>
          </div>
          <div id="connect-buttons">
            <a
              className="logo-footer"
              href="https://github.com/TerenceGrover/HSTW"
            >
              <i className="fa fa-github"></i>
            </a>
            <a
              className="logo-footer"
              href="https://www.linkedin.com/in/terence-grover-monaco/"
            >
              <i className="fa fa-linkedin-square"></i>
            </a>
          </div>
        </div>
      </div>
      <div id="modal-back" onClick={() => setMenu((m) => !m)}></div>
    </div>
  );
}
