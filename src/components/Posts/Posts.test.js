import { render, screen, waitFor } from "@testing-library/react";
import Posts from "./Posts";

function mockFetchSuccess(data) {
  global.fetch.mockResolvedValueOnce({
    ok: true,
    status: 200,
    json: async () => data,
  });
}


function mockFetchHttpError(status = 500) {
  global.fetch.mockResolvedValueOnce({
    ok: false,
    status,
    json: async () => ({}),
  });
}


function mockFetchNetworkError(message = "Network Error") {
  global.fetch.mockRejectedValueOnce(new Error(message));
}



const MOCK_POSTS = [
  { id: 1, title: "First Post Title", body: "Body of first post." },
  { id: 2, title: "Second Post Title", body: "Body of second post." },
  { id: 3, title: "Third Post Title", body: "Body of third post." },
];



describe("Posts – Mocked API (Level 3)", () => {
  

  test("shows loading indicator immediately on mount", () => {
    
    global.fetch.mockReturnValueOnce(new Promise(() => {}));

    render(<Posts />);

    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();
    expect(screen.getByTestId("loading-indicator")).toHaveTextContent(
      "Loading posts"
    );
  });

  

  test("renders post cards after a successful fetch", async () => {
    mockFetchSuccess(MOCK_POSTS);

    render(<Posts />);

    
    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();

    
    await waitFor(() => {
      expect(screen.queryByTestId("loading-indicator")).not.toBeInTheDocument();
    });

    
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

   
    const message = await screen.findByText(/no posts/i);
    expect(message).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  

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

    expect(screen.getByTestId("error-message")).toHaveTextContent(/network error/i);
    expect(screen.queryByTestId("posts-list")).not.toBeInTheDocument();
    expect(screen.queryAllByTestId("post-card")).toHaveLength(0);
  });

  

  test("fetch mock is used — no real network call is made", async () => {
    mockFetchSuccess(MOCK_POSTS);

    render(<Posts />);

    await waitFor(() =>
      expect(screen.queryByTestId("loading-indicator")).not.toBeInTheDocument()
    );
   
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
