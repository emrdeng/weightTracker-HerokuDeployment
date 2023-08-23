import {Container} from "@mui/material";
import {styled} from "@mui/system";

const LoginBox = styled(Container)({
    display: "inline-block",
    textAlign: "center",
    maxWidth: "500px",
    padding: "30px",
    margin: "20px",
    border: "1px solid #eee",
    borderRadius: "10px",
    background: "#fff",
    boxShadow: "#7779861a 30px 0px 20px",
    boxSizing: "border-box",
    justifyContent: "center",
    alignItems: "center",
    height: {
        sm: "50%",
        lg: "35%"
    },
})

export default LoginBox;