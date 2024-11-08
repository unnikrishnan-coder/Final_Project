import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderCardComponent } from './provider-card.component';

describe('ProviderCardComponent', () => {
  let component: ProviderCardComponent;
  let fixture: ComponentFixture<ProviderCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
