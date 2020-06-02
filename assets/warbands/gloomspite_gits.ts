import gloomspiteGits from '../fractions/gloomspite_gits.json';

export const gloomspiteGitsWarband = {
	name: "gloomspite Gits WARBAND",
	isWarband: true,
	fighters: [
		gloomspiteGits.leaders.find((leader: any) => leader.name === "Grot - Leader"),
		gloomspiteGits.fighters.find((fighter: any) => fighter.name === "Sneaky Snuffler"),
		gloomspiteGits.fighters.find((fighter: any) => fighter.name === "Cave Squiq"),
		gloomspiteGits.fighters.find((fighter: any) => fighter.name === "Cave Squiq"),
		gloomspiteGits.fighters.find((fighter: any) => fighter.name === "Netta"),
		gloomspiteGits.fighters.find((fighter: any) => fighter.name === "Squiq Herder"),


		gloomspiteGits.fighters.find((fighter: any) => fighter.name === "Squiq Herder"),
		gloomspiteGits.fighters.find((fighter: any) => fighter.name === "Cave Squiq"),

		gloomspiteGits.fighters.find((fighter: any) => fighter.name === "Boingrot Sword"),
	]
};
