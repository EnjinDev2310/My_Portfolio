import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { SkillsComponent } from '../../components/skills-component/skills-component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, SkillsComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home { }
