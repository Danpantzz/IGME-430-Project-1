const handleResponse = async (response) => {
  const showContainer = document.querySelector('#show-container');
  const marvelURL = "https://gateway.marvel.com:443/v1/public/"
  const publicKey = '3d064ffe33b8e2b0c086c74a3b6181e7';
  const ts = '1696798502523';
  const hash = '96a9e4a23329c23b0d63a3b54637dce4';

  showContainer.innerHTML = "";

  switch (response.status) {
    case 200:
      console.log(`Success: ${response.status}`);
      break;
    case 201:
      showContainer.innerHTML = `<b>User Created and Character Favorited!</b>`;
      break;
    case 204:
      showContainer.innerHTML = `<b>Character Favorited!</b>`;
      break;
    case 400:
      showContainer.innerHTML = `<b>Bad Request</b>`;
      break;
    case 404:
      showContainer.innerHTML = `<b>Not Found</b>`;
      break;
    default:
      showContainer.innerHTML = `Error code not implemented by client.`;
      break;
  }

  let obj = await response.json();

  if (obj.message) {
    showContainer.innerHTML += `<b>${obj.message}</b>`;
  }

  // Display favorited Characters
  obj.users[`${username.value}`].forEach(async (item) => {
    const url = `${marvelURL}characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&name=${item.character}`;

    const response = await fetch(url);
    const jsonData = await response.json();
    jsonData.data["results"].forEach((element) => {
      const div = document.createElement("div");
      div.innerHTML = `
      <div class="card-container">
        <div class="container-character-image">
          <img src="${element.thumbnail["path"] + "." + element.thumbnail["extension"]}" />
        </div>
        <div class="character-name">${element.name}</div>
        <div class="character-description">${element.description}</div>
      </div>`;
      if (!element.description) {
        div.innerHTML = `
      <div class="card-container">
        <div class="container-character-image">
          <img src="${element.thumbnail["path"] + "." + element.thumbnail["extension"]}" />
        </div>
        <div class="character-name">${element.name}</div>
        <div class="character-description">No Description Provided.</div>
      </div>`;

      }
      showContainer.appendChild(div);
    });
  })

};

// Send Post data, favoriting and unfavoriting characters
const sendPost = async (searchForm) => {
  const searchAction = searchForm.getAttribute('action');
  const searchMethod = searchForm.getAttribute('method');

  // send username and character to server
  const formData = `username=${username.value}&character=${searchForm.value}`;

  let response = await fetch(searchAction, {
    method: searchMethod,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
    },
    body: formData,
  });

  handleResponse(response);
};

// called when requesting favorites
const requestUpdate = async (button) => {
  const searchAction = `${button.getAttribute('action')}?username=${username.value}`;
  const method = button.getAttribute('method');

  searchAction 

  let response = await fetch(searchAction, {
    method,
    headers: {
      'Accept': 'application/json'
    },

  });

  handleResponse(response);
};

// remove button clicked on card
const removeFavorite = (name) => {
  name.value = searchForm.value;
  sendPost(name);
}

// favorite button clicked on card
const favorite = (name) => {
  console.log(`favorite: ${name}`);
  sendPost(name);
}

const init = () => {
  // basic data for calling external API
  const marvelURL = "https://gateway.marvel.com:443/v1/public/"
  const publicKey = '3d064ffe33b8e2b0c086c74a3b6181e7';
  const ts = '1696798502523';
  const hash = '96a9e4a23329c23b0d63a3b54637dce4';

  // document selectors
  const searchForm = document.querySelector("#searchForm");
  const searchButton = document.querySelector("#searchButton");
  const allButton = document.querySelector("#allButton");
  const showContainer = document.querySelector("#show-container");
  const listContainer = document.querySelector(".list");
  const favoritesButton = document.querySelector("#favoritesButton");
  const username = document.querySelector("#username");

  // offset to show different pages of characters (not implemented)
  let offset = 0;

  // called to remove everything from showContainer
  const removeElements = () => {
    listContainer.innerHTML = "";
  }

  // changes searchForm.value to value clicked in search dropdown
  const displayWords = (value) => {
    searchForm.value = value;
    removeElements();
  }

  // display the different search options
  const displayOptions = async () => {
    removeElements();

    if (searchForm.value.length < 4) {
      return false;
    }

    const url = `${marvelURL}characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&nameStartsWith=${searchForm.value}`;

    const response = await fetch(url);
    const jsonData = await response.json();

    // iterate through API response and set up HTML element
    jsonData.data["results"].forEach((result) => {
      let name = result.name;
      let div = document.createElement("div");
      div.style.cursor = "pointer";
      div.classList.add("autocomplete-items");
      div.addEventListener("click", () => { displayWords(name); listContainer.style.display = "none"; });
      let word = "<b>" + name.substr(0, searchForm.value.length) + "</b>";
      word += name.substr(searchForm.value.length);
      div.innerHTML = `<p class="item">${word}</p>`;
      listContainer.appendChild(div);
      listContainer.style.display = "block";
    })
  }

  // search for one character using search bar and search button
  // Also called when cards in the Show All view are clicked
  const searchCharacter = async (e) => {
    if (searchForm.value.trim().length < 1) {
      alert("Input cannot be blank");
    }

    showContainer.innerHTML = "";
    const url = `${marvelURL}characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&name=${searchForm.value}`;

    const response = await fetch(url);
    const jsonData = await response.json();

    // iterate through API response
    jsonData.data["results"].forEach((element) => {
      showContainer.innerHTML = `
      <div class="card-container">
        <div class="container-character-image">
          <img src="${element.thumbnail["path"] + "." + element.thumbnail["extension"]}" />
        </div>
        <div class="character-name">${element.name}</div>
        <div class="character-description">${element.description}</div>
        <div class="character-buttons">
          <button class="favorite-button" id="remove-favorite" action="/removeCharacter" method="post">Remove</button>
          <button class="favorite-button" id="favorite">Favorite</button>
        </div>
      </div>`;
      // If no description, then change description manually.
      if (!element.description) {
        showContainer.innerHTML = `
      <div class="card-container">
        <div class="container-character-image">
          <img src="${element.thumbnail["path"] + "." + element.thumbnail["extension"]}" />
        </div>
        <div class="character-name">${element.name}</div>
        <div class="character-description">No Description Provided.</div>
        <div class="character-buttons">
          <button class="favorite-button" id="remove-favorite" action="/removeCharacter" method="post">Remove</button>
          <button class="favorite-button" id="favorite">Favorite</button>
        </div>
      </div>`;
      }
      // Event listeners for favorite button and remove button
      document.querySelector("#favorite").addEventListener("click", () => { favorite(searchForm); });
      document.querySelector("#remove-favorite").addEventListener("click", () => { removeFavorite(document.querySelector("#remove-favorite")); });

    });
  };

  // Shows all characters (up to 100) when Show All button is clicked
  const showAll = async (e) => {
    const url = `${marvelURL}characters?limit=100&offset=${offset}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    // remove all elements present when button is pressed again
    let child = showContainer.firstElementChild;
    while (child) {
      showContainer.removeChild(child);
      child = showContainer.firstElementChild;
    }

    const response = await fetch(url);
    const jsonData = await response.json();

    // iterate through API response
    jsonData.data["results"].forEach((element) => {
      const div = document.createElement("div");
      div.innerHTML = `
      <div class="card-container-multi">
        <div class="container-character-image">
          <img src="${element.thumbnail["path"] + "." + element.thumbnail["extension"]}" />
        </div>
        <div class="character-name">${element.name}</div>
        <div class="character-description">${element.description}</div>
      </div>`;
      // If no description, then change description manually.
      if (!element.description) {
        div.innerHTML = `
      <div class="card-container-multi">
        <div class="container-character-image">
          <img src="${element.thumbnail["path"] + "." + element.thumbnail["extension"]}" />
        </div>
        <div class="character-name">${element.name}</div>
        <div class="character-description">No Description Provided.</div>
      </div>`;
      }
      div.addEventListener("click", () => {
        searchForm.value = element.name;
        searchCharacter();
      });
      showContainer.appendChild(div);
    });
  };

  // event listener for when the player is typing in search form
  searchForm.addEventListener("keyup", displayOptions);

  // search button is clicked
  searchButton.addEventListener("click", () => { searchCharacter(); listContainer.style.display = "none"; });

  // Show All button is clicked
  allButton.addEventListener("click", showAll);

  // Show Favorites button is clicked
  favoritesButton.addEventListener("click", (e) => {
    requestUpdate(favoritesButton);
  });
};

window.onload = init;