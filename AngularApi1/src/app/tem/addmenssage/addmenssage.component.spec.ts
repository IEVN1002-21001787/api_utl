import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmenssageComponent } from './addmenssage.component';

describe('AddmenssageComponent', () => {
  let component: AddmenssageComponent;
  let fixture: ComponentFixture<AddmenssageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddmenssageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddmenssageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
