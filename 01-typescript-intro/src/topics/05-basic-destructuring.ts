

interface AudioPlayer {
    audioVolume: number;
    songDuration: number;
    song: string;
    details: Details;
}

interface Details {
    author: string,
    year: number
}

const audioPlayer: AudioPlayer = {
    audioVolume: 90,
    songDuration: 36,
    song: "Mess",
    details: {
        author: 'Ed Sheeran',
        year: 2015
    }
}

//Desestructuración de Objetos
// const { song } = audioPlayer;
const { song:anotherSong, songDuration:duration, details} = audioPlayer;
const { author } = details;

// console.log('Song: ', anotherSong);
// console.log('Duration: ', duration);
// console.log('Author: ', author);

//Desestructuración de Arreglos
// const dbz: string[] = ['Goku', 'Vegeta', 'Trunks'];
// const [p1, p2, trunks]: string[]= ['Goku', 'Vegeta', 'Trunks'];
const [, , trunks = 'Not Found']: string[]= ['Goku', 'Vegeta'];

console.error('Personaje 3:', trunks || 'No hay personaje'); //se puede agregar la condicion || para evaluar que si no hay datos muestre msj


export {};