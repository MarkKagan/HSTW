import React from "react";
import { useEffect, useState } from "react";

export default function Title({ index, mobile }:any) {

  const[wordObj, setWordObj] = useState()

  useEffect(()=>{
    if (index.world) setWordObj(assignWord(index.world.global) as any)
  }, [index])

  function assignWord(idx:any) {
    if (idx < -2) {
      return {
        word : 'Terrible',
        color : 'rgb(200, 100, 0)'
    };
    }
    if (idx > 2) {
      return {
        word : 'Amazing',
        color : 'rgb(50, 200, 50)'
    };
    }
    if (idx <= -1) {
      return {
        word : 'Bad',
        color : 'rgb(250, 20, 20)'
    };
    }
    if (idx >= 1) {
      return {
        word : 'Good',
        color : 'rgb(20, 250, 20)'
    };
    }
    if (idx > -1 || idx < 1) {
      return {
        word : 'Pretty Average',
        color : 'rgb(200, 200, 20)'
    };
    }
  }

  return (
    <div>
      {index && wordObj ? (
        mobile
        ?
        <h2 className="master" id="mobile-title">
          The World is doing <br/><span id="keyword-title" style={{
            'backgroundColor' : (wordObj as any).color
            }}>{(wordObj as any).word}</span> today.
        </h2>
        :
        <h2 className="master" id='desktop-title'>
        The World is doing <br/><span id="keyword-title" style={{
          'backgroundColor' : (wordObj as any).color
          }}>{(wordObj as any).word}</span> today.
        </h2>

      )
      :
      ""
      }
    </div>
  );
}
