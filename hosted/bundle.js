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

eval("const handleResponse = async (response) => {\r\n    const content = document.querySelector('#content');\r\n\r\n    switch (response.status) {\r\n      case 200:\r\n        content.innerHTML = `<b>Success</b>`;\r\n        break;\r\n      case 201:\r\n        content.innerHTML = `<b>Created</b>`;\r\n        break;\r\n      case 204:\r\n        content.innerHTML = `<b>Updated (No Content)</b>`;\r\n        break;\r\n      case 400:\r\n        content.innerHTML = `<b>Bad Request</b>`;\r\n        break;\r\n      case 404:\r\n        content.innerHTML = `<b>Not Found</b>`;\r\n        break;\r\n      default:\r\n        content.innerHTML = `Error code not implemented by client.`;\r\n        break;\r\n    }\r\n\r\n    let obj = await response.json();\r\n\r\n    if (obj.message) {\r\n      let jsonString = JSON.stringify(obj.message);\r\n      jsonString = jsonString.replace(/['\"]+/g, '');\r\n      content.innerHTML += `<p>Message: ${jsonString}</p>`;\r\n    }\r\n    else {\r\n      let jsonString = JSON.stringify(obj);\r\n      content.innerHTML += `<p>${jsonString}</p>`;\r\n    }\r\n\r\n  };\r\n\r\n  const sendPost = async (nameForm) => {\r\n    const nameAction = nameForm.getAttribute('action');\r\n    const nameMethod = nameForm.getAttribute('method');\r\n\r\n    const nameField = nameForm.querySelector('#nameField');\r\n    const ageField = nameForm.querySelector('#ageField');\r\n\r\n    const formData = `name=${nameField.value}&age=${ageField.value}`;\r\n\r\n    let response = await fetch(nameAction, {\r\n      method: nameMethod,\r\n      headers: {\r\n        'Content-Type': 'application/x-www-form-urlencoded',\r\n        'Accept': 'application/json',\r\n      },\r\n      body: formData,\r\n    });\r\n\r\n    handleResponse(response);\r\n  };\r\n\r\n  const requestUpdate = async (userForm) => {\r\n    const url = userForm.querySelector('#urlField').value;\r\n    const method = userForm.querySelector('#methodSelect').value;\r\n\r\n    let response = await fetch(url, {\r\n      method,\r\n      headers: {\r\n        'Accept': 'application/json'\r\n      },\r\n    });\r\n\r\n    handleResponse(response);\r\n  };\r\n\r\n  const init = () => {\r\n    const marvelURL = \"https://gateway.marvel.com:443/v1/public/\"\r\n    const publicKey = '3d064ffe33b8e2b0c086c74a3b6181e7';\r\n    const select = document.querySelector(\"#characterSelect\");\r\n    const ts = '1696798502523';\r\n    console.log(ts);\r\n    const hash = '96a9e4a23329c23b0d63a3b54637dce4';\r\n\r\n    const getData = async () => {\r\n      const response = await fetch(`${marvelURL}characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`);\r\n      console.log(response);\r\n      const data = await response.json();\r\n      return data;\r\n    };\r\n\r\n    const displayOptions = async () => {\r\n      const options = await getData();\r\n      options.data['results'].forEach(result => {\r\n        const newOption = document.createElement(\"option\");\r\n          console.log(result);\r\n          newOption.value = result.name;\r\n          newOption.text = result.name;\r\n          select.appendChild(newOption);\r\n      });\r\n    };\r\n\r\n    const addUsers = (e) => {\r\n      e.preventDefault();\r\n      sendPost(nameForm);\r\n      return false;\r\n    }\r\n\r\n    displayOptions();\r\n\r\n  };\r\n\r\n  window.onload = init;\n\n//# sourceURL=webpack://http-api-assignment-ii/./client/client.js?");

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