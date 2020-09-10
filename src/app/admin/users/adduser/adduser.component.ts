import { HttpClientService } from './../../../service/http-client.service';
import { User } from './../../../model/User';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css'],
})
export class AdduserComponent implements OnInit {
  @Input()
  user: User;

  @Output()
  userAddedEvent=new EventEmitter();

  newUser:User;
  constructor(private HttpClientService:HttpClientService,private router:Router) {}

  ngOnInit() {
    this.newUser=this.user;
  }

  addUser(){
    this.HttpClientService.addUser(this.newUser).subscribe((user)=>{
      this.userAddedEvent.emit(null);
      this.router.navigate(['admin','users']);});
  }
}
