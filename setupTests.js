
import "@testing-library/jest-dom";
const originalError = console.error.bind(console);
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("not wrapped in act")
    ) {
      return;
    }
    originalError(...args);
  };
});
afterAll(() => {
  console.error = originalError;
});

global.fetch = jest.fn();
beforeEach(() => {
  fetch.mockClear();
});
