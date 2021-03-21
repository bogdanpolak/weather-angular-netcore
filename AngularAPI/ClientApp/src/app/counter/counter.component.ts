import { Component } from '@angular/core';

@Component({
  selector: 'app-counter-component',
  template:
`<h1>Two way counter</h1>
<p aria-live="polite">Current count: <strong>{{ currentCount }}</strong></p>
<div class="d-flex flex-wrap">
  <button class="btn btn-primary" (click)="incrementCounter()">Increment</button>
  <app-incrementor [increment]="currentIncrement" (change)="onIncrementChanged($event)"></app-incrementor>
</div>`
})
export class CounterComponent {
  public currentCount = 0;
  public currentIncrement = 1;

  public incrementCounter() {
    this.currentCount += +this.currentIncrement;
  }

  onIncrementChanged(value: number) {
    this.currentIncrement = value;
  }
}
