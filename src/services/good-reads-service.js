const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:goodReadsService');

const parser = xml2js.Parser({ explicitArray: false });
const key = 'VQ3udLDx8eM11hSmAmq6Vw';

function goodReadsService() {
  function getDescriptionById(bookId) {
    return new Promise((resolve, reject) => {
      axios.get(`https://www.goodreads.com/book/show/${bookId}.xml?key=${key}`)
        .then((response) => {
          parser.parseString(response.data, (error, result) => {
            if (error) {
              debug(error);
            }
            debug(result);
            resolve(result.GoodreadsResponse.book);
          });
        }).catch((error) => {
          reject(error);
          debug(error);
        });
    });
  }

  return {
    getDescriptionById,
  };
}

module.exports = goodReadsService();
