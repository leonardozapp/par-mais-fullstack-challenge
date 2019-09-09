const axios = require("axios");
const utils = require('../utils/writer.js')

axios.defaults.baseURL = "https://api.chucknorris.io";

/**
 * Retrieve a list of available categories.
 *
 * returns List
 **/
function listCategories () {
  return axios.get("/jokes/categories")
    .then(response => {
      return utils.respondWithCode(response.status, response.data);
    })
    .catch(error => {
      console.error(error);
      return utils.respondWithCode(200, []);
    });
}

/**
 * Retrieve a random Chuck Norris joke in JSON format.
 * You may set the category parameter in order to filter the facts by it
 *
 * category String  (optional)
 * returns Fact
 **/
function randomFact (category) {
  let url = '/jokes/random';

  if (category) {
    url = `/jokes/random?category=${category}`;
  }

  return axios.get(url)
    .then(response => {
      return utils.respondWithCode(response.status, normalizeFact(response.data));
    })
    .catch(error => {
      console.error(error);
      return utils.respondWithCode(200, {});
    });
}

/**
 * Free text search.
 * You may set the category parameter in order to filter the facts by it
 *
 * query String
 * returns SearchResult
 **/
function search (query) {
  return axios.get(`/jokes/search?query=${query}`)
    .then(response => {

      const result = {
        total: response.data.total,
        result: response.data.total ? response.data.result.map(normalizeFact) : []
      }

      return utils.respondWithCode(response.status, result);
    })
    .catch(error => {
      console.error(error);

      const result = {
        total: 0,
        result: []
      }

      return utils.respondWithCode(200, result);
    });
}

function normalizeFact(fact) {
  return Object.freeze({
    category: fact.categories || [],
    icon_url: fact.icon_url,
    id: fact.id,
    url: fact.url,
    value: fact.value
  });
}

module.exports = {listCategories, randomFact, search}
