import { Injectable } from '@angular/core';

export interface DassGlobal {
    DassGlobal : any;
    sessionStorage : any;
    chrome : any;
    history : any;
}

export abstract class GlobalRef {
    abstract get nativeGlobal(): DassGlobal;
}

@Injectable()
export class GlobalRefService extends GlobalRef {

    /**
     * 윈도우 객체를 반환한다.
     */
    get nativeGlobal(): DassGlobal { return (<any>window) as DassGlobal; }

    /**
     * NW.JS 플랫폼 환경인지를 반환한다.
     */
    get isNwEnv(): boolean { 
        return false;  // temp
        // return this.nativeGlobal.DassGlobal.isNwEnv; 
    }
    
    /**
     * 세션 객체를 반환한다.
     */
    get session(): any { return this.nativeGlobal.sessionStorage; }

    /**
     * 환경설정 정보를 반환한다.
     */
    get env(): any { return this.nativeGlobal.DassGlobal.env; }

    /**
     * 환경설정 정보를 반환한다
     */
    get config(): any { return this.nativeGlobal.DassGlobal.config; }

    /**
     * 환결설정 파일 경로를 반환한다.
     */
    get configFilePath(): string { return this.nativeGlobal.DassGlobal.configFilePath; }
    
    /**
     * Node 레퍼런스를 반환한다.
     */
    get fvNw(): any { return this.nativeGlobal.DassGlobal.fvNw; }

}