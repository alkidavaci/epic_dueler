import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { LOGIN } from "../utils/gql/mutations";
import { Container, Button } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import { QUERY_ME, QUERY_OPPONENT } from "../utils/gql/queries";
import { Combatant } from "../utils/character";
var health = Math.floor(45 / 60);
var battleLoad = 0;
var playerTurn = true;
const playerLogCss = 'is-pulled-right log';
const opponentLogCss = 'has-text-right log';
const rollLogCss = 'tag is-info log is-large is-light';


//interval turn(
// inverval modifierRoll(
//if nextroll is (initiative or hit) > clearinterval
//executeAction()
//modify actionDesc, nextRoll, Attacker, HP
//ifDead(clear))
//2 SEC
//ifDead(clear)
//performRoll (hit or init)
//actionDesc = describe roll ("character attacks!", "Roll initaive")
//sets next roll (attack or hit)
//)1 SEC



function Battle() {

    // messageBodyArray
    // form stat variables:  
    //              actionRoll1 actionIcon1 actionRoll1 actionIcon1
    //              actionDesc, nextRollType
    //              currentHp1, currentHp2
    //
    //fight()
    //performRoll(type: nextroll) setDice, turns++, setTurn
    //executeAction(nextroll(when nextroll is an attack)
    const [battleState, setbattleState] = useState({
        playerRoll: 0,
        opponentRoll: 0,
        playerRollIcon: '🌀',
        opponentRollIcon: '🌀',
        actionDes: 'START BATTLE',
        playerHp: 60, //data.me.statblock.hp,
        opponentHp: 60, //data2.opponent.statblock.hp
        nextRoll: 'rollInit', //
        combatLog: [{action: 'PLayer one Attacks!', bulma: playerLogCss}, {action: 'Player two takes 800 damage', bulma: opponentLogCss}, {action: 'test', bulma: rollLogCss}],
    });
    const opponent = localStorage.getItem('current_opponent')
        ? JSON.parse(localStorage.getItem('current_opponent'))
        : false;
    console.log(opponent);
    var myStats;
    var opponentStats;
    const { loading, data, error } = useQuery(QUERY_ME);
    const { loading: loading2, data: data2 } = useQuery(QUERY_OPPONENT, {
        variables: { name: opponent },
    });

    if (loading || loading2) {
        return <div>Loading...</div>;
    } else if (data && data2 && battleLoad === 0) {
        console.log(battleLoad);
        battleLoad++;
    } else if (data && data2) {
        battleState.playerHp = data.me.statblock.hp;
        battleState.opponentHp = data2.opponent.statblock.hp;
        console.log(battleState);


    } else {
        console.log(JSON.parse(JSON.stringify(error)))
    }

    

    const startFight = () => {
        // const turnInterval = setInterval(() => {

        //     // If either character is not alive, end the game
        //     if (!grace.isAlive() || !dijkstra.isAlive()) {
        //       clearInterval(turnInterval);
        //       console.log('Game over!');
        //     } else if (graceTurn) {
        //       var result = grace.attack(dijkstra);
        //       dijkstra.printStats();
        //       grace.printStats();
        //       console.log(result);
        //     } else {
        //       var result = dijkstra.attack(grace);
        //       dijkstra.printStats();
        //       grace.printStats();
        //       console.log(result);
        //     }
          
        //     // Switch turns
        //     graceTurn = !graceTurn;
        //   }, 1000);

        
        rollInit();

        console.log(battleState.nextRoll, playerTurn);
    };

    function rollInit() {

        const playerInit = Math.floor(Math.random() * 20) + 1;
        const opponentInit = Math.floor(Math.random() * 20) + 1;
        setbattleState({
            ...battleState,
            playerRoll: playerInit,
            opponentRoll: opponentInit,
          });

        if (playerInit === opponentInit) {
            rollInit()
        } else if (opponentInit > playerInit) {
            playerTurn = false;
            battleState.combatLog.push({ "action": `(${opponentInit}) 🎲  INITIATIVE ROLL  🎲 (${playerInit})`, "bulma": rollLogCss });
            battleState.combatLog.push({ "action": `${data2.opponent.name} moves first!`, "bulma": opponentLogCss });
        } else {
            playerTurn = true;
            battleState.combatLog.push({ "action": `(${opponentInit}) 🎲  INITIATIVE ROLL  🎲 (${playerInit})`, "bulma": rollLogCss });
            battleState.combatLog.push({ "action": `${data.me.name} moves first!`, "bulma": playerLogCss });
        }
        battleState.nextRoll = 'attack';
    }

    



    return (
        <>
            <Container>
                <div className="tile is-ancestor">
                    <div className="tile is-vertical is-12">
                        <div className="tile">
                            <div className="tile is-parent">
                                <div className="has-text-left tile is-child box">
                                    <progress className="progress is-danger" id="health" value={battleState.playerHp} max={data.me.statblock.hp}></progress>
                                    <div className="is-inline health-display">
                                        <Badge className='column is-pulled-right' style={{ display: 'inline-block', fontSize: '25px', borderRadius: '60px', boxShadow: ' 0 0 8px #999', padding: '0.5em 0.6em', margin: '0px' }}>{battleState.playerHp}/{data.me.statblock.hp}</Badge>
                                        <p className="title">{data.me.name}</p>
                                        <p className="subtitle">
                                            {/* {data.me.inventory.forEach((slot) => (
                                    <Badge className='is-pulled-left' style={{ display: 'inline-block', fontSize: '12px', borderRadius: '60px', boxShadow: ' 0 0 8px #999', padding: '0.5em 0.6em', margin:'0px' }}>{slot.icon}</Badge>
                                ))} */}
                                        </p>
                                    </div>
                                    <div>


                                    </div>
                                </div>
                            </div>
                            <div className="tile is-parent">
                                <article className="has-text-right tile is-child box">
                                    <div className="is-inline health-display">
                                    <progress className="progress is-danger" id="health" value={battleState.opponentHp} max={data2.opponent.statblock.hp}></progress>
                                    <div className="is-inline health-display">
                                        <Badge className='column is-pulled-left' style={{ display: 'inline-block', fontSize: '25px', borderRadius: '60px', boxShadow: ' 0 0 8px #999', padding: '0.5em 0.6em', margin: '0px' }}>{battleState.opponentHp}/{data2.opponent.statblock.hp}</Badge>
                                        <p className="title">{data2.opponent.name}</p>
                                        <p className="subtitle">
                                            {/* {data.me.inventory.forEach((slot) => (
                                    <Badge className='is-pulled-left' style={{ display: 'inline-block', fontSize: '12px', borderRadius: '60px', boxShadow: ' 0 0 8px #999', padding: '0.5em 0.6em', margin:'0px' }}>{slot.icon}</Badge>
                                ))} */}
                                        </p>
                                    </div>
                                    </div>                                    
                                </article>
                            </div>
                        </div>
                        <div className="tile is-parent">
                            <div id="messageBody" className="panel-Body box scroll is-size-4 is-size-6-mobile">
                                {battleState.combatLog.map((element) => (<div className={element.bulma}>{element.action}</div>))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="level is-ancestor">
                    <div className="level-item is-parent is-3">
                        <div className="has-text-left tile is-child box">
                            <p className="title">🎲{battleState.playerRollIcon} ({battleState.playerRoll})</p>

                        </div>
                    </div>
                    <div className="tile is-parent is-6">
                        <article className="has-text-centered tile is-child box" onClick={() => (startFight())}>
                            <p className="title">{battleState.actionDes}</p>
                        </article>
                    </div>
                    <div className="tile is-parent is-3">
                        <article className="has-text-right tile is-child box">
                            <p className="title">🎲{battleState.opponentRollIcon} ({battleState.opponentRoll})</p>
                        </article>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default Battle;