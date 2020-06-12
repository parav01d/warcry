import { Fighter } from "../Fighter/Fighter";
import { Abillity } from "../Abillity/Abillity";

export type Fraction = {
  name: string;
  leaders: Fighter[];
  fighters: Fighter[];
  abilities: Abillity[];
}
