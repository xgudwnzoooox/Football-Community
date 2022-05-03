import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return(
    <nav>
      <ul>
        <li>
          <Link to="/" style={{ marginRight: 10 }}>
            Home
            {/* <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" /> */}
          </Link>
        </li>
        <li>
          <Link to="/postfactory" >게시물 작성</Link>
        </li>
      </ul>
    </nav>
  );
}
export default Navigation;