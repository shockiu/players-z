import { Component, OnInit } from '@angular/core';
import { userData } from './model.template.user';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  newUser = {};
  nameUser: string;
  lastNameUser: string;
  emailUser: string;
  GitHubUser: string;
  tableUsers: Array<any>;
  showTable =  false;
  constructor() {
    this.tableUsers = new Array();
  }

  ngOnInit() {
  }

  showInTable() {
    console.log('Mostrando en tabla...');
    this.showTable = true;
    this.newUser = {
      name: this.nameUser,
      lastName: this.lastNameUser,
      email: this.emailUser,
      github: this.GitHubUser
    }
    this.tableUsers.push(this.newUser);
    console.log(this.tableUsers);

  }

}
