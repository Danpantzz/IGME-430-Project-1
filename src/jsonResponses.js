const users = {};

const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.end();
};

// Fired when Remove button is clicked on Character card
const removeCharacter = (request, response, body) => {
  const responseJSON = {
    message: 'Character not found in Favorites.',
  };

  const responseCode = 200;

  // if username is not in users, then user has not favorited anything yet
  if (!users[body.username]) {
    return respondJSON(request, response, responseCode, responseJSON);
  }

  // iterate through username array for specified character and remove it
  let i = 0;
  users[body.username].forEach((c) => {
    if (c.character === body.character) {
      users[body.username].splice(i, 1);
      responseJSON.message = 'Character Removed.';
      return;
    }
    i++;
  });

  return respondJSON(request, response, responseCode, responseJSON);
};

// Fires when Favorite button is clicked on Character card
const favoriteCharacter = (request, response, body) => {
  const responseJSON = {
    message: 'username and character required.',
  };

  if (!body.username || !body.character) {
    responseJSON.id = 'favoriteCharacterMissingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 204;

  // if username is not present in users, then make new user with username
  if (!users[body.username]) {
    responseCode = 201;
    users[body.username] = [];
  }

  // meant to prevent user from favoriting the same character twice, doesn't work
  let favorited = false;
  users[body.username].forEach((c) => {
    if (c.character === body.character) {
      responseJSON.message = 'Character already favorited';
      favorited = true;
    }
  });
  if (favorited) {
    respondJSON(request, response, responseCode, responseJSON);
  }

  // add character to the username's object array
  users[body.username].push({ character: body.character });

  return respondJSONMeta(request, response, responseCode);
};

// Fired when Show Favorited button is clicked
const getFavorites = (request, response) => {
  const responseJSON = {
    users,
  };

  // Attempted to use the parsedUrl for query parameters to get data, didn't work

  // if (!body.username) {
  //   responseJSON.id = "MissingUsernameParams";
  //   return respondJSON(request,response, 400, responseJSON);
  // }

  // if (!users[body.username]) {
  //   responseJSON.id = "UsernameNotFound";
  //   return respondJSON(request, response, 400, responseJSON);
  // }

  // responseJSON = users[body.username];

  return respondJSON(request, response, 200, responseJSON);
};

const getFavoritesMeta = (request, response) => {
  respondJSONMeta(request, response, 200);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON);
};

const notFoundMeta = (request, response) => {
  respondJSONMeta(request, response, 404);
};

module.exports = {
  removeCharacter,
  favoriteCharacter,
  getFavorites,
  getFavoritesMeta,
  notFound,
  notFoundMeta,
};
