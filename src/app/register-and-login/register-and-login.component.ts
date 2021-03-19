import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GetEmployeeListService } from '../services/get-employee-list.service';
import { ToastMessagesService } from '../services/toast-messages.service';

@Component({
  selector: 'app-register-and-login',
  templateUrl: './register-and-login.component.html',
  styleUrls: ['./register-and-login.component.scss'],
  providers: [ToastMessagesService, MessageService]
})
export class RegisterAndLoginComponent implements OnInit {
  loginObj = {
    email: '',
    password: ''
  }
  id: any;
  welcomeMessage: string = '';
  loading: any;
  datamatch: any = 0;
  constructor(private fb: FormBuilder,
    private getEmployeeListService: GetEmployeeListService,
    private route: Router,
    private toasterMsg: ToastMessagesService) { }
  createForm = this.fb.group({
    id: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(/\S+@hcl.com/)]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W)/)]]
  });

  ngOnInit(): void {
    if (sessionStorage.getItem('email')) {
      this.route.navigate(['/emp-list']);
    } else {

    }
  }

  loginAuthentication() {
    this.loading = true;
    console.log(this.createForm.value);
    this.loginObj.email = this.createForm.value.email;
    this.loginObj.password = this.createForm.value.password;
    this.id = this.createForm.value.id;
    if (this.id == "1") {
      this.getEmployeeListService.getAllProfiles().then(data => {
        console.log(data);
        this.loading = false;
        for (let profile of data) {
          if (profile.email === this.loginObj.email && profile.password === this.loginObj.password) {
            sessionStorage.setItem('email', this.loginObj.email)
            this.welcomeMessage = "Welcome to Dashboard";
            this.route.navigate(['/emp-list']);
          } else {
            this.datamatch ++;
          }
        }
        if(this.datamatch == data.length) {
          this.toasterMsg.showToastMessages('error', 'Failed', 'Unauthorized access. Invalid credentials')
        }else{
          this.datamatch = 0;
        }
      });
    } else {
      this.getEmployeeListService.addProfile(this.loginObj).then(data => {
        console.log(data);
        this.loading = false;
        this.id = "";
        this.createForm.reset();
        this.toasterMsg.showToastMessages('success', 'Success', 'Registration successful')
      });
    }
  }

}
