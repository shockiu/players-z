import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApidataService } from '../../service/apidata.service';


@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  formUser: FormGroup;
  tableUsers: Array<any>;
  showTable =  false;
  regexLetter: any = /[a-zA-Z]/;
  regexEmail: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(
              private fb: FormBuilder,
              private api: ApidataService) {
    this.tableUsers = new Array();
   }

  ngOnInit() {
    this.formUser = this.fb.group({
      name : ['Carlos', [Validators.required, Validators.pattern(this.regexLetter)]],
      lastName: ['', [Validators.required, Validators.pattern(this.regexLetter)]],
      email: ['', [Validators.required, Validators.pattern(this.regexEmail)]],
      github: ['', [Validators.required]]
    });

    this.api.getUsers().subscribe(res => console.log(res));

  }

  get name() { return this.formUser.get('name'); }
  get lastName() { return this.formUser.get('lastName'); }
  get email() { return this.formUser.get('email'); }
  get github() { return this.formUser.get('github'); }

  showInTable() {
    this.showTable = true;
    this.tableUsers.push(this.formUser.value);
    console.log(this.tableUsers);
    console.log(this.formUser.value);
  }

  cleanForm() {
    this.formUser.reset();
  }

}
