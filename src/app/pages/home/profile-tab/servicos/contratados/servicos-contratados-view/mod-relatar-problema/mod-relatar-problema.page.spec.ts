import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModRelatarProblemaPage } from './mod-relatar-problema.page';

describe('ModRelatarProblemaPage', () => {
  let component: ModRelatarProblemaPage;
  let fixture: ComponentFixture<ModRelatarProblemaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModRelatarProblemaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModRelatarProblemaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
