import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css'],
  providers: [CategoryService]
})
export class CategoryCreateComponent implements OnInit {

  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories=data;
    })
  }

  categories: Category[];

  displayAll = true;

  selectedCategory: Category = null;

  selectCategory(item?: Category) {
    if (item) {
      this.selectedCategory = item;
      this.displayAll = false;
    } else {
      this.selectedCategory = null;
      this.displayAll = true;
    }
  }

  createCategory(categoryName: string) {
    const category: Category = {
      name: categoryName
    }

    this.categoryService.createCategory(category).subscribe(data => {
      console.log(data);
      this.router.navigate(['/'])
    })


  }

}
