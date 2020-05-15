
const rotbringers = require('./fractions/maggotkin_of_nurgle_rotbringers.json');
const ogor = require('./fractions/ogor_mawtribes.json');
const corvus = require('./fractions/corvus_cabal.json');
const sylvaneth = require('./fractions/sylvaneth.json');

const yourFraction = sylvaneth;
const enemyFraction = ogor;

const logGreen = (text) => {
	console.log('\x1b[32m%s\x1b[0m', text);
}
const logRed = (text) => {
	console.log('\x1b[31m%s\x1b[0m', text);
}

const plotName = (fraction) => {
	logRed(fraction.name);
	logRed("-".repeat(fraction.name.length + 1));
}

const plotPoints = (warband) => {
	warband.forEach(fighter => {
		logGreen(`[${fighter.points}] ${fighter.name}` );
	})
	logGreen(`[${warband.reduce( (points, fighter) => (points + fighter.points), 0)}]`);
}

const plotNumberOfFighters = (warband) => {
		logGreen(`${warband.length} Fighters`);
}

const plotDamageOutput = (yourWarband, enemyWarband, distance) => {
	const damage = yourWarband.reduce( (fighterDamage, yourFighter) => {
		return fighterDamage + enemyWarband.reduce((acc, enemyFighter) => {
			return acc + calculateDamageOutput(yourFighter, enemyFighter, distance);
		}, 0)
	}, 0);
	if(damage > 0) {
		logRed(`[${distance} inch] potential ${damage} damage (one attack of all fighters against all enemies)`);
	}
}

const calculateDamageOutput = (fighter, enemy, distance) => {
	const damage = fighter.weapons.reduce((acc, weapon) => {
		const { strenght, minRange, maxRange, damage } = weapon;
		var maxDamage = 0;
		if(strenght < enemy.toughness && minRange < distance && maxRange >= distance) {
			maxDamage = (((1/6) * weapon.crit) + ((1/6) * damage)) * weapon.attacks;
		}
		if(strenght === enemy.toughness && minRange < distance && maxRange >= distance) {
			maxDamage = (((1/6) * weapon.crit) + ((2/6) * damage)) * weapon.attacks;
		}
		if(strenght > enemy.toughness && minRange < distance && maxRange >= distance) {
			maxDamage = (((1/6) * weapon.crit) + ((3/6) * damage)) * weapon.attacks;
		}
		if(maxDamage > acc) {
			return maxDamage;
		}
		return acc;
	}, 0)
	if(damage > 0) {
		logGreen(`[${distance} inch] ${fighter.name} vs. ${enemy.name} ${Math.round(damage * 100) / 100} damage per attack`)
	}
	return damage;
}

const range = i => i?range(i-1).concat(i):[];

const yourWarband = [];
const enemyWarband = [];

yourWarband.push(yourFraction.leaders[Math.floor(Math.random() * yourFraction.leaders.length)]);
enemyWarband.push(enemyFraction.leaders[Math.floor(Math.random() * enemyFraction.leaders.length)]);

while(true) {
	const currentPoints = yourWarband.reduce( (points, fighter) => {
		return points + fighter.points;
	}, 0);
	const possibleFighters = yourFraction.fighters.reduce((acc, fighter) => {
		if(currentPoints + fighter.points < 1000) {
			acc.push(fighter);
		}
		return acc;
	}, [])
	const fighter = possibleFighters[Math.floor(Math.random() * possibleFighters.length)];
	if(fighter) {
		yourWarband.push(fighter);
	} else {
		break;
	}
}

while(true) {
	console.log(enemyWarband);
	const currentPoints = enemyWarband.reduce( (points, fighter) => {
		console.log("fighter:")
		console.log(fighter);
		return points + fighter.points;
		}, 0);
	const possibleFighters = enemyFraction.fighters.reduce((acc, fighter) => {
		if(currentPoints + fighter.points < 1000) {
			acc.push(fighter);
		}
		return acc;
	}, [])
	const fighter = possibleFighters[Math.floor(Math.random() * possibleFighters.length)];
	console.log("random fighter:");
	console.log(fighter);
	if(fighter) {
		enemyWarband.push(fighter);
	} else {
		break;
	}
}

plotName(yourFraction);
plotPoints(yourWarband);
plotNumberOfFighters(yourWarband);
logRed("");
plotName(enemyFraction);
plotPoints(enemyWarband);
plotNumberOfFighters(enemyWarband);
logRed("")
logRed("Every friendly fighter attacks each enemy Fighter once")
range(20).forEach(distance => {
	plotDamageOutput(yourWarband, enemyWarband, distance);
})
logRed("")
logRed("Every enemy fighter attacks each of your Fighters once")
	range(20).forEach(distance => {
		plotDamageOutput(enemyWarband, yourWarband, distance);
})
