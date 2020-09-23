function domShouldExist($element) {
  new chai.Assertion($element).to.be.exist;
}

const createCustomAssertion = (name, getActual) => {
  chai.Assertion.addMethod(name, function (expected) {
    const $element = this._obj;

    domShouldExist($element);

    const actual = getActual($element);

    this.assert(
      actual === expected,
      `expected #{this} to have ${name} #{exp}, but ${name} was #{act}`,
      `expected #{this} not to have ${name} #{exp}`,
      expected,
      actual
    );
  });
};

export default createCustomAssertion;
