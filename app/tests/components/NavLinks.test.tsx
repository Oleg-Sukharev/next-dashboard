import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { navLinks, NavLink } from "@/app/constants/navLinks";
import NavLinks from "@/app/components/NavBar/NavLinks";

describe("NavLinks", () => {
  const activeClass: string = "!text-zinc-900";
  const renderNavLinks = (pathname: string) => {
    usePathname.mockReturnValue(pathname);
    return render(<NavLinks />);
  };

  it("renders links with label and href", () => {
    render(<NavLinks />);

    navLinks.forEach(({ label, href }: NavLink) => {
      const link = screen.getByText(label);
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", href);
    })
  })

  it.each(navLinks)(
    "highlights the active $label link when the current path is $href",
    ({ label, href }: NavLink) => {
      renderNavLinks(href);

      const link = screen.getByText(label);
      expect(link).toHaveClass(activeClass);
    }
  );

  it("does not highlight the link when the current path is unknown", () => {
    const { container } = renderNavLinks("unknown path")

    expect(container.getElementsByClassName(activeClass).length).toBe(0);
  })
});
