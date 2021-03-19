import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GetEmployeeListService } from '../services/get-employee-list.service';
import { Router } from '@angular/router'
import { ConfirmationService, MessageService, PrimeNGConfig, ConfirmEventType } from 'primeng/api';
import { ToastMessagesService } from '../services/toast-messages.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
  providers: [GetEmployeeListService, ConfirmationService, MessageService]
})

export class AddEmployeeComponent implements OnInit {
  name: any;
  age: any;
  mobileNo: any;
  address: any;
  empData: any;
  success: boolean = false;
  loading: boolean = false;
  products: any;

  constructor(private fb: FormBuilder,
    private getEmployeeListService: GetEmployeeListService,
    private route: Router,
    private primengConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private toasterMsg: ToastMessagesService) { }
  createForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
    age: ['', [Validators.required, Validators.pattern(/^[0-9]{2}$/)]],
    mobileNo: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    address: ['', [Validators.required, Validators.pattern(/\S/)]]
  });

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    if (sessionStorage.getItem('email')) {
      this.loading = true;
      this.getEmployeeListService.getAllEmployees().then(data => {
        this.products = data;
        this.toasterMsg.employeeCount(this.products.length);
        this.toasterMsg.childComponentGlobalData('/create-employee');
        this.loading = false;
      });
    } else {
      this.route.navigate(['/signup-login']);
    }
  }

  onSave() {
    this.loading = true;
    console.log(this.createForm.value);
    this.empData = this.createForm.value;
    this.getEmployeeListService.addEmployee(this.empData).then(data => {
      this.success = true;
      setTimeout(() => {
        this.loading = false;
        this.toasterMsg.childComponentGlobalData('/emp-list');
        this.route.navigate(['/emp-list']);
      }, 1000);
    });
  }

}
