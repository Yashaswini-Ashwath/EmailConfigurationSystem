import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment.development';
export interface EmailConfiguration {
  id: number;
  name: string;
  watchedFolder: string;
  provider: number; // 0 = Exchange, 1 = IMAP
  storeAttachments: boolean;
}

@Injectable({ providedIn: 'root' })
export class EmailConfigStore {
    private baseUrl = environment.apiUrl;
  private configsUrl = `${this.baseUrl}/emailconfigs`;

  // Signals for reactive state
  configs = signal<EmailConfiguration[]>([]);
  selectedConfig = signal<EmailConfiguration | null>(null);
   successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);
  constructor(private http: HttpClient) {}

  // Load all configs
  loadConfigs() {
    this.http.get<EmailConfiguration[]>(this.configsUrl).subscribe(data => {
      this.configs.set(data);
    });
  }

  // Add new config

  addConfig(config: EmailConfiguration) {
  this.http.post<EmailConfiguration>(this.configsUrl, config).subscribe({
    next: saved => {
      this.configs.set([...this.configs(), saved]);
      this.successMessage.set("Email configuration added successfully!");
      this.errorMessage.set(null);
      setTimeout(() => this.successMessage.set(null), 2000);
    },
    error: err => {
      console.error('AddConfig failed', err);
      this.errorMessage.set("Failed to add email configuration.");
      this.successMessage.set(null);
      setTimeout(() => this.errorMessage.set(null), 2000);
    }
  });
}


  // Load one config by id
  loadConfigById(id: number) {
    this.http.get<EmailConfiguration>(`${this.configsUrl}/${id}`).subscribe({
      next: data => this.selectedConfig.set(data),
      error: err => console.error('LoadConfigById failed')
    });
  }
  
}
