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

  const sendPost = async (nameForm) => {
    const nameAction = nameForm.getAttribute('action');
    const nameMethod = nameForm.getAttribute('method');

    const nameField = nameForm.querySelector('#nameField');
    const ageField = nameForm.querySelector('#ageField');

    const formData = `name=${nameField.value}&age=${ageField.value}`;

    let response = await fetch(nameAction, {
      method: nameMethod,
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
    console.log(ts);
    const hash = '96a9e4a23329c23b0d63a3b54637dce4';

    const getData = async () => {
      const response = await fetch(`${marvelURL}characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
      console.log(response);
      const data = await response.json();
      return data;
    };

    const displayOptions = async () => {
      const options = await getData();
      options.data['results'].forEach(result => {
        const newOption = document.createElement("option");
          console.log(result);
          newOption.value = result.name;
          newOption.text = result.name;
          select.appendChild(newOption);
      });
    };

    const addUsers = (e) => {
      e.preventDefault();
      sendPost(nameForm);
      return false;
    }

    displayOptions();

  };

  window.onload = init;