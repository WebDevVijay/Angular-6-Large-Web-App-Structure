import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  //moduleId: module.id,
  selector: 'header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private router: Router) {
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['home/welcome']);
  }
}
