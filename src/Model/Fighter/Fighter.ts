import { Weapon } from "../Weapon/Weapon";

export type Fighter = {
  name: string;
  points: number;
  movement: number;
  toughness: number;
  health: number;
  weapons: Weapon[]
}
