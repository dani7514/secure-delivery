import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FoodService } from '../services/food.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-food',
  templateUrl: './create-food.component.html',
  styleUrls: ['./create-food.component.css']
})
export class CreateFoodComponent {

  itemForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private foodService: FoodService, private toaster: ToastrService) {
    this.itemForm = this.formBuilder.group({
      id: [1],
      price: [150, Validators.required],
      name: ['', Validators.required],
      favorite: [false],
      star: [4.5],
      tags: [['Pizza', 'Lunch']],
      imageUrl: ['/assets/food-1.jpg'],
      cookTime: ['10-20'],
      origins: [['Italy']]
    });
  }

  onSubmit() {
    if (this.itemForm.valid) {
        this.foodService.createFood(this.itemForm.value).subscribe((result) => {
          this.toaster.success('Food item created successfully');
        }, (err) => {
          this.toaster.error('Error in creating food item');
        })
    }
  }

}
