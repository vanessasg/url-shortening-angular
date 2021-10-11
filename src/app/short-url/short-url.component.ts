import { Component, OnInit } from '@angular/core';
import { ShortUrlService } from '../short-url.service';

@Component({
  selector: 'app-short-url',
  templateUrl: './short-url.component.html',
  styleUrls: ['./short-url.component.scss'],
})
export class ShortUrlComponent implements OnInit {
  inputValue: any;
  originalLink: string = '';
  inputPlaceholder: string = 'Shorten a link here...';

  err = false;
  errMess = '';

  shortUrlsArr: any[] = [];
  border = '';
  outline = '';
  color = '';

  constructor(private shortUrl: ShortUrlService) {}

  ngOnInit(): void {
    this.shortUrlsArr = JSON.parse(
      localStorage.getItem('storedData') as string
    );
  }

  showShortUrl() {
    if (this.inputValue === '') {
      this.err = true;
      this.errMess = 'Please enter a valid link';
      this.border = '2px solid var(--red)';
      this.outline = 'var(--red)';
    } else {
      this.err = false;
      this.errMess = '';
      this.border = '';
      this.outline = '';
      this.originalLink = this.inputValue;

      this.shortUrl.getShortUrl(this.originalLink).subscribe(
        (data) => {
          //console.log(data);
          // se non c'è setItem ne imposto uno vuoto
          if (localStorage.getItem('storedData') == null) {
            localStorage.setItem('storedData', '[]');
          }
          //ottengo i vecchi dati
          this.shortUrlsArr = JSON.parse(
            localStorage.getItem('storedData') as string
          );

          if (this.shortUrlsArr.length >= 3) {
            this.shortUrlsArr.shift();
            this.shortUrlsArr.push(data.result);
          } else {
            this.shortUrlsArr.push(data.result);
          }

          localStorage.setItem('storedData', JSON.stringify(this.shortUrlsArr));
        },
        (err) => console.log(err)
      );
      this.inputValue = '';
    }
  }

  copied = '';
  copyChange(i: number) {
    this.copied = this.shortUrlsArr[i].full_short_link;
  }
}
