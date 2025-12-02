import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailConfigStore } from '../../services/email-config.store';

@Component({
  selector: 'app-detail-config',
  standalone: true,
  templateUrl: './detail-config.html',
})
export class DetailConfig {
  config = () => this.store.selectedConfig();

  constructor(private store: EmailConfigStore, private route: ActivatedRoute) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.store.loadConfigById(id); 
  }
}
