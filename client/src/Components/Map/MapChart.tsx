import React, { useState, useEffect, useRef } from 'react';
import './Map.css';
import Globe from 'react-globe.gl';
import GlobeControls from "react-globe.gl"
import { getDateSpecificGlobalIdx } from '../../Util/requests';
import { generateColor, parseDate } from '../../Util/Utility';


const geoUrl = process.env.PUBLIC_URL + '/assets/Topology.json';


import { IDXObj, mapChart, MapChartProps } from '../../../Types';

export default function MapChart(props:MapChartProps) {


  const [idx, setIdx] = useState<IDXObj>();
  const [countries, setCountries] = useState({ features: []});
  const [hoverD, setHoverD] = useState()
  const [clickD, setClickD] = useState()
  // This function will check the position of the cursor on hover
  const globeEl = React.useRef<typeof GlobeControls>(null);
  useEffect(() => {
    const today = new Date()

    getDateSpecificGlobalIdx(parseDate(today), setIdx);

      // load data
    fetch(geoUrl).then(res => res.json())
      .then(countries=> {
        setCountries(countries);
      });
      if (globeEl.current) {
        (globeEl.current as any).controls().autoRotate = true;
        (globeEl.current as any).controls().autoRotateSpeed = 0.3;
        (globeEl.current as any).pointOfView({ altitude: 2 }, 3000);
      }
  }, []);


  return (
    <>
    {props.mobile
      ?
      <div id="mobile-container">
      <Globe
      ref = {globeEl as any}
      height={500}
      width={innerWidth - 24}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      polygonsData={(countries.features as any).features.filter((d:any) => d.properties.ISO_A2 !== 'AQ')}

      polygonSideColor={(d: any) => d === hoverD ? 'steelblue' : generateColor((idx as any)[d.properties.ISO_A2 !== '-99' ? d.properties.ISO_A2 : d.properties.FIPS_10_], 0.15) as any}

      polygonCapColor={(d: any) => generateColor((idx as any)[d.properties.ISO_A2 !== '-99' ? d.properties.ISO_A2 : d.properties.FIPS_10_], 1, d === clickD ? 'click' : undefined) as any}
      onPolygonClick={d => {
        (props.clickSet as any)({name : (d as any).properties.NAME, 'Alpha-2' : (d as any).properties.ISO_A2})
        setClickD(d as any)
      }}
      polygonStrokeColor={() => '#111'}
      polygonLabel={({ properties: d }:any) => `${(d as any).ADMIN} | ${(d as any).ISO_A2}`}
      polygonAltitude={0.04}
      polygonsTransitionDuration={1000}
      />
      </div>
      :
      <div id="map-container">
      <Globe
      ref = {globeEl as any}
      height={window.innerHeight / 1.5}
      width={window.innerWidth - 40}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      polygonsData={countries.features.filter((d:any) => d.properties.ISO_A2 !== 'AQ')}
      polygonSideColor={(d:any) => d === hoverD ? 'steelblue' : generateColor((idx as any)[d.properties.ISO_A2 !== '-99' ? d.properties.ISO_A2 : d.properties.FIPS_10_], 0.15) as any}
      polygonCapColor={(d:any) => generateColor((idx as any)[d.properties.ISO_A2 !== '-99' ? d.properties.ISO_A2 : d.properties.FIPS_10_], 1, d === hoverD ? 'hover' : d === clickD ? 'click' : undefined) as any}
      onPolygonHover={setHoverD as any}
      onPolygonClick={d => {
        (props.clickSet as any)({name : (d as any).properties.NAME, 'Alpha-2' : (d as any).properties.ISO_A2})
        setClickD(d as any)
      }}      polygonStrokeColor={() => '#111'}
      polygonAltitude={0.07}
      polygonLabel={({ properties: d }:any) => `${d.ADMIN} | ${d.ISO_A2}`}
      />
      </div>
    }
    </>
  );
}
