import { Component } from '@angular/core';
import { ProfileRounded } from '../../components/profile-rounded/profile-rounded';
import { IMetrics } from '../../models/imetrics';

@Component({
  selector: 'app-about',
  imports: [ProfileRounded],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  readonly metrics: IMetrics[] = [
    { value: '20+', label: 'Proyectos' },
    { value: '100%', label: 'Dedicacion' },
    { value: '1+', label: 'Años de Experiencia' },
  ]
}
