import axios from 'axios';

export const FetchImagesFromApi = async (page, value) => {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '32942514-6053626dad09aaaa042cf88b1';
  const params = {
    key: API_KEY,
    q: value,
    image_type: 'photo',
    page: page,
    per_page: 12,
    orientation: 'horizontal',
    safesearch: true,
  };

  const response = await axios.get(BASE_URL, { params });
  const {
    data,
    config: {
      params: { page: currentPage },
    },
  } = response;

  return { data, currentPage };
};
