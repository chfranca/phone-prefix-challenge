import axios from 'node_modules/axios/index';

export const countries = async () => {
  const countries = await axios.get('https://restcountries.com/v3.1/all');
  return countries.data.map((country: any) => {
    return {
      cca2: country.cca2,
      flag: country.flag.svg,
      prefix: !country.idd.suffixes || country.idd.suffixes.length > 1
        ? country.idd.root ?? ''
        : `${country.idd.root}${country.idd.suffixes}`,
    };
  });
};
