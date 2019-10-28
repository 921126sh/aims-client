import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RestService } from "../../core/services/rest.service";

@Injectable()
export class UpdateService {
    /**
     * 업데이트 URI
     */
    private updatesUrl: string = 'update';

    constructor(private restService?: RestService) {
    }


    /**
     * 업데이트정보를 반환한다.
     */
    getUpdateInfo(): Observable<any> {
        return this.restService.read(`${this.updatesUrl}/koob-store`).pipe();
    }
}