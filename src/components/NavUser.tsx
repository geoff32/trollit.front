import { faSignIn, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { NavbarText, NavLink } from "reactstrap";
import { useAppSelector } from "../app/hooks";
import { selectUser, selectUserStatus } from "../features/authentication/authenticationSlice";
import { Troll } from "../features/authentication/models";
import { Container } from "./Container";

function NavLoggedUser({ troll: { id: trollId, name: trollName } }: { troll: Troll }) {
  return (
    <Container>
      <NavbarText className="d-inline-block">{trollName} ({trollId})</NavbarText>
      <NavLink tag={Link} to="/signout" className="ms-2 d-inline-block"><FontAwesomeIcon icon={faSignOut} /></NavLink>
    </Container>
  )
}

export function NavUser() {
  const status = useAppSelector(selectUserStatus);
  const user = useAppSelector(selectUser);  

  return (
    <>
      {status === "authenticated" && <NavLoggedUser troll={user?.troll || { id: 0, name: "Inconnu" }} />}
      {status !== "authenticated" && <NavLink tag={Link} to="/signin"><FontAwesomeIcon icon={faSignIn} /></NavLink>}
    </>
  )
}