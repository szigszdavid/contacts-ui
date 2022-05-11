import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetContactByIdComponent } from './get-contact-by-id.component';

describe('GetContactByIdComponent', () => {
  let component: GetContactByIdComponent;
  let fixture: ComponentFixture<GetContactByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetContactByIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetContactByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
