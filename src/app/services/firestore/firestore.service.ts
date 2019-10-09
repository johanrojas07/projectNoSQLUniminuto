import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(
    private firestore: AngularFirestore
  ) {}
  //Crea un nuevo usuario
  public createUser(data: {nombre: string, apellido: string}) {
    return this.firestore.collection('usuarios').add(data);
  }
  //Obtiene un usuario
  public getUser(documentId: string) {
    return this.firestore.collection('usuarios').doc(documentId).snapshotChanges();
  }
  //Obtiene todos los gatos
  public getUsers() {
    return this.firestore.collection('usuarios').snapshotChanges();
  }
  //Actualiza un gato
  public updateUsers(documentId: string, data: any) {
    return this.firestore.collection('usuarios').doc(documentId).set(data);
  }

  public deleteUser(documentId: string) {
    return this.firestore.collection('usuarios').doc(documentId).delete();
  }
}
