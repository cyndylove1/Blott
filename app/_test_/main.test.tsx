import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import Main from "../page";
import QueryProvider from "@/app/queryProvider";

const mock = new MockAdapter(axios);

describe("Main Component", () => {
  afterEach(() => {
    mock.reset();
  });

  it("renders loading text initially", async () => {
    mock.onGet(/finnhub.io/).reply(200, []);

    render(
      <QueryProvider>
        <Main />
      </QueryProvider>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it("renders news headlines when data is fetched", async () => {
    mock.onGet(/finnhub.io/).reply(200, [
      {
        url: "https://example.com/news1",
        image: "https://example.com/image.jpg",
        source: "CNN",
        datetime: "2025-10-16",
        headline: "Breaking News",
      },
    ]);

    render(
      <QueryProvider>
        <Main />
      </QueryProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Breaking News")).toBeInTheDocument();
      expect(screen.getByText("CNN")).toBeInTheDocument();
    });
  });

  it("renders error message when API fails", async () => {
    // Force an error React Query can detect
    mock.onGet(/finnhub.io/).networkError();

    render(
      <QueryProvider>
        <Main />
      </QueryProvider>
    );

    await waitFor(
      async () => {
        const errorText = await screen.findByText(
          /Something went wrong. Please try again later./i
        );
        expect(errorText).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
