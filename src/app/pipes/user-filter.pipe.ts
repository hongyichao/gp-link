import { PipeTransform, Pipe } from '@angular/core';
import { UserFilterParams } from '../shared-models/user-filter.params';

@Pipe({
  name: 'userFilter',
  pure: false
})
export class UserFilterPipe implements PipeTransform {
  transform(value: any, filterParams: UserFilterParams): any {

    if (value.length === 0 || (!filterParams.SearchStr && !filterParams.UserType)) {
      return value;
    }

    const resultArray = [];
    if (!filterParams.SearchStr && filterParams.UserType) {
      for (const item of value) {
        if (item['Type'] === filterParams.UserType) {
          resultArray.push(item);
        }
      }

      return resultArray;
    }

    if (filterParams.SearchStr && !filterParams.UserType) {
      for (const item of value) {
        if ((item['FirstName'].toUpperCase()).includes(filterParams.SearchStr.toUpperCase())
        || (item['LastName'].toUpperCase()).includes(filterParams.SearchStr.toUpperCase())
        ) {
          resultArray.push(item);
        }
      }
      return resultArray;
    }

    for (const item of value) {
      if (item['Type'] === filterParams.UserType) {
        if ((item['FirstName'].toUpperCase()).includes(filterParams.SearchStr.toUpperCase())
        || (item['LastName'].toUpperCase()).includes(filterParams.SearchStr.toUpperCase())
        ) {
          resultArray.push(item);
        }
      }
    }

    return resultArray;
  }
}
