import axios from 'axios';

const breedsUrs = 'https://api.thecatapi.com/v1/breeds';
const searchUrl = 'https://api.thecatapi.com/v1/images/search';

const refs = {
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  breedSelector: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
};

axios.defaults.headers.common['x-api-key'] = import.meta.env.VITE_CAT_API_KEY;

const fetchBreeds = async () => {
  try {
    const response = await axios.get(breedsUrs);
    return response.data;
  } catch (error) {
    console.error('Error fetching breeds: ', error);
  } finally {
    refs.loader.style.display = 'none';
  }
};

const fetchCatByBreed = async breedId => {
  try {
    const response = await axios.get(searchUrl, {
      params: { breed_ids: breedId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching breed: ', error);
  } finally {
    refs.loader.style.display = 'none';
  }
};

export { fetchBreeds, fetchCatByBreed };
