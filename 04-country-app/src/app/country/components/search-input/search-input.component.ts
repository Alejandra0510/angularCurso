import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  placeholder = input<string>();
  value = output<string>();
  debounceTime = input<number>(300);

  inputValue = signal<string>('');

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();
    const timeOut = setTimeout(() => {
      this.value.emit(value);
    }, this.debounceTime());

    onCleanup(() => {
      clearTimeout(timeOut);
    })
  });
}
