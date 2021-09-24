import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces';
import { SearchService } from 'src/app/services/search/search.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  users: User[] = [];
  listSubscriptions: Subscription[] = [];
  search: string = "";

  constructor(
    private userService: UsersService,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.getAll();
    this.searchTerm();
  }

  ngOnDestroy(): void {
    this.listSubscriptions.forEach( s => s.unsubscribe )
  }

  searchTerm(): void {
    const sub$ = this.searchService.search.subscribe((val) => this.search = val)
    this.listSubscriptions.push(sub$)
  }

  getAll(): void{
    const sub$ = this.userService.getAll().subscribe( val => this.users = val)
      this.listSubscriptions.push( sub$ )
  }

}
