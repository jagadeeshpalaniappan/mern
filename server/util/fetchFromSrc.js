/*
Utility function to fetch required data for ....

*/
import {getPageVideoUrl} from './geturl';

export function fetchMovieUrlFromSrc(srcInfo) {

  return new Promise(function (resolve, reject) {


    const url = 'https://einthusan.tv' + srcInfo.link;
    console.log('--------------' + url);

    getPageVideoUrl(url)
      .then(function (eachMovieVideoUrl) {

        /*
        const eachMovieVideoUrl = {
          "MP4Link": "https://s3-us-west-2.amazonaws.com/indiantv/cjorbezcy00001qqmc7931keo.mp4",
          "HLSLink": "https://s19.einthusan.tv/einthusancom/hot/DzAq4.mp4.m3u8?e=1542876154&md5=y5ErhYvnUC7ZL1xWQz42nw",
          "Datacenter": "San",
          "Premium": false,
          "V": 1
        };
        */

        resolve({ mp4: eachMovieVideoUrl['MP4Link'], hls: eachMovieVideoUrl['HLSLink']});

      }).catch(function (err) {

      reject({err: 'ERR OCCURRED TO GET URL FROM SRC'});

    })


  });

}
