import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Player } from '../player';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})

export class IntroComponent implements OnInit {

  //zmienna na dane gracza
  player: Player = {
    email: '',
    name: ''
  };
  
  // informacja o stronie i graczu jest transmitowana do komponentu glownego AppComponent
  @Output() pageUpdate = new EventEmitter<string>();
  @Output() playerUpdate = new EventEmitter<Player>();
 
  //po zatwierdzeniu formularza logowania wysylamy dane strony i gracza
  start() { 
    this.playerUpdate.emit(this.player);
    this.pageUpdate.emit('game'); 
  }

  constructor() { }
  ngOnInit() { }
}