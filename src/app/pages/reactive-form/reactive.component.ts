import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApidataService } from '../../service/apidata.service';
import { Users } from 'src/app/interface/user.data';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  formUser: FormGroup;
  formUserUpdate: FormGroup;
  users: Users[];
  regexLetter: any = /[a-zA-Z]/;
  regexEmail: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  modalRef: BsModalRef;

  constructor(
              private fb: FormBuilder,
              private api: ApidataService,
              private modalService: BsModalService) {
   }

  ngOnInit() {

    // Validaciones para la creación de un nuevo usuario
    this.formUser = this.fb.group({
      name : ['', [Validators.required, Validators.pattern(this.regexLetter)]],
      lastName: ['', [Validators.required, Validators.pattern(this.regexLetter)]],
      email: ['', [Validators.required, Validators.pattern(this.regexEmail)]],
      GitHub: ['', [Validators.required]]
    });

    // Validación para la modificación de usuarios existentes
    this.formUserUpdate = this.fb.group({
      id: [null],
      name : ['', [Validators.required, Validators.pattern(this.regexLetter)]],
      lastName: ['', [Validators.required, Validators.pattern(this.regexLetter)]],
      email: ['', [Validators.required, Validators.pattern(this.regexEmail)]],
      GitHub: ['', [Validators.required]]
    });

    this.getUsers();
  }

  get name() { return this.formUser.get('name'); }
  get lastName() { return this.formUser.get('lastName'); }
  get email() { return this.formUser.get('email'); }
  get github() { return this.formUser.get('GitHub'); }

  get nameUpdate() { return this.formUserUpdate.get('name'); }
  get lastNameUpdate() { return this.formUserUpdate.get('lastName'); }
  get emailUpdate() { return this.formUserUpdate.get('email'); }
  get githubUpdate() { return this.formUserUpdate.get('GitHub'); }

  getUsers() {
    return this.api.getUsers().subscribe(res => this.users = res);
  }

  addUser(){
    this.api.addUser(this.formUser.value, this.users.length).subscribe(res => {
      this.getUsers();
      Swal.fire({
        title: 'Usuario agregado',
        text: 'Ha sido agregado con éxito',
        timer: 3000,
        backdrop:`
        rgba(0,0,123,0.4)
        url("../../../assets/images/gato-laptop.gif")
        right top
        `
    });
    });
  }

  deleteUser(id: number){
    this.api.deleteUser(id).subscribe(res => {
      this.getUsers();
      Swal.fire({
        title: 'Usuario eliminado',
        text: 'Pulverizado',
        timer: 3000,
        backdrop:`
        rgba(0,0,123,0.4)
        url("../../../assets/images/gatos-rayos.gif")
        left top
        `
      });
    });
  }

  updateUser(user: Users){
    return this.api.updateUser(user).subscribe(res => this.getUsers());
  }

  cleanForm(number: number) {
    if(number == 1){
      this.formUser.reset();
    } else {
      this.formUserUpdate.reset();
    }
  }

  openModal(template: TemplateRef<any>, user: Users) {
    const { id, name, lastName, email, GitHub } = user;
    this.formUserUpdate.setValue({
      id: id,
      name: name,
      lastName: lastName,
      email: email,
      GitHub: GitHub
    });
    this.modalRef = this.modalService.show(template, {
      animated: true,
      backdrop: 'static'
    });
  }

}
