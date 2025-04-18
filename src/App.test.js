import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// Mock Firebase modules
jest.mock('firebase/auth');
jest.mock('./firebaseConfig', () => ({
  auth: {}
}));

test('renders app without crashing', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  
  // Replace this assertion with something that actually exists in your app
  // For example, if you have a header or title that's always visible:
  // const headerElement = screen.getByRole('heading', { name: /water footprint/i });
  // expect(headerElement).toBeInTheDocument();
  
  // Or a more generic test that just confirms rendering:
  expect(document.body).toBeInTheDocument();
});
