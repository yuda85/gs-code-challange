import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GameService } from 'src/app/shared/services/game.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
})
export class MainViewComponent implements OnInit {
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
