const axios = require("axios");

class Controller {
  static async getPhotos(req, res, next) {
    try {
      const { tag } = req.params;
      const response = await axios.get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=f19e81c63412c0ea3ef8d35a67ca1833&tags=${tag}&format=json&nojsoncallback=1&api_sig=0ce86e4fa3abe82459af353b0b1c3df7`
      );
      res.status(200).json(response.data)
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Controller;
