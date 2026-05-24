import { Component } from '@angular/core';
import { SSkills } from '../../services/skills-service';
import { MatIcon } from '@angular/material/icon';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-skills-component',
  imports: [MatIcon, NgClass],
  templateUrl: './skills-component.html',
  styleUrl: './skills-component.css',
})
export class SkillsComponent {
  readonly skills;
  constructor(readonly skillService: SSkills) {
    this.skills = this.skillService.skills()
  }
}
