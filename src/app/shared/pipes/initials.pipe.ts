import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  transform(fullname: any, args?: any): any {
    return fullname.split(' ')[0][0] + fullname.split(' ')[1][0];;
  }

}
