import { Fighter } from "../Fighter/Fighter";
import { Fraction } from "../Fraction/Fraction";

export type Warband = {
  name: string;
  leader: Fighter;
  fighters: Fighter[];
  Fraction: Fraction;
}
