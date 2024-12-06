import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeelistComponent } from './coffeelist.component';

describe('CoffeelistComponent', () => {
  let component: CoffeelistComponent;
  let fixture: ComponentFixture<CoffeelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoffeelistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoffeelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
