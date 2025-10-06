import React from 'react'
import { render, screen } from '@testing-library/react'
import { expect } from '@jest/globals';
import Navigation from '../../components/Navigation'
import '@testing-library/jest-dom';

console.log('Navigation test loaded');
console.log(typeof expect);

test('Navigation renders site title', () => {
  render(<Navigation />)
  const element = screen.getByText(/Faceit AI Bot/i);
  expect(document.body.contains(element)).toBe(true);
})

test('Navigation renders all menu items', () => {
  render(<Navigation />);

  const menuItems = [
    /Home/i,
    /About/i,
    /Contact/i
  ];

  menuItems.forEach((item) => {
    const element = screen.getByText(item);
    expect(document.body.contains(element)).toBe(true);
  });
});
