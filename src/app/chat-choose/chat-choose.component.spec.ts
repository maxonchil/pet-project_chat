import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatChooseComponent } from './chat-choose.component';

describe('ChatChooseComponent', () => {
  let component: ChatChooseComponent;
  let fixture: ComponentFixture<ChatChooseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatChooseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
