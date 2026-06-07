import { Component, input, output } from '@angular/core';

enum E_ICONS {
  add = 'add',
  delete = 'delete',
  edit = 'edit',
  download = 'download',
  upload = 'upload',
}

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  imports: [],
})
export class ButtonComponent {
  name = input<string>();
  click = output<boolean>();

  clickButton() {
    this.click.emit(true);
  }
}
