import {
  CHANGE_THEME_COLOR,
  CHANGE_CURRENT_PLAYLIST,
} from "../types/types";

const musicsArray = [
  [
    {
      name: 'Glaive',
      singer: 'Booba',
      cover: '//cdn.lijinke.cn/nande.jpg',
      musicSrc: 'http://localhost:4000/musics/booba-glaive.mp3',
    },
    {
      name: 'Despacito',
      singer: 'Luis Fonsi',
      cover: 'http://res.cloudinary.com/alick/image/upload/v1502689731/Despacito_uvolhp.jpg',
      musicSrc: 'http://localhost:4000/musics/luis_fonsi-despacito.mp3',          
    },
    {
      name: 'Mala Santa',
      singer: 'Becky G',
      cover: 'https://m.media-amazon.com/images/I/713uj1JSFSL._SS500_.jpg',
      musicSrc: 'http://localhost:4000/musics/becky_g-mala_santa.mp3',
    },
  ],
  [
    {
      name: 'PGP',
      singer: 'Booba',
      cover: 'https://e-cdns-images.dzcdn.net/images/cover/48adfdb87237eeb91951812c945a1bf8/500x500.jpg',
      musicSrc: 'http://localhost:4000/musics/booba-pgp.mp3',
    },
    {
      name: 'Du ferme',
      singer: 'La Fouine',
      cover: 'https://m.media-amazon.com/images/I/71+M3drMHdL._SS500_.jpg',
      musicSrc: 'http://localhost:4000/musics/la_fouine-du_ferme.mp3',

    },
  ]
];


const musicObj = {
  musics : musicsArray,
  currentPlaylistIndex : 0,
  theme : 'dark',
}

const musics = (state = musicObj, action) => {  
  switch(action.type) {
    case CHANGE_THEME_COLOR: 
      return {
        ...state,
        theme: action.theme
      }
    case CHANGE_CURRENT_PLAYLIST: 
    return {
      ...state,
      currentPlaylistIndex: action.index
    }
    default:
      return state;
  }
}
  
export default musics;