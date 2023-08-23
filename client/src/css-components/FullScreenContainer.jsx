import {Container} from "@mui/material";
import {styled} from "@mui/system";

const FullScreenContainer = styled(Container)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    overflow: "hidden",
})

export default FullScreenContainer;