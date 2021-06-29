import { HaircutVec } from "./haircut";
import { PhoneNumber } from "./phonenumber";

export class DataToSend {
    public accountname: string;
    public telephone1: string;
    public billingcity: string = "tlv";
    public description: string;
    public emailaddress1?: string;

    constructor(
        name_first: string,
        name_last: string,
        phone: PhoneNumber,
        wanted_time: Date,
        type_of_treatment: string,
        email?: string) {
            this.accountname = name_first + " " + name_last;
            this.telephone1 = phone.num?? "";
            this.emailaddress1 = email;

            let dt = wanted_time.getDay().toString()
            + "/"
            + wanted_time.getMonth().toString()
            + "/"
            + wanted_time.getDay().toString()
            + " "
            + wanted_time.getHours()
            + ":"
            + wanted_time.getMinutes();

            console.log(dt);

            this.description = type_of_treatment.toUpperCase() + "\n" + dt;
        }

    public getJSON(): string {
        return JSON.stringify(this);
    }
}
