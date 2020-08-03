import { Component, OnInit, TemplateRef } from '@angular/core';
import { ApidataService } from 'src/app/service/apidata.service';
import { Users } from '../../interface/user.data';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  id = 1;
  idupdate: number;
  nameuser: string;
  lastname: string;
  emailuser: string;
  githubuser: string;
  nameuserupdate: string;
  lastnameuupdate: string;
  emailuserupdate: string;
  githubuserupdate: string;
  users: Users[];
  modalRef: BsModalRef

  constructor(private api: ApidataService, private modalService: BsModalService) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    return this.api.getUsers().subscribe((res) =>  this.users = res);
  }

  addUser(user: Users) {
    this.api.addUser(user, this.users.length).subscribe(res => {
      this.getUsers();
      Swal.fire({
        title: 'Usuario agregado',
        text: 'Ha sido agregado con éxito',
        timer: 2000,
        backdrop:`
        rgba(0,0,123,0.4)
        url("../../../assets/images/gato-laptop.gif")
        right top
        `
      });
    }); 
  }

  deleteUser(id: number) {
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

  updateUser(user: Users) {
    return this.api.updateUser(user).subscribe(res => this.getUsers());
  }

  openModal(template: TemplateRef<any>, user: Users) {
    const { id, name, lastName, email, GitHub } = user;
    this.idupdate = id;
    this.nameuserupdate = name;
    this.lastnameuupdate = lastName;
    this.emailuserupdate = email;
    this.githubuserupdate = GitHub; 
    this.modalRef = this.modalService.show(template, {
      animated: true,
      backdrop: 'static'
    })
  }


}
