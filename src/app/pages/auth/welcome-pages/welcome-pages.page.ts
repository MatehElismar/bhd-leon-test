import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-welcome-pages',
  templateUrl: './welcome-pages.page.html',
  styleUrls: ['./welcome-pages.page.scss'],
})
export class WelcomePagesPage implements OnInit {
  @ViewChild('mySlider', { static: true }) slides: IonSlides;
  
  constructor() { }

  ngOnInit() {
  }

  slideNext (){

  }

}
