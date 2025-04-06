import { AsyncPipe, KeyValuePipe } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ErrorTranslateService } from '../../../services';
import { ERROR_TRANSLATE_SERVICE_TOKEN } from '../../../tokens';
import { NgxWxcInputTextComponent } from './input-text.component';

describe('NgxWxcInputTextComponent', () => {
  let component: NgxWxcInputTextComponent;
  let fixture: ComponentFixture<NgxWxcInputTextComponent>;
  let mockErrorTranslateService: jasmine.SpyObj<ErrorTranslateService>;

  beforeEach(waitForAsync(() => {
    /**
     * Mock `ErrorTranslateService` is created.
     * Then, a fake `get` method is set to return an Observable of "Mock Error Translate Service Message".
     */
    mockErrorTranslateService = jasmine.createSpyObj('ErrorTranslateService', [
      'get',
    ]);
    mockErrorTranslateService.get.and.returnValue(
      of('Mock Error Translate Service Message')
    );

    /**
     * Declares component being tested;
     * Imports used modules, etc... and other dependencies;
     * Provides the mock service as a token.
     */

    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatIconModule,
        KeyValuePipe,
        AsyncPipe,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: ERROR_TRANSLATE_SERVICE_TOKEN,
          useValue: mockErrorTranslateService,
        },
      ],
    }).compileComponents();

    /**
     * Creates the instance and initialized it with `detectChanges()`
     */
    fixture = TestBed.createComponent(NgxWxcInputTextComponent);
    component = fixture.componentInstance;
    component.control = new FormControl('');
    fixture.detectChanges();
  }));

  /**
   * Verifies that the component instance is created successfully.
   */
  it('should create', () => {
    // Arrange: ...
    // Act: ...
    // Assert: Verify component was created
    expect(component).toBeTruthy();
  });

  /**
   * Verifies if an event is emitted when user is typing.
   */
  it('should emit textChange event on text input', () => {
    // Arrange: Monitor the textChange event
    spyOn(component.textChange, 'emit');

    // Act: Input value and trigger event
    const inputElement = fixture.debugElement.query(
      By.css('input')
    ).nativeElement;
    inputElement.value = 'Lorem ipsum...';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Assert: Verify event emit input value
    expect(component.textChange.emit).toHaveBeenCalledWith('Lorem ipsum...');
  });

  /**
   * Verifies if the clear button appears when `clearButton` is set to `true`, and the control has a value.
   */
  it('should show clear button when control has value and clearButton is true', () => {
    // arrange: Set control value and clearButton to true
    component.clearButton = true;

    // act: Input value and trigger event
    component.control.setValue('Lorem ipsum...');
    fixture.detectChanges();

    // assert: Verify clear button is displayed
    const clearButton = fixture.debugElement.query(By.css('button'));
    expect(clearButton).toBeTruthy();
  });

  /**
   * Verifies if the clear button does not appear when `clearButton` is set to `true`, and the control has no value.
   */
  it('should not show clear button when control has no value and clearButton is true', () => {
    // arrange: Set control value and clearButton to true
    component.clearButton = true;

    // act: Input value and trigger event
    component.control.setValue('');
    fixture.detectChanges();

    // assert: Verify clear button is not displayed
    const clearButton = fixture.debugElement.query(By.css('button'));
    expect(clearButton).toBeFalsy();
  });

  /**
   * Verifies if the clear button does not appear when `clearButton` is set to `false`.
   */
  it('should not show clear button when clearButton is false', () => {
    // arrange: Set control value and clearButton to false
    component.clearButton = false;

    // act: Input value and trigger event
    component.control.setValue('Lorem ipsum...');
    fixture.detectChanges();

    // assert: Verify clear button is not displayed
    const clearButton = fixture.debugElement.query(By.css('button'));
    expect(clearButton).toBeFalsy();
  });

  /**
   * Verifies input value is cleared and the control is marked dirty when clicking on clear button
   */
  it('should clear the input value when clear button is clicked', () => {
    // arrange: Set control value and clearButton to true
    component.clearButton = true;
    component.control.setValue('Lorem ipsum...');
    fixture.detectChanges();

    // act: click on clear button
    const clearButton = fixture.debugElement.query(
      By.css('button')
    ).nativeElement;
    clearButton.click();
    fixture.detectChanges();

    // assert: field content is empty
    expect(component.control.value).toBe('');
    expect(component.control.dirty).toBeTrue();
  });

  /**
   * Verifies the getFloatLabel() react according to disabled control.
   */
  it('should return floatLabel according control state', () => {
    // arrange: set up disabled field
    component.control.disable();

    // act: ...

    // assert: verify that float label reacts accordingly
    expect(component.getFloatLabel()).toBe('always');
  });

  /**
   * Verifies the getFloatLabel() react according enabled to control.
   */
  it('should return floatLabel according control state', () => {
    // arrange: set up disabled field
    component.control.enable();

    // act: ...

    // assert: verify that float label reacts accordingly
    expect(component.getFloatLabel()).toBe('auto');
  });

  /**
   * Verifies the getError() returns the error message from the error translate service.
   */
  it('should return error message from error translate service', () => {
    // arrange: Provide an error path
    component.errorPath = 'error.path';
    const errorMessages$ = component.getError('required');

    // act: Subscribe to error messages
    let errorMessages: string | string[] = [];
    errorMessages$.subscribe((messages) => (errorMessages = messages));

    // assert: Verify error message is returned
    expect(errorMessages).toBe('Mock Error Translate Service Message');
    expect(mockErrorTranslateService.get).toHaveBeenCalledWith(
      'error.path.required'
    );
  });

  /**
   * Verifies the ariaLabel is present if provided.
   */
  it('should set aria-label attribute if provided', () => {
    // arrange: Set aria label
    component.ariaLabel = 'Lorem ipsum...';
    fixture.detectChanges();

    // act: Query input element
    const inputElement = fixture.debugElement.query(
      By.css('input')
    ).componentInstance;

    // assert: Verify aria label is set
    expect(inputElement.ariaLabel).toBe('Lorem ipsum...');
  });

  /**
   * Verifies the component has default values when not provided.
   */
  it('should have default values when not provided', () => {
    // arrange: ...
    // act: ...
    // assert: Verify default values
    expect(component.autocomplete).toBe('on');
    expect(component.type).toBe('text');
    expect(component.required).toBeTrue();
    expect(component.clearButton).toBeFalse();
    expect(component.matIcon).toBe('close');
  });

  /**
   * Verifies an error message is displayed when control is invalid
   */
  it('should display error message when control is invalid', () => {
    // arrange: Set control as required
    component.required = true;

    // act: Set control as invalid
    component.control.markAllAsTouched();
    fixture.detectChanges();

    // assert: Verify error message is displayed
    const matError = fixture.debugElement.queryAll(By.css('mat-error'));
    expect(matError).toBeTruthy();
    expect(matError.length).toBe(1);
    expect(matError[0].nativeElement.textContent).toBe(
      'Mock Error Translate Service Message'
    );
  });

  /**
   * Verifies the label is displayed when provided.
   */
  it('should display label when provided', () => {
    // arrange: Set label
    component.label = 'Lorem ipsum...';
    fixture.detectChanges();

    // act: Query label element
    const matLabel = fixture.debugElement.query(By.css('mat-label'));

    // assert: Verify label is displayed
    expect(matLabel).toBeTruthy();
    expect(matLabel.nativeElement.textContent).toBe('Lorem ipsum...');
  });

  /**
   * Verifies the placeholder is displayed when provided.
   */
  it('should display placeholder when provided', () => {
    // arrange: Set placeholder
    component.placeholder = 'Lorem ipsum...';
    fixture.detectChanges();

    // act: Query input element
    const inputElement = fixture.debugElement.query(
      By.css('input')
    ).nativeElement;

    // assert: Verify placeholder is displayed
    expect(inputElement.placeholder).toBe('Lorem ipsum...');
  });
});
