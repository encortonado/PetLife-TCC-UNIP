import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, filter, tap } from 'rxjs/operators';

@Component({
  template: ''
})

export abstract class RouterPagePage implements OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject();

  constructor(router: Router, route: ActivatedRoute) {
    router.events.pipe(
      takeUntil(this.ngUnsubscribe),
      filter(event => event instanceof NavigationEnd),
      filter(_ => this.isComponentActive(
        router.routerState.snapshot.root.pathFromRoot,
        route.snapshot.component
      ))
    ).subscribe(_ => this.onEnter());
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private isComponentActive(path: ActivatedRouteSnapshot[], component: any): boolean {
    let isActive = false;
    path.forEach((ss: ActivatedRouteSnapshot) => {
      if (ss.component === component) {
        isActive = true;
      } else {
        isActive = this.isComponentActive(ss.children, component);
      }
    });
    return isActive;
  }

  abstract onEnter(): void;


}
