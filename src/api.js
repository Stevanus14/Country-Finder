import axios from "axios";

export const getCountryList = async () => {
  const country = await axios.get(`https://restcountries.com/v3.1/all`);
  // console.log({ countryList: country });
  return country.data;
};

export const searchCountry = async (q) => {
  const search = await axios.get(`https://restcountries.com/v3.1/name/${q}`);
  return search.data;
};
