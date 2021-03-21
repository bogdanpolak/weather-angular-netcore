import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

@Component({
  selector: 'app-incrementor',
  styles: [
    '.increment span {margin: 0 5px 0 10px; font-style: italic;}',
    '.increment input {width: 4em; text-align: center;}',
    '.increment button {position: relative; margin: 0 1px; width: 2em; font-weight: bold; top: -3px;}',
    '.increment button.plus-minus {width: 2.5em;}'
  ],
  template:
`<section class="increment">
  <span>Increment by:</span>
  <input type="number"  [(ngModel)]="increment" />
  <button class="btn btn-secondary btn-sm" (click)="changeIncrement(-1)">-</button>
  <button class="btn btn-secondary btn-sm" (click)="changeIncrement(+1)">+</button>
  <button class="btn btn-secondary btn-sm plus-minus" (click)="invertSign()">&#x207a;&#x2044;&#x208b;</button>
  <button class="btn btn-secondary btn-sm" (click)="genRandom()">↻</button>
</section>`
})
export class IncrementorComponent {

  private _increment = 0;
  @Input()
  set increment(value: number) {
    this._increment = value;
    this.change.emit(this._increment);
  }
  get increment(): number {
    return this._increment;
  }

  @Output()
  public change = new EventEmitter<number>();

  public changeIncrement(change: number) {
    this.increment += change;
  }

  public invertSign() {
    this.increment = -this.increment;
  }

  public genRandom() {
    this.increment = this.randomInteger(-10, 10);
  }

  private randomInteger(minVal: number, maxVal: number): number {
    const numbers = Math.floor(maxVal) - Math.floor(minVal);
    return Math.floor(Math.random() * (numbers + 1)) + Math.floor(minVal);
  }
}
