import React, { useState } from 'react';
import { ADD_ACCOUNT } from '../../utils/gql/mutations';

import { useMutation } from '@apollo/client';

import Inventory from '../pages/Inventory';
import Auth from '../../utils/Auth';

const Signup = () => {
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [addProfile, { error, data }] = useMutation(ADD_ACCOUNT);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addProfile({
                variables: { ...formState },
            });

            Auth.login(data.addProfile.token);
        } catch (e) {
            console.error(e);
        }

        setFormState({
            username: "",
            email: "",
            password: "",
        });

    };

    return (

        <main className="section">
            <div className="container">
                <div className="columns is-centered">
                    <div className="card-body">
                        <h4 className='label columns is-centered' style={{}}>Sign Up</h4>
                        {data ? (
                            <Inventory />
                        ) : (
                            <form onSubmit={handleFormSubmit}>
                                <div className='column is-12'>
                                    <div className='field'>
                                        <label className='label'>Username</label>
                                        <div className='control'>
                                            <input
                                                className="input"
                                                placeholder="Your username"
                                                name="username"
                                                type="text"
                                                value={formState.username}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className='field'>
                                            <label className='label'>Email</label>
                                            <input
                                                className="input"
                                                placeholder="Your email"
                                                name="email"
                                                type="email"
                                                value={formState.email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className='field'>
                                            <label className='label'> Password</label>
                                            <div className='control'><input
                                                className="input"
                                                placeholder="******"
                                                name="password"
                                                type="password"
                                                value={formState.password}
                                                onChange={handleChange}
                                            />
                                            </div>
                                        </div>
                                        <button
                                            className="button is-info"
                                            style={{ cursor: 'pointer' }}
                                            type="submit"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}

                        {error && (
                            <div className="notification is-danger">
                                {error.message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main >
    );
};







export default Signup;

