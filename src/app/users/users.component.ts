import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore/firestore.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public documentId = null;
  public currentStatus = 1;
  public newUserForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    id: new FormControl('')
  });
  public users = [];
  constructor(
    private firestoreService: FirestoreService
  ) {
    this.newUserForm.setValue({
      id: '',
      nombre: '',
      apellido: ''
    });
  }
  ngOnInit() {
    this.firestoreService.getUsers().subscribe((usersSnapshot) => { // Se subscribe para ver cambios en esa coleccion
      this.users = [];
      usersSnapshot.forEach((catData: any) => { // Recorre cada uno de los usuarios agregados
        console.log(catData);
        this.users.push({
          id: catData.payload.doc.id,
          data: catData.payload.doc.data()
        });
      });
    });
  }

  public editUser(documentId) {
    const editSubscribe = this.firestoreService.getUser(documentId).subscribe((cat) => {
      this.currentStatus = 2;
      this.documentId = documentId;
      const data: any = cat.payload.data();
      this.newUserForm.setValue({
        id: documentId,
        nombre: data.nombre,
        apellido: data.apellido
      });
      editSubscribe.unsubscribe();
    });
  }

  public deleteUser(documentId) {
    this.firestoreService.deleteUser(documentId).then(() => {
      console.log('Documento eliminado!');
    }, (error) => {
      console.error(error);
    });
  }

  public newUser(form, documentId = this.documentId) {
    console.log(`Status: ${this.currentStatus}`);
    if (this.currentStatus === 1) {
      const data = {
        nombre: form.nombre,
        apellido: form.apellido
      };
      this.firestoreService.createUser(data).then(() => {
        console.log('Documento creado exitósamente!');
        this.newUserForm.setValue({
          nombre: '',
          apellido: '',
          id: ''
        });
      }, (error) => {
        console.error(error);
      });
    } else {
      const data = {
        nombre: form.nombre,
        apellido: form.apellido
      };
      this.firestoreService.updateUsers(documentId, data).then(() => {
        this.currentStatus = 1;
        this.newUserForm.setValue({
          nombre: '',
          apellido: '',
          id: ''
        });
        console.log('Documento editado exitósamente');
      }, (error) => {
        console.log(error);
      });
    }
  }


}
