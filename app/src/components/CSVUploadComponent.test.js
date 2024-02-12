import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CSVUploadComponent from './CSVUploadComponent';
import Papa from 'papaparse';

// Mock Papa.parse
jest.mock('papaparse', () => ({
  parse: jest.fn((file, config) => {
    if (config.complete) {
      config.complete({ data: 'mocked data' });
    }
  })
}));

describe('CSVUploadComponent', () => {
  it('should process CSV file on upload', () => {
    const onDataProcessed = jest.fn();
    const { getByText, getByLabelText } = render(<CSVUploadComponent onDataProcessed={onDataProcessed} />);

    // Create a mock file
    const mockFile = new File(['name,age\nJohn Doe,30\nJane Doe,25'], 'test.csv', {
      type: 'text/csv',
    });

    // Simulate file selection
    const fileInput = getByLabelText('File Upload:');
    fireEvent.change(fileInput, { target: { files: [mockFile] } });

    // Simulate button click to upload the file
    fireEvent.click(getByText('Upload CSV'));

    // Check if onDataProcessed was called with the mocked data
    expect(onDataProcessed).toHaveBeenCalledWith('mocked data');
    expect(Papa.parse).toHaveBeenCalledWith(mockFile, expect.anything());
  });
});
