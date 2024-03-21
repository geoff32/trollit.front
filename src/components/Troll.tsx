interface TrollProps {
  id: number;
  name: string;
}
export function Troll({ id, name }: Readonly<TrollProps>) {
  return <>{name} ({id})</>
}