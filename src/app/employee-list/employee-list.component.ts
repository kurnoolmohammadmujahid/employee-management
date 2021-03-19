import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { EmpDetail } from '../interface/empDetails';
import { GetEmployeeListService } from '../services/get-employee-list.service';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Message } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { ToastMessagesService } from '../services/toast-messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  providers: [GetEmployeeListService, ConfirmationService, MessageService]
})
export class EmployeeListComponent implements OnInit {
  msgs: Message[] = [];
  products: EmpDetail[] = [];
  product: EmpDetail = {};
  id: any;
  name: any;
  age: any;
  mobileNo: any;
  address: any;
  empData = { id: null, name: '', age: '', mobileNo: '', address: '' };
  success: boolean = false;
  loading: boolean = false;
  hello = "hello world";
  printValue: any;
  constructor(private getEmployeeListService: GetEmployeeListService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private toasterMsg: ToastMessagesService,
    private route: Router
  ) {

  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    if (sessionStorage.getItem('email')) {
      this.loading = true;
      this.getEmployeeListService.getAllEmployees().then(data => {
        this.products = data;
        this.toasterMsg.employeeCount(this.products.length);
        this.loaderClose();
      });
    } else {
      this.route.navigate(['/signup-login']);
    }
  }

  displayModal: boolean = false;

  showModalDialog(product: any) {
    this.displayModal = true;
    this.captureEdit(product);
  }

  confirm(id: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete the employee detail?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.loading = true;
        this.getEmployeeListService.deleteEmployee(id).then(data => {
          this.getEmployeeListService.getAllEmployees().then(data => {
            this.products = data;
            this.toasterMsg.employeeCount(this.products.length);
            this.loaderClose();
          });
        });
      },
      reject: () => {
        console.log("reject");
      }
    });
  }

  captureEdit(product: any) {
    console.log(product)
    this.id = product.id;
    this.name = product.name;
    this.age = product.age;
    this.mobileNo = product.mobileNo;
    this.address = product.address;
  }

  handleconfirm($event: any) {
    console.log($event)
  }

  editEmployee() {
    this.empData = {
      id: this.id,
      name: this.name,
      age: this.age,
      mobileNo: this.mobileNo,
      address: this.address
    }
    this.loading = true;
    this.getEmployeeListService.updateEmployee(this.id, this.empData).then(data => {
      this.success = true;
      this.getEmployeeListService.getAllEmployees().then(data => {
        this.products = data;
        setTimeout(() => {
          this.displayModal = false;
          this.loaderClose();
        }, 1000);
      });
    });
  }

  loaderClose() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  method(event: any){
    this.printValue = event;
  }

}
