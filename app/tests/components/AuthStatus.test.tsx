import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import AuthStatus from "@/app/components/NavBar/AuthStatus";
import userEvent from "@testing-library/user-event"
import AllProviders from "../AllProviders";

describe("AuthStatus component", () => {
  it("renders a skeleton while the session is loading", () => {
    useSession.mockReturnValue({
      status: "loading",
      data: null,
    });

    render(<AuthStatus />);
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  });

  it("renders the Login link when unauthenticated", () => {
    useSession.mockReturnValue({
      status: "unauthenticated",
      data: null,
    });

    render(<AuthStatus />);
    const loginLink = screen.getByRole("link", { name: /login/i });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute("href", "/api/auth/signin");
  });

  it("Should render dropdown menu content when Button is clicked", async () => {
    const userData = {
      image: "https://example.com/avatar.png",
      email: "user@example.com",
    };

    useSession.mockReturnValue({
      status: "authenticated",
      data: { user: userData }
    });

    render(<AuthStatus />, { wrapper: AllProviders });
    const button = screen.getByRole("button");

    const user = userEvent.setup();
    await user.click(button);

    expect(screen.getByText(userData.email)).toBeInTheDocument();

    const logOutButton = screen.getByText(/log out/i);
    expect(logOutButton).toBeInTheDocument();
    expect(logOutButton).toHaveAttribute("href", "/api/auth/signout")
  });
});
