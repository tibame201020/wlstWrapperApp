import { Component, OnInit } from '@angular/core';
import { alink, Bar } from '../constant/alink';
import { HEADER } from '../constant/header';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  headers: alink[] = HEADER.alink;

  constructor() {}

  ngOnInit(): void {}

  isActive(link: string) {
    let path = window.location.pathname;

    if (path.includes(link)) {
      return 'active';
    }
    return '';
  }
}
