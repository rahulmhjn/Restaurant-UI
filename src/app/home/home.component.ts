import { Component, OnInit, Inject } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  errDishMess: string;
  errPromotionMess:string;
  errLeaderMess: string;

  constructor(private dishService: DishService,private promotionService: PromotionService, private leaderService: LeaderService
    ,@Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishService.getFeaturedDish()
      .subscribe((dish) => this.dish = dish,
        errmess => this.errDishMess = <any>errmess);
    this.promotionService.getFeaturedPromotion()
      .subscribe((promotion) => this.promotion = promotion,
        errmess1 => this.errPromotionMess = <any>errmess1);
    this.leaderService.getFeaturedLeader()
      .subscribe((leader) => this.leader = leader,
        errmess2 => this.errLeaderMess = <any>errmess2);
  }

}
