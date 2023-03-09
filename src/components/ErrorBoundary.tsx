import { useRouteError } from "react-router-dom";
import { Button, Container } from ".";

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  
  return (
    <Container className="text-center">
      <span>Une erreur s'est produite.</span>
      <Button className="ms-2" onClick={() => window.location.reload()}>Recharger la page</Button>
      <Button className="ms-2" onClick={() => window.location.replace("/")}>Rejoindre la page d'accueil</Button>
    </Container>
  )
}