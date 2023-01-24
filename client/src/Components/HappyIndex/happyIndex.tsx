import React, { useEffect, useState } from 'react';
import { getDateSpecificIndividualIdx } from '../../Util/requests';
import './happyIndex.css';
import { IDX } from '../../../Types';

export default function HappyIndex() {
  const [idx, setIdx] = useState<IDX>();
  const [yIdx, setYIdx] = useState<IDX>();

  function parseDate(date: Date): string {
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const y = String(date.getFullYear()).slice(-2);

    return `${d}-${m}-${y}`
  }

  // Calling the API for Happiness index at initialization
  useEffect(() => {
    
    const today = new Date()
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1);
    
    getDateSpecificIndividualIdx('world', parseDate(today) , setIdx)
    getDateSpecificIndividualIdx('world', parseDate(yesterday) , setYIdx)

  }, []);

  return (
    <div id="index-container">
      {idx && yIdx
      &&
      <>
      <div id='today-index-container' className='index-containers'>
      <span id="index">World Happiness</span>
      <span>{Math.floor(idx.global * 10)}</span>
      </div>
      <div id='yestarday-index-container' className='index-containers'>
      <span id="yesterday-comparison">Yesterday </span>
      <span>{Math.floor(yIdx.global * 10)}</span>
      </div>
      </>}
      {yIdx &&
      <span id="index">Index : {`${Math.floor(yIdx.global * 10) / 100}`}</span>
      }
    </div>
  );
}
