import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";
import { Field, Label, Control, Input, Button, Columns, Notification,} from "react-bulma-components";

const Login = (props) => {
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

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

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // Clear form values
    setFormState({
      username: "",
      password: "",
    });
  };

  return (
    <Section>
      <Container>
        <Columns className="is-centered">
          {data ? (
            <Inventory />
          ) : (
            <Columns.Column size={6}>
              <Field>
                <Label>Username</Label>
                <Control>
                  <Input
                    type="username"
                    placeholder="Your Username"
                    name="username"
                    value={formState.username}
                    onChange={handleChange}
                  />
                </Control>
              </Field>
              <Field>
                <Label>Password</Label>
                <Control>
                  <Input
                    type="password"
                    placeholder="******"
                    name="password"
                    value={formState.password}
                    onChange={handleChange}
                  />
                </Control>
              </Field>
              <Field>
                <Control>
                  <Button
                    color="info"
                    style={{ cursor: "pointer" }}
                    type="submit"
                    fullwidth
                  >
                    Submit
                  </Button>
                </Control>
              </Field>
            </Columns.Column>
          )}
          {error && (
            <Notification color="danger">
              <p className="my-3">{error.message}</p>
            </Notification>
          )}
        </Columns>
      </Container>
    </Section>
  );
};

export default Login;
