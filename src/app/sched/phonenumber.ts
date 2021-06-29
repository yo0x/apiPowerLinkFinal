export enum PhoneNumberErrors {
    IncorrectFormat,
    IncorrectPhoneCompany,
    IncorrectPrefix,
    NotANumber
}

export class PhoneNumber {
    public num?: string;
    public err?: PhoneNumberErrors;

    constructor(phone_num: string) {
        if(phone_num == "") {
            this.err = PhoneNumberErrors.NotANumber;
            return
        }
        let tmp = phone_num.split("-");
        if(tmp.length != 2) this.err = this.err??PhoneNumberErrors.IncorrectFormat;
        if(tmp[0].length != 3) this.err = this.err??PhoneNumberErrors.IncorrectPhoneCompany;
        if(tmp[1].length != 7) this.err = this.err??PhoneNumberErrors.IncorrectPrefix;
        if(isNaN(Number(tmp[0])) || isNaN(Number([tmp[1]]))) {
            this.err = this.err??PhoneNumberErrors.NotANumber;
        }

        if(typeof this.err === "undefined") {
            this.num = phone_num;
        }
    }

    public isOk(): boolean {
        return typeof this.err === "undefined";
    }
}