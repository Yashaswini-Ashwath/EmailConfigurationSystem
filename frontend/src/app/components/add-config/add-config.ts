import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailConfigStore } from '../../services/email-config.store';
import { ProviderNamePipe } from '../../pipe/providername-pipe';

@Component({
  selector: 'app-add-config',
  standalone: true,
  imports: [FormsModule, ProviderNamePipe],
  templateUrl: './add-config.html',
})
export class AddConfig {
  config: any = { provider: 0, storeAttachments: false };
  constructor(public store: EmailConfigStore) {}

  save() {
    this.store.addConfig(this.config);
    this.config = { provider: 0, storeAttachments: false }; // reset form
  }
}

