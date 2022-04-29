const axios = require("axios");

class Controller {
  static async getPhotos(req, res, next) {
    try {
      const response = await axios.get(
        `https://www.flickr.com/services/feeds/photos_public.gne?format=json&tags=cats`
      );
      res.status(200).json({data: response.data} )
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Controller;
