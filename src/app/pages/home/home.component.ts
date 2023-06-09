import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  carousel_index: string = 'F';
  interval_about: any;

  constructor(private router: Router) {}

  isLoading: boolean = true;

  loaded = 0;

  loadImages() {
    for (let i = 1; i <= 15; i++) {
      let img = new Image();
      img.onload = () => {
        this.load();
      };
      img.src = 'assets/img/gallery/img-'.concat(i.toString()).concat('.jpg');
    }
  }

  load() {
    this.loaded++;
    if (15 == this.loaded) {
      this.isLoading = false;
    }
  }

  ngOnInit(): void {
    this.loadImages();

    this.interval_about = setInterval(() => {
      this.carouselNext();
    }, 5000);
  }

  carouselNext() {
    const button = document.getElementById(this.carousel_index);
    button?.click();
    if (this.carousel_index === 'F') {
      this.carousel_index = 'G';
    } else if (this.carousel_index === 'G') {
      this.carousel_index = 'H';
    } else if (this.carousel_index === 'H') {
      this.carousel_index = 'I';
    } else if (this.carousel_index === 'I') {
      this.carousel_index = 'F';
    }
  }

  onImageClicked(index: number) {
    const url: string = 'assets/img/gallery/img-'
      .concat(index.toString())
      .concat('.jpg');
    window.open(url, '_blank');
  }
  ngOnDestroy(): void {
    clearInterval(this.interval_about);
  }

  onGalleryButtonClicked(): void {
    this.router.navigate(['/gallery']);
  }
}
