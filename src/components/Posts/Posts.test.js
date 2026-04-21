// src/components/Posts/Posts.test.js
// ─────────────────────────────────────────────────────────────
//  Tests for the Posts component (Level 3 – Advanced)
//
//  KEY CONCEPT: We MOCK global.fetch so the test never hits the internet.
//  global.fetch is set up in setupTests.js as jest.fn().
//  Each test below controls exactly what fetch "returns."
// ─────────────────────────────────────────────────────────────

import { render, screen, waitFor } from "@testing-library/react";
import Posts from "./Posts";

// ── Helpers to build mock fetch responses ─────────────────────

/**
 * Makes global.fetch resolve with a successful JSON response.
 */
function mockFetchSuccess(data) {
  global.fetch.mockResolvedValueOnce({
    ok: true,
    status: 200,
    json: async () => data,
  });
}

/**
 * Makes global.fetch resolve with a non-ok HTTP response (e.g. 500).
 */
function mockFetchHttpError(status = 500) {
  global.fetch.mockResolvedValueOnce({
    ok: false,
    status,
    json: async () => ({}),
  });
}

/**
 * Makes global.fetch reject entirely (network down / no internet).
 */
function mockFetchNetworkError(message = "Network Error") {
  global.fetch.mockRejectedValueOnce(new Error(message));
}

// ── Sample data ───────────────────────────────────────────────

const MOCK_POSTS = [
  { id: 1, title: "First Post Title", body: "Body of first post." },
  { id: 2, title: "Second Post Title", body: "Body of second post." },
  { id: 3, title: "Third Post Title", body: "Body of third post." },
];

// ── Level 3: Mocked API Tests ─────────────────────────────────

describe("Posts – Mocked API (Level 3)", () => {
  // ── Loading state ──

  test("shows loading indicator immediately on mount", () => {
    // Give fetch a promise that never resolves so we can catch the loading state
    global.fetch.mockReturnValueOnce(new Promise(() => {}));

    render(<Posts />);

    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();
    expect(screen.getByTestId("loading-indicator")).toHaveTextContent(
      "Loading posts"
    );
  });

  // ── Success state ──

  test("renders post cards after a successful fetch", async () => {
    mockFetchSuccess(MOCK_POSTS);

    render(<Posts />);

    // ── Transition: loading → resolved ────────────────────────
    // First, the loading indicator must be present while fetch is in-flight
    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();

    // Then, once fetch resolves, it must disappear — proves state lifecycle
    await waitFor(() => {
      expect(screen.queryByTestId("loading-indicator")).not.toBeInTheDocument();
    });

    // Finally, the real content must be visible
    expect(screen.getByTestId("posts-list")).toBeInTheDocument();
    expect(screen.getAllByTestId("post-card")).toHaveLength(3);
  });

  test("renders the correct title for each post", async () => {
    mockFetchSuccess(MOCK_POSTS);

    render(<Posts />);

    await waitFor(() => {
      expect(screen.getByText("First Post Title")).toBeInTheDocument();
    });

    expect(screen.getByText("Second Post Title")).toBeInTheDocument();
    expect(screen.getByText("Third Post Title")).toBeInTheDocument();
  });

  test("renders the correct body text for each post", async () => {
    mockFetchSuccess(MOCK_POSTS);

    render(<Posts />);

    await waitFor(() => {
      expect(screen.getByText("Body of first post.")).toBeInTheDocument();
    });
  });

  test("fetch is called with the correct URL", async () => {
    mockFetchSuccess([]);

    const testUrl = "https://example.com/api/posts";
    render(<Posts apiUrl={testUrl} />);

    await waitFor(() =>
      expect(screen.queryByTestId("loading-indicator")).not.toBeInTheDocument()
    );

    expect(global.fetch).toHaveBeenCalledWith(testUrl);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test("shows empty message when API returns an empty array", async () => {
    mockFetchSuccess([]);

    render(<Posts />);

    // findByText is async — waits for the DOM to update after fetch resolves.
    // /no posts/i is an accessible text query, not an internal testId.
    const message = await screen.findByText(/no posts/i);
    expect(message).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  // ── Error state ──

  test("shows error message when fetch rejects (network error)", async () => {
    mockFetchNetworkError("Network Error");

    render(<Posts />);

    await waitFor(() => {
      expect(screen.getByTestId("error-message")).toBeInTheDocument();
    });

    expect(screen.getByTestId("error-message")).toHaveTextContent(
      "Network Error"
    );
  });

  test("shows error message when server responds with a non-ok status", async () => {
    mockFetchHttpError(500);

    render(<Posts />);

    await waitFor(() => {
      expect(screen.getByTestId("error-message")).toBeInTheDocument();
    });

    expect(screen.getByTestId("error-message")).toHaveTextContent(
      "Server error: 500"
    );
  });

  test("does NOT render post cards when there is an error", async () => {
    mockFetchNetworkError("Network Error");

    render(<Posts />);

    await waitFor(() => {
      expect(screen.getByTestId("error-message")).toBeInTheDocument();
    });

    // Stronger assertion — proves the error message text is correct,
    // not just that something rendered
    expect(screen.getByTestId("error-message")).toHaveTextContent(/network error/i);
    expect(screen.queryByTestId("posts-list")).not.toBeInTheDocument();
    expect(screen.queryAllByTestId("post-card")).toHaveLength(0);
  });

  // ── Verify no real network calls ──

  test("fetch mock is used — no real network call is made", async () => {
    mockFetchSuccess(MOCK_POSTS);

    render(<Posts />);

    await waitFor(() =>
      expect(screen.queryByTestId("loading-indicator")).not.toBeInTheDocument()
    );

    // If fetch was a real call it would fail in the Jest/jsdom environment.
    // This assertion proves the mock intercepted it.
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
