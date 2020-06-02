import ogorMawtribes from '../fractions/ogor_mawtribes.json';

export const ogorMawtribesWarband = {
	name: "Ogor Mawtribes WARBAND",
	isWarband: true,
	fighters: [
		ogorMawtribes.leaders.find(leader => leader.name === "Crusher - Leader"),
		ogorMawtribes.fighters.find(fighter => fighter.name === "Leadbelcher"),
		ogorMawtribes.fighters.find(fighter => fighter.name === "Leadbelcher"),
		ogorMawtribes.fighters.find(fighter => fighter.name === "Glutton with paired Club and Blade"),
		ogorMawtribes.fighters.find(fighter => fighter.name === "Gnoblar Fighter"),
	]
};
