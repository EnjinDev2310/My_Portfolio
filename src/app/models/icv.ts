export interface ICvProfile {
  name: string;
  role: string;
  about: string;
  email?: string;
  phone?: string;
  photo?: string;
  github?: string;
  linkedin?: string;
  education: ICvEducation[];
  experience: ICvExperience[];
  skills: ICvSkill[];
  languages: ICvLanguage[];
}

export interface ICvEducation {
  degree: string;
  institution: string;
  period: string;
  description: string;
}

export interface ICvLanguage {
  language: string;
  level: string;
}

export interface ICvSkill {
  name: string;
  category: 'frontend' | 'tooling' | 'language' | 'database' | 'backend';
}

export interface ICvExperience {
  period: string;
  role: string;
  company: string;
  description: string;
}
