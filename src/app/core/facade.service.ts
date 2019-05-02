import { Injectable, Injector } from "@angular/core";
import { UserService } from "../home/services/user.service"

@Injectable()
export class FacadeService {
    // 사용자 서비스
    private _userService: UserService; 
    public get userService(): UserService {
        if (!this._userService) {
            this._userService = this.injector.get(UserService);
        }
        return this._userService;
    }

    constructor(private injector: Injector) { }

    // TODO 굳이 여기까지 사용해야 할까? 고민 해보자
    getUsers() {
        return this.userService.getUsers();
    }
}