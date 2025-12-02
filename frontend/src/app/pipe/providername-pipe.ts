import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'providerName',
  standalone: true
})
export class ProviderNamePipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 0: return 'Exchange';
      case 1: return 'IMAP';
      default: return 'Unknown';
    }
  }
}
