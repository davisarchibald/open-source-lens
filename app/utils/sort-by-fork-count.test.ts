import { describe, expect, test } from "vitest";
import sortByForkCount from "./sort-by-fork-count";

describe('sortByForkCount util function', () => {
  test('should sort list descending based on fork count value', () => {
    const list = [
      {
        name: 'test1',
        forks_count: 0,
      },
      {
        name: 'test2',
        forks_count: 2,
      },
      {
        name: 'test3',
        forks_count: 0,
      },
    ];
    const expectedResult = [
      {
        name: 'test2',
        forks_count: 2,
      },
      {
        name: 'test1',
        forks_count: 0,
      },
      {
        name: 'test3',
        forks_count: 0,
      },
    ];
    // @ts-ignore no need to mock the whole sort list 
    const sortedList = sortByForkCount(list);
    expect(sortedList).toEqual(expectedResult);
  });
});
