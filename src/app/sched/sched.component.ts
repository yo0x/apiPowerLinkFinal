import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { DataToSend } from './dataToSend';
import { HaircutVec } from './haircut';
import { HourVec } from './hourvec';
import { PhoneNumber, PhoneNumberErrors } from './phonenumber';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-sched',
  templateUrl: './sched.component.html',
  styleUrls: ['./sched.component.css']
})
export class SchedComponent implements OnInit {
  form!: FormGroup;
  price?: number;
  haircuts: HaircutVec[] = [
    new HaircutVec("תספורת גברים", "men-reg", 42),
    new HaircutVec("תספורת נשים", "women-reg", 420),
    // add some more here
  ];
  currentHc?: string;
  chosenDate?: Date;
  availableHours?: HourVec[];
  canProccedToPayment: boolean = false;


  constructor(private _db: DataService,private fbuilder: FormBuilder,private _http: HttpClient) { }

  ngOnInit(): void {
      this.form  = this.fbuilder.group({
        accountname: new FormControl(),
              telephone1: new FormControl(),
              idnumber: new FormControl('1234'),
              billingcity: new FormControl('tlv'),
              emailaddress1: new FormControl()
              //lastname: new FormControl()
      }); 
//     this.form = new FormGroup({
//       accountname: new FormControl(),
//       telephone1: new FormControl(),
//       idnumber: new FormControl(),
//       billingcity: new FormControl('tlv'),
//       emailaddress1: new FormControl(),
//       lastname: new FormControl()
//  }); 
  }

  onFormSubmit():void{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'});
    let options = { headers: headers };
      let myData = this.form?.getRawValue();
      let myJsonData = JSON.stringify(myData);
      console.info(myJsonData);
      this._http.post('http://localhost:5000/',myJsonData,options).toPromise().then((x) => console.log(x));

  }










  updatePrice() {
    this.price = this.haircuts.find((v) => v.type === this.currentHc)?.price;
  }

  // stub, should retrive from db
  fillHours(): void {
    this.availableHours = [];
    for(let h = 9; h < 18; h++) {
      for(let m = 0; m < 60; m+=30) {
        this.availableHours.push(new HourVec(h,m));
      }
    }
  }

  // aid to display hours.. should be private static but it throws an error for some reason 
  padNumToStr(num: number | string, total: number): string {
    let s = num.toString();
    if(s.length === total) return s;
    return this.padNumToStr("0" + s, total);
  }

  // added for the design, save current hour, defaults too not-possible hour
  cl: HourVec = new HourVec(1,2);
  addTime(t: HourVec) {
    // who the fuck came up with this stupid api?!
    // setHours returs a date primitive for some reason (i.e as dates are saved in computers)
    // and you need to use a copy-constructor for null-checking for some reason
    // otherwise it yield another date primitive.
    this.cl = t;
    this.chosenDate = new Date(new Date(this.chosenDate??new Date()).setHours(t.hour,t.min));
    // no easy way too validate this otherwise
    this.canProccedToPayment = true;
  }

  // for step2
  name_first: string = "";
  name_last: string = "";
  tmp_phone: string = "";
  phone?: PhoneNumber;
  email?: string;

  canCC: boolean = false;
  canAccept: boolean = false;

  name_first_empty: boolean = false;
  name_last_empty: boolean = false;
  phone_err_str: string = "";

  sendAcceptenceCode(): void {
    this.phone = new PhoneNumber(this.tmp_phone);
    if(this.phone_err_str != "") this.phone_err_str = "";
    this.name_last_empty = false;
    this.name_first_empty = false;
    
    if(this.phone.isOk() && this.name_first != "" && this.name_last != "") {
      this.canAccept = true;
    } else {
      this.name_first_empty = this.name_first === "";
      this.name_last_empty = this.name_last === "";
      if(!this.phone.isOk()) {
        this.changePhoneErrors(this.phone.err??PhoneNumberErrors.NotANumber);
      }
    }
  }

  private changePhoneErrors(err: PhoneNumberErrors): void {
    switch(err) {
      case PhoneNumberErrors.IncorrectFormat:
        this.phone_err_str = "הפורמט שגוי";
        break;
      case PhoneNumberErrors.IncorrectPhoneCompany:
        this.phone_err_str = "חברה זאת לא קיימת";
        break;
      case PhoneNumberErrors.IncorrectPrefix:
        this.phone_err_str = "יותר מידי מספרים";
        break;
      case PhoneNumberErrors.NotANumber:
        this.phone_err_str = "לא נרשם מספר"
    }
  }
  
  sendToServer(): void {
    const json_obj = new DataToSend(
      this.name_first,
      this.name_last,
      this.phone??new PhoneNumber('123-1234567'),
      this.chosenDate??new Date(),
      this.currentHc??"",
      this.email
    );

    this._db.postContact(json_obj);
  }
}
