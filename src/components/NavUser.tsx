import { faSignIn, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavbarText, NavLink } from "reactstrap";
import { useAppSelector } from "../app/hooks";
import { selectUser, selectUserStatus } from "../features/authentication/authenticationSlice";
import { Container } from "./Container";

function NavLoggedUser({ username }: { username?: string }) {
  return (
    <Container>
      <NavbarText className="d-inline-block">{username || "Inconnu"}</NavbarText>
      <NavLink href="/signout" className="ms-2 d-inline-block"><FontAwesomeIcon icon={faSignOut} /></NavLink>
    </Container>
  )
}

export function NavUser() {
  const status = useAppSelector(selectUserStatus);
  const user = useAppSelector(selectUser);

  return (
    <>
      {status === "authenticated" && <NavLoggedUser username={user?.username} />}
      {status === "not authenticated" && <NavLink href="/signin"><FontAwesomeIcon icon={faSignIn} /></NavLink>}
    </>
  )
}