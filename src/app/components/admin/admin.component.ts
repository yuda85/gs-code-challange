import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/services/user';
import { QUESTIONS } from './admin.consts';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(private adminService: AdminService) {}

  showAnswers: boolean = false;
  solutions: Array<any> = QUESTIONS;

  users: Array<User> = [];

  ringers: Array<any> = [];

  ngOnInit(): void {
    this.adminService.getAllLoggedInUsers().subscribe((data) => {
      console.log(data);
    });

    this.adminService.getButtonringers().subscribe((data) => {
      this.ringers = data;
      console.log(this.ringers);
    });

    this.adminService.getActiveUsers().subscribe((data) => {
      this.users = data;
      console.log(data);
    });
  }

  addQuestion(question: HTMLTextAreaElement) {
    this.adminService.addQuestion(question);
  }
  addSolution(solution: HTMLTextAreaElement) {
    this.adminService.addSolution(solution);
  }

  clearQuestion() {
    this.adminService.clearQuestionAndSolution();
  }

  resetButtonringers() {
    this.adminService.resetButtonRingers();
  }

  resetUsers() {
    this.adminService.resetUsers();
  }

  addPoint(user: User) {
    let currentPoints = user.points;
    if (!currentPoints) {
      currentPoints = 1;
    } else {
      currentPoints = currentPoints + 1;
    }
    user.points = currentPoints;
    this.adminService.updateUser(user);
  }

  subtractPoint(user: User) {
    let currentPoints = user.points;
    if (!currentPoints) {
      currentPoints = 0;
    } else {
      currentPoints = currentPoints - 1;
    }
    user.points = currentPoints;
    this.adminService.updateUser(user);
  }

  toggleFireworks() {
    this.adminService.toggleFireworks();
  }
}
