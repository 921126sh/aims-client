import { Component, ViewChild, ElementRef } from '@angular/core';
import { UpdateService } from './services/update.service';
import { Router } from '@angular/router';
import { FileUploader, FileItem } from 'ng2-file-upload'
import { AppConfigService } from '../core/services/app-config.service';

@Component({
  selector: 'update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  providers: [UpdateService]
})
export class UpdateComponent {
  /**
   * 버전
   */
  version: string;
  /**
   * 배포일
   */
  date: string;
  /**
   * 설명
   */
  notableChanges: string;

  uploader: FileUploader = new FileUploader({
    url: 'http://localhost:5656/upload'
  });

  fileInfo = {
    originalname: '',
    filename: ''
  };


  /**
   * 업로드 할 파일 정보
   */
  uploadFileInfo: any = {
    version: "",
    isRelease: true,
    date: "",
    notableChanges: ""
  }

  /**
   * 식별자 엘레먼트
   */
  @ViewChild('uploaderFile')
  el_uploaderFileId: ElementRef;

  /**
   * 서버 엔드포인트
   */
  server_endpoint;

  /**
   * 업데이트 생성자다.
   * @param userSvc 사용자 서비스
   * @param router 라우터
   */
  constructor(private updateService: UpdateService,
    private config: AppConfigService) {
      this.server_endpoint = config.get("server.endpoint");
  }
  
  /**
   * 마지막 업데이트 정보를 조회한다.
   */
  checkForUpdate(): void {
    this.updateService.getUpdateInfo().subscribe(res => {
      this.version = res["version"];
      this.date = res["date"];
      this.notableChanges = res["notableChanges"][0];
    });
  }

  /**
 * 업로드 파일을 저장한다.
 */
  complete(): void {
    let file: FileItem = this.uploader.queue[0];

    // 업로드 정보 재설정
    this.uploader.setOptions(
      {
        // headers: [{ name: 'X-Auth-Token', value: this.sessionSvc.getUserToken() }, { name: 'X-Env-Type', value: this.config.getEnvType() }],
        url: this.server_endpoint + "/update/koob-store/" + this.uploadFileInfo.version + "/" + file.file.name,
        additionalParameter: { "notableChanges": this.uploadFileInfo.notableChanges.split("\n"), "date": this.uploadFileInfo.date, "is-release": this.uploadFileInfo.isRelease }
      });

    // 파일을 업로드한다.
    file.upload();

    // 성공 콜백
    this.uploader.onSuccessItem = (item, response, status, header) => {
      if (status === 200) {
        // this.checkForUpdate();
        alert("업데이트가 완료 되었습니다.");
        this.uploadFileInfo = {
          version: "",
          isRelease: true,
          date: "",
          notableChanges: ""
        }

        this.el_uploaderFileId.nativeElement.value = "";
      }

      console.log('upload success: ' + status);
    }

    // 실패 콜백
    this.uploader.onErrorItem = (item, response, status, header) => {
      console.log('upload faild... Error status: ' + status);
    }
  }

}
