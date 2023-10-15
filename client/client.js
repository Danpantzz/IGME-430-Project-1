const handleResponse = async (response) => {
  const content = document.querySelector('#content');

  switch (response.status) {
    case 200:
      content.innerHTML = `<b>Success</b>`;
      break;
    case 201:
      content.innerHTML = `<b>Created</b>`;
      break;
    case 204:
      content.innerHTML = `<b>Updated (No Content)</b>`;
      break;
    case 400:
      content.innerHTML = `<b>Bad Request</b>`;
      break;
    case 404:
      content.innerHTML = `<b>Not Found</b>`;
      break;
    default:
      content.innerHTML = `Error code not implemented by client.`;
      break;
  }

  let obj = await response.json();

  if (obj.message) {
    let jsonString = JSON.stringify(obj.message);
    jsonString = jsonString.replace(/['"]+/g, '');
    content.innerHTML += `<p>Message: ${jsonString}</p>`;
  }
  else {
    let jsonString = JSON.stringify(obj);
    content.innerHTML += `<p>${jsonString}</p>`;
  }

};

const sendPost = async (searchForm) => {
  const searchAction = searchForm.getAttribute('action');
  const searchMethod = searchForm.getAttribute('method');

  const formData = `name=${searchForm.value}`;

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

const requestUpdate = async (userForm) => {
  const url = userForm.querySelector('#urlField').value;
  const method = userForm.querySelector('#methodSelect').value;

  let response = await fetch(url, {
    method,
    headers: {
      'Accept': 'application/json'
    },
  });

  handleResponse(response);
};

const init = () => {
  const marvelURL = "https://gateway.marvel.com:443/v1/public/"
  const publicKey = '3d064ffe33b8e2b0c086c74a3b6181e7';
  const select = document.querySelector("#characterSelect");
  const ts = '1696798502523';
  const hash = '96a9e4a23329c23b0d63a3b54637dce4';

  const searchForm = document.querySelector("#searchForm");
  const searchButton = document.querySelector("#searchButton");
  const allButton = document.querySelector("#allButton");
  const showContainer = document.querySelector("#show-container");
  const listContainer = document.querySelector(".list");

  let offset = 0;

  const removeElements = () => {
    listContainer.innerHTML = "";
  }

  const displayWords = (value) => {
    searchForm.value = value;
    removeElements();
  }

  const displayOptions = async () => {
    removeElements();

    if (searchForm.value.length < 4) {
      return false;
    }

    const url = `${marvelURL}characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&nameStartsWith=${searchForm.value}`;

    const response = await fetch(url);
    const jsonData = await response.json();

    jsonData.data["results"].forEach((result) => {
      let name = result.name;
      let div = document.createElement("div");
      div.style.cursor = "pointer";
      div.classList.add("autocomplete-items");
      div.addEventListener("click", () => { displayWords(name) });
      let word = "<b>" + name.substr(0, searchForm.value.length) + "</b>";
      word += name.substr(searchForm.value.length);
      div.innerHTML = `<p class="item">${word}</p>`;
      listContainer.appendChild(div);
    })
  }

  const searchCharacter = async (e) => {
    if (searchForm.value.trim().length < 1) {
      alert("Input cannot be blank");
    }

    showContainer.innerHTML = "";
    const url = `${marvelURL}characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&name=${searchForm.value}`;

    const response = await fetch(url);
    const jsonData = await response.json();
    jsonData.data["results"].forEach((element) => {
      showContainer.innerHTML = `
      <div class="card-container">
        <div class="container-character-image">
          <img src="${element.thumbnail["path"] + "." + element.thumbnail["extension"]}" />
        </div>
        <div class="character-name">${element.name}</div>
        <div class="character-description">${element.description}</div>
      </div>`;
    });
  };

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
    jsonData.data["results"].forEach((element) => {
      const div = document.createElement("div");
      div.innerHTML = `
      <div class="card-container">
        <div class="container-character-image">
          <img src="${element.thumbnail["path"] + "." + element.thumbnail["extension"]}" />
        </div>
        <div class="character-name">${element.name}</div>
      </div>`;
      showContainer.appendChild(div);
    });
  };

  searchForm.addEventListener("keyup", displayOptions);
  searchButton.addEventListener("click", searchCharacter);
  allButton.addEventListener("click", showAll);

};

window.onload = init;