import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // items: MenuItem[];
  // activeItem: MenuItem;
  constructor() {
    // this.items = [
    //   { label: 'Employee List', routerLink: ['/emp-list'], routerLinkActiveOptions: { exact: true } },
    //   { label: 'Create New Employee', routerLink: ['/create-employee'], routerLinkActiveOptions: { exact: true } }
    // ];
    // this.activeItem = this.items[0];
  }
}