import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  id: { type: 'String', required: false },

  // tubi: model
  type: { type: 'String', required: false },
  title: { type: 'String', required: false },
  duration: { type: 'Number', required: false },
  ratings: { type: 'Array' , default : [], required: false },
  actors: { type: ['String'], required: false },
  directors: { type: 'String', required: false },
  tags: { type: ['String'], required: false },
  description: { type: 'String', required: false },
  year: { type: 'Number', required: false },
  posterarts: { type: ['String'], required: false },
  thumbnails: { type: ['String'], required: false },
  hero_images: { type: ['String'], required: false },
  landscape_images: { type: ['String'], required: false },
  backgrounds: { type: ['String'], required: false },
  publisher_id: { type: 'String', required: false },
  has_trailer: { type: 'Boolean', required: false },
  has_subtitle: { type: 'Boolean', required: false },
  import_id: { type: 'String', required: false },
  channel_id: { type: 'String', required: false },
  channel_logo: { type: 'String', required: false },
  channel_name: { type: 'String', required: false },

  // xtra: model
  language: { type: 'String', required: false },

  dateAdded: { type: 'Date', default: Date.now, required: false },
});


export default mongoose.model('Movie', movieSchema);
