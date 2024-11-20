import {Directive, ElementRef, inject, input} from "@angular/core";

@Directive({
  standalone: true,
  selector: 'a[appSafeLink]',
  host: {
    '(click)' : 'onClickEvent($event)'
  }
})
export class SafeLinkDirective {
  constructor(){
    console.log('SafeLinkDirective is active!')
  }

  queryParam = input('myapp', {alias: 'appSafeLink'});
  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  onClickEvent(event: MouseEvent) {
    const wantsToLeave = window.confirm('Do you wanna leave nigga?');

    if (wantsToLeave) {
      let hostElement = this.hostElementRef.nativeElement;
      const address = hostElement.href;
      hostElement.href = address + '?from=' + this.queryParam();
      return;
    }

    event?.preventDefault();

  }
}
