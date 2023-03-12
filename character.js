class Character {
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
  // TODO: Add a constructor 🛡️ ⚔️ 🩸 🎲
  printStats() {
    console.log(`❤️ (${this.hitpoints})  -(${this.name})-`);
  }
  // TODO: Create a printStats() method that console logs `this.name`, `this.strength`, and `this.hitPoints`
  isAlive() {
    if (this.hitpoints > 0) {
      return (true);
    } else {
      console.log(`${this.name} is dead!`)
      return (false);
    }
  }

  // TODO: Create a isAlive() method that returns a boolean based on whether or not a character's "hitpoints" are <= 0

  attack(target) {
    const hit = Math.floor(Math.random() * 20) + 1;
    const defense = Math.floor(Math.random() * 20) + 1;
    console.log(`${this.name} attacks! (${hit})vs(${defense})`)

    if (hit > defense + target.parry || (hit >= 20 - this.crit && defense != hit )) {
      var damage = Math.floor(Math.random() * this.strength) + 1 + this.atk - target.def;
      if (defense === 1) {
        damage = this.strength + this.atk - target.def;
      }
      if (hit >= 20 - this.crit) {
        if (defense + target.strength / 2 + target.def < 13 + this.crit) {
          damage += this.strength;
          console.log(`${this.name} 🎯🎯  CRITICAL HIT!`);
        } else {
          damage += Math.floor(Math.random() * this.strength) + 1;
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
      if (defense >= 20 - target.crit - target.parry) {
        console.log(`${target.name} 🎯⚔️  CRITICAL PARRY!`)
        var glance = Math.floor(Math.random() * target.strength / 3) + 1 + target.parry + target.atk - this.def;
        
        if (glance <= 0) {
          console.log(`${this.name} 🛡️  BLOCKED!`);
        } else {
          this.hitpoints -= glance;
          console.log(`${this.name} 🩸  takes ${glance} damage!`);
        }
        if (hit >= 20 - this.crit - this.parry) {
          console.log(`${this.name} 🎯⚔️  RETALIATES!`)
          var glance = Math.floor(Math.random() * this.strength / 3) + 1 + this.parry + this.atk - target.def;
          
          if (glance <= 0) {
            console.log(`${target.name} 🛡️  BLOCKED!`);
          } else {
            target.hitpoints -= glance;
            console.log(`${target.name} 🩸  takes ${glance} damage!`);            
          }
        }
      } else {
        console.log(`${target.name}  ⚔️  PARRY!`)
      }
      rollInit();
      if (graceTurn) {
        return (grace.attack(dijkstra));
      } else {
        return (dijkstra.attack(grace));
      }

    } else {
      if (hit === 1) {
        console.log(`${this.name} 🎯💨  CRITICAL MISS!
${this.name} stumbles!
${target.name} gains opritunity attack!`);
        return (target.attack(this));        
      } else if (defense === 20) {
        console.log(`${target.name} 🎯🛡️  CRITICAL BLOCK!`);
        if (hit <= target.strength + target.def) {
          var bash = Math.floor(Math.random() * this.def) + 1 + this.atk - target.def;
          
          if (bash > 0) {
            this.hitpoints -= bash;
            console.log(`${this.name} 🛡️  takes ${bash}(shove) damage!`);
          }          
        } 
        console.log(`${this.name} stumbles!
${target.name} gains opritunity attack!`);
          return (target.attack(this));
      } else if (defense - this.strength / 2 <= hit - target.def) {
        var glance = Math.floor(Math.random() * this.strength / 2) + 1 + this.atk - target.def;
        if (defense - this.strength / 2 === hit - target.def) {
          glance = Math.floor(Math.random() * this.strength / 3) + 1 + this.atk - target.def;
        }
        if (glance <= 0) {
          return `${target.name} 🛡️  BLOCKED!`;
        } else {
          target.hitpoints -= glance;
          return `${target.name} 🗡️  takes ${glance}(glancing) damage,`
        }
      } else {

        return `${target.name} 🛡️  BLOCKED!`;
      }
    }
  }

  // TODO: Create a attack() method that accepts an opponent object and decreases the opponent's "hitPoints" by this character's strength
}

// Creates two unique characters using the "character" constructor
// name, strength, hitpoints, atk, crit, def, parry
const grace = new Character('Grace', 12, 50, 0, 0, 0, 0);
const dijkstra = new Character('Dijks', 4, 50, 0, 0, 4, 0);
var graceTurn = true;
// This keeps track of whose turn it is
function rollInit() {
  const graceInit = Math.floor(Math.random() * 20);
  const dijkstraInit = Math.floor(Math.random() * 20);


  if (graceInit === dijkstraInit) {
    rollInit()
  } else if (dijkstraInit > graceInit) {
    graceTurn = false;
    console.log(`Initiative Roll:
🎲   (${dijkstraInit}) VS (${graceInit})
${dijkstra.name} moves first!`);
  } else {
    graceTurn = true;
    console.log(`Initiative Roll:
🎲   (${graceInit}) VS (${dijkstraInit})
${grace.name} moves first!`);
  }
}

grace.printStats();
dijkstra.printStats();
rollInit();

const turnInterval = setInterval(() => {

  // If either character is not alive, end the game
  if (!grace.isAlive() || !dijkstra.isAlive()) {
    clearInterval(turnInterval);
    console.log('Game over!');
  } else if (graceTurn) {
    var result = grace.attack(dijkstra);
    dijkstra.printStats();
    grace.printStats();
    console.log(result);
  } else {
    var result = dijkstra.attack(grace);
    dijkstra.printStats();
    grace.printStats();
    console.log(result);
  }

  // Switch turns
  graceTurn = !graceTurn;
}, 500);
