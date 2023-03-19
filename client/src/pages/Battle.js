import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { LOGIN } from "../utils/gql/mutations";
import { Container, Button } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import { QUERY_ME, QUERY_OPPONENT } from "../utils/gql/queries";
var health = Math.floor(45/60);
var messageBody = document.querySelector('.scroll');
// messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;

//interval turn(
    // inverval modifierRoll(
        //if nextroll is (initiative or hit) > clearinterval
        //executeAction()
             //modify actionDesc, nextRoll, Attacker, HP
        //ifDead(clear))
        //2 SEC
    //ifDead(clear)
    //performRoll (hit or init)
        //actionDesc = describe roll (x attacks, Roll initaive)

    
function Battle() {
    // messageBodyArray
    // variables:  actionRoll1 actionIcon1 actionRoll1 actionIcon1
    //              actionDesc, nextRollType
    //
    //fight()
    //performRoll(type: nextroll) setDice, turns++, setTurn
    //executeAction(nextroll(when nextroll is an attack)
    const [formState, setFormState] = useState({ 
        username: "",
        password: ""
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
      } else if (data && data2) {
        console.log(data);
        console.log(data2);

      } else {
        console.log(JSON.parse(JSON.stringify(error)))
      }
    return (
        <>          
            <Container>
            <div className="tile is-ancestor">
                <div className="tile is-vertical is-12">
                    <div className="tile">
                        <div className="tile is-parent">
                            <div className="has-text-left tile is-child box">
                            <progress className="progress is-danger column" id="health" value="40" max={data.me.statblock.hp}></progress>
                                <div className="is-inline health-display">
                                     <Badge className='column is-pulled-left' style={{ display: 'inline-block', fontSize: '33px',  boxShadow: ' 0 0 8px #999', padding: '0.5em 0.6em', margin:'0px' }}>0</Badge>
                                </div>
                                <div>
                                
                                <p className="title">{data.me.name}</p>
                                <p className="subtitle">Subtitle</p>
                                </div>
                            </div>
                        </div>
                        <div className="tile is-parent">
                            <article className="has-text-right tile is-child box">
                            <div className="is-inline health-display">
                                    (60)<progress id="health" value="40" max="100"></progress>❤️
                                </div>
                                <p className="title">Two</p>
                                <p className="subtitle">Subtitle</p>
                            </article>
                        </div>
                    </div>
                    <div className="tile is-parent">
                        <article className=" box panel-Body scroll">
                            <p className="title">Three</p>
                            <p className="subtitle">Subtitle</p>
                        </article>
                    </div>
                </div>                
            </div>
            <div className="tile is-ancestor">
                <div className="tile is-parent is-3">
                    <article className="has-text-centered tile is-child box">
                        <p className="title">🎲🗡️ (20)</p>
                        <p className="subtitle">Subtitle</p>
                    </article>
                </div>
                <div className="tile is-parent is-6">
                    <article className="has-text-centered tile is-child box">
                        <p className="title">Seven</p>
                        <p className="subtitle">Subtitle</p>
                    </article>
                </div>
                <div className="tile is-parent is-3">
                    <article className="has-text-centered tile is-child box">
                        <p className="title">🎲🛡️ (12)</p>
                        <p className="subtitle">Subtitle</p>
                    </article>
                </div>
            </div>
            </Container>
        </>
    );
}

export default Battle;