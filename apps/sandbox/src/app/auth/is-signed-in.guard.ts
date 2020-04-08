import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { first, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsSignedInGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate() {
    return this.auth.isSignedIn$.pipe(
      first(),
      map(isSignedIn => {
        return isSignedIn ? true : this.router.createUrlTree(['/signin']);
      })
    );
  }
}