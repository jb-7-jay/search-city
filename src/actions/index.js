import { environment } from "../environment";

const { baseURL, rapidAPIVersion, rapidApiSecret, rapidHost } = environment;

export const fetchCities = async ({
  namePrefix = "",
  offset = 1,
  limit = 5,
}) => {
  const url = `${baseURL}/${rapidAPIVersion}/geo/cities?namePrefix=${namePrefix}&limit=${limit}&offset=${offset}`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": rapidApiSecret,
      "X-RapidAPI-Host": rapidHost,
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};
