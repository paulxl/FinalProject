import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelerListComponent } from './traveler-list.component';

describe('TravelerListComponent', () => {
  let component: TravelerListComponent;
  let fixture: ComponentFixture<TravelerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
