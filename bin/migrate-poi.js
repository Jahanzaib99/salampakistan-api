'use strict';

const config = require('../app/config');
const mongoose = require('mongoose');
// let uri = `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.db}`;
let uri = `mongodb://${config.get('mongodb.host')}:${config.get('mongodb.port')}/${config.get('mongodb.db')}`;
mongoose.connection.on('open', () => {
  console.log(`Database connected: ${uri}`);
});

mongoose.connect(uri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// requiring path and fs modules
const path = require('path');
const fs = require('fs');
var POI = require('../app/models/POI');

// joining path of directory
const directoryPath = path.join(__dirname, 'city-pois');
// passsing directoryPath and callback function
var count = 0;
fs.readdir(directoryPath, function(err, files) {
  // handling error
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }
  // listing all files using forEach
  files.forEach(function(file) {
    // Do whatever you want to do with the file
    console.log(file);
    let rawdata = fs.readFileSync(`city-pois/${file}`);
    let poi = JSON.parse(rawdata);
    count++;
    console.log('count=>', count);
    poi.results.forEach(element => {
      let coordinates = [element.geometry.location.lng, element.geometry.location.lat];
      let location = {
        type: 'Point',
        coordinates: coordinates
      };
      let mapDate = new POI({
        business_status: element.business_status,
        formatted_address: element.formatted_address,
        location: location,
        icon: element.icon,
        name: element.name,
        opening_hours: element.opening_hours,
        photos: element.photos,
        place_id: element.place_id,
        plus_code: element.plus_code,
        rating: element.rating,
        reference: element.reference,
        types: element.types,
        user_ratings_total: element.user_ratings_total
      });
      console.log(mapDate);

      // mapDate.save();
    });
  });
});
