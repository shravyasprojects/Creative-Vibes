import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeasGeneratorComponent } from './ideas-generator.component';

describe('IdeasGeneratorComponent', () => {
  let component: IdeasGeneratorComponent;
  let fixture: ComponentFixture<IdeasGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IdeasGeneratorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IdeasGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
