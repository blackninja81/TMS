import { renderHook, act } from '@testing-library/react';
import { useBookingLogic } from '../hooks/useBookingLogic';

describe('useBookingLogic Hook', () => {
  test('should initialize with default values', () => {
    const { result } = renderHook(() => useBookingLogic());

    expect(result.current.adults).toBe(1);
    expect(result.current.children).toBe(0);
    expect(result.current.selectedSeats).toEqual([]);
    expect(result.current.tripType).toBe('one-way');
  });

  test('should update adult count', () => {
    const { result } = renderHook(() => useBookingLogic());

    act(() => {
      result.current.setAdults(3);
    });

    expect(result.current.adults).toBe(3);
    expect(result.current.adultDetails.length).toBe(3);
  });

  test('should toggle seat selection', () => {
    const { result } = renderHook(() => useBookingLogic());

    act(() => {
      result.current.setAdults(2);
      result.current.toggleSeat('S1');
    });

    expect(result.current.selectedSeats).toContain('S1');

    act(() => {
      result.current.toggleSeat('S1');
    });

    expect(result.current.selectedSeats).not.toContain('S1');
  });
});
