import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageBoxResponseComponent } from './message-box-response.component';

describe('MessageBoxResponseComponent', () => {
  let component: MessageBoxResponseComponent;
  let fixture: ComponentFixture<MessageBoxResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageBoxResponseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageBoxResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
