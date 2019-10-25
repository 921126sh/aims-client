import { Component } from '@angular/core';
import { UpdateService } from './services/update.service';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload'

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
  distDate: string;
  /**
   * 설명
   */
  discription: string;

  uploader: FileUploader = new FileUploader({
    url: 'http://localhost:5656/upload'
  });

  fileInfo = {
    originalname: '',
    filename: ''
  };

  /**
   * 업데이트 생성자다.
   * @param userSvc 사용자 서비스
   * @param router 라우터
   */
  constructor(private updateService: UpdateService) {
    this.updateService.getUpdateInfo().subscribe(res => {
      this.version = res["version"];
      this.distDate = res["distDate"];
      this.discription = res["discription"];
    });

    this.uploader.onCompleteItem = (item, res, status, header) => {
      this.version = res["version"];
      this.distDate = res["distDate"];
      this.discription = res["discription"];
    }
  }

}
