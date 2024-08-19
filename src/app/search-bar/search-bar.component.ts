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
  noMetaFiles = [];

  constructor(private formBuilder: FormBuilder, private user: UserService) {
    this.searchForm = this.formBuilder.group({
      url: ''
    })
  }

  ngOnInit(): void {
  }

  onSubmit(form) {
    this.user.getTotalTime(form.url, this.includeSubFolders).then((res) => {
      if(res === 0) {
        alert("NO FILES FOUND OR INVALID PERMISSION")
        return
      }
      this.duration = this.msToTime(res);
      this.noMetaFiles = this.user.noMetaFiles;

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

  forceLoad() {
    for (let file of this.noMetaFiles) {
      let myWin = window.open(`https://drive.google.com/file/d/${file.id}/view`)
    }
  }

}
