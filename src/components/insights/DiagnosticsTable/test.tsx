import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DiagnosticsTable } from './index';
import { useSelector } from 'react-redux';
import { Insight } from "../../../api/insightsApi.ts";
import moment from 'moment';
import '@testing-library/jest-dom'

// Замокать данные из селектора
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('../../../api/insightsApi.ts', () => ({
  sortInsights: jest.fn((data) => data),
}));

jest.mock('../CreateInsightModal', () => ({
  CreateInsightModal: ({ showModal, onHide }) => (
      showModal ? <div data-testid="create-insight-modal">Create Insight Modal</div> : null
  ),
}));

describe('DiagnosticsTable', () => {
  const insightsMock: Insight[] = [
    { id: 1, created_at: '2023-07-23T00:00:00Z', type: 'Error', severity: 'High' },
    { id: 2, created_at: '2023-07-22T00:00:00Z', type: 'Warning', severity: 'Medium' },
  ];

  beforeEach(() => {
    (useSelector as jest.Mock).mockReturnValue(insightsMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the table with insights', () => {
    render(<DiagnosticsTable />);

    expect(screen.getByText('Diagnostics')).toBeInTheDocument();
    expect(screen.getByText('Diagnostics date')).toBeInTheDocument();
    expect(screen.getByText('Fault type')).toBeInTheDocument();
    expect(screen.getByText('Severity')).toBeInTheDocument();

    insightsMock.forEach((insight) => {
      expect(screen.getByText(moment(insight.created_at).format('DD.MM.YYYY'))).toBeInTheDocument();
      expect(screen.getByText(insight.type)).toBeInTheDocument();
      expect(screen.getByText(insight.severity)).toBeInTheDocument();
    });
  });

  it('opens the modal when "Add new" button is clicked', () => {
    render(<DiagnosticsTable />);

    const addButton = screen.getByText('Add new');
    fireEvent.click(addButton);

    expect(screen.getByTestId('create-insight-modal')).toBeInTheDocument();
  });
});
