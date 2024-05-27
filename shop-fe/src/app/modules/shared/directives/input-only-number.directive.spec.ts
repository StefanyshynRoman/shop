import { InputOnlyNumberDirective } from './input-only-number.directive';

describe('InputOnlyNumberDirective', () => {
  it('should create an instance', () => {
    let directive: InputOnlyNumberDirective;
    // @ts-ignore
    directive = new InputOnlyNumberDirective();
    expect(directive).toBeTruthy();
  });
});
