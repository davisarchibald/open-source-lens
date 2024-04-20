import { afterEach, describe, expect, test, vi } from "vitest";
import { loader } from "../routes/api.repos.$owner.$repo";
import octokit from "../.server/github-client.js";

vi.mock('../.server/github-client.js');

const mockedOctokit = vi.mocked(octokit);

describe('commit endpoint', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  test('if owner and repo are values in the path, loader should call octokit request', async () => {
    // @ts-ignore only mock out a basic response
    mockedOctokit.request.mockResolvedValueOnce({
      data: {
        test: 'value',
      },
    });
    const result =  await loader({
      params: {
        owner: 'ww-digital',
        repo: 'reactive-kinesis',
      },
      context: {},
      request: new Request('https://mock-url-for-request.com'),
    });
    expect(mockedOctokit.request).toBeCalledTimes(1);
    expect(result.status).toBe(200);
    expect(await result.json()).toEqual({
      test: 'value',
    });
  });
  test('if owner or repo is not in path, should return a 404', async() => {
    const result =  await loader({
      params: {
        owner: 'ww-digital',
      },
      context: {},
      request: new Request('https://mock-url-for-request.com'),
    });
    expect(result.status).toBe(404);
    expect(mockedOctokit.request).not.toBeCalled();
  });
  test('if Github API returns an error on the request, we should return a 500 and log the error', async () => {
    const error = new Error('something went wrong');
    const logSpy = vi.spyOn(console, 'log');
    // @ts-ignore only mock out a basic response
    mockedOctokit.request.mockRejectedValueOnce(error);
    const result =  await loader({
      params: {
        owner: 'ww-digital',
        repo: 'reactive-kinesis',
      },
      context: {},
      request: new Request('https://mock-url-for-request.com'),
    });
    expect(mockedOctokit.request).toBeCalledTimes(1);
    expect(result.status).toBe(500);
    expect(logSpy).toBeCalledWith(error);
  });
});
