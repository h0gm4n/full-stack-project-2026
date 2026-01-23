import { consoleLog } from './actions';
import {describe, expect, it, jest} from '@jest/globals'

describe('consoleLog server action', () => {
  it('logs "Button clicked!" to the server console', async () => {
    // Spy on console.log
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    // Call the server action directly
    await consoleLog();

    // Assert the side effect
    expect(logSpy).toHaveBeenCalledWith('Button clicked!');

    // Cleanup
    logSpy.mockRestore();
  });
});