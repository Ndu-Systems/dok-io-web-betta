import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(date: any, args?: any): any {
    return Date.now() - new Date(date).getTime();
  }

}
