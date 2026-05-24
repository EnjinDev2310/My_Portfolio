import { Component, inject } from '@angular/core';
import { SProject } from '../../services/project-service';

@Component({
  selector: 'app-proyects',
  imports: [],
  templateUrl: './proyects.html',
  styleUrl: './proyects.css',
})
export class Proyects {
  readonly projectService = inject(SProject);
  readonly projects = this.projectService.projects();
}
