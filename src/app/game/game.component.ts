import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { HostListener } from '@angular/core';
import { TetrisCoreComponent } from 'ngx-tetris';
import { Player } from '../player';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  linesCleared = 0;

  status = 'READY';

  time: number = 0;

  interval;

  paused = true;

  gameOverInfo = false;

  boardStyle = 'default';
  statusStyle= 'white';
  

  @Input() currentPlayer: Player;

  @Output() pageUpdate = new EventEmitter<string>();


  onLineCleared() {
    this.linesCleared++;
  }

  onGameOver() {
    this.pauseTimer();
    this.gameOverInfo = true;
    this.boardStyle = 'game-over';
  }

  gameExit() {
    this.pageUpdate.emit('login'); 
  }

  startTimer() {
    this.resetTimer();
    this.paused = false;
    this.interval = setInterval(
      () => { 
        if(!this.paused) {
          this.time++; 
        }
      },
      1000
    );
  }

  pauseTimer()    { this.paused = true }
  
  restartTimer()  { this.paused = false }

  resetTimer()    { 
    this.time = 0;
    clearInterval(this.interval) }
 
  @ViewChild(TetrisCoreComponent) game!: TetrisCoreComponent;


  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    switch (event.key) {
      case 'ArrowDown':   this.game.actionDown();   break;
      case 'ArrowLeft':   this.game.actionLeft();   break;
      case 'ArrowRight':  this.game.actionRight();  break;
      case 'ArrowUp':     this.game.actionRotate(); break;

      case 'Escape':
        if(!this.gameOverInfo) {
          if(this.status == 'START' ) {
            this.pauseTimer();
            this.status = 'STOP';
            this.game.actionStop();
            this.statusStyle = 'red';
          } else if (this.status == 'STOP') {
            this.restartTimer();
            this.status = 'START';
            this.game.actionStart();
            this.statusStyle = 'white';
          }
        }
        break;

      case 'Enter':
        this.boardStyle = 'default';
        this.gameOverInfo = false;
        this.statusStyle = 'white';
        if(this.status == 'READY') {
          this.startTimer();
          this.status = 'START';
          this.game.actionStart();
          this.linesCleared = 0;
        } else {
          this.resetTimer();
          this.startTimer();
          this.status = 'START';
          this.game.actionStart();
          this.game.actionReset();
          this.linesCleared = 0;
        }
        break;
    
      default:
        break;
    }(event.key);
  }
  constructor() { 
    this.currentPlayer = {'email':'', 'name':''};
  }
  ngOnInit(): void { }

}
