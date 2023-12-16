import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.less']
})
export class CreateFormComponent implements OnInit {

  form!: FormGroup;
    id?: string;
    title!: string;
    loading = false;
    submitting = false;
    submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      // password only required in add mode
      password: ['', [Validators.minLength(6), ...(!this.id ? [Validators.required] : [])]],
      textFields: this.formBuilder.array([]) ,
  });
  }

  textFields() : FormArray {
    return this.form.get("textFields") as FormArray
  }

  newTextBoxField(): FormGroup {
    return this.formBuilder.group({
      testToAdd: '',
      
    })
  }

  addTextBoxFields() {
    this.textFields().push(this.newTextBoxField());
  }
   
  removeTextBoxFields(i:number) {
    this.textFields().removeAt(i);
  }

  onSubmit() {
    console.log(this.form.value);
  }

}
