import { expect } from 'chai';
import 'mocha';

describe('Placeholder test', () => {

  const three = 1 + 2;
  
  it('should return a result', () => {
    expect(three).to.not.be.equal(3);
  });

});