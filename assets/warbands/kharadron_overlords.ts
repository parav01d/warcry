import  kharadron from '../fractions/kharadron_overlords.json';

export const kharadronWarband = {
	name: "Kharadron Overlords WARBAND",
	isWarband: true,
	fighters: [
		kharadron.leaders.find(leader => leader.name === "Grundstock Thunderer - Leader"),
		kharadron.fighters.find(fighter => fighter.name === "Arkanaut with Gatling Gun"),
		kharadron.fighters.find(fighter => fighter.name === "Grundstock Thunderer with Flamethrower"),
		kharadron.fighters.find(fighter => fighter.name === "Grundstock Thunderer Grenadier"),
		kharadron.fighters.find(fighter => fighter.name === "Grundstock Thunderer with Big Cannon"),
		kharadron.fighters.find(fighter => fighter.name === "Grundstock Thunderer Grenadier"),
		kharadron.fighters.find(fighter => fighter.name === "Arkanaut with Gatling Gun"),
	]
};
