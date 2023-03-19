import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { LOGIN } from "../utils/gql/mutations";
import { QUERY_ME } from "../utils/gql/queries";
var health = Math.floor(45/60);
var messageBody = document.querySelector('.scroll');
// messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;

const Fight = (props) => {
    const { loading, data, error } = useQuery(QUERY_ME);
    console.log(data);
    return (
        <>
            <div className="tile is-ancestor">
                <div className="tile is-vertical is-12">
                    <div className="tile">
                        <div className="tile is-parent">
                            <div className="has-text-left tile is-child box">
                                <div className="is-inline health-display">
                                    ❤️<progress id="health" value="40" max="100"></progress> (60)
                                </div>
                                <p className="title">One</p>
                                <p className="subtitle">Subtitle</p>
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
        </>
    );
}

export default Fight;