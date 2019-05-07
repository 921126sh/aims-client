import { Component, ElementRef, ViewChild, OnInit, Injector } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MatDialog, MatPaginator, MatSort } from "@angular/material";
import { merge, Observable, BehaviorSubject, fromEvent } from "rxjs";
import { map } from "rxjs/operators";
import { DataSource } from "@angular/cdk/table";
import { EditDialogComponent } from "./dialogs/edit/edit.dialog.component";
import { AddDialogComponent } from "./dialogs/add/add.dialog.component";
import { User } from "./model/user";
import { DeleteDialogComponent } from "./dialogs/delete/delete.dialog.component";
import { UserService } from "./services/user.service";
import { RestService } from "../core/services/rest.service";


@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [UserService, RestService]
})
export class UserComponent implements OnInit {
  readonly displayedColumns = ['userId', 'userNm', 'userPw', 'userDiv', 'actions'];
  selRowIdx: number;
  dataSource: DataProcHelper | null;
  userId: string;

  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  /**
   * 기본 생성자다.
   * 
   * @param httpClient http 클라이언트
   * @param matDialog 메터리얼 다이얼로그
   * @param restService 레스트 서비스
   * @param userService 사용자 서비스
   */
  constructor(
    public httpClient: HttpClient,
    public matDialog: MatDialog,
    public restService: RestService,
    private userService: UserService
  ) {
  }

  /**
   * Angular가 초기화 된 후에 호출되는 라이프 사이클 후크다
   */
  ngOnInit() {
    this.getRows();
  }

  /**
   * 사용자 테이블 데이터를 새로고침한다.
   */
  refresh() {
    this.getRows();
  }

  /**
   * 사용자 목록을 조회한다.
   */
  public getRows() {
    this.dataSource = new DataProcHelper(this.userService, this.matPaginator, this.matSort);
    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  /**
   * 사용자를 신규등록 한다.
   * 
   * @param user 사용자
   */
  createRow(user: User) {
    const dialogRef = this.matDialog.open(AddDialogComponent, {
      data: { issue: user }
    });

    // 다이얼로그 종료 후 새로운 열을 추가한다.
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.userService.dataChange.value.push(this.userService.getDialogData());
        this.refreshTable();
      }
    });
  }

  /**
   * 사용자를 업데이트 한다.
   * 
   * @param selRowIdx 선택된 행 인덱스
   * @param userId 사용자 식별자
   * @param userNm 사용자 명
   * @param userPw 사용자 비밀번호
   * @param userDiv 사용자 구분
   */
  updateRow(selRowIdx: number, userId: string, userNm: string, userPw: string, userDiv: string) {
    this.userId = userId;
    this.selRowIdx = selRowIdx;
    const dialogRef = this.matDialog.open(EditDialogComponent, {
      data: { userId: userId, userNm: userNm, userPw: userPw, userDiv: userDiv }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // 편집 내용을 사용하는 경우 실제값과 다를 수있기 때문에, ID로 UserService 내부에 행을 찾는다.
        const foundIndex = this.userService.dataChange.value.findIndex(x => x.userId === this.userId);
        // 다음 다이얼 로그의 데이터 (입력 한 값)를 사용하여 행을 업데이트한다.
        this.userService.dataChange.value[foundIndex] = this.userService.getDialogData();
        // 마지막으로 테이블 새로고침을 한다.
        this.refreshTable();
      }
    });
  }

  /**
   * 사용자를 삭제 한다.
   * 
   * @param selRowIdx 선택된 행 인덱스
   * @param userId 사용자 식별자
   * @param userNm 사용자 명
   * @param userPw 사용자 비밀번호
   * @param userDiv 사용자 구분
   */
  deleteRow(selRowIdx: number, userId: string, userNm: string, userPw: string, userDiv: string) {
    this.selRowIdx = selRowIdx;
    this.userId = userId;
    const dialogRef = this.matDialog.open(DeleteDialogComponent, {
      data: { userId: userId, userNm: userNm, userPw: userPw, userDiv: userDiv }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.userService.dataChange.value.findIndex((x: any) => x.id === this.userId);
        this.userService.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }

  /**
   * 테이블을 새로고침한다.
   */
  private refreshTable() {
    this.matPaginator._changePageSize(this.matPaginator.pageSize);
  }
}

/**
 * 데이터처리기 헬퍼 클래스다.
 */
export class DataProcHelper extends DataSource<User> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  filteredData: User[] = [];
  renderedData: User[] = [];

  /**
   * 기본 생성자다.
   * 
   * @param _userService 사용자 서비스
   * @param _paginator 페이지기
   * @param _sort 정렬기
   */
  constructor(
    public _userService: UserService,
    public _paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // 필터내용을 변경하면 첫 페이지로 초기화한다.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /**
   * 데이터 조회, 필터, 정렬 및 페이징 처리를 하여 반환한다.
   * 
   * @description 테이블의 의해 호출된 `connect` 함수는 랜더링 할 데이터를 포함하는 하나의 스트림을 검색한다.
   * @returns 데이터 조회, 필터, 정렬 및 페이징 처리된 목록 
   */
  connect(): Observable<User[]> {
    const displayDataChanges = [
      this._userService.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._userService.getAllUsers();

    return merge(...displayDataChanges).pipe(map(() => {
      // 데이터 필터링
      this.filteredData = this._userService.data.slice().filter((issue: User) => {
        const searchStr = (issue.userId + issue.userNm + issue.userPw + issue.userDiv).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // 필터된 목록 정렬
      const sortedData = this.sortData(this.filteredData.slice());

      // 필터 및 정렬된 목록 페이징
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);

      return this.renderedData;
    }
    ));
  }

  /**
   * 데이터를 정렬하여 반환한다.
   * 
   * @param datas 데이터 목록
   * @returns 정렬된 데이터 목록
   */
  sortData(datas: User[]): User[] {
    if (!this._sort.active || this._sort.direction === '') {
      return datas;
    }

    return datas.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'userId': [propertyA, propertyB] = [a.userId, b.userId]; break;
        case 'userNm': [propertyA, propertyB] = [a.userNm, b.userNm]; break;
        case 'userPw': [propertyA, propertyB] = [a.userPw, b.userPw]; break;
        case 'userDiv': [propertyA, propertyB] = [a.userDiv, b.userDiv]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

  /**
   * @ignore
   */
  disconnect() { }
}

/*   // If you don't need a filter or a pagination this can be simplified, you just use code from else block
   // OLD METHOD:
   // if there's a paginator active we're using it for refresh
   if (this.dataSource._paginator.hasNextPage()) {
     this.dataSource._paginator.nextPage();
     this.dataSource._paginator.previousPage();
     // in case we're on last page this if will tick
   } else if (this.dataSource._paginator.hasPreviousPage()) {
     this.dataSource._paginator.previousPage();
     this.dataSource._paginator.nextPage();
     // in all other cases including active filter we do it like this
   } else {
     this.dataSource.filter = '';
     this.dataSource.filter = this.filter.nativeElement.value;
   }
*/