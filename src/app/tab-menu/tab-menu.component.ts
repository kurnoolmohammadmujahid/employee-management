import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, PrimeNGConfig, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ToastMessagesService } from '../services/toast-messages.service';

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.scss'],
})
export class TabMenuComponent implements OnInit {

  items: MenuItem[];
  activeItem: MenuItem;
  userName: any = '';
  printChildMessageObservableWay: any = '';
  @Input() param: any;
  @Output() sampleOutputMessage = new EventEmitter();
  constructor(private route: Router,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private toasterMsg: ToastMessagesService) {
    this.items = [
      { label: 'Employee List', routerLink: ['/emp-list'], routerLinkActiveOptions: { exact: true } },
      { label: 'Create New Employee', routerLink: ['/create-employee'], routerLinkActiveOptions: { exact: true } }
    ];
    this.activeItem = this.items[0];
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.userName = sessionStorage.getItem('email');
    this.toasterMsg.transferCommonData.subscribe((obj) => {
      for (let i = 0; i <= this.items.length; i++) {
        if (this.items[i].routerLink[0] == obj) {
          this.activeItem = this.items[i];
        }
      }
    });
    this.toasterMsg.employeeCommonData.subscribe((obj) => {
      this.printChildMessageObservableWay = obj;
    });
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to logout?',
      header: 'Confirmation',
      icon: 'pi pi-power-off',
      accept: () => {
        sessionStorage.clear();
        this.route.navigate(['']);
      },
      reject: () => {
        console.log("reject");
      }
    });
  }

  clickMain(){
    this.sampleOutputMessage.emit("Hello HCL");
  }

}
