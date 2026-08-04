
export interface Passenger {
    name: string;
    children?: string[];
}

const passenger1: Passenger = {
    name: 'Alejandra'
}


const passenger2: Passenger = {
    name: 'Alan',
    children: ['Matias']
}



/*Optional Chaining ?-> es este simbolo */
const printChildren = ( passenger: Passenger) => {

    /* Forza a que si debe de regresar información*/
    // const howManyChildren = passenger.children!.length;
    
    const howManyChildren = passenger.children?.length || 0;

    console.log( passenger.name, howManyChildren);
}

printChildren( passenger2 );