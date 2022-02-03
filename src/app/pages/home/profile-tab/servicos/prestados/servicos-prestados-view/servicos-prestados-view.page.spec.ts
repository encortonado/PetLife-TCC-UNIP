import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServicosPrestadosViewPage } from './servicos-prestados-view.page';

describe('ServicosPrestadosViewPage', () => {
  let component: ServicosPrestadosViewPage;
  let fixture: ComponentFixture<ServicosPrestadosViewPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicosPrestadosViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServicosPrestadosViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
