import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { lastValueFrom } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  addUser!: FormGroup;
  roles:any;

  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>, 
    public http: HttpClient, 
    public snackBarService: SnackbarService,
    public userService: UserService
    ) { }

    async ngOnInit(){
      this.addUser = new FormGroup({
        username: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        dateOfBirth: new FormControl('', [Validators.required]),
      })
    }

    async confirmAdd() {
      if(this.addUser.valid){
        let user = {
          username: this.addUser.value.username,
          email: this.addUser.value.email,
          password: this.addUser.value.password,
          dateOfBirth: this.addUser.value.dateOfBirth,
          role: null
        }
        try{
          this.userService.AddUser(user)
        }
        catch(error: any){
          if(error.status === 200){
            this.snackBarService.setMessage('The user was successfully added')
          }
          else{
            this.snackBarService.setMessage('There was an error adding the user')
          }
        }
        this.dialogRef.close();
      }
      else{
        this.snackBarService.setMessage('Please fill out all fields.')
      }
      
    }

    onNoClick(): void {
      this.snackBarService.setMessage('You chose not to add the user')
      this.dialogRef.close()
    }

}
