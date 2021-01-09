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

  constructor(private formBuilder: FormBuilder, private user: UserService) {
    this.searchForm = this.formBuilder.group({
      url: ''
    })
  }

  ngOnInit(): void {
  }

  onSubmit(form) {
    this.user.getTotalTime(form.url).then((res) => {
      this.duration = res;
    })
  }

}
