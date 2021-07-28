import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  metaData = {
    name: 'Angular Universal',
    description: 'Angualr Universal Testing',
    image: 'avatar.png',
    author: 'dev.awesome.th@gmail.com',
  };

  env: any = environment;

  get environment(): any {
    return this.env;
  }
  constructor(private title: Title, private meta: Meta) {}

  ngOnInit() {
    this.title.setTitle(this.metaData.name);
    this.meta.addTags([
      { name: 'og:type', content: 'article' },
      { name: 'og:url', content: '/about' },
      { name: 'og:title', content: this.metaData.name },
      { name: 'og:description', content: this.metaData.description },
      { name: 'og:image', content: this.metaData.image },
      { name: 'author', content: this.metaData.author },
    ]);
  }
}
