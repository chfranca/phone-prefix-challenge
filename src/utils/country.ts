import axios from 'node_modules/axios/index';

/**
 * Integrate with rest countries api to get all countries information
 * more datails see https://restcountries.com/   
 * @returns list of countries with ISO 3166-1 alpha-2 code, flag svg and prefix to number
 */
export const countries = () => {
  return axios.get('https://restcountries.com/v3.1/all').then((countries) => {
    return countries.data.map((country: any) => {
      return {
        cca2: country.cca2,
        flag: country.flags.svg,
        prefix:
          !country.idd.suffixes || country.idd.suffixes.length > 1
            ? country.idd.root ?? ''
            : `${country.idd.root}${country.idd.suffixes}`,
      };
    });
  });
};
