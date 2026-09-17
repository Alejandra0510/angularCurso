import { Color } from './../interfaces/hero.interface';
import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'heroColor',
})

export class HeroColorPipe implements PipeTransform {
  transform(data: Color): string {
    return Color[data];
  }
}
