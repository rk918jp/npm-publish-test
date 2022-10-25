import React from "react";
import {Button} from "@mui/material";
import styled from "@emotion/styled";

const StyledButton = styled(Button)`
  color: red;
`

export const MyButton = (props) => {
  return (
    <StyledButton {...props} />
  )
}