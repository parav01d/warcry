
const rotbringers = require('./fractions/maggotkin_of_nurgle_rotbringers.json')

const yourFraction = rotbringers;
const enemyFraction = rotbringers;

const plotName = (fraction) => {
	console.log(fraction.name);
	console.log("-".repeat(fraction.name.length + 1));
}

const plotPoints = (warband) => {
	warband.forEach(fighter => {
		console.log(`[${fighter.points}] ${fighter.name}` );
	})
	console.log(`${warband.reduce( (points, fighter) => (points + fighter.points), 0)}`);
}

const plotNumberOfFighters = (warband) => {
		console.log(`${warband.length} Fighters`);
}

const plotDamageOutput = (yourWarband, enemyWarband, distance) => {
	const damage = yourWarband.reduce( (fighterDamage, yourFighter) => {
		return fighterDamage + enemyWarband.reduce((acc, enemyFighter) => {
			return acc + calculateDamageOutput(yourFighter, enemyFighter, distance);
		}, 0)
	}, 0);

	console.log(`[${distance} inch] potential ${damage} damage`);
}

const calculateDamageOutput = (fighter, enemy, distance) => {
	const damage = fighter.weapons.reduce((acc, weapon) => {
		const { strenght, minRange, maxRange, damage } = weapon;
		var maxDamage = 0;
		if(strenght < enemy.toughness && minRange < distance && maxRange >= distance) {
			maxDamage = ((1/6) * weapon.crit) + ((1/6) * damage)
		}
		if(strenght === enemy.toughness && minRange < distance && maxRange >= distance) {
			maxDamage = ((1/6) * weapon.crit) + ((2/6) * damage)
		}
		if(strenght > enemy.toughness && minRange < distance && maxRange >= distance) {
			maxDamage = ((1/6) * weapon.crit) + ((3/6) * damage)
		}
		if(maxDamage > acc) {
			return maxDamage;
		}
		return acc;
	}, 0)
	if(damage > 0) {
		console.log(`    ${fighter.name} vs. ${enemy.name} ${Math.round(damage * 100) / 100} damage`)
	}
	return damage;
}

const range = i => i?range(i-1).concat(i):[];

while(true) {
	const yourWarband = [];
	const enemyWarband = [];

	yourWarband.push(yourFraction.leaders[Math.floor(Math.random() * yourFraction.leaders.length)]);
	enemyWarband.push(enemyFraction.leaders[Math.floor(Math.random() * yourFraction.leaders.length)]);

	while(true) {
		const currentPoints = yourWarband.reduce( (points, fighter) => (points + fighter.points), 0);
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
		const currentPoints = enemyWarband.reduce( (points, fighter) => (points + fighter.points), 0);
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

	console.log("YOUR WARBAND");
	plotName(yourFraction);
	plotPoints(yourWarband);
	plotNumberOfFighters(yourWarband);
	console.log("");
	console.log("ENEMY WARBAND");
	plotName(enemyFraction);
	plotPoints(enemyWarband);
	plotNumberOfFighters(enemyWarband);
	console.log("")
	console.log("Damage Statistic")
	console.log("Every friendly fighter attacks each enemy Fighter once")
	range(20).forEach(distance => {
		plotDamageOutput(yourWarband, enemyWarband, distance);
	})
	console.log("")
	console.log("Every enemy fighter attacks each of your Fighters once")
		range(20).forEach(distance => {
			plotDamageOutput(enemyWarband, yourWarband, distance);
	})
	break;
}
