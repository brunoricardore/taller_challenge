import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, Observable, of, startWith, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { User } from '../../models/User.model';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from "../../components/user-card/user-card.component";
import { InputComponent } from "../../components/input/input.component";

@Component({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserCardComponent,
    InputComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();

  userService = inject(UserService);
  currentSearch = '';
  loading = false;
  formControl = new FormControl('');

  users$ = new Observable<User[]>();

  ngOnInit(): void {
    this.users$ = this.userService.users$;
    this.startLoadAndFilter();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }


  startLoadAndFilter() {

    this.formControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      ).subscribe(term => {
        console.log(term);
        this.userService.filterUsersByName(term);
      })

  }

}
