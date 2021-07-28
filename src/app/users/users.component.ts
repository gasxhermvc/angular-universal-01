import { Component, Injector, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UmService } from 'src/services/um.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  dataSource: any;
  posts: any;
  fetching: boolean = false;
  constructor(
    private router: Router,
    private ngZone: NgZone,
    private user: UmService
  ) {
    console.log('constructor');
    this.ngZone.run(async () => {
      if (!this.dataSource)
        this.dataSource = await this.user.getUsers().toPromise();
      if (!this.posts) this.posts = await this.user.getPosts().toPromise();
    });
  }

  get window() {
    return window as any;
  }

  async ngOnInit() {
    console.log('ngOnInit');
    // this.ngZone.run(async () => {
    //   this.user.getUsers().subscribe((data) => (this.dataSource = data));
    //   this.user.getPosts().subscribe((data) => (this.posts = data));
    //   const data = await this.user.getPosts().toPromise();
    //   console.log('1', data[0]);
    //   console.log('111');
    //   const post = await this.user.getPosts().toPromise();
    //   console.log('1111', post[0]);
    // });
    // console.log('2');
    // this.dataSource = await this.user.getUsers().toPromise();
    // this.posts = await this.user.getPosts().toPromise();
    console.log('ViewInit', this.dataSource);
  }

  ngAfterViewInit(): void {
    console.log('ViewInit', this.dataSource);
  }

  async fetchData() {
    this.fetching = true;
    this.posts = await this.user
      .getTopPosts(Math.floor(Math.random() * 100))
      .toPromise();
    this.fetching = false;
  }

  userById(index: number, post: any) {
    return post.title;
  }
  navigate(post: any) {
    this.router.navigate(['/users/' + post.id]);
  }
}
