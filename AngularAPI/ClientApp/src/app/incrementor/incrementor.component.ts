import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "incrementor",
  styles: [
    ".increment span {margin: 0 5px 0 10px; font-style: italic;}",
    ".increment input {width: 4em; text-align: center;}",
    ".increment button {position: relative; margin: 0 1px; width: 2em; font-weight: bold; top: -3px;}"
  ],
  template:
`<section class="increment">
  <span>Increment by:</span>
  <input type="number"  [(ngModel)]="increment" />
  <button class="btn btn-secondary btn-sm" (click)="changeIncrement(-1)">-</button>
  <button class="btn btn-secondary btn-sm" (click)="changeIncrement(+1)">+</button>
</section>`
})
export class IncrementorComponent {

  private _increment = 0;
  @Input() set increment(value: number) {
    this._increment = value;
    this.onChange.emit(this._increment);
  };
  get increment(): number {
    return this._increment;
  }

  @Output() public onChange = new EventEmitter<number>();

  changeIncrement(change: number) {
    this.increment += change;
  }
}
