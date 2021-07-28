import { Component, NgZone, OnInit } from '@angular/core';
import { HomeService } from 'src/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  role: any;

  constructor(private ngZone: NgZone, private home: HomeService) {
    this.ngZone.run(() => (this.role = this.home.getRole()));
  }

  ngOnInit(): void {}
}
