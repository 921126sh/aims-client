import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FacadeService } from '../core/services/facade.service';
import { UserService } from '../user/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent {
  /**
   * 사용자 식별자
   */
  userId: string;
  /**
   * 사용자 비밀번호
   */
  userPw: string;

  constructor(
    private userSvc: UserService,
    private router: Router) { }

  /**
   * 로그인을 진행한다.
   */
  doLogin(): void {
    this.userSvc.validateUser(this.userId, this.userPw).subscribe(res => {
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


        console.log('error: ', error);
      });
  }
}
