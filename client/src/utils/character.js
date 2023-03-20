class Combatant {
  constructor(name, strength, hitpoints, atk, crit, def, parry) {
    this.name = name;
    this.strength = strength;
    this.hitpoints = hitpoints;
    this.atk = atk;
    this.crit = crit;
    this.def = def;
    this.parry = parry;
  }
  //items 1 statUnit = +12hp, +1 stat, +2 range 
  // 🛡️ ⚔️ 🩸 🎲 
  // 🥋🎽🥷👩‍🚀🧑‍🚒👷🦹🏼‍♀️⛑️🪖👑👒🤖💀💥
  //🔪🦯🗡️🪓⚔️🏏🦴🪄
  //🪙🧿📿🎀❤️💠🔱🎲🎖️🥇🥈🥉🥽👓💍
  printStats() {
    console.log(`❤️ (${this.hitpoints})  -(${this.name})-`);
  }

  isAlive() {
    if (this.hitpoints > 0) {
      return (true);
    } else {
      console.log(`${this.name} is dead!`)
      return (false);
    }
  }



  attack(target) {
    const hit = Math.floor(Math.random() * 20) + 1;
    const defense = (Math.floor(Math.random() * 20) + 1);
    console.log(`${this.name} attacks! (${hit})vs(${defense})`)

    if (hit > defense + target.parry || (hit >= 20 - this.crit && defense != hit)) {
      // HIT or CRITICAL(!PARRY)
      // HIT damage is reduced by target.def
      var damage = Math.floor(Math.random() * this.strength) + 1 + this.atk - target.def;

      if (defense === 1) {
        // POOR DEFENSE on a roll of 1 attack does max.strength damage
        damage = this.strength + this.atk - target.def;
      }
      if (hit >= 20 - this.crit) {
        // CRITICAL range increased by attacker's.crit
        if (defense >= 20 - target.crit) {
          //MUTUAL CRITICAL nullifies 2x crit modifier
          //MUTUAL CRITICAL grants defender BASH attack
          var bash = Math.floor(Math.random() * target.def) + 1;
          if (defense > hit) {
            // higher defense roll recieves additional .crit bonus
            bash += Math.floor(Math.random() * target.crit) + 1;
            console.log(`${target.name} 🎯🛡️  MUTUAL CRITICAL!`);
          } else {
            // higher hit roll recieves additional .crit bonus
            damage += Math.floor(Math.random() * this.crit) + 1;
            console.log(`${this.name} 🎯🗡️  MUTUAL CRITICAL!`);
          }
          if (damage <= 0) {
            console.log(`${target.name} 🛡️  BLOCKED!`);
          } else {
            target.hitpoints -= damage;
            console.log(`${target.name} 🩸 takes ${damage} damage,`);
          }
          if (target.hitpoints > 0) {
            this.hitpoints -= bash;
            return `${this.name} 🛡️💨  takes ${bash}(shove) damage!`;
          } else {
            return `${target.name} stumbles!`
          }


        }
        // CRITICAL damage recieves additional attackers.strength dice roll &&  this.crit bonus
        if (defense + Math.floor(target.strength / 3) + target.def + target.parry <= 13 + (this.crit * 2)) {
          // CRITICAL additional damage is max.strength on a low defense roll
          // this effect range is reduced by the 1/3target's.strength + .def +.parry and increased by 2*attackers.crit
          damage += this.strength + this.crit;
          console.log(`${this.name} 🎯🎯  CRITICAL HIT!`);
        } else {
          damage += Math.floor(Math.random() * this.strength) + Math.floor(Math.random() * this.crit) + 1;
          console.log(`${this.name} 🎯  CRITICAL HIT!`);
        }
      }

      if (damage <= 0) {
        return `${target.name} 🛡️  BLOCKED!`;
      } else {
        target.hitpoints -= damage;
        return `${target.name} 🩸 takes ${damage} damage,`
      }

    } else if (hit >= defense && hit <= defense + target.parry) {
      // PARRY (range increased by parry stat)
      // PARRY occurs when hit = defense 
      if (defense >= 20 - target.crit - target.parry) {
        // CRITICAL PARRY (range increased by crit or parry stat)
        console.log(`${target.name} 🎯⚔️  CRITICAL PARRY!`)
        var glance = Math.floor(Math.random() * target.strength / 2) + 1 + target.parry + target.atk - this.def;

        if (glance <= 0) {
          console.log(`${this.name} ⚔️  BLOCKED!`);
        } else {
          this.hitpoints -= glance;
          console.log(`${this.name} 🩸  takes ${glance} damage!`);
        }
        if (this.hitpoints > 0) {
          if (hit >= 20 - this.crit - this.parry) {
            // CRITICAL RETALIATION (if oppenents parry is also a CRITICAL)
            console.log(`${this.name} 🎯⚔️  RETALIATES!`)
            var glance = Math.floor(Math.random() * this.strength / 2) + 1 + this.parry + this.atk - target.def;

            if (glance <= 0) {
              console.log(`${target.name} ⚔️  BLOCKED!`);
            } else {
              target.hitpoints -= glance;
              console.log(`${target.name} 🩸  takes ${glance} damage!`);
            }
          }
        } else {
          return (`${this.name} stumbles!`);
        }

      } else {
        // PARRY
        console.log(`${target.name}  ⚔️  PARRY!`);
      }
      // PARRY results in a INITIATIVE ROLL to reset turn order
      if (target.hitpoints > 0 && this.hitpoints > 0) {
        rollInit();
        if (graceTurn) {
          return (grace.attack(dijkstra));
        } else {
          return (dijkstra.attack(grace));
        }
      } else {
        return (`${target.name} stumbles!`);
      }


    } else {
      if (hit === 1) {
        // CRITICAL MISS (only roll of 1) causes OPPORTUNITY ATTACK
        // OPPORTUNITY ATTACK is a bonus attack that does not alter turn order
        console.log(`${this.name} 🎯💨  CRITICAL MISS!`);
        console.log(`${this.name} stumbles!`);
        console.log(`${target.name} gains opportunity attack!`);
        return (target.attack(this));
      } else if (defense >= 20 - target.crit) {
        // CRITICAL BLOCK (range increased by crit stat)
        console.log(`${target.name} 🎯🛡️  CRITICAL BLOCK!`);
        if (hit <= (target.def * 2) + Math.floor(Math.random(target.strength / 2)) + target.crit) {
          // BASH occurs when the blocked attack roll is lower than the combined defenders strength and defense
          // BASH damage is based on the defenders def value
          var bash = Math.floor(Math.random() * target.def) + 1 + Math.floor(Math.random() * target.crit);

          if (bash > 0) {
            this.hitpoints -= bash;
            console.log(`${this.name} 🛡️💨  takes ${bash}(shove) damage!`);
          }
        }
        if (this.hitpoints > 0) {
          //CRITICAL BLOCK results in an OPPORTUNITY ATTACK
          //OPPORTUNITY ATTACK is a bonus attack that does not alter turn order
          console.log(`${this.name} stumbles!`);
          console.log(`${target.name} gains opportunity attack!`);
          return (target.attack(this));
        } else {
          return (`${this.name} stumbles!`);
        }
      } else if (defense - Math.floor((this.strength) / 2) <= hit - (Math.floor(target.def / 1.1) + target.parry)) {
        //GLANCING ATTACK results in a halved attack if the HIT and DEFENSE rolls were close
        //GLANCING ATTACK range is increased by the Attacker's.strength and reduced by defender's.def
        //bigger weapons have a higher chance to cause partial damage vs low .def
        var glance = Math.floor(Math.random() * this.strength / 2) + 1 + this.atk - target.def;
        if (glance <= 0) {
          return `${target.name} 🗡️  BLOCKED!`;
        } else {
          target.hitpoints -= glance;
          return `${target.name} 🗡️  takes ${glance}(glancing) damage,`
        }
      } else {
        // BLOCK the attack did not land or do any damage
        return `${target.name} 🛡️  BLOCKED!`;
      }
    }
  }
}

module.exports = Combatant

// Creates two unique characters using the "character" constructor
// name, strength, hitpoints, atk, crit, def, parry   4, 60, 0, 0,0,0
// const grace = new Character('Grace', 10, 72, 3, 2, 3, 3); //15
// const dijkstra = new Character('Dijks', 4, 60, 0, 0, 0, 0); //16
// var graceTurn = true;



// ROLL INITIATIVE randomly determines who goes next
// rollInit() determines who attacks first and is triggered by a parry event
// function rollInit() {

//   const graceInit = Math.floor(Math.random() * 20) + 1;
//   const dijkstraInit = Math.floor(Math.random() * 20) + 1;

//   if (graceInit === dijkstraInit) {
//     rollInit()
//   } else if (dijkstraInit > graceInit) {
//     graceTurn = false;
//     console.log(`Initiative Roll:
// 🎲   (${dijkstraInit}) VS (${graceInit})
// ${dijkstra.name} moves first!`);
//   } else {
//     graceTurn = true;
//     console.log(`Initiative Roll:
// 🎲   (${graceInit}) VS (${dijkstraInit})
// ${grace.name} moves first!`);
//   }
// }

// grace.printStats();
// dijkstra.printStats();
// rollInit();

// const turnInterval = setInterval(() => {

//   // If either character is not alive, end the game
//   if (!grace.isAlive() || !dijkstra.isAlive()) {
//     clearInterval(turnInterval);
//     console.log('Game over!');
//   } else if (graceTurn) {
//     var result = grace.attack(dijkstra);
//     dijkstra.printStats();
//     grace.printStats();
//     console.log(result);
//   } else {
//     var result = dijkstra.attack(grace);
//     dijkstra.printStats();
//     grace.printStats();
//     console.log(result);
//   }

//   // Switch turns
//   graceTurn = !graceTurn;
// }, 1000);
