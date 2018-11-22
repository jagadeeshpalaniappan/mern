// import mongoose from 'mongoose';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({

  id: {type: 'String', required: true},

  sInfo: {
    id: {type: 'String', required: false},
    name: {type: 'String', required: false},
    link: {type: 'String', required: false},
  },

  posterImgUrl: {type: 'String', required: false},
  title: {type: 'String', required: false},
  isMustWatch: {type: 'Boolean', required: false},

  year: {type: 'Number', required: false},
  language: {type: 'String', required: false},
  description: {type: 'String', required: false},

  isHd: {type: 'Boolean', required: false},
  hasCC: {type: 'Boolean', required: false},

  professionals: {
    type: [{
      role: {type: 'String', required: false},
      name: {type: 'String', required: false},
      img: {type: 'String', required: false}
    }],
    default: [], required: false
  },


  ratings: {
    type: [{}],
    default: [], required: false
  },

  wikiUrl: {type: 'String', required: false},
  trailerUrl: {type: 'String', required: false},
  videoUrl: {type: 'String', required: true},

  // xtra: model
  dateAdded: {type: 'Date', default: Date.now, required: false}

});


// export default mongoose.model('MovieTest', movieSchema);

module.exports = mongoose.model('MovieTest', movieSchema);
