import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // <- ADD THIS
})

export class MateriasService {
  constructor(
    private firestore: AngularFirestore
  ) {}
  // Crea un nuevo usuario
  public createMaterias(data: any) {
    return this.firestore.collection('materias').add(data);
  }
  // Obtiene un usuario
  public getMateria(documentId: string) {
    return this.firestore.collection('materias').doc(documentId).snapshotChanges();
  }
  // Obtiene todos los usuarios
  public getMaterias() {
    return this.firestore.collection('materias').snapshotChanges();
  }
  // Actualiza un usuario
  public updateMaterias(documentId: string, data: any) {
    return this.firestore.collection('materias').doc(documentId).set(data);
  }

  public deleteMateria(documentId: string) {
    return this.firestore.collection('materias').doc(documentId).delete();
  }
}
