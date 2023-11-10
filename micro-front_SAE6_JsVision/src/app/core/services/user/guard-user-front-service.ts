import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "./authentication.service";


@Injectable()
export class GuardUserFrontService implements CanActivate,CanActivateChild  {
    constructor( private authenticationService : AuthenticationService) { }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (this.authenticationService.isAuthenticated(route,state)) {
         return true;
        } else {
         this.authenticationService.goToComponent("sign-in");
         return false;
        }

    }
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.canActivate ( childRoute , state );
    }
}