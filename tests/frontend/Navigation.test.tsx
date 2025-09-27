import React from 'react'
import { render, screen } from '@testing-library/react'
import Navigation from '../../components/Navigation'

test('Navigation renders site title', () => {
  render(<Navigation />)
  expect(screen.getByText(/Faceit AI Bot/i)).toBeInTheDocument()
})
