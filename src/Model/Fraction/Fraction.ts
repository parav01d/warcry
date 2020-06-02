import { Fighter } from "../Fighter/Fighter";
import { Abillity } from "../Abillity/Abillity";

export type Fraction = {
  id: number;
  name: string;
  leaders: Fighter[];
  fighters: Fighter[];
  abilities: Abillity[];
}
