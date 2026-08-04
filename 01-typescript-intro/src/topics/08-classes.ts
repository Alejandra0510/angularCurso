/*Definir clases y asígnarles valor predeterminado
si pones "?" despues de definir la variable significa que el valor puede ser opcional*/

/*Forma corta de definir clases */
export class Person {

    constructor(
        public firstName: string,
        public lastName: string,
        private address: string = 'No Address'
    ){}

}


// export class Hero extends Person {

//     constructor(
//         public alterEgo: string,
//         public age: number,
//         public realName: string
//     ){
//         super( realName, 'New York' );
//     }

// }


class Hero {

    constructor(
        public alterEgo: string,
        public age: number,
        public realName: string,
        public person: Person,
    ){
        
    }

}


const spider = new Person("Peter", 'Parker', 'New York');
const ironman = new Hero("Spiderman", 19, 'Peter', spider);

console.log(ironman);