import { Injectable } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastMessagesService {

  constructor(private messageService: MessageService, private primengConfig: PrimeNGConfig) {
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  // showSuccess() {
  //   this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  // }

  // showError() {
  //   this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content' });
  // }

  // showTopLeft() {
  //   this.messageService.add({ key: 'tl', severity: 'info', summary: 'Info', detail: 'Message Content' });
  // }

  showToastMessages(param1: string, param2: string, param3: string) {
    this.messageService.add({ key: 'tc', severity: param1, summary: param2, detail: param3 });
  }

  transferCommonData: Subject<any> = new Subject<any>();
  employeeCommonData: Subject<any> = new Subject<any>();

  childComponentGlobalData(message: any){
    this.transferCommonData.next(message);
  }

  employeeCount(message: any){
    this.employeeCommonData.next(message);
  }

}
