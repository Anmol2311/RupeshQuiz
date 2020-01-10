import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageQueAnsComponent } from './manage-que-ans.component';

describe('ManageQueAnsComponent', () => {
  let component: ManageQueAnsComponent;
  let fixture: ComponentFixture<ManageQueAnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageQueAnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageQueAnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
