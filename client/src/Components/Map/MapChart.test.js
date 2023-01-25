import {screen, render, cleanup} from '@testing-library/react';
import MapChart from './MapChart';
import { GlobeMethods } from 'react-globe.gl';

// afterEach(cleanup);

// describe("MapChart", () => {
//   it("should fetch a specific global index upon rendering", () => {
//     const {} = render(
//       <MapChart
//         clickSet={{ name: "Republic of Indonesia", "Alpha-2": "ID" }}
//         mobile={true}
//         innerWidth={500}
//       />
//     );
    
//   })
// })

//we will not do implementation testing, because we are not interested
//in what happens when MapChart loads, but only with what the end user 
//sees and can interact with on the UI