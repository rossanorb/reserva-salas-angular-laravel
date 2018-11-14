import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsNewComponent } from './rooms-new.component';

describe('RoomsNewComponent', () => {
  let component: RoomsNewComponent;
  let fixture: ComponentFixture<RoomsNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomsNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
