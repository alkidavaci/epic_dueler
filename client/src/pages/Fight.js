import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { LOGIN } from "../utils/gql/mutations";
import { QUERY_ME } from "../utils/gql/queries";


const Fight = (props) => {
    console.log(props);
    return (
        <>
          <p>Fight</p>
        </>
      );
}

export default Fight;