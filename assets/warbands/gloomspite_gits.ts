import gloomspiteGits from '../fractions/gloomspite_gits.json';
import destructionAllies from '../allies/destruction.json';

export const gloomspiteGitsWarband = {
	name: "gloomspite Gits WARBAND",
	isWarband: true,
	fighters: [
		gloomspiteGits.leaders.find((leader: any) => leader.name === "Grot - Leader"),
		gloomspiteGits.fighters.find((fighter: any) => fighter.name === "Boingrot Sword"),
		gloomspiteGits.fighters.find((fighter: any) => fighter.name === "Cave Squiq"),
		destructionAllies.allies.find((fighter: any) => fighter.name === "Brewgit"),
		gloomspiteGits.fighters.find((fighter: any) => fighter.name === "Squiq Herder"),

		gloomspiteGits.fighters.find((fighter: any) => fighter.name === "Cave Squiq"),
		gloomspiteGits.fighters.find((fighter: any) => fighter.name === "Netta"),

		gloomspiteGits.fighters.find((fighter: any) => fighter.name === "Boingrot Sword"),
	]
};
