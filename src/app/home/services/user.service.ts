import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { RestService } from "../../core/rest.service";
import { User } from "../model/user";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class UserService {
    /**
     * 사용자 URI
     */
    private usersUrl: string = 'users';

    constructor(private restService?: RestService) { }

    dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
    
    // Temporarily stores data from dialogs
    dialogData: any;

    get data(): User[] {
        return this.dataChange.value;
    }

    getDialogData() {
        return this.dialogData;
    }

    /** CRUD METHODS */
    getAllUsers(): void {
        this.restService.read(this.usersUrl).subscribe(data => {
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

    /**
     * 사용자정보 목록을 반환한다.
     */
    getUsers(): Observable<User[]> {
        return this.restService.read(this.usersUrl).pipe();
    }
}