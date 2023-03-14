const Calculations = require('../services/calculations');

describe('Calculations Methods', () => {
  const counter = new Calculations();

  test('test - roundTheFee method', () => {
    expect(counter.roundTheFee(1.023)).toBe(1.03);
  });

  test('test - countCashInFee method', () => {
    const logSpy = jest.spyOn(global.console, 'log');
    counter.countCashInFee(1000000, 0.03, 5);
    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith('5.00');
    logSpy.mockRestore();
  });

  test('test - countNaturalCashOutFee method', () => {
    const logSpy = jest.spyOn(global.console, 'log');
    counter.countNaturalCashOutFee(999, 0.3, 1000);
    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith('0.00');
    logSpy.mockRestore();
  });

  test('test - countLegalCashOutFee method', () => {
    const logSpy = jest.spyOn(global.console, 'log');
    counter.countLegalCashOutFee(300, 0.3, 0.5);
    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith('0.90');
    logSpy.mockRestore();
  });
});
