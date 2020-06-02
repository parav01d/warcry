import { Weapon } from "../Weapon/Weapon";

export type Fighter = {
  id: number;
  name: string;
  points: number;
  movement: number;
  toughness: number;
  health: number;
  weapons: Weapon[]
}
