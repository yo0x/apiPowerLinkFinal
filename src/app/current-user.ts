import { Injectable } from "@angular/core";
import { DataService } from "./data.service";

import { User } from "./user";

@Injectable({
    providedIn: "root"
})
export class CurrentUser {
    user?: User;

    constructor(private db: DataService) {
    }

    isLoggedIn(): boolean {
        return this.user !== null && this.user !== undefined;
    }

    attemptLogin(details: User): boolean {
        if(this.db.validateUser(details)) {
            this.user = details;
        }

        return this.isLoggedIn();
    }
}
