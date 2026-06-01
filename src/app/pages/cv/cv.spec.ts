import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvPage } from './cv';

describe('CvPage', () => {
  let component: CvPage;
  let fixture: ComponentFixture<CvPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a download button with Download CV text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button');
    expect(button).toBeTruthy();
    expect(button!.textContent).toContain('Download CV');
  });

  it('should have no-print class on the download button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button');
    expect(button).toBeTruthy();
    expect(button!.classList.contains('no-print')).toBe(true);
  });

  it('should call window.print when printCv is called', () => {
    const printSpy = vi.spyOn(window, 'print');
    component.printCv();
    expect(printSpy).toHaveBeenCalled();
  });
});
