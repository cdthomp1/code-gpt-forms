// ORIGINAL PROMPT FOR THIS FILE:

// Create for me an angular app that takes in a json file as configuration to create a contact form. Here is the json file:
// {
//     "form-name": "Simple Contact Form",
//     "form-fields": [{
//         "field-name": "First Name",
//         "field-type": "text"
//     },
//     {
//         "field-name": "Last Name",
//         "field-type": "text"
//     },{
//         "field-name": "Email",
//         "field-type": "email"
//     },
//     {
//         "field-name": "Phone Number",
//         "field-type": "tel"
//     },
//     {
//         "field-name": "Comments",
//         "field-type": "textarea"
//     }]
// }
// Use the array of form fields to create the different form elements. Display the input of the form on the right of the form. The form should be a reactive form.



import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FormConfig, MyObject } from "../models/config.model"

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  // @ts-ignore
  public contactForm: FormGroup;
  config: FormConfig = {} as FormConfig;


  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  // ngOnInit(): void {
  //   this.http.get<FormConfig>('./assets/contact-form-config.json').subscribe(data => {
  //     this.config = data;
  //     this.createForm();
  //   });
  // }

  ngOnInit() {
    this.config = {
      "form-name": "Simple Contact Form",
      "form-fields": [{
        "field-name": "First Name",
        "field-type": "text"
      },
      {
        "field-name": "Last Name",
        "field-type": "text"
      }, {
        "field-name": "Email",
        "field-type": "email"
      },
      {
        "field-name": "Phone Number",
        "field-type": "tel"
      },
      {
        "field-name": "Comments",
        "field-type": "textarea"
      }]
    };
    this.createForm()
  }

  createForm() {
    const formGroup: MyObject = {};;
    for (let field of this.config['form-fields']) {
      formGroup[field['field-name']] = new FormControl('');
    }
    return new FormGroup(formGroup);
  }

  onSubmit() {

  }

}
