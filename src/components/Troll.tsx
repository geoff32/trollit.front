interface TrollProps {
  id: number;
  name: string;
}
export function Troll({ id, name }: TrollProps) {
  return <>{name} ({id})</>
}