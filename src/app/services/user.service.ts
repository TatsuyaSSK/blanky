import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  async updateAvatar(uid: string, base64Image: string) {
    const ref = this.storage.ref(`users/${uid}`);
    const uploadTask = await ref.putString(base64Image, 'data_url', {
      contentType: 'image/png',
    });
    const imageURL = await uploadTask.ref.getDownloadURL();

    this.db.doc<User>(`users/${uid}`).update({
      avatarURL: imageURL,
    });
  }
}
