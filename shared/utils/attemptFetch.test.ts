import type { Mock } from "vitest";
import attemptFetch from "./attemptFetch.js";

describe("attemptFetch", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.useRealTimers();
  });

  describe("Fetching", () => {
    it("should successfully fetch raw response", async () => {
      const mockResponse = new Response("raw data");
      (global.fetch as Mock).mockResolvedValueOnce(mockResponse);

      const result = await attemptFetch({
        url: "https://api.example.com/data",
      });

      expect(result).toBeInstanceOf(Response);
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it("should retry on failure and eventually succeed", async () => {
      const mockData = { success: true };
      const mockErrorResponse = new Response("", { status: 500 });
      const mockSuccessResponse = new Response(JSON.stringify(mockData));

      (global.fetch as Mock)
        .mockResolvedValueOnce(mockErrorResponse)
        .mockResolvedValueOnce(mockErrorResponse)
        .mockResolvedValueOnce(mockSuccessResponse);

      const resultPromise = attemptFetch({
        url: "https://api.example.com/data",
        parse: "JSON",
        retries: 3,
        delay: 1,
      });

      // Handle each retry cycle
      for (let i = 0; i < 2; i++) {
        vi.runAllTimers();
        await Promise.resolve();
        await Promise.resolve();
      }

      vi.runAllTimers();

      const result = await resultPromise;

      expect(result).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledTimes(3);
      expect(vi.getTimerCount()).toBe(0);
    });
  });

  describe("Parsing", () => {
    it("should successfully fetch and parse JSON", async () => {
      const mockData = { hello: "world" };
      const mockResponse = new Response(JSON.stringify(mockData));
      (global.fetch as Mock).mockResolvedValueOnce(mockResponse);

      const result = await attemptFetch({
        url: "https://api.example.com/data",
        parse: "JSON",
      });

      expect(result).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it("should successfully fetch and parse text", async () => {
      const mockText = "Hello World";
      const mockResponse = new Response(mockText);
      (global.fetch as Mock).mockResolvedValueOnce(mockResponse);

      const result = await attemptFetch({
        url: "https://api.example.com/text",
        parse: "text",
      });

      expect(result).toBe(mockText);
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it("should successfully fetch and parse blob", async () => {
      const mockBlob = new Blob(["test data"], { type: "text/plain" });
      const mockResponse = new Response(mockBlob);
      (global.fetch as Mock).mockResolvedValueOnce(mockResponse);

      const result = await attemptFetch({
        url: "https://api.example.com/blob",
        parse: "blob",
      });

      expect(result).toBeInstanceOf(Blob);
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it("should successfully fetch and parse arrayBuffer", async () => {
      const mockBuffer = new ArrayBuffer(8);
      const mockResponse = new Response(mockBuffer);
      (global.fetch as Mock).mockResolvedValueOnce(mockResponse);

      const result = await attemptFetch({
        url: "https://api.example.com/arrayBuffer",
        parse: "arrayBuffer",
      });

      expect(result).toBeInstanceOf(ArrayBuffer);
      expect(result.byteLength).toBe(8);
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe("Error Handling", () => {
    it("should handle parse errors", async () => {
      const mockResponse = new Response("invalid json");
      (global.fetch as Mock).mockResolvedValueOnce(mockResponse);

      await expect(
        attemptFetch({
          url: "https://api.example.com/data",
          parse: "JSON",
          errorPrefix: "Parse Error:",
        })
      ).rejects.toThrow("Parse Error: Failed to parse");

      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it("should throw error after max retries", async () => {
      (global.fetch as Mock).mockRejectedValue(new Error("Network Error"));

      const resultPromise = attemptFetch({
        url: "https://api.example.com/data",
        retries: 3,
        delay: 100,
        errorPrefix: "Fetch Error:",
      });

      // Handle each retry cycle
      for (let i = 0; i < 2; i++) {
        vi.runAllTimers();
        await Promise.resolve();
        await Promise.resolve();
      }

      vi.runAllTimers();

      await expect(resultPromise).rejects.toThrow(
        "Fetch Error: Failed to fetch"
      );
      expect(global.fetch).toHaveBeenCalledTimes(3);
      expect(vi.getTimerCount()).toBe(0);
    });
  });
});
