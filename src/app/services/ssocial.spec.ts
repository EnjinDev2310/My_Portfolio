import { TestBed } from '@angular/core/testing';

import { SSocial } from './ssocial';

describe('SSocial', () => {
  let service: SSocial;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SSocial);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should expose 5 social items', () => {
    const social = service.social();
    expect(social.length).toBe(5);
  });

  it('each item should have name, icon, color, url', () => {
    const social = service.social();
    social.forEach((item) => {
      expect(item.name).toBeDefined();
      expect(item.icon).toBeDefined();
      expect(item.color).toBeDefined();
      expect(item.url).toBeDefined();
    });
  });

  it('Discord item should have the correct brand color', () => {
    const social = service.social();
    const discord = social.find((s) => s.name === 'Discord');
    expect(discord).toBeDefined();
    expect(discord!.color).toBe('#5865F2');
  });

  it('Telegram item should have name Telegram', () => {
    const social = service.social();
    const telegram = social.find((s) => s.name === 'Telegram');
    expect(telegram).toBeDefined();
    expect(telegram!.icon).toBe('telegram');
  });
});
