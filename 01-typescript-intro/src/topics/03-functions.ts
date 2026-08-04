
//variable: tipo de dato



//función tradicional
function addNumbers( a:number , b:number ){
    return a + b;
}


//funcion de flecha
const addNumbersArrow = (a:number, b:number):string => {
    return `${a + b}`;
}


function multiply( firstNumber:number, secondNumber?:number, base:number = 2){
    return firstNumber = base;
}

// const result:number = addNumbers(1, 2);
// const result2: string = addNumbersArrow(1, 1);
// const multiplyResult: number = multiply(5);

// console.log({result, result2, multiplyResult});

interface Character {
    name: string;
    hp: number;
    showHp: () => void; //void regresa nada
}

const healCharacter = (character: Character, amount:number) => {
    character.hp += amount;
}

const strider: Character = {
    name: 'Strider',
    hp: 50,
    showHp(){
        console.log(`HP: ${this.hp}`);
    }
}

healCharacter( strider, 30 );
strider.showHp();


export {};