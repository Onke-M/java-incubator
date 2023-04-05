import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UserService } from 'src/app/services/user.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';

interface User {
  userID:number;
  username:string;
  email:string;
  password:string;
  dateOfBirth:string;
  role:any;
  }

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent {
  isLoading:boolean = false;
  users!:User[];
  
  constructor(private userService: UserService, private snackbarService:SnackbarService, private router:Router, public dialog: MatDialog){}
  displayedColumns: string[] = ['Username', 'Email', 'Role', 'Actions'];
  dataSource = new MatTableDataSource<User>()
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
    async ngOnInit() {
      this.getUsers()
      this.dataSource.paginator = this.paginator;
    }
  
    async ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.userService.GetUsers();
    }
  
  
    async applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    async addUser() {

      this.dialog.open(AddUserComponent, {disableClose: true})
      .afterClosed().subscribe(async () => {
        this.snackbarService.openSnackBar(), await this.getUsers();
      });
    }
  
    async getUsers() {
      console.log('Getting users')
      this.isLoading = true;
      await this.userService.GetUsers().then(
        (res) => {
          this.users = res;
          this.dataSource.data = this.users;
        },
        (response: HttpErrorResponse) => {
          if (response.status == 500) {
            this.snackbarService.setMessage('Error getting users');
          }
        }
      ).finally(() => this.isLoading = false);
      console.log(this.users)
    }
}
