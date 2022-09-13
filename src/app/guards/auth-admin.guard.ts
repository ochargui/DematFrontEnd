import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {

  role:string;
  constructor(private authService:AuthService,private router:Router){ }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): | Observable<boolean | UrlTree>| Promise<boolean | UrlTree>| boolean| UrlTree{
     return this.authService.currentUser$.pipe(map(
      (auth)=>{
        
        if(auth && auth.role==="Super-utilisateur")   {
          return true}
        this.router.navigateByUrl("/SinIn")
        return false;
      }
    ));
  }
  
}
