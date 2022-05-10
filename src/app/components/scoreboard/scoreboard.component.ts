import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/services/user';
import { AdminService } from '../admin/admin.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent implements OnInit {
  users: Array<User> = [];
  colors: Array<string> = [
    '#FFC45C',
    '#DB544F',
    '#A163F2',
    '#4FB4DB',
    '#54FB63',
    '#FFC45C',
    '#DB544F',
    '#A163F2',
    '#4FB4DB',
    '#54FB63',
    '#FFC45C',
    '#DB544F',
    '#A163F2',
    '#4FB4DB',
    '#54FB63',
  ];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getActiveUsers().subscribe((data) => {
      this.users = data;
    });
  }

  getBarStyle(points: number = 0): { [key: string]: string } {
    const style = {
      width: `${points * 5}px`,
      background: 'red',
    };
    return {};
  }

  public trackByFn(index: number): number {
    return index;
  }
}
