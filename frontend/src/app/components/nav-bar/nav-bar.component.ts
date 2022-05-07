import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  login:boolean=false;
  constructor( private router:Router) { }

  ngOnInit(): void {
  }


  logOut(){
    
    this.login=false;
    
    this.router.navigate(['/login']);
  }
}
