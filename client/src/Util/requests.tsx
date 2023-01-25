
import { CountryDataType, IDXObj, UserCountry, CountrySpecificPastData, DataDate, IDX } from "../../Types";

import React from 'react';

const url = 'https://hstwdrop.co';
// IMPORITNG THE SETTER FUNCTION AS AN ARGUMENT ALLOWS US
// TO SKIP AN AWAIT ALL TOGETHER

// export async function getIdx (setter) {
//   fetch(url)
//   .then(response => response.text())
//   .then(data => setter(data))
// }

export async function getTodayIndividualData(
  alphaCode: string,
  setter: React.Dispatch<React.SetStateAction<CountryDataType | undefined>>
) {
  return fetch(`${url}/today?code=${alphaCode}`)
    .then((response) => response.json())
    .then((data) => {
      setter(Object.values(data)[0] as CountryDataType);
    })
    .catch((err) => err);
}

// export async function getDateSpecificGlobalData(date: string, setter: ) {
//   return fetch(`${url}/request?date=${date}`)
//     .then((response) => response.json())
//     .then((data) => setter(Object.values(data)))
//     .catch((err) => err);
// }

// export async function getDateSpecificIndividualData(alphaCode: string, date: string, setter) {
//   return fetch(`${url}/request?code=${alphaCode}&date=${date}`)
//     .then((response) => response.json())
//     .then((data) => JSON.parse(data))
//     .catch((err) => err);
// }

export async function getDateSpecificIndividualIdx(alphaCode: string, date: string, setter: React.Dispatch<React.SetStateAction<IDX | undefined>>) {
  try {
    return fetch(`${url}/idx?code=${alphaCode}&date=${date}`)
    .then((response) => response.json())
    .then((data) => setter(Object.values(data)[0] as IDX))
    .catch((err) => err)
  }
  catch {
    return 'No Data for Today'
  }
}

export async function getDateSpecificGlobalIdx(
  date: string,
  setter: React.Dispatch<React.SetStateAction<IDXObj | undefined>>
) {
  return fetch(`${url}/idx?date=${date}`)
    .then((response) => response.json())
    .then((data) => setter(Object.values(data)[0] as IDXObj))
    .catch((err) => err);
}

// export async function getWorldToday(setter) {
//   return fetch(`${url}/today?code=world`)
//     .then((response) => response.json())
//     .then((data) => setter(data))
//     .catch((err) => err);
// }

export async function getCountryDetails(alphaCode: string) {
  return fetch(
    `https://restcountries.com/v3.1/alpha/${alphaCode}?fields=name,flag,capital,currencies,languages,region,capital,demonyms`
  )
    .then((response) => response.json())
    .catch((err) => err);
}

export async function getWorldPop() {
  return fetch(
    'http://api.worldbank.org/v2/population/SP.POP.TOTL/WLD?format=json'
  )
    .then((response) => response.json())
    .then((data) => JSON.parse(data))
    .catch((err) => err);
}

export async function getUserCountry(setter: React.Dispatch<React.SetStateAction<UserCountry | undefined>>) {
  return fetch('https://ipapi.co/json/')
    .then((response) => response.json())
    .then((data) => setter({country_name : data.country_name, country_code : data.country_code}));
}

export async function getCountrySpecificPastData(country: string, days: number, setter: React.Dispatch<React.SetStateAction<CountrySpecificPastData | undefined>>) {
  return fetch(`${url}/past?code=${country}&days=${days}`)
    .then((response) => response.json())
    .then(data => {
      data = data.reverse()
      console.log(data)
      const chartData = {
        labels: data.map((item: DataDate) => item.date),
        datasets: [
          {
            label: "Happiness Index",
            data: data.map((item: DataDate) => item.data.global * 10),
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
          },
        ],
      }
      setter(chartData as any);
    })
    .catch(()=> setter(undefined))
}