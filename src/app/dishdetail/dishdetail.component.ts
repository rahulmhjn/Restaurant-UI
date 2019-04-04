import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish'
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  commentForm: FormGroup;
  comment:string;
  value:number;
  dishcopy = null;
  errMess:string;
  @ViewChild('cform') commentFormDirective;
  formErrors = {
    'author': '',
    'comment': ''
  }

  validationMessages = {
    'author': {
      'required':      'Author Name is required.',
      'minlength':     'Author Name must be at least 2 characters long.',
      'maxlength':     'Author Name cannot be more than 25 characters long.'
  },
  'comment': {
    'required': 'Comment is required.'
  }
  } ;

  constructor(private dishService: DishService, private location: Location, private route: ActivatedRoute, private fb: FormBuilder
    ,@Inject('BaseURL') private BaseURL) {
    this.createForm();
   }

  ngOnInit() {
    this.dishService.getDishIds()
      .subscribe((dishIds) => this.dishIds = dishIds);
    let id = this.route.params
      .pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
      .subscribe((dish) => {this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id);},
      errmess => this.errMess = <any>errmess)
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index -1)%this.dishIds.length]
    this.next = this.dishIds[(this.dishIds.length + index +1)%this.dishIds.length]
  }

  goBack(): void {
    this.location.back();
  }

  createForm() {
    this.commentForm = this.fb.group({
      author: ['',[Validators.required,Validators.maxLength(25),Validators.minLength(2)]],
      rating: "5",
      date: new Date(),
      comment:['',[Validators.required]]
    });
    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data))

      this.onValueChanged();
  }
  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    
    this.comment = this.commentForm.value;
        console.log(this.comment);
        this.dishcopy.comments.push(this.comment)
        this.dish = this.dishcopy;
        console.log(this.dish)
        this.commentForm.reset({
          rating:"5"
        });
        this.commentFormDirective.resetForm();
  }
}



