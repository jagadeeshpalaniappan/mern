
function getDummyMovie(id, title, directors, description) {

  return {
    "id": id,
    "type": "v",
    "title": title,
    "duration": 6737,
    "ratings": [
      {
        "system": "mpaa",
        "value": "NR"
      }
    ],
    "actors": [
      "Min-ki Lee",
      "Ye-won Kang",
      "In-kwon Kim",
      "Lilian Harvey",
      "Jeanne Fusier-Gir"
    ],
    "directors": [
      directors
    ],
    "tags": [
      "Action",
      "Comedy",
      "Thriller"
    ],
    "description": description,
    "year": 2011,
    "posterarts": [
      "http://image-server.staging-public.tubi.io/SFqfrFgyC3IAsspvkrnmOitNBGY=/210x300/smart/img.adrise.tv/5bebfbe1-ce3e-46c0-8fd0-eeb45c2959c9.png"
    ],
    "thumbnails": [
      "http://image-server.staging-public.tubi.io/3Nt6PL7gYDe-TzdL4v3n5TRHL6g=/456x256/smart/img.adrise.tv/8043ead5-0be8-4614-9f37-3682a952f961.jpg"
    ],
    "hero_images": [],
    "landscape_images": [],
    "backgrounds": [
      "http://image-server.staging-public.tubi.io/PLY6xty_dk7uXhGIu5Fd8MTH4H4=/1920x1080/smart/img.adrise.tv/8043ead5-0be8-4614-9f37-3682a952f961.jpg"
    ],
    "publisher_id": "abc2558d54505d4f0f32be94f2e7108c",
    "has_trailer": false,
    "has_subtitle": true,
    "import_id": "shout-factory",
    "channel_id": "shoutfactory",
    "channel_logo": "http://cdn.adrise.tv/image/channels/shoutfactory/logo_long.png",
    "channel_name": "Shout Factory"
  };

}


const movie = getDummyMovie('11', '22', '33');

Object.keys(movie).forEach(function (key) {
  // console.log(`const ${key}Ref = this.refs.${key};`);
  console.log('this.refs.'+key+'.value = `'+key+'${counter}`;');
});

