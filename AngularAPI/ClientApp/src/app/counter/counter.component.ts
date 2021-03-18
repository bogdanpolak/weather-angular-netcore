import { Component } from '@angular/core';

@Component({
  selector: 'app-counter-component',
  template: `<h1>Two way counter</h1>
<p aria-live="polite">Current count: <strong>{{ currentCount }}</strong></p>
<div class="d-flex flex-wrap">
  <button class="btn btn-primary" (click)="incrementCounter()">Increment</button>
  <incrementor [increment]="increment" (onChange)="onIncChaged($event)"></incrementor>
</div>`
})
export class CounterComponent {
  public currentCount = 0;
  increment = 1;

  public incrementCounter() {
    const inc = +this.increment;
    this.currentCount += isNaN(inc) ? 0 : inc;
  }

  onIncChaged(value: number) {
    this.increment = value;
  }
}
