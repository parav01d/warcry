
import rotbringers from './assets/fractions/maggotkin_of_nurgle_rotbringers.json';
import ogor from './assets/fractions/ogor_mawtribes.json';
import corvus from './assets/fractions/corvus_cabal.json';
import sylvaneth from './assets/fractions/sylvaneth.json';
import untamed from './assets/fractions/untamed_beasts.json';
import iron from './assets/fractions/iron_golem.json';
import gits from './assets/fractions/gloomspite_gits.json';
import skaven from './assets/fractions/skaven.json';
import kharadron from './assets/fractions/kharadron_overlords.json';
import bonesplitters from './assets/fractions/bonesplitters.json';
import nagash from './assets/fractions/legions_of_nagash.json';
import ironjawz from './assets/fractions/ironjawz.json';
import vanguard from './assets/fractions/stormcast_vanguard.json';

import {kharadronWarband} from './assets/warbands/kharadron_overlords';
import {ogorMawtribesWarband} from './assets/warbands/ogor_mawtribes';
import {gloomspiteGitsWarband} from './assets/warbands/gloomspite_gits';
import {maggotkinOfNurgleRotbringersWarband} from './assets/warbands/maggotkin_of_nurgle_rotbringers';
import {legionsOfNagashWarband} from './assets/warbands/legions_of_nagash';
import {skavenWarband} from './assets/warbands/skaven';

const yourFraction: any = kharadronWarband;
const enemyFraction: any = gloomspiteGitsWarband;

const logGreen = (text: any) => {
	console.log('\x1b[32m%s\x1b[0m', text);
}
const logRed = (text: any) => {
	console.log('\x1b[31m%s\x1b[0m', text);
}

const plotName = (fraction: any) => {
	logRed("")
	logRed("-".repeat(fraction.name.length + 1));
	logRed(fraction.name);
	logRed("-".repeat(fraction.name.length + 1));
}

const plotPoints = (warband: any) => {
	warband.forEach((fighter: any) => {
		logGreen(`[${fighter.points}] ${fighter.name}` );
	})
	logGreen(`[${warband.reduce( (points: any, fighter: any) => (points + fighter.points), 0)}]`);
}

const plotNumberOfFighters = (warband: any) => {
	logRed("");
	logRed("Number of Fighters")
	logGreen(`${warband.length} Fighters`);
}

const plotDamageOutput = (yourWarband: any, enemyWarband: any) => {
	logRed("");
	logRed("Damage")
	range(20).forEach((distance: any) => {
		logGreen(`[${distance} inch]`);
		const damage = yourWarband.reduce( (fighterDamage: any, yourFighter: any) => {
			const damageOutput = enemyWarband.reduce((acc: any, enemyFighter: any) => {
				return acc + calculateDamageOutput(yourFighter, enemyFighter, distance, enemyWarband, 0);
			}, 0);
			const damageOutputWithOnslaught = enemyWarband.reduce((acc: any, enemyFighter: any) => {
				return acc + calculateDamageOutput(yourFighter, enemyFighter, distance, enemyWarband, 1);
			}, 0);
			if(damageOutput>0) {
				logGreen(`           ${(Math.round(damageOutput * 10) / 10).toFixed(1)} damage +1 Dice: ${(Math.round(damageOutputWithOnslaught * 10) / 10).toFixed(1)} P/Dmg: ${(Math.round(yourFighter.points/damageOutput * 10) / 10).toFixed(1)} - ${yourFighter.name}`)
			}
			return fighterDamage + ((damageOutput + damageOutputWithOnslaught) / 2);
		}, 0);
		if(damage > 0) {
			logGreen(`${"-".repeat(50)}`);
			logGreen(`           ${Math.round(damage * 10) / 10} damage`);
			logGreen(``);
		}
	})
}

const calculateDamageOutput = (fighter: any, enemy: any, distance: any, enemyWarband: any, bonusAttacks: any) => {
	const damage = fighter.weapons.reduce((acc: any, weapon: any) => {
		const { strenght, minRange, maxRange, damage } = weapon;
		var maxDamage = 0;
		if(strenght < enemy.toughness && minRange < distance && maxRange >= distance) {
			maxDamage = (((1/6) * weapon.crit) + ((1/6) * damage)) * (weapon.attacks + bonusAttacks);
		}
		if(strenght === enemy.toughness && minRange < distance && maxRange >= distance) {
			maxDamage = (((1/6) * weapon.crit) + ((2/6) * damage)) * (weapon.attacks + bonusAttacks);
		}
		if(strenght > enemy.toughness && minRange < distance && maxRange >= distance) {
			maxDamage = (((1/6) * weapon.crit) + ((3/6) * damage)) * (weapon.attacks + bonusAttacks);
		}
		maxDamage = maxDamage / enemyWarband.length;
		if(maxDamage > acc) {
			return maxDamage;
		}
		return acc;
	}, 0)
	if(damage > 0) {
		// logGreen(`[${distance} inch] ${fighter.name} vs. ${enemy.name} ${Math.round(damage * 100) / 100} damage per attack`)
	}
	return damage;
}

const plotMovement = (warband: any) => {
	const statistic: any = calculateMovementRange(warband);
	logRed("");
	logRed("Movement")
	Object.keys(statistic).forEach((movement) => {
		logGreen(`[${movement} inch] ${statistic[movement]} Fighters`)
	})
}

const calculateMovementRange = (warband: any) => {
	const range: any = {};
	warband.forEach((fighter: any) => {
		if(!range[fighter.movement]) {
			range[fighter.movement] = 1;
		} else {
			range[fighter.movement] = range[fighter.movement] + 1;
		}
	})
	return range;
}

const plothealth = (warband: any) => {
	const statistic: any = calculatehealth(warband);
	logRed("");
	logRed("Health")
	Object.keys(statistic).forEach(health => {
		logGreen(`[${health}${health === "Total" ? "" : " Health"}] ${statistic[health]} ${health === "Total" ? "Health" : "Fighters"}`)
	})
}

const calculatehealth = (warband: any) => {
	const health: any = { Total: 0 };
	warband.forEach((fighter: any) => {
		health.Total = health.Total + fighter.health;
		if(!health[fighter.health]) {
			health[fighter.health] = 1;
		} else {
			health[fighter.health] = health[fighter.health] + 1;
		}
	})
	return health;
}

const range = (i: number) : number[] => i?range(i-1).concat(i):[];

const yourWarband = yourFraction.isWarband ? yourFraction.fighters :[];
const enemyWarband = enemyFraction.isWarband ? enemyFraction.fighters :[];
if(yourWarband.length === 0) {
	yourWarband.push(yourFraction.leaders[Math.floor(Math.random() * yourFraction.leaders.length)]);
}
if(enemyWarband.length === 0) {
	enemyWarband.push(enemyFraction.leaders[Math.floor(Math.random() * enemyFraction.leaders.length)]);
}

while(true) {
	const currentPoints = yourWarband.reduce( (points: any, fighter: any) => {
		return points + fighter.points;
	}, 0);
	const possibleFighters = !yourFraction.isWarband ? yourFraction.fighters.reduce((acc: any, fighter: any) => {
		if(currentPoints + fighter.points < 1000) {
			acc.push(fighter);
		}
		return acc;
	}, []) : [];
	const fighter = possibleFighters[Math.floor(Math.random() * possibleFighters.length)];
	if(fighter) {
		yourWarband.push(fighter);
	} else {
		break;
	}
}

while(true) {
	const currentPoints = enemyWarband.reduce( (points: any, fighter: any) => {
		return points + fighter.points;
		}, 0);
	const possibleFighters = !enemyFraction.isWarband ? enemyFraction.fighters.reduce((acc: any, fighter: any) => {
		if(currentPoints + fighter.points < 1000) {
			acc.push(fighter);
		}
		return acc;
	}, []) : [];
	const fighter = possibleFighters[Math.floor(Math.random() * possibleFighters.length)];
	if(fighter) {
		enemyWarband.push(fighter);
	} else {
		break;
	}
}

plotName(yourFraction);
plotPoints(yourWarband);
plotNumberOfFighters(yourWarband);
plotDamageOutput(yourWarband, enemyWarband);
plotMovement(yourWarband)
plothealth(yourWarband)
plotName(enemyFraction);
plotPoints(enemyWarband);
plotNumberOfFighters(enemyWarband);
plotDamageOutput(enemyWarband, yourWarband);
plotMovement(enemyWarband)
plothealth(enemyWarband)
