import { Component, OnInit } from '@angular/core';
import { UserService } from './service/user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'mark-drive-site';

  constructor(private user: UserService) {

  }
  
  ngOnInit(): void {
  }
}
