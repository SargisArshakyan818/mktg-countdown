import React from 'react';
import { render } from '@testing-library/react';
import CountDownAnimation from './CountDownAnimation';

describe('CountDownAnimation', () => {
  it('renders the component with default props', () => {
    const { getByTestId } = render(<CountDownAnimation />);
    const animationInner = getByTestId('animation-inner');
    expect(animationInner).toHaveStyle('height: 0%');
    expect(animationInner).toHaveStyle('background-color: #cfe2f3');
  });

  it('renders the component with specified props', () => {
    const { getByTestId } = render(<CountDownAnimation progress="50%" bgColor="#cfe2f3" />);
    const animationInner = getByTestId('animation-inner');
    expect(animationInner).toHaveStyle('height: 50%');
    expect(animationInner).toHaveStyle('background-color: #cfe2f3');
  });
});
