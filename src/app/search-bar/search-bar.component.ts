import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  searchForm: FormGroup;
  duration = "";
  includeSubFolders = true;

  constructor(private formBuilder: FormBuilder, private user: UserService) {
    this.searchForm = this.formBuilder.group({
      url: ''
    })
  }

  ngOnInit(): void {
  }

  onSubmit(form) {
    this.user.getTotalTime(form.url, this.includeSubFolders).then((res) => {
      this.duration = this.msToTime(res);
    })
  }

  msToTime(duration: any) {
    let seconds: any = Math.floor((duration / 1000) % 60);
    let minutes: any = Math.floor((duration / (1000 * 60)) % 60);
    let hours: any = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  }

}
