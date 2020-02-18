import { Injectable } from '@angular/core';
import { Filme } from '../models/filme';

@Injectable({
  providedIn: 'root'
})
export class MyListService {
  constructor() { }

  myList: Array<Filme> = []

  add(filme : Filme){

    if(this.myList.includes(filme)){
    }

    else this.myList.push(filme);   
  }

  remove(filme: Filme){
    const index = this.myList.indexOf(filme);
    if(index > -1){
      this.myList.splice(index, 1);
    }
  }

  getList(){
    return this.myList;
  }

}
