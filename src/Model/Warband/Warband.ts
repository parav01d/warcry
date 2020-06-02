import { Fighter } from "../Fighter/Fighter";
import { Fraction } from "../Fraction/Fraction";

export type Warband = {
  id: number;
  name: string;
  leader: Fighter;
  fighters: Fighter[];
  Fraction: Fraction;
}
