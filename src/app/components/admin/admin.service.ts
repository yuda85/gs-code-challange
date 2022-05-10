import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/shared/services/user';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  userData: any; // Save logged in user data

  fireworksActive$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  fireworksState$ = this.fireworksActive$.asObservable();

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {}

  public getAllLoggedInUsers() {
    return this.afs
      .collection('users')

      .snapshotChanges()
      .pipe(
        map((users) => {
          return users.map((user) => {
            const data = user.payload.doc.data() as Object;
            return {
              ...data,
              id: user.payload.doc.id,
            };
          });
        })
      );
  }

  public addQuestion(question: HTMLTextAreaElement) {
    console.log('implement');
    this.afs
      .collection('question')
      .doc('mainQuestion')
      .set({ question: question.value })
      .then(() => {
        question.value = '';
      });
  }
  public addSolution(solution: HTMLTextAreaElement) {
    console.log('implement');
    this.afs
      .collection('solution')
      .doc('mainSolution')
      .set({ solution: solution.value })
      .then(() => {
        solution.value = '';
      });
  }

  public clearQuestionAndSolution() {
    this.afs.collection('question').doc('mainQuestion').set({ question: '' });
    this.afs.collection('solution').doc('mainSolution').set({ solution: '' });
  }

  public getButtonringers() {
    return this.afs
      .collection('ringers')
      .snapshotChanges()
      .pipe(
        map((ringers) => {
          return ringers.map((ringer) => {
            const data = ringer.payload.doc.data() as Object;
            return {
              ...data,
            };
          });
        })
      );
  }

  public resetButtonRingers() {
    this.afs
      .collection('ringers')
      .get()
      .subscribe((querySnapshot) => {
        querySnapshot.docs.forEach((snapshot) => {
          snapshot.ref.delete();
        });
      });
  }

  resetUsers() {
    this.afs
      .collection('users')
      .get()
      .subscribe((querySnapshot) => {
        querySnapshot.docs.forEach((snapshot) => {
          snapshot.ref.delete();
        });
      });
  }

  public getActiveUsers(): Observable<Array<any>> {
    return this.afs
      .collection('users')
      .snapshotChanges()
      .pipe(
        map((users) => {
          return users.map((user) => {
            const data = user.payload.doc.data() as Object;
            return {
              ...data,
              id: user.payload.doc.id,
            };
          });
        })
      );
  }

  public updateUser(user: User) {
    this.afs.collection('users').doc(user.uid).set(user);
  }

  public updateUserPoints(userId: string, isAdd: boolean) {
    console.log('implement');
  }

  public declareWinner() {
    console.log('implement');
    // navigate to winner
  }

  public toggleFireworks() {
    const currentState = this.fireworksActive$.value;
    this.fireworksActive$.next(!currentState);
    this.afs
      .collection('config')
      .doc('fireworks')
      .set({ active: this.fireworksActive$.value });
  }
}
