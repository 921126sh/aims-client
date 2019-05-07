import { HttpClient, HttpHandler, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Observable } from 'rxjs';
import { AppConfigService } from './app-config.service';
import { finalize } from 'rxjs/operators';

/**
 * REST 통신 서비스 클래스이다.
 * 
 * @class RestService
 */
@Injectable()
export class RestService {
  /**
   * 서버 접속주소
   */
  public readonly SERVER_ENDPOINT: string;

  /**
   * HTTP 통신 객체
   */
  private readonly useHttp: HttpClient;

  /**
   * 통신헤더 객체
   */
  private readonly baseHeaders: HttpHeaders;

  /**
   * 화면잠금
   */
  @BlockUI() blockUI: NgBlockUI;

  /**
   * 통신 서비스를 초기화하는 생성자이다.
   * 
   * @param config 환경정보 서비스
   * @param handler 통신 핸들러
   */
  constructor(private readonly config: AppConfigService, handler: HttpHandler) {
    this.useHttp = new HttpClient(handler);

    // 서버 접속주소를 구한다.
    this.SERVER_ENDPOINT = config.get("server.endpoint");

    // 인증토큰과 환경구분코드를 통신헤더에 추가한다.
    this.baseHeaders = new HttpHeaders({
    //   "X-Auth-Token": sessionStorage.getItem('token'),
    });
  }

  // -----------------------------------------------------------------------------------------------------------------------------

  /**
   * 기본통신 헤더를 반환한다.
   */
  public getBaseHeaders(): HttpHeaders {
    let rBaseHeaders = new HttpHeaders();

    // console.log(this.baseHeaders);
    // console.log(rBaseHeaders);

    // 아귀먼트로 전달받은 통신헤더 항목 목록을 통신헤더에 추가한다.
    Object.keys(this.baseHeaders.keys()).forEach(hNm => {
      rBaseHeaders.set(hNm, this.baseHeaders.get(hNm));
    });

    return this.baseHeaders;
    // return rBaseHeaders;
  }

  /**
   * 조회 거래를 요청하고 응답받은 객체를 반환한다.
   * 
   * @param url 거래주소
   * @param params 거래 파라미터
   * @returns 거래 응답객체
   */
  public read(url: string, params?: HttpParams): Observable<any> {
    //거래를 시작하기전 화면을 잠근다.
    this.blockUI.start();

    return new Observable<any>((observer) => this.internalGet(url,
      {
        params: params
      })
      .pipe(
        finalize(() => {
          // 거래를 마치면 화면잠금을 해제한다.
          this.blockUI.stop();
        })
      )
      .subscribe(
        response => {
          try {
            //거래 응답에서 내용을 발췌한다.
            let resData: any = response;
            if (response.body !== null) {
              resData = response.body;
            }
            
            resData = resData.hasOwnProperty("_embedded") && null != resData["_embedded"] ? resData["_embedded"] : resData;
            
            observer.next(resData);
          }
          catch (error) {
            observer.error(this.handleError(error));
          }
          finally {
            observer.complete();
          }
        },
        error => {
          //거래 오류내용을 발췌한다.
          observer.error(this.handleError(error));
        }
      )
    );
  }

  /**
   * 변경 거래를 요청하고 응답받은객체를 반환한다.
   * 
   * @param url 거래주소
   * @param params 거래 파라미터
   * @param data 요청데이터
   * @returns 거래 응답객체
   */
  public update(url: string, params?: HttpParams, data?: any): Observable<any> {
    //거래를 시작하기전 화면을 잠근다.
    this.blockUI.start();

    return new Observable<any>((observer) => this.internalPut(url,
      {
        body: data,
        params: params
      })
      .pipe(
        finalize(() => {
          // 거래를 마치면 화면잠금을 해제한다.
          this.blockUI.stop();
        })
      )
      .subscribe(
        response => {
          try {
            //거래 응답에서 내용을 발췌한다.
            let resData: any = response;
            if (response.body !== null) {
              resData = response.body;
            }

            observer.next(resData);
          }
          catch (error) {
            observer.error(this.handleError(error));
          }
          finally {
            observer.complete();
          }
        },
        error => {
          //거래 오류내용을 발췌한다.
          observer.error(this.handleError(error));
        }
      )
    );
  }

  /**
   * 생성 거래를 요청하고 응답받은객체를 반환한다.
   * 
   * @param url 거래주소
   * @param params 거래 파라미터
   * @param data 요청데이터
   * @returns 거래 응답객체
   */
  public create(url: string, params?: HttpParams, data?: any): Observable<any> {
    //거래를 시작하기전 화면을 잠근다.
    this.blockUI.start();

    return new Observable<any>((observer) => this.internalPost(url,
      {
        body: data,
        params: params
      })
      .pipe(
        finalize(() => {
          // 거래를 마치면 화면잠금을 해제한다.
          this.blockUI.stop();
        })
      )
      .subscribe(
        response => {
          try {
            //거래 응답에서 내용을 발췌한다.
            let resData: any = response;
            if (response.body !== null) {
              resData = response.body;
            }

            observer.next(resData);
          }
          catch (error) {
            observer.error(this.handleError(error));
          }
          finally {
            observer.complete();
          }
        },
        error => {
          //거래 오류내용을 발췌한다.
          observer.error(this.handleError(error));
        }
      )
    );
  }

  /**
   * 삭제 거래를 요청하고 응답받은 객체를 반환한다.
   * 
   * @param url 거래주소
   * @param params 거래 파라미터
   * @returns 거래 응답객체
   */
  public delete(url: string, params?: HttpParams): Observable<any> {
    //거래를 시작하기전 화면을 잠근다.
    this.blockUI.start();

    return new Observable<any>((observer) => this.internalDelete(url,
      {
        params: params
      })
      .pipe(
        finalize(() => {
          // 거래를 마치면 화면잠금을 해제한다.
          this.blockUI.stop();
        })
      )
      .subscribe(
        response => {
          try {
            //거래 응답에서 내용을 발췌한다.
            let resData: any = response;
            if (response.body !== null) {
              resData = response.body;
            }
            
            observer.next(resData);
          }
          catch (error) {
            observer.error(this.handleError(error));
          }
          finally {
            observer.complete();
          }
        },
        error => {
          //거래 오류내용을 발췌한다.
          observer.error(this.handleError(error));
        }
      )
    );
  }

  // -----------------------------------------------------------------------------------------------------------------------------

  /**
   * 통신시 사용될 통신헤더를 생성하여 반환한다.
   * 
   * @param headers 통신헤더 객체
   * @returns 통신시 사용될 통신헤더
   */
  private makeHeaders(headers: HttpHeaders): HttpHeaders {
    var rHeaders = this.getBaseHeaders();

    //요청된 통신헤더 내용을 반환할 통신헤더에 반영한다.
    headers.keys().forEach(hNm => {
      rHeaders.set(hNm, headers.get(hNm));
    });

    return rHeaders;
  }

  /**
   * 통신 에러처리 기본 핸들러 이다.
   * 
   * @param error 에러
   */
  private handleError(error: any): any {
    let errorBody: any;
    let errResponse: any;

    if (0 == error.status) {
      errorBody = {};
      errResponse = {
        status: errorBody.status ? errorBody.status : (error.message || error),
        error: errorBody.error ? errorBody.error : (error.message || error),
        message: "서버로부터 응답이 없습니다. 관리자에게 문의하여 주시기 바랍니다."
      }
    }
    else {
      console.error("An error occurred", error);

      errorBody = error._body ? JSON.parse(error._body) : {};
      errResponse = {
        status: errorBody.status ? errorBody.status : (error.message || error),
        error: errorBody.error ? errorBody.error : (error.message || error),
        message: errorBody.message ? errorBody.message.replace('<br>', '\n') : error.message ? error.message.replace('<br>', '\n') : `${error.statusText}(${error.status})`
      }
    }

    return errResponse;
  }

  /**
   * 내부적으로 GET 통신방식 요청하고 응답받은 객체를 반환한다.
   * 
   * @param url 통신주소
   * @param options 통신옵션
   * @returns 통신응답객체
   */
  private internalGet<R>(url: string, options?: any): Observable<HttpResponse<R>> {
    return this.useHttp.get<R>(`${this.SERVER_ENDPOINT}/${url}`, {
      headers: this.makeHeaders(this.baseHeaders),
      observe: 'response',
      params: options.params,
      reportProgress: true,
      responseType: 'json',
      withCredentials: false
    });
  }

  /**
   * 내부적으로 PUT 통신방식 요청하고 응답받은 객체를 반환한다.
   * 
   * @param url 통신주소
   * @param options 통신옵션
   * @returns 통신응답객체
   */
  private internalPut<R>(url: string, options?: any): Observable<HttpResponse<R>> {
    return this.useHttp.put<R>(`${this.SERVER_ENDPOINT}/${url}`, options.body, {
      headers: this.makeHeaders(this.baseHeaders),
      observe: 'response',
      params: options.params,
      reportProgress: true,
      responseType: 'json',
      withCredentials: false
    });
  }

  /**
   * 내부적으로 POST 통신방식 요청하고 응답받은 객체를 반환한다.
   * 
   * @param url 통신주소
   * @param options 통신옵션
   * @returns 통신응답객체
   */
  private internalPost<R>(url: string, options?: any): Observable<HttpResponse<R>> {
    return this.useHttp.post<R>(`${this.SERVER_ENDPOINT}/${url}`, options.body, {
      headers: this.makeHeaders(this.baseHeaders),
      observe: 'response',
      params: options.params,
      reportProgress: true,
      responseType: 'json',
      withCredentials: false
    });
  }

  /**
   * 내부적으로 DELETE 통신방식 요청하고 응답받은 객체를 반환한다.
   * 
   * @param url 통신주소
   * @param options 통신옵션
   * @returns 통신응답객체
   */
  private internalDelete<R>(url: string, options?: any): Observable<HttpResponse<R>> {
    return this.useHttp.delete<R>(`${this.SERVER_ENDPOINT}/${url}`, {
      headers: this.makeHeaders(this.baseHeaders),
      observe: 'response',
      params: options.params,
      reportProgress: true,
      responseType: 'json',
      withCredentials: false
    });
  }
}