import { afterAll, afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import {
  loader,
  // formSubmit,
} from '../routes/_index';

describe('_index route', () => {
  const { fetch: _fetch } = global;
  beforeAll(() => {
    global.fetch = vi.fn();
  });
  afterAll(() => {
    global.fetch = _fetch;
    vi.clearAllMocks();
  });
  afterEach(() => {
    vi.resetAllMocks();
  });
  describe('loader function', () => {
    test('if there is no q query param defined, it should return a 400', async () => {
      const response = await loader({
        request: new Request('http://localhost:3000/'),
        params: {},
        context: {},
      });
      expect(response.status).toBe(404);
      expect(vi.mocked(fetch)).not.toBeCalled();
    });
    test('if there is a q query param, the loader should return JSON', async () => {
      const mockJson = vi.fn();
      mockJson.mockResolvedValue({
        org: 'data',
      });
      // @ts-ignore no need for mocking out the whole fetch response
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: mockJson,
      });
      const response = await loader({
        request: new Request('http://localhost:3000/?q=ww-digital'),
        params: {},
        context: {},
      });
      expect(response.status).toBe(200);
      expect(await response.json()).toEqual({
        org: 'data',
      });
      expect(vi.mocked(fetch)).toBeCalledWith('http://localhost:3000/api/organizations/ww-digital');
    });
    test('if there is an error in the fetch, it should return a 500', async () => {
      const error = new Error('fetch failed');
      vi.mocked(fetch).mockRejectedValueOnce(error);
      const response = await loader({
        request: new Request('http://localhost:3000/?q=ww-digital'),
        params: {},
        context: {},
      });
      expect(response.status).toBe(500);
      expect(vi.mocked(fetch)).toBeCalled();
    });
  });
  // describe('formSubmit function', () => {
		
  // });
});
