import {Directive, effect, inject, input, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from "./auth.service";

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {
  userType = input.required({ alias:'appAuth' });
  private authServ = inject(AuthService);
  private hostElementRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);

  constructor() {
    effect(() => {
      if (this.authServ.activePermission() === this.userType()) {
        this.viewContainerRef.createEmbeddedView(this.hostElementRef);
      } else {
        this.viewContainerRef.clear();
      }
    });
  }

}
