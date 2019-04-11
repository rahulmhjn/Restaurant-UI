import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
// import { DISHES } from '../shared/dishes'
import {DishService } from '../services/dish.service';
import { flyInOut, expand } from '../animations/app-animations'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host : {
    '[@flyInOut]':'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class MenuComponent implements OnInit {

  // dishes: Dish[] = DISHES;
  dishes: Dish[]
  errMess:string;

  selectedDish: Dish;

  constructor(private dishService: DishService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishService.getDishes()
    .subscribe((dishes) => this.dishes = dishes,
    errmess => this.errMess = <any>errmess);
    console.log(this.dishes)
  }

  onSelect(dish: Dish){
    this.selectedDish = dish;
  }

}
