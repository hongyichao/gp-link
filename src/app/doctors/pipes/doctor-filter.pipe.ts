import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'doctorFilter'
})
export class DoctorFilterPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
