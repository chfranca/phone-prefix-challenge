import axios from 'node_modules/axios/index';

/**
 * The user current location here is based in IP Address lookup and use the service https://ipapi.co/
 * in free plan (30k requests per month) to get the user location.
 */
export const currentUserLocation = () => {
  return axios.get('https://ipapi.co/country/').then(function (res) {
    return res.data;
  });
};
