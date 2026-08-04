export function whatsMyType<T>( argument: T ): T{

    return argument;
}

const amIString = whatsMyType<string>('Hola Mundo');
const amINumber = whatsMyType<number>(52719);
const amIArray  = whatsMyType<number[]>([5, 27, 19]);

console.log(amIString.split(' '));
console.log(amINumber.toFixed());
console.log(amIArray.join('-'));