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

<<<<<<< HEAD
  /**
   * 로그인을 진행한다.
   */
  doLogin(): void {
    this.userSvc.validateUser(this.userId, this.userPw).subscribe(() => {
      if (true /** 인증결과 */) {
        this.router.navigate(['/dashboard']);
      }
    },
      error => {
        /**[TEMP- START] rest서비스 완료시 까지 임시 로직 */
        if (true /** 인증결과 */) {
          this.router.navigate(['/dashboard']);
        }
        /**[TEMP - END] rest서비스 완료시 까지 임시 로직 */

        confirm(error)
        console.log('error: ', error);
      });
=======
    this.uploader.onCompleteItem = (item, res, status, header) => {
      this.version = res["version"];
      this.distDate = res["distDate"];
      this.discription = res["discription"];
    }
>>>>>>> dc3bacd13957d8eadb722fc0be00e0e8aabe0888
  }

}
