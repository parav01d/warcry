import maggotkinOfNurgleRotbringers from '../fractions/maggotkin_of_nurgle_rotbringers.json';

export const maggotkinOfNurgleRotbringersWarband = {
	name: "Maggotkin of Nurgles Rotbringers WARBAND",
	isWarband: true,
	fighters: [
		maggotkinOfNurgleRotbringers.leaders.find(leader => leader.name === "Blightking - Leader"),
		maggotkinOfNurgleRotbringers.fighters.find(fighter => fighter.name === "Blightlord Bee"),
		maggotkinOfNurgleRotbringers.fighters.find(fighter => fighter.name === "Bell"),
		maggotkinOfNurgleRotbringers.fighters.find(fighter => fighter.name === "Banner"),
		maggotkinOfNurgleRotbringers.fighters.find(fighter => fighter.name === "Blightking"),
		maggotkinOfNurgleRotbringers.fighters.find(fighter => fighter.name === "Blightking"),
	]
};
