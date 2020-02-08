import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }
  optionSelected: boolean = false;

  public get getOptionSelected() : boolean {
    return this.optionSelected
  }
  
}
