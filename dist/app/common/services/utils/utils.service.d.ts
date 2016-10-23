import { Moment } from 'moment';
export declare class UtilsService {
    static createArray(size: number): number[];
    static convertToMoment(date: Moment | string, format: string): Moment | null;
}
