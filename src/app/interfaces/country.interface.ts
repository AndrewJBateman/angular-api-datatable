// format of initial response with only 4 fields to be fetched from API
export interface CountryListInterface {
  name: Name;
  capital: string;
  region: string;
  cca2: string;
}

export interface Name {
  common: string;
  nativeName: {
    deu: {
      official: string;
      common: string;
    };
    official: string;
  };
}
