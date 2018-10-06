import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-home',
  templateUrl: './landing.component.html'
})
export class LandingPageComponent   {
  title = 'Angular 6 - Welcome';
  msg ='Welcome to Angular 6 Large APP Demo.'
  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title);
  }
}
