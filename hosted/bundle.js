/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./client/client.js":
/*!**************************!*\
  !*** ./client/client.js ***!
  \**************************/
/***/ (() => {

eval("const handleResponse = async (response) => {\r\n  const content = document.querySelector('#content');\r\n\r\n  switch (response.status) {\r\n    case 200:\r\n      content.innerHTML = `<b>Success</b>`;\r\n      break;\r\n    case 201:\r\n      content.innerHTML = `<b>Created</b>`;\r\n      break;\r\n    case 204:\r\n      content.innerHTML = `<b>Updated (No Content)</b>`;\r\n      break;\r\n    case 400:\r\n      content.innerHTML = `<b>Bad Request</b>`;\r\n      break;\r\n    case 404:\r\n      content.innerHTML = `<b>Not Found</b>`;\r\n      break;\r\n    default:\r\n      content.innerHTML = `Error code not implemented by client.`;\r\n      break;\r\n  }\r\n\r\n  let obj = await response.json();\r\n\r\n  if (obj.message) {\r\n    let jsonString = JSON.stringify(obj.message);\r\n    jsonString = jsonString.replace(/['\"]+/g, '');\r\n    content.innerHTML += `<p>Message: ${jsonString}</p>`;\r\n  }\r\n  else {\r\n    let jsonString = JSON.stringify(obj);\r\n    content.innerHTML += `<p>${jsonString}</p>`;\r\n  }\r\n\r\n};\r\n\r\nconst sendPost = async (searchForm) => {\r\n  const searchAction = searchForm.getAttribute('action');\r\n  const searchMethod = searchForm.getAttribute('method');\r\n\r\n  const formData = `name=${searchForm.value}`;\r\n\r\n  let response = await fetch(searchAction, {\r\n    method: searchMethod,\r\n    headers: {\r\n      'Content-Type': 'application/x-www-form-urlencoded',\r\n      'Accept': 'application/json',\r\n    },\r\n    body: formData,\r\n  });\r\n\r\n  handleResponse(response);\r\n};\r\n\r\nconst requestUpdate = async (userForm) => {\r\n  const url = userForm.querySelector('#urlField').value;\r\n  const method = userForm.querySelector('#methodSelect').value;\r\n\r\n  let response = await fetch(url, {\r\n    method,\r\n    headers: {\r\n      'Accept': 'application/json'\r\n    },\r\n  });\r\n\r\n  handleResponse(response);\r\n};\r\n\r\nconst init = () => {\r\n  const marvelURL = \"https://gateway.marvel.com:443/v1/public/\"\r\n  const publicKey = '3d064ffe33b8e2b0c086c74a3b6181e7';\r\n  const select = document.querySelector(\"#characterSelect\");\r\n  const ts = '1696798502523';\r\n  const hash = '96a9e4a23329c23b0d63a3b54637dce4';\r\n\r\n  const searchForm = document.querySelector(\"#searchForm\");\r\n  const searchButton = document.querySelector(\"#searchButton\");\r\n  const showContainer = document.querySelector(\"#show-container\");\r\n  const listContainer = document.querySelector(\".list\");\r\n\r\n  const removeElements = () => {\r\n    listContainer.innerHTML = \"\";\r\n  }\r\n\r\n  const displayWords = (value) => {\r\n    searchForm.value = value;\r\n    removeElements();\r\n  }\r\n\r\n  const displayOptions = async () => {\r\n    removeElements();\r\n\r\n    if (searchForm.value.length < 4) {\r\n      return false;\r\n    }\r\n\r\n    const url = `${marvelURL}characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&nameStartsWith=${searchForm.value}`;\r\n\r\n    const response = await fetch(url);\r\n    const jsonData = await response.json();\r\n\r\n    jsonData.data[\"results\"].forEach((result) => {\r\n      let name = result.name;\r\n      let div = document.createElement(\"div\");\r\n      div.style.cursor = \"pointer\";\r\n      div.classList.add(\"autocomplete-items\");\r\n      div.addEventListener(\"click\", () => { displayWords(name) });\r\n      let word = \"<b>\" + name.substr(0, searchForm.value.length) + \"</b>\";\r\n      word += name.substr(searchForm.value.length);\r\n      div.innerHTML = `<p class=\"item\">${word}</p>`;\r\n      listContainer.appendChild(div);\r\n    })\r\n  }\r\n\r\n  const searchCharacter = async (e) => {\r\n    if (searchForm.value.trim().length < 1) {\r\n      alert(\"Input cannot be blank\");\r\n    }\r\n\r\n    showContainer.innerHTML = \"\";\r\n    const url = `${marvelURL}characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&name=${searchForm.value}`;\r\n\r\n    const response = await fetch(url);\r\n    const jsonData = await response.json();\r\n    jsonData.data[\"results\"].forEach((element) => {\r\n      showContainer.innerHTML = `\r\n      <div class=\"card-container\">\r\n        <div class=\"container-character-image\">\r\n          <img src=\"${element.thumbnail[\"path\"] + \".\" + element.thumbnail[\"extension\"]}\" />\r\n        </div>\r\n        <div class=\"character-name\">${element.name}</div>\r\n        <div class=\"character-description\">${element.description}</div>\r\n      </div>`;\r\n    });\r\n  };\r\n\r\n  searchForm.addEventListener(\"keyup\", displayOptions);\r\n  searchButton.addEventListener(\"click\", searchCharacter);\r\n\r\n};\r\n\r\nwindow.onload = init;\n\n//# sourceURL=webpack://http-api-assignment-ii/./client/client.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./client/client.js"]();
/******/ 	
/******/ })()
;