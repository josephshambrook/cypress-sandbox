import createCustomAssertion from './createCustomAssertion';

export function havePlaceholder(chai) {
  createCustomAssertion('placeholder', ($element) =>
    $element.attr('placeholder')
  );
}

export function haveTestId(chai) {
  createCustomAssertion('testid', ($element) => $element.attr('data-testid'));
}
