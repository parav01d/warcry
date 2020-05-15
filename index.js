
const rotbringers = require('./fractions/maggotkin_of_nurgle_rotbringers.json');
const ogor = require('./fractions/ogor_mawtribes.json');
const corvus = require('./fractions/corvus_cabal.json');
const sylvaneth = require('./fractions/sylvaneth.json');
const untamed = require('./fractions/untamed_beasts.json');
const iron = require('./fractions/iron_golem.json');

const yourFraction = untamed;
const enemyFraction = iron;

const logGreen = (text) => {
	console.log('\x1b[32m%s\x1b[0m', text);
}
const logRed = (text) => {
	console.log('\x1b[31m%s\x1b[0m', text);
}

const plotName = (fraction) => {
	logRed("")
	logRed("-".repeat(fraction.name.length + 1));
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
	logRed("");
	logRed("Number of Fighters")
	logGreen(`${warband.length} Fighters`);
}

const plotDamageOutput = (yourWarband, enemyWarband) => {
	logRed("");
	logRed("Damage")
	range(20).forEach(distance => {
		const damage = yourWarband.reduce( (fighterDamage, yourFighter) => {
			return fighterDamage + enemyWarband.reduce((acc, enemyFighter) => {
				return acc + calculateDamageOutput(yourFighter, enemyFighter, distance, enemyWarband);
			}, 0)
		}, 0);
		if(damage > 0) {
			logGreen(`[${distance} inch]  ${damage}`);
		}
	})
}

const calculateDamageOutput = (fighter, enemy, distance, enemyWarband) => {
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

const plotMovement = (warband) => {
	const statistic = calculateMovementRange(warband);
	logRed("");
	logRed("Movement")
	Object.keys(statistic).forEach(movement => {
		logGreen(`[${movement} inch] ${statistic[movement]} Fighters`)
	})
}

const calculateMovementRange = (warband) => {
	const range = {};
	warband.forEach(fighter => {
		if(!range[fighter.movement]) {
			range[fighter.movement] = 1;
		} else {
			range[fighter.movement] = range[fighter.movement] + 1;
		}
	})
	return range;
}

const plothealth = (warband) => {
	const statistic = calculatehealth(warband);
	logRed("");
	logRed("Health")
	Object.keys(statistic).forEach(health => {
		logGreen(`[${health}${health === "Total" ? "" : " Health"}] ${statistic[health]} ${health === "Total" ? "Health" : "Fighters"}`)
	})
}

const calculatehealth = (warband) => {
	const health = { Total: 0 };
	warband.forEach(fighter => {
		health.Total = health.Total + fighter.health;
		if(!health[fighter.health]) {
			health[fighter.health] = 1;
		} else {
			health[fighter.health] = health[fighter.health] + 1;
		}
	})
	return health;
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
	const currentPoints = enemyWarband.reduce( (points, fighter) => {
		return points + fighter.points;
		}, 0);
	const possibleFighters = enemyFraction.fighters.reduce((acc, fighter) => {
		if(currentPoints + fighter.points < 1000) {
			acc.push(fighter);
		}
		return acc;
	}, [])
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
