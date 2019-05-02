import { Component, ElementRef, ViewChild, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MatDialog, MatPaginator, MatSort } from "@angular/material";
import { merge, Observable, BehaviorSubject, fromEvent } from "rxjs";
import { map } from "rxjs/operators";
import { DataSource } from "@angular/cdk/table";
import { EditDialogComponent } from "../common/dialogs/edit/edit.dialog.component";
import { AddDialogComponent } from "../common/dialogs/add/add.dialog.component";
import { User } from "../home/model/user";
import { DeleteDialogComponent } from "../common/dialogs/delete/delete.dialog.component";
import { UserService } from "../home/services/user.service";
import { RestService } from "../core/rest.service";

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [UserService, RestService]
})
export class UserComponent implements OnInit {
  displayedColumns = ['userId', 'userNm', 'userPw', 'userDiv', 'actions'];
  index: number;
  exampleDatabase: UserService | null;
  dataSource: ExampleDataSource | null;
  userId: string;

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public userService: UserService,
    public restService: RestService
  ) { 
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addNew(user: User) {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: { issue: user }
    });

    // 다이얼로그 종료 후 새로운 열을 추가한다.
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.exampleDatabase.dataChange.value.push(this.userService.getDialogData());
        this.refreshTable();
      }
    });
  }

  startEdit(i: number, userId: string, userNm: string, userPw: string, userDiv: string) {
    this.userId = userId;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: { userId: userId, userNm: userNm, userPw: userPw, userDiv: userDiv }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside UserService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.userId === this.userId);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.userService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  deleteItem(i: number, userId: string, userNm: string, userPw: string, userDiv: string) {
    this.index = i;
    this.userId = userId;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { userId: userId, userNm: userNm, userPw: userPw, userDiv: userDiv }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex((x: any) => x.id === this.userId);
        // for delete we use splice in order to remove single object from UserService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }


  private refreshTable() {
    // Refreshing table using paginator
    // Thanks yeager-j for tips
    // https://github.com/marinantonio/angular-mat-table-crud/issues/12
    this.paginator._changePageSize(this.paginator.pageSize);
  }


  public loadData() {
    this.exampleDatabase = new UserService(this.restService);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
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
}

export class ExampleDataSource extends DataSource<User> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: User[] = [];
  renderedData: User[] = [];

  constructor(public _userService: UserService,
    public _paginator: MatPaginator,
    public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<User[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._userService.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._userService.getAllUsers();


    return merge(...displayDataChanges).pipe(map(() => {
      // Filter data
      this.filteredData = this._userService.data.slice().filter((issue: User) => {
        const searchStr = (issue.userId + issue.userNm + issue.userPw + issue.userDiv).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    }
    ));
  }

  disconnect() { }


  /** Returns a sorted copy of the database data. */
  sortData(data: User[]): User[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
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
   }*/
