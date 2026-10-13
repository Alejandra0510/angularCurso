import { Component, computed, input, linkedSignal, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination',
  imports: [RouterLink],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {

  pages = input(0);
  count = input.required();
  currentPage = input<number>(1);

  //cuando su valor se inicializa de otro valor y despues funciona como una señal
  activePage = linkedSignal(this.currentPage);

  // convertir el total de paginas en un arreglo
  getPagesList = computed(() => {
    return Array.from({ length: this.pages() }, (_, i) => i + 1);
  })

}
