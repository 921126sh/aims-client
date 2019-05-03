import { Injectable, Injector } from "@angular/core";
import { UserService } from "../home/services/user.service"
import { BehaviorSubject } from "rxjs";
import { User } from "../home/model/user";
import { HttpErrorResponse } from "@angular/common/http";
import { RestService } from "./rest.service";


@Injectable()
export class FacadeService {

    dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    
    // Temporarily stores data from dialogs
    dialogData: any;
    
    // 사용자 서비스
    private _userService: UserService; 
    public get userService(): UserService {
        if (!this._userService) {
            this._userService = this.injector.get(UserService);
        }
        return this._userService;
    }

    constructor(private injector: Injector, private restService: RestService) { }

    // TODO 굳이 여기까지 사용해야 할까? 고민 해보자
    getUsers() {
        return this.userService.getUsers();
    }

    get data(): User[] {
        return this.dataChange.value;
    }

    getDialogData() {
        return this.dialogData;
    }

    /** CRUD METHODS */
    getAllUsers(usersUrl): void {
        this.restService.read(usersUrl).subscribe(data => {
            this.dataChange.next(data.userResponses);
        },
            (error: HttpErrorResponse) => {
                console.log(error.name + ' ' + error.message);
            });
    }

    // DEMO ONLY, you can find working methods below
    addUser(issue: User): void {
        this.dialogData = issue;
    }

    updateUser(issue: User): void {
        this.dialogData = issue;
    }

    deleteUser(id: number): void {
        console.log(id);
    }
}