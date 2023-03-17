import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { LOGIN } from "../utils/gql/mutations";
import { QUERY_ME } from "../utils/gql/queries";
import Inventory from './Inventory'
import Auth from "../utils/Auth";

// import Inventory from '../pages/Inventory';


const Login = (props) => {
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN);

  // Update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      console.log({ data });
      Auth.login(data.login.token);


    } catch (e) {
      console.error(JSON.parse(JSON.stringify(e)));
    }

    // Clear form values 
    setFormState({
      username: "",
      password: "",
    });


  };

  return (
    <>
      {data ? (
        <Inventory />
      ) : (<section className="section">
        <div className="container">
          <div className="columns is-centered">
            <form onSubmit={handleFormSubmit}>
              <div className="column is-12">
                <div className="field">
                  <label className="label">Username</label>
                  <div className="control">
                    <input
                      className="input"
                      type="test"
                      placeholder="Your Username"
                      name="username"
                      value={formState.username}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      className="input"
                      type="password"
                      placeholder="******"
                      name="password"
                      value={formState.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <button
                      className="button is-info"
                      style={{ cursor: "pointer" }}
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </div>
                <div><Link to="/signup" >
                  Create A New Character
                </Link></div>
              </div>
            </form>
          </div>
        </div> </section>
      )}
      {error && (
        <div className="notification is-danger">
          <p className="my-3">{error.message}</p>
        </div>
      )}

    </>
  );
};

export default Login;
