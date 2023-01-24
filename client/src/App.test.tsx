import * as React from "react";
import {act} from 'react-dom/test-utils';
import * as ReactDOM from "react-dom";
import App from "./App";
import {render} from "@testing-library/react"

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Title from "./Components/Title";


describe('App Test', function () {
   it('That the APP renders', function () {
      render(<App/>)

   });
});


describe('Title Test', () => {

  let containder:HTMLDivElement


    beforeEach(()=>{
      containder = document.createElement('div');
      document.body.appendChild(containder);
      ReactDOM.render(<Title/>, containder);
    })

    afterEach(()=>{
      document.body.removeChild(containder);
      containder.remove();
    })

    it('There is no Span Element in the Title component',  () => {
        const spans = containder.querySelectorAll('span');
        expect(spans).toHaveLength(0)
    });

})

