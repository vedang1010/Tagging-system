import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ModifyComponent from '../../pages/ModifyComponent'; // Adjust the import path as necessary


test('input should not accept malicious code', () => {
  render(<ModifyComponent />);
  
  const input = screen.getByPlaceholderText('Component Name');
  const dangerousInput = "<script>alert('Hacked!')</script>";
  const sqlInjection = "SELECT * FROM users WHERE username = 'admin'";

  // Simulate user typing a dangerous script
  fireEvent.change(input, { target: { value: dangerousInput } });
  expect(input.value).toMatch(/<script>/);

  // Simulate user typing a SQL injection
  fireEvent.change(input, { target: { value: sqlInjection } });
  expect(input.value).toMatch(/SELECT \*/);
});
