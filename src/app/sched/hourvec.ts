import { ArgumentOutOfRangeError } from "rxjs";

export class HourVec {
    public hour: number;
    public min: number;

    constructor(hour: number, min: number) {
        // check if integers and appropriate range
        if(!(hour <= 24 && hour > 0 && min < 60 && min >= 0 && hour % 1 === 0 && min % 1 === 0)) {
            throw new ArgumentOutOfRangeError();
        }

        this.hour = hour;
        this.min = min;
    }
}