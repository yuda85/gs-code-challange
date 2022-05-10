import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminService } from './components/admin/admin.service';
import { GameService } from './shared/services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angularfiebase-authentication';
  fireworksState: boolean = false;

  constructor(
    private adminService: AdminService,
    private gameService: GameService
  ) {
    gameService.getFireworksState().subscribe((data) => {
      console.log('BOOM', data);
      this.fireworksState = data.active;
    });
  }
}
