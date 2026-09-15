import { DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, effect, inject, LOCALE_ID, signal } from '@angular/core';
import { AvailableLocale, LocalService } from '../../services/locale-service';

@Component({
  selector: 'app-basic-page',
  imports: [LowerCasePipe, UpperCasePipe, TitleCasePipe, DatePipe],
  templateUrl: './basic-page.component.html',
})
export default class BasicPageComponent {

  localeService = inject(LocalService);
  currentLocal = signal(inject(LOCALE_ID));

  nameLower = signal('alejandra');
  nameUpper = signal('ALEJANDRA');
  fullName  = signal('aLejandRa GuTiéRrez');

  customDate = signal( new Date() );

  tickingDateEffect = effect((onCleanUp) => {
    const interval = setInterval(() => {
      this.customDate.set( new Date() );
      // console.log('se cambió');
    }, (1000));

    onCleanUp(() => {
      clearInterval(interval);
    });
  });


  changeLocale(locale: AvailableLocale){
    console.log({ locale });
    this.localeService.changeLocale( locale );
  }

}
