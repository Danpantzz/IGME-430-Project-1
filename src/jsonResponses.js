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

const removeCharacter = (request, response, body) => {
  const responseJSON = {
    message: 'Character not found in user object',
  };

  let responseCode = 200;

  if (!users[body.username]) {
    return respondJSON(request, response, responseCode, responseJSON);
  }

  let i = 0;
  users[body.username].forEach((c) => {
    if (c.character === body.character) {
      users[body.username].splice(i, 1);
      responseJSON.message = 'Character Deleted.';
      return;
    }
    i++;
  });

  return respondJSON(request, response, responseCode, responseJSON);
}

const favoriteCharacter = (request, response, body) => {
  const responseJSON = {
    message: 'query required.',
  };

  if (!body.username || !body.character) {
    responseJSON.id = 'favoriteCharacterMissingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 204;

  if (!users[body.username]) {
    responseCode = 201;
    users[body.username] = [];
  }

  let favorited = false;

  users[body.username].forEach((c) => {
    if (c.character === body.character) {
      responseJSON.message = 'Character already favorited';
      favorited = true;
      return;
    }
  })
  if (favorited) {
    respondJSON(request, response, responseCode, responseJSON);
  }

  users[body.username].push({ "character": body.character });

  // if (responseCode === 201) {
  //   responseJSON.message = 'Created Successfully';
  //   return respondJSON(request, response, responseCode, responseJSON);
  // }

  return respondJSONMeta(request, response, responseCode);
};

const getFavorites = (request, response) => {
  const responseJSON = {
    users,
  };

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
