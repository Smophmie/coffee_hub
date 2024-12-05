import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateshopformComponent } from './updateshopform.component';

describe('UpdateshopformComponent', () => {
  let component: UpdateshopformComponent;
  let fixture: ComponentFixture<UpdateshopformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateshopformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateshopformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
