import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {TetrisCoreModule} from 'ngx-tetris';
import { IntroComponent } from './intro/intro.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { GameComponent } from './game/game.component';
import { HistoryComponent } from './history/history.component';
import {FilterPipe, SortByPipe} from './pipes'

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    GameComponent,
    HistoryComponent, 
    FilterPipe, 
    SortByPipe
  ],
  imports: [
    BrowserModule,
    TetrisCoreModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }