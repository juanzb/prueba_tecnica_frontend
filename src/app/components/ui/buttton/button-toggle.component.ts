import { Component, model } from '@angular/core';

@Component({
  selector: 'app-button-toggle',
  templateUrl: './button-toggle.component.html',
  imports: [],
})
export class ButtonToggelComponent {
  isActive = model<boolean>(false);
  textActive = model<string>('Select');
  textInactive = model<string>('Deselect');

  toggle() {
    this.isActive.update((value) => !value);
  }
}
