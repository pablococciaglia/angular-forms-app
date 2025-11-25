export interface Country {
  name: Name;
  cca3: string;
  borders: string[];
}

export interface Name {
  common: string;
  official: string;
  nativeName: { [key: string]: NativeName };
}

export interface NativeName {
  official: string;
  common: string;
}

export enum Region {
  Africa = 'Africa',
  Americas = 'Americas',
  Antarctic = 'Antarctic',
  Asia = 'Asia',
  Europe = 'Europe',
  NorthAmerica = 'North America',
  Oceania = 'Oceania',
  SouthAmerica = 'South America',
}
