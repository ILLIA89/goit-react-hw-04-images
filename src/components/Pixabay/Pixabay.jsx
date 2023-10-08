export const BASE_URL = 'https://pixabay.com/api/',
  API_KEY = '38992865-c049898a3c4114f4b25977ee3',
  SEARCH_PARAMS = new URLSearchParams({
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
  });
