import { Component, OnInit } from '@angular/core';
import { MyListService } from 'src/app/services/my-list.service';
import { Filme } from 'src/app/models/filme';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.scss']
})
export class MylistComponent implements OnInit {

  constructor(private myListService : MyListService, private router: Router, private navigationService: NavigationService) { }

  ngOnInit() {

    this.myList = this.myListService.getList();

  }

  myList: Array<Filme> = [];
  mouseOver: Boolean = false;

  closeMyList(){
    this.navigationService.cameFromMyList = true;
    this.router.navigate(['discover'])
  }

  onMouseOver(){
    this.mouseOver = true;
  }

  onMouseOut(){
    this.mouseOver = false;
  }
  removeFromMyList(filme: Filme){

    this.myListService.remove(filme);
    
  }

}
