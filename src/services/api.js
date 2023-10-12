import axios from 'axios';

const API_KEY = '39737153-aa8892536503a6aca7f6f6ce9';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchRequest(name, page = 1) {
  const param = new URLSearchParams({
    q: name,
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 12,
  });
  const { data } = await axios(`${BASE_URL}?${param}`);

  return data;
}