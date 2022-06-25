import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PieChartComponent } from './pie-chart/pie-chart.component';

import { StoreModule } from '@ngrx/store';

import { postsReducer } from './state/todo.reducers';
import { PostsEffects } from './state/todo.effects';
import { EffectsModule } from '@ngrx/effects';
import { CreateTaskComponent } from './create-task/create-task.component';
import { TaskListsComponent } from './task-lists/task-lists.component';

@NgModule({
  declarations: [
    AppComponent,
    PieChartComponent,
    CreateTaskComponent,
    TaskListsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,

    StoreModule.forRoot({'tasks': postsReducer}),
    EffectsModule.forRoot([PostsEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
