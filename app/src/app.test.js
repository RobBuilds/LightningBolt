import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SearchComponent from './components/SearchComponent';
import App from './App';

jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
}));

// APP testing for the App.js file
jest.mock('./components/NavBar', () => () => <div>NavBar</div>);
jest.mock('./components/AboutPage', () => () => <div>AboutPage</div>);
jest.mock('./components/ContactPage', () => () => <div>ContactPage</div>);
jest.mock('./components/DatabaseFetch', () => () => <div>DatabaseFetch</div>);
jest.mock('./components/EmailSearch', () => () => <div>EmailSearch</div>);

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <Router>
        <App />
      </Router>
    );
  });
});

// Test Search Components
describe('SearchComponent', () => {
  test('renders without crashing', () => {
    const { container } = render(<SearchComponent />);
    expect(container).toBeTruthy();
  });
});
