
import Login from "./Login";
import {connect} from "react-redux";
import {loginUser} from "../../redux/reducers/auth_reducer";


export default connect(null, {loginUser})(Login)