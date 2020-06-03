import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'doctorFilter',
  pure: false
})
export class DoctorFilterPipe implements PipeTransform {

  transform(value: any, filterStr: string, propName: string ): any {

    if (value.length === 0 || filterStr === '') {
      return value;
    }

    const resultArray = [];
    for (const item of value) {
      if (item[propName].toUpperCase().includes(filterStr.toUpperCase())) {
        resultArray.push(item);
      }
    }

    return resultArray;
  }

}
