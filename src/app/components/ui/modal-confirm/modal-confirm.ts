import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.html',
  standalone: true,
  imports: [CommonModule],
})
export class ModalConfirmComponent {
  message = input<string>('¿Estas seguro de que deseas continuar con esta accion?');
  title = input<string>('Confirmación Requerida');
  confirmButtonText = input<string>('Aceptar');
  cancelButtonText = input<string>('Cancelar');
  confirmedButton = output<boolean>();
  cancelButton = output<boolean>();

  onConfirm(): void {
    this.confirmedButton.emit(true);
  }

  onCancel(): void {
    this.cancelButton.emit(false);
  }
}
