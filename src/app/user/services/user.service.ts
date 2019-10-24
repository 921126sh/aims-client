import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { RestService } from "../../core/services/rest.service";
import { User } from "../model/user";
import { HttpErrorResponse, HttpParams } from "@angular/common/http";

@Injectable()
export class UserService {
    /**
     * 사용자 URI
     */
    private usersUrl: string = 'users';

    /**
     * 사용자 관리 서브젝트
     */
    dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
    get data(): User[] { return this.dataChange.value; }
    setDataChange(user: User) {
        this.dataChange.value.push(user);
    }

    /**
     * 다이얼로그 데이터
     */
    public dialogData: any;

    constructor(private restService?: RestService) {
    }

    /**
     * 다이얼로그 데이터를 반환한다.
     * 
     * @returns 다이얼로그 데이터
     */
    getDialogData() {
        return this.dialogData;
    }

    /**
     * 사용자 목록을 조회요청한다.
     */
    getAllUsers(): void {
        this.restService.read(this.usersUrl).subscribe(data => {
            this.dataChange.next(data.userResponses || []);
        },
            (error: HttpErrorResponse) => {
                console.log(error.name + ' ' + error.message);
            });
    }

    /**
     * 사용자 등록을 요청한다.
     * 
     * @param user 사용자
     */
    addUser(user: User): void {
        this.dialogData = user;
        this.restService.create(this.usersUrl, user)
            .subscribe(ob => {
            });
    }

    /**
     * 사용자 수정을 요청한다.
     * 
     * @param user 사용자
     */
    updateUser(user: User): void {
        this.dialogData = user;
    }

    deleteUser(userId: string): void {
        console.log(userId);
    }

    /**
     * 사용자정보 목록을 반환한다.
     */
    getUsers(): Observable<User[]> {
        return this.restService.read(this.usersUrl).pipe();
    }
    validateUser(userId: string, userPw: string): Observable<User> {
        const params = new HttpParams()
            .set('userId', userId)
            .set('userPw', userPw);

        return this.restService.read(`${this.usersUrl}`, params).pipe();
    }
}