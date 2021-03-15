import { Component, OnInit } from '@angular/core';

const counterHtml =
`<h1>Two way counter</h1>
<p aria-live="polite">Current count: <strong>{{ currentCount }}</strong></p>
<div class="d-flex flex-wrap">
  <button class="btn btn-primary" (click)="incrementCounter()">Increment</button>
  <section class="increment">
    <span>Increment by:</span>
    <input type="text"  [(ngModel)]="increment" />
    <button class="btn btn-secondary btn-sm" (click)="changeIncrement(-1)">-</button>
    <button class="btn btn-secondary btn-sm" (click)="changeIncrement(+1)">+</button>
  </section>
</div>`;
const counterCss =
`.increment span {margin: 0 5px 0 10px; font-style: italic;}
.increment input {width: 50px; text-align: center;}
.increment button {position: relative; margin: 0 1px; width: 30px; font-weight: bold; top: -3px;}`


@Component({
  selector: 'app-counter-component',
  templateUrl: counterHtml,
  styles: [counterCss]
})
export class CounterComponent implements OnInit {
  public currentCount = 0;
  public increment = 1;

  public incrementCounter() {
    const inc = +this.increment;
    this.currentCount += isNaN(inc) ? 0 : inc;
  }

  changeIncrement(change: number) {
    this.increment += change;
  }

  ngOnInit(): void {
    console.info("counter on init");
  }
}
