import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WelcomePagesPage } from './welcome-pages.page';

describe('WelcomePagesPage', () => {
  let component: WelcomePagesPage;
  let fixture: ComponentFixture<WelcomePagesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomePagesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomePagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
