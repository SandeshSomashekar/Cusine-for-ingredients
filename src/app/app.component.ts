import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import data from './data.json';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { environment } from '../env';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'cusine';
  ingredientList!: any;
  chosenIngr: Array<string> = new Array<string>();
  results!: Array<any>;

  constructor(private http: HttpClient){
    this.ingredientList = data;
  }

  ngOnInit(): void {
  }

  pickIngr(val: any) {
    if(val.target.checked) {
      this.chosenIngr.push(val.target.value);
    } else {
      this.chosenIngr.splice(this.chosenIngr.indexOf(val.target.value), 1);
    }
  }
  filterme(e: any) {
    if(e.target.value.trim()){
      this.ingredientList = data.filter((i)=>(i.indexOf(e.target.value.trim())>-1));
    } else {
      this.ingredientList = data;
    }
  }

  search() {
    const ing = this.chosenIngr.reduce((a,c)=>{
      if(a) {
        return a + ',+' + c;
      }
      return c;
    });
    const url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${environment.apiKey}&ingredients=${ing}&number=10`

    this.http.get(url).subscribe({next: (res: any)=>{
      this.results = res;
      console.log(res)
    }})
  }
}
