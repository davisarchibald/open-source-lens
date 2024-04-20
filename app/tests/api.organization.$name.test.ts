import { afterEach, describe, expect, test, vi } from "vitest";
import { loader } from "../routes/api.organizations.$name";
import octokit from "../.server/github-client.js";

vi.mock('../.server/github-client.js');

const mockedOctokit = vi.mocked(octokit);

describe('commit endpoint', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  test('if name value is in the path, loader should call octokit request', async () => {
    // @ts-ignore  only mock out a basic response
    mockedOctokit.request.mockResolvedValueOnce({
      data: [{
        test: 'value',
      }],
    });
    const result =  await loader({
      params: {
        name: 'ww-digital',
      },
      context: {},
      request: new Request('https://mock-url-for-request.com'),
    });
    expect(mockedOctokit.request).toBeCalledTimes(1);
    expect(result.status).toBe(200);
    expect(await result.json()).toEqual({
      list: [{
        test: 'value',
      }],
      name: 'ww-digital',
    });
  });
  test('if name value is not in path, should return a 404', async() => {
    const result =  await loader({
      params: {},
      context: {},
      request: new Request('https://mock-url-for-request.com'),
    });
    expect(result.status).toBe(404);
    expect(mockedOctokit.request).not.toBeCalled();
  });
  test('if the request to github fails, it should log the error, and return a 500', async () => {
    const logSpy = vi.spyOn(console, 'log');
    const error = new Error('Something went wrong');
    // @ts-ignore  only mock out a basic response
    mockedOctokit.request.mockRejectedValueOnce(error);
    const result =  await loader({
      params: {
        name: 'ww-digital',
      },
      context: {},
      request: new Request('https://mock-url-for-request.com'),
    });
    expect(mockedOctokit.request).toBeCalledTimes(1);
    expect(result.status).toBe(500);
    expect(logSpy).toBeCalledWith(error);
  });
});
