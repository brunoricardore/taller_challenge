import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, take, tap } from 'rxjs';
import { User } from '../app/models/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL = 'https://jsonplaceholder.typicode.com/users';

  private allUsersCache: User[] = [];
  private usersSubject = new BehaviorSubject<User[]>([]);
  // users$ = this.usersCacheSubject.asObservable();

  constructor(
    private http: HttpClient
  ) {
    this.loadUsers();
  }

  get users$() {
    return this.usersSubject.asObservable();
  }


  loadUsers() {
    this.http.get<User[]>(this.URL)
      .pipe(
        take(1),
      ).subscribe(data => {
        this.allUsersCache = data;
        this.usersSubject.next(data);
      })
  }

  filterUsersByName(name?: string | null) {
    if (name?.trim()) {
      console.log(name);

      const filteredUsers = this.allUsersCache.filter(user => user.name.toLowerCase().includes(name))
      this.usersSubject.next(filteredUsers);
    } else {
      this.usersSubject.next(this.allUsersCache);
    }
  }


}
