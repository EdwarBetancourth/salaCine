import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'general'
})
export class GeneralPipe implements PipeTransform {

  transform(items: any[], searchTerm: string, labelKey?: string): any {

    if (!searchTerm) {
      return items;
    }

    return items.filter(
      item =>
        item[labelKey || 'name' ]
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) === true).slice(0, 10);
  }

}
