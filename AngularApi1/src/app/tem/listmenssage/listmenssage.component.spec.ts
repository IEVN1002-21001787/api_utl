import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListmenssageComponent } from './listmenssage.component';

describe('ListmenssageComponent', () => {
  let component: ListmenssageComponent;
  let fixture: ComponentFixture<ListmenssageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListmenssageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListmenssageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
