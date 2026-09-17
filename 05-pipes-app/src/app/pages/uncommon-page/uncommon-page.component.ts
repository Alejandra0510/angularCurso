import { Component, signal } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { AsyncPipe, I18nPluralPipe, I18nSelectPipe, JsonPipe, KeyValuePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { interval, map, tap } from 'rxjs';

const client1 = {
  name:'Matias',
  gender: 'male',
  age: 29,
  address: 'Edo. México, México'
}

const client2 = {
  name: 'Alejandra',
  gender: 'female',
  age: 30,
  address: 'CDMX, México'
}

@Component({
  selector: 'app-uncommon-page',
  imports: [CardComponent, I18nSelectPipe, I18nPluralPipe, SlicePipe, JsonPipe, UpperCasePipe, KeyValuePipe, TitleCasePipe, AsyncPipe],
  templateUrl: './uncommon-page.component.html',
})

export default class UncommonPageComponent {
  // i18n Select
  client = signal(client1);

  invitationMap = {
    male: 'invitarlo',
    female: 'invitarla'
  }


  onChangeClient(){
    if(this.client() === client1){
      this.client.set(client2);
      return;
    }

    this.client.set(client1);
  }


  //i18n Plural

  clientsMap = signal({
    '=0': 'no tenemos ningún cliente esperando',
    '=1': 'tenemos 1 cliente esperando',
    '=2': 'tenemos 2 clientes esperando',
    other: 'tenemos # clientes esperando'
  })

  clients = signal([
    'Alejandra',
    'Alan',
    'Matias',
    'Liam',
    'Jessica',
    'Oscar',
    'Carmen',
    'Andrea',
    'Alexis',
    'Rafael'
  ]);


  onDeleteClient(){
    this.clients.update(prev => prev.slice(1));
  }


  //KeyValue Pipe
  profile = {
    name: 'Alejandra',
    age: 30,
    address: 'México, México',
  }


  //Async Pipe
  promiseValue: Promise<string> = new Promise((resolve, reject) =>{
    setTimeout(() => {
      resolve('Tenemos data en la promesa')
      console.log('Promesa finalizada');
    }, 3500);
  });

  myObservableTimer = interval(3500).pipe(
    map((value) => value + 1),
    tap( (value) => console.log("tap:", value ))
  );


}
