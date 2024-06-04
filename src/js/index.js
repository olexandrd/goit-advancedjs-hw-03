import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Choices from 'choices.js';
import 'choices.js/public/assets/styles/choices.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  breedSelector: document.querySelector('.js-breed-select'),
  catInfo: document.querySelector('.cat-info'),
};

refs.loader.textContent = '';
refs.error.style.display = 'none';
refs.loader.style.display = 'none';

const onFetchBreeds = async () => {
  refs.loader.style.display = 'block';
  refs.error.style.display = 'none';
  refs.breedSelector.style.display = 'none';
  refs.catInfo.innerHTML = '';
  const breeds = await fetchBreeds();
  refs.loader.style.display = 'none';
  if (breeds) {
    refs.breedSelector.style.display = 'block';
    refs.breedSelector.innerHTML = breeds
      .map(
        breed =>
          `<option class="choices-items" value="${breed.id}">${breed.name}</option>`
      )
      .join('');
    const choices = new Choices(refs.breedSelector, {
      removeItems: false,
      searchEnabled: true,
      placeholder: true,
      allowHTML: false,
      placeholderValue: 'Select a breed',
    });
    refs.breedSelector = document.querySelector('.choices');
  } else {
    // refs.error.style.display = 'block';
    // refs.error.textContent = 'Failed to load breeds';
    iziToast.error({
      title: 'Error',
      message: 'Failed to load breeds',
      position: 'topRight',
    });
  }
};

onFetchBreeds();

refs.breedSelector.addEventListener('change', async event => {
  refs.loader.style.display = 'block';
  refs.error.style.display = 'none';
  refs.catInfo.innerHTML = '';
  const breedId = event.target.value;
  const cat = await fetchCatByBreed(breedId);
  refs.loader.style.display = 'none';
  if (cat) {
    const catName = cat[0].breeds[0].name;
    const catDescription = cat[0].breeds[0].description;
    const catImageUrl = cat[0].url;
    refs.catInfo.insertAdjacentHTML(
      'afterbegin',
      `
        <img class="cat-img" src="${catImageUrl}" alt="${catName}" width="400">
        <div class="text-wrapper">
        <h2 class="cat-name">${catName}</h2>
        <p class="cat-description">${catDescription}</p>
        </div>
      `
    );
  } else {
    // refs.error.style.display = 'block';
    // refs.error.textContent = 'Failed to load breed';
    iziToast.error({
      title: 'Error',
      message: 'Failed to load cat info',
      position: 'topRight',
    });
  }
});
