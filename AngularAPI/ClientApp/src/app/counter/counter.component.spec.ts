import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { IncrementorComponent } from '../incrementor/incrementor.component';
import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterComponent, IncrementorComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterComponent);
    fixture.detectChanges();
  });

  it('should display a title', async(() => {
    const titleText = fixture.nativeElement.querySelector('h1').textContent;
    expect(titleText).toEqual('Two way counter');
  }));

  it('should start with count 0, then increments by 1 when clicked', async(() => {
    const countElement = fixture.nativeElement.querySelector('strong');
    expect(countElement.textContent).toEqual('0');

    const incrementButton = fixture.nativeElement.querySelector('button');
    incrementButton.click();
    fixture.detectChanges();
    expect(countElement.textContent).toEqual('1');
  }));

  it('should increments by 2 when increment click plus', async(() => {
    const incrementComponent = fixture.nativeElement.getElementsByClassName('increment')[0];
    const plusButton = incrementComponent.getElementsByTagName('button')[1];
    plusButton.click();

    const countElement = fixture.nativeElement.querySelector('strong');
    const incrementButton = fixture.nativeElement.querySelector('button');
    incrementButton.click();
    fixture.detectChanges();
    expect(countElement.textContent).toEqual('2');
  }));

  it('should decrements by 3 when increment click 3 times minus', async(() => {
    const incrementComponent = fixture.nativeElement.getElementsByClassName('increment')[0];
    const minusButton = incrementComponent.getElementsByTagName('button')[0];
    minusButton.click();
    minusButton.click();
    minusButton.click();

    const countElement = fixture.nativeElement.querySelector('strong');
    const incrementButton = fixture.nativeElement.querySelector('button');
    incrementButton.click();
    fixture.detectChanges();
    expect(countElement.textContent).toEqual('-2');
  }));
});
