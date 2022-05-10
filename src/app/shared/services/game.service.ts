import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  userData: any; // Save logged in user data
  questionNum: number = 1;

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    // this.afAuth.authState.subscribe((user) => {
    //   if (user) {
    //     this.userData = user;
    //     localStorage.setItem('user', JSON.stringify(this.userData));
    //     JSON.parse(localStorage.getItem('user')!);
    //   } else {
    //     localStorage.setItem('user', 'null');
    //     JSON.parse(localStorage.getItem('user')!);
    //   }
    // });
  }

  getQuestion(): Observable<any> {
    return this.afs
      .collection('question')
      .doc('mainQuestion')
      .snapshotChanges()
      .pipe(
        map((question) => {
          this.questionNum++;
          const data = question.payload.data() as Object;
          return {
            ...data,
          };
        })
      );
  }

  getSolution(): Observable<any> {
    return this.afs
      .collection('solution')
      .doc('mainSolution')
      .snapshotChanges()
      .pipe(
        map((solution) => {
          const data = solution.payload.data() as Object;
          return {
            ...data,
          };
        })
      );
  }

  getFireworksState(): Observable<any> {
    return this.afs
      .collection('config')
      .doc('fireworks')
      .snapshotChanges()
      .pipe(
        map((solution) => {
          const data = solution.payload.data() as Object;
          return {
            ...data,
          };
        })
      );
  }

  public clearQuestion() {
    this.afs.collection('question').add({ question: '' });
  }

  public ringbutton(userName: string) {
    this.afs.collection('ringers').add({ userName });
  }

  public getFirstButtonRinger() {
    console.log('implement');
  }

  public showfireworks() {
    console.log('implement');
  }

  public updateUserPoints(userId: string, isAdd: boolean) {
    console.log('implement');
  }

  public declareWinner() {
    console.log('implement');
  }
}
