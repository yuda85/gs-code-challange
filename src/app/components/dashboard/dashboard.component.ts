import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GameService } from 'src/app/shared/services/game.service';
import { User } from 'src/app/shared/services/user';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public question: string = '';
  public solution: string = '';

  constructor(
    public authService: AuthService,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.gameService.getQuestion().subscribe((data) => {
      this.question = data.question;
    });

    this.gameService.getSolution().subscribe((data) => {
      this.solution = data.solution;
    });
  }

  clickRingerButton() {
    const audio = new Audio();
    audio.src = `assets/Buzzer.mp3`;
    audio.load();
    audio.play();
    const userName: string = this.authService.userData.displayName;
    this.gameService.ringbutton(userName);
  }
}
