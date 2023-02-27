import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import Countdown from './Countdown';

jest.useFakeTimers(); // use fake timers to control the setTimeout and setInterval functions

describe('Countdown', () => {
  it('renders the input field and buttons', () => {
    render(<Countdown setDuration={() => {}} setRemainingTime={() => {}} />);
    expect(screen.getByPlaceholderText('________________')).toBeInTheDocument();
    expect(screen.getByAltText('play-pause')).toBeInTheDocument();
    expect(screen.getByAltText('stop')).toBeInTheDocument();
  });

  it('renders the countdown when the start button is clicked', () => {
    render(
      <Countdown
        setDuration={() => {}}
        duration={10}
        remainingTime={10000}
        setRemainingTime={() => {}}
      />,
    );
    const input = screen.getByPlaceholderText('________________');
    const startButton = screen.getByAltText('play-pause');
    fireEvent.change(input, { target: { value: 10000 } }); // set the duration to 10 seconds
    fireEvent.click(startButton); // start the countdown
    expect(screen.getByTestId('countdown-id')).toBeInTheDocument();
    expect(screen.getByText('00:00:10.00')).toBeInTheDocument(); // check that the countdown is working correctly
  });

  it('pauses and resumes the countdown when the start button is clicked twice', () => {
    render(
      <Countdown
        setDuration={() => {}}
        duration={10}
        remainingTime={5000}
        setRemainingTime={() => {}}
      />,
    );
    const input = screen.getByPlaceholderText('________________');
    const startButton = screen.getByAltText('play-pause');
    fireEvent.change(input, { target: { value: '10' } }); // set the duration to 10 seconds
    fireEvent.click(startButton); // start the countdown
    fireEvent.click(startButton); // pause the countdown
    act(() => {
      jest.advanceTimersByTime(5000); // advance the timer by 5 seconds
    });
    fireEvent.click(startButton); // resume the countdown
    expect(screen.getByText('00:00:05.00')).toBeInTheDocument(); // check that the countdown is working correctly
    act(() => {
      jest.advanceTimersByTime(6000); // advance the timer by another 6 seconds
    });
    expect(screen.getByPlaceholderText('________________')).toBeInTheDocument(); // check that the countdown has finished
  });

  it('stops the countdown when the stop button is clicked', () => {
    render(<Countdown setDuration={() => {}} setRemainingTime={() => {}} />);
    const input = screen.getByPlaceholderText('________________');
    const startButton = screen.getByAltText('play-pause');
    const stopButton = screen.getByAltText('stop');
    fireEvent.change(input, { target: { value: '10' } }); // set the duration to 10 seconds
    fireEvent.click(startButton); // start the countdown
    fireEvent.click(stopButton); // stop the countdown
    expect(screen.queryByTestId('countdown-id')).not.toBeInTheDocument(); // check that the countdown is no longer visible
  });
});
