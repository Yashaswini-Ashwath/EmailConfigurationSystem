import { Component } from "@angular/core";
import { EmailConfigStore } from "../../services/email-config.store";
import { RouterLink } from "@angular/router";
import { ProviderNamePipe } from "../../pipe/providername-pipe";

@Component({
  selector: 'app-list-configs',
  standalone: true,
  imports: [RouterLink, ProviderNamePipe], 
  templateUrl: './list-configs.html',
})
export class ListConfigsComponent {
  configs = () => this.store.configs();
  constructor(private store: EmailConfigStore) {}
  ngOnInit() { this.store.loadConfigs(); }
}
