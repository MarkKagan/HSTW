// const [allAirports, setAllAirports] = useState<Airport[]>([]);

import { bool, string } from "prop-types";

export type CountryDataType = {
  HL: string[];
  idx: IDX;
  topics?: StringNumberArray[];
};

export type IDX = {
  M: number;
  N: number;
  Nu: number;
  P: number;
  global: number;
};

export type StringNumberArray = [string, number];

export type Country = {
  flag: string;
  name: Name;
  currencies: Currencies[];
  languages: string[];
  region: string;
  demonyms: Demonym;
  capital: string;
};

type Name = {
  official: string;
};

type Currencies = {
  name: string;
};

type Demonym = {
  [key: string]: { m?: string; f?: string };
};

// const obj: Demonym = {
//   eng: {m: 'asdf', f: 'fdas'},
//   fre: {m: 'asdf', f: 'asdf'}
// }

export type Clicked = {
  name: string;
  "Alpha-2": string;
};

export type NavbarProps = {
  mobile: boolean | undefined;
  setMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

// export type SetMenuCallback = {
//   (a: boolean): boolean;
// };

export type MenuProps = {
  setMenu: React.Dispatch<React.SetStateAction<boolean>>;
  userCountry: UserCountry | undefined;
  idx: { [key: string]: IDX };
  setClicked: React.Dispatch<React.SetStateAction<Clicked>>;
};

export type UserCountry = {
  country_name: string;
  country_code: string;
};

export type ISO2 = {
  name: string;
  code: string;
};

export type IndividualProps = {
  //check this later
  clicked: Clicked;
  scrollFunc: (a: any) => any;
  mobile: boolean | undefined;
};

// export type MenuIDX = {
//   a: string
// }

export type mapChart = {
  clickSet: Clicked,  //finish this
  mobile: boolean,
  innerWidth: number
}

export type IDXObj = {
  idx: { [key: string]: IDX }
}

export type CountrySpecificPastData = DataDate[];

export type DataDate = {
  data: IDX,
  date: string
}

export type graph = {
  clicked: Clicked,
  mobile: boolean
}


export interface MapChartProps {
  clickSet: any;
  clicked: any;
  mobile: any;
  innerWidth: any;
}

export interface GraphProps {
  idx: any;
  clicked: any;
  mobile: any;
}