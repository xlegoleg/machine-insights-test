import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { CreateInsightModal } from './';
import { addInsightMock } from '../../../api/insightsApi.ts';
import '@testing-library/jest-dom'

jest.mock('../../../api/insightsApi.ts', () => ({
  addInsightMock: jest.fn(),
  availableDatesMockOptions: ['2024-07-23', '2024-08-01'],
  typeOptions: ['Type1', 'Type2'],
  severityOptions: ['Low', 'Medium', 'High'],
}));

const mockStore = configureStore();

describe('CreateInsightModal', () => {
  let store: any;
  let dispatch: jest.Mock;

  beforeEach(() => {
    dispatch = jest.fn();
    store = mockStore({
      // Initial state if needed
    });
    store.dispatch = dispatch;
  });

  const renderComponent = (showModal = true) => {
    render(
        <Provider store={store}>
          <CreateInsightModal showModal={showModal} onHide={jest.fn()} />
        </Provider>
    );
  };

  it('should render correctly when open', async () => {
    renderComponent(true);

    expect(await screen.findByText('Add new diagnostic')).toBeTruthy();
    expect(await screen.findByText('Diagnostic date')).toBeTruthy();
    expect(await screen.findByText('Fault type')).toBeTruthy();
    expect(await screen.findByText('Severity')).toBeTruthy();
  });

  it('should not call addInsightMock when fields are empty', () => {
    renderComponent(true);

    fireEvent.click(screen.getByText('Save'));

    expect(addInsightMock).not.toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalled();
  });

  it('should handle close button click', () => {
    const onHide = jest.fn();
    render(
        <Provider store={store}>
          <CreateInsightModal showModal={true} onHide={onHide} />
        </Provider>
    );

    fireEvent.click(screen.getByText('Cancel'));

    expect(onHide).toHaveBeenCalled();
  });
});
