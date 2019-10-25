import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalRefService } from './global-ref.service';

import { Observable } from 'rxjs';
import { AppConfig } from '../../../environments/environment'
export interface site {
    name: string,
    logUrl: string
}

export interface userRestrict {
    maxLengthID: number
    maxLengthPassword: number
    requirePassword: Boolean
    warningBeforeExpireDay: number
}


@Injectable()
export class AppConfigService {
    private _env: Object;
    private _config: Object;

    // outer objects
    public site: site;
    public userRestrict: userRestrict;
    /**
     * 생성자이다.
     * 
     * @constructor
     * @param httpClient httpClient 서비스
     * @param globalRef 글로벌 참조 서비스
     */
    constructor(
        private httpClient: HttpClient,
        private globalRef: GlobalRefService
    ) {

    }

    /**
     * 목업으로 실행 될때는 응답데이터의 res.json().data로 처리되어야 한다.
     * 목업이 아닌 파일로 읽어 올때는 .data를 제거 한다.
     */
    load() {
        return new Observable<any>((observe) => {
            const baseUrl: string = "/assets/config/";
            const getOption: any = {
                observe: 'response',
                reportProgress: true,
                responseType: 'json',
                withCredentials: false
            };

            //NW.JS 환경인가에 따라서 환경변수 로드 처리를 달리 한다.
            if (false /*this.globalRef.isNwEnv*/) {
                this._config = this.globalRef.config;
                this._env = this.globalRef.env;
                observe.complete();
            }
            else {
                this._config = AppConfig;
                this._env = AppConfig.envType;
                console.log(this._env, this._config);
                observe.complete();
                // let urlEnv: string = baseUrl + 'env.json';
                // this.httpClient.get(urlEnv, getOption)
                //     .subscribe(response => {

                //         //통신 응답에서 내용을 발췌한다.

                //         let resEnvData: any = (<any>response).body;
                //         this._env = resEnvData;

                //         // 환경코드
                //         let urlConfig: string = baseUrl + resEnvData.envType + '.json';
                //         this.httpClient.get(urlConfig, getOption)
                //             .subscribe(response => {
                //                 //통신 응답에서 내용을 발췌한다.
                //                 let resEnvData: any = (<any>response).body;
                //                 this._config = resEnvData;
                //                 observe.complete();

                //                 // sets outer object
                //                 this.site = resEnvData.site;
                //                 this.userRestrict = resEnvData.userRestrict;

                //                 console.log(this._env, this._config);

                //             }, error => {
                //                 //통신 오류내용을 발췌한다.
                //                 observe.error(error || '환경구분별 설정파일 로딩에 실패하였습니다.');
                //             });

                //     }, error => {
                //         //통신 오류내용을 발췌한다.
                //         observe.error(error || '기본 설정파일 로딩에 실패하였습니다.');
                //     });
            }
        }).toPromise();
    }

    /**
     * ENV객체 정보 목록을 반환한다.
     */
    getEnvObj() {
        return this._env;
    }

    /**
     * ENV설정정보를 반환한다.
     * 
     * @param key 키
     * @param defaultValuekey 기본값
     */
    getEnv(key: any, defaultValue?: any) {
        return (this._env[key] === undefined || this._env[key] === null || this._env[key] === "") ? defaultValue : this._env[key];
    }

    /**
     * ENV정보를 설정한다.
     * 
     * @param key 키
     * @param value 값
     */
    setEnv(key: any, value: any) {
        this._env[key] = value;
    }

    /**
     * 설정정보를 반환한다.
     * 
     * @param key 식별자
     * @param defaultValuekey 기본값
     */
    get(key: any, defaultValue?: any) {
        let names, rntValue;
        let findFun = function (name, conf) {
            let value = conf[names.shift()];
            if (0 < names.length) {
                value = findFun(names, value);
            }

            return value;
        }

        try {
            names = key.split(".");
            rntValue = findFun(names, this._config);
        }
        catch (err) {
        }

        return (rntValue === undefined || rntValue === null || rntValue === "") ? defaultValue : rntValue;
    }

	/**
     * 키경로에 설정된 값을 반환한다.
     * 
     * @private
     * @method set
     * @param {String} name 키경로이름
     * @param {Object} value 키경로값
     */
    set(name: any, paramValue: any) {
        let names,
            rntValue;

        names = name.split(".");
        rntValue = (1 == names.length ? this._config : find(names, this._config));
        rntValue[names[0]] = paramValue;

        function find(name, conf) {
            var value = conf[names.shift()];
            if (1 < names.length) {
                value = find(names, value);
            }
            return value;
        }
    }

    /**
     * 환경유형을 반환한다.
     */
    getEnvType() {
        return this.getEnv('envType', 'unknown');
    }
}
