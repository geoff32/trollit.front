import { useAppSelector } from "../../app/hooks";
import { Troll } from "../../components/Troll";
import { selectUser } from "../authentication/authenticationSlice";

export function Dashboard() {
  const { troll: { id: trollId, name: trollName} } = useAppSelector(selectUser)!;
  return <span>Bienvenue <Troll id={trollId} name={trollName} /></span>
}