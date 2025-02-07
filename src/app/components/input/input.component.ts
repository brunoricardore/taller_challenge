import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {

  @Input() label: string = '';
  @Input() type: string = 'text';

  formControlInput = new FormControl();

  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: any): void {
    this.formControlInput.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.formControlInput.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }


}
