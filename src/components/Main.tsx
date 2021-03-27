import { Container } from "@chakra-ui/react";
import React from "react";
import { Navbar } from "./Navbar";


export const Main = () => (
  <Container
    flexDirection="column"
    width="100%"
    py={2}
  >
    <Navbar />

  </Container>
)
