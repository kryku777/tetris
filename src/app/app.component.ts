import { Component } from '@angular/core';
import { Player } from './player';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //aktualna strona którą wyświetlamy
  currentPage = 'login';

  //dane gracza - oddzielny obiekt w pliku player.ts
  player: Player;

  // ustawia aktualną strone - ze strony logowania lub strony gry
  setPage(event:any) { this.currentPage = event; }

  //ustawia gracza - przekazane ze strony logowania
  setPlayer(event:any) { this.player = event; }

  constructor() { 
    this.player = {'name': '', 'email':''};
  }
  ngOnInit() { }
}
