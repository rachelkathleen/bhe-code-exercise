const { segmentedSieve } = require("./sieve");

describe("Sieve", () => {
  test("valid results", () => {
    expect(segmentedSieve(0)).toBe(2);
    expect(segmentedSieve(19)).toBe(71);
    expect(segmentedSieve(99)).toBe(541);
    expect(segmentedSieve(500)).toBe(3581);
    expect(segmentedSieve(986)).toBe(7793);
    expect(segmentedSieve(2000)).toBe(17393);
    expect(segmentedSieve(1000000)).toBe(15485867);
    expect(segmentedSieve(10000000)).toBe(179424691);
    expect(segmentedSieve(100000000)).toBe(2038074751);
  });
});
