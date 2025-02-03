import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServivesService } from '../../servives.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  data: any = [];
  headerTitle: string = '';
  description: string = '';
  place: string = '';
  backgroundImage: string = '';
  currentIndex: number = 0;
  activeItemIndex: number | null = null;
  imageChanged: boolean = false;
  intervalId: any;
  slider: string = '';
  isLoading: boolean = true;


  constructor(private dataService: ServivesService) { }

  ngOnInit(): void {
    this.loadData();
    this.startAutoChange();
  }



  loadData(): void {
    this.dataService.getData().then(
      (response => response.json())
    ).then((response) => {
      this.isLoading = false;
      this.data = response;
      this.headerTitle = this.data[4].name;
      this.description = this.data[4].dic;
      this.backgroundImage = this.data[4].img;
      this.place = this.data[4].location;
    },
      (error) => {
        console.error(error);
      }
    );
  }

  startAutoChange(): void {
    this.intervalId = setInterval(() => {
      if (this.activeItemIndex === null || this.activeItemIndex === this.data.length - 1) {
        this.activeItemIndex = 0;
      } else {
        this.activeItemIndex++;
      }

      this.imageChanged = true;
      setTimeout(() => {
        this.imageChanged = false;
      }, 3000);

      this.updateActiveItem(this.activeItemIndex);
    }, 6000);
  }

  updateActiveItem(index: number): void {
    const item = this.data[index];
    this.headerTitle = item.name;
    this.description = item.dic;
    this.place = item.location;
    this.backgroundImage = item.img;
    this.activeItemIndex = index;
    this.imageChanged = true;
    this.slider = item.slider;
    setTimeout(() => {
      this.imageChanged = false;
    }, 20000);
  }

  toggleActive(index: number, item: any): void {
    this.activeItemIndex = index;
    this.updateActiveItem(index);
  }

}
