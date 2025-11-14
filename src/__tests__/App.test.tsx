import React from 'react';

describe('Testing Framework Setup', () => {
  it('jest is working', () => {
    expect(1 + 1).toBe(2);
  });

  it('react is available', () => {
    expect(React).toBeDefined();
  });
});
