import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RestService } from "../../core/rest.service";
import { User } from "../model/user";

@Injectable()
export class UserService {
    /**
     * 사용자 URI
     */
    private usersUrl: string = 'users';

    constructor(private restService: RestService) { }

    /**
     * 사용자정보 목록을 반환한다.
     */
    getUsers(): Observable<User[]> {
        return this.restService.read(this.usersUrl).pipe();
    }
}