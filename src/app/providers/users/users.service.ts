import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // <- ADD THIS
})

export class UserService {
  constructor(
    private firestore: AngularFirestore
  ) {}
  // Crea un nuevo usuario
  public createUser(data: {nombre: string, apellido: string}) {
    return this.firestore.collection('usuarios').add(data);
  }
  // Obtiene un usuario
  public getUser(documentId: string) {
    return this.firestore.collection('usuarios').doc(documentId).snapshotChanges();
  }
  // Obtiene todos los gatos
  public getUsers() {
    return this.firestore.collection('usuarios').snapshotChanges();
  }
  // Actualiza un gato
  public updateUsers(documentId: string, data: any) {
    return this.firestore.collection('usuarios').doc(documentId).set(data);
  }

  public deleteUser(documentId: string) {
    return this.firestore.collection('usuarios').doc(documentId).delete();
  }
}
