import SortFilterMenu from "@/components/nav/SortFilterMenu";
import Nav from "@/components/nav/Nav";
import NavLinks from "@/components/nav/NavLinks";
import Logo from "@/components/nav/Logo";

export default function Layout({ children }) {
  return (
    <>
      <Nav>
        <SortFilterMenu />
        <Logo />
        <NavLinks />
      </Nav>
      {children}
    </>
  );
}
