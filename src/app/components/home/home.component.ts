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
  alldata: any = [];
  read = 'تابع القراءة '
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
      this.alldata = response;
      this.headerTitle = this.alldata[4].name;
      this.description = this.alldata[4].dic;
      this.backgroundImage = this.alldata[4].img;
      this.place = this.alldata[4].location;
    },
      (error) => {
        console.error(error);
      }
    );
  }

  startAutoChange(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(() => {
      if (this.activeItemIndex === null || this.activeItemIndex === this.alldata.length - 1) {
        this.activeItemIndex = 0;
      } else {
        this.activeItemIndex++;
      }
      this.imageLoaded();

      this.updateActiveItem(this.activeItemIndex);
    }, 6000);
  }


  updateActiveItem(index: number): void {
    setTimeout(() => {
      const item = this.alldata[index];
      this.headerTitle = item.name;
      this.description = item.dic;
      this.place = item.location;
      this.backgroundImage = item.img;
      this.activeItemIndex = index;
      this.slider = item.slider;

      this.startAutoChange();

    }, 1000);

  }

  imageLoaded() {
    this.imageChanged = true;
    setTimeout(() => {
      this.imageChanged = false;

    }, 4000);

    // this.startAutoChange();
  }

  toggleActive(index: number, item: any): void {
    this.activeItemIndex = index;
    this.updateActiveItem(index);
    this.startAutoChange();
    this.imageChanged = true;

    setTimeout(() => {
      this.imageChanged = false;
    }, 2000);
  }

}
