import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageBoxConfirmationStandartComponent } from './message-box-confirmation-standart.component';

describe('MessageBoxConfirmationStandartComponent', () => {
  let component: MessageBoxConfirmationStandartComponent;
  let fixture: ComponentFixture<MessageBoxConfirmationStandartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageBoxConfirmationStandartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageBoxConfirmationStandartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
