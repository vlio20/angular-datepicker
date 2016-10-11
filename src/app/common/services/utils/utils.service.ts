import {Injectable} from '@angular/core';

@Injectable()
export class UtilsService {

  static createArray(size: number): number[] {
    return new Array(size).fill(1);
  }

}
