import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class MatPaginatorCustomsIntl extends MatPaginatorIntl {
  override firstPageLabel = 'Pierwsza strona';
  override lastPageLabel = 'Ostatnia strona';
  override nextPageLabel = 'Nastepna strona';
  override previousPageLabel = 'Poprzednia strona';
  override itemsPerPageLabel = 'Ilosc elementow na stronie';
  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 z ${length}`;
    }

    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return `${startIndex + 1}-${endIndex} z ${length}`;
  };
}
