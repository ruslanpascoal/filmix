import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private isMobileResolution: boolean;


  constructor() {

    if (window.innerWidth < 768) {
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }

  }

  public getIsMobileResolution(): boolean {
    return this.isMobileResolution;
  }
}
