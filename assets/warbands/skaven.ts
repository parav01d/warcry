import skaven from '../fractions/skaven.json';

export const skavenWarband = {
	name: "Skaven WARBAND",
	isWarband: true,
	fighters: [
		skaven.leaders.find(leader => leader.name === "Stormvermin - Leader"),
		skaven.fighters.find(fighter => fighter.name === "Packmaster"),
		skaven.fighters.find(fighter => fighter.name === "Rat Ogor"),
		skaven.fighters.find(fighter => fighter.name === "Stormfiend with Gatling Gun"),
    skaven.fighters.find(fighter => fighter.name === "Giant Rat"),
    skaven.fighters.find(fighter => fighter.name === "Plaque Monk with Sword"),
    skaven.fighters.find(fighter => fighter.name === "Plaque Monk with Sword"),
    skaven.fighters.find(fighter => fighter.name === "Plaque Monk with Sword"),
	]
};
