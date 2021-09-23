import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  search: FormControl = new FormControl();

  constructor(
    private authService: AuthService,
    private searchService: SearchService
    ) { }

  ngOnInit(): void {
    this.onSearch()
  }

  logout(): void {
    this.authService.logout();
  }

  onSearch(): void {
    this.search.valueChanges.subscribe( (val) => this.searchService.searchTerm(val) )
  }

}
