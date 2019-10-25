import { Component } from '@angular/core';
import { UserService } from '../user/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  providers: [UserService]
})
export class UpdateComponent {
  /**
   * 사용자 식별자
   */
  userId: string;
  /**
   * 사용자 비밀번호
   */
  userPw: string;

  /**
   * 업데이트 생성자다.
   * @param userSvc 사용자 서비스
   * @param router 라우터
   */
  constructor( 
    private userSvc: UserService,
    private router: Router) { }

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
  }
}
