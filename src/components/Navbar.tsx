import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";

import React from "react";
import NextLink from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../store/auth/authSlice";
import { DarkModeSwitch } from "./DarkModeSwitch";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  let body = null;
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  if (user === undefined) {
    body = (
      <Flex>
        <NextLink href="/signin">
          <Button width="100%" px={4} mx={4} variant="ghost" colorScheme="gray">
            Sign In
          </Button>
        </NextLink>
        <NextLink href="/signup">
          <Button
            width="100%"
            px={4}
            mx={4}
            variant="solid"
            colorScheme="twitter"
          >
            Sign Up
          </Button>
        </NextLink>
      </Flex>
    );
  } else if (user != null) {
    body = (
      <Flex>
        <Center>
          <Heading as="h6" colorScheme="twitter" size="md">
            {user.displayName}
          </Heading>
        </Center>
        <Center px={4}>
          <NextLink href="/app">
            <Link>
              <Heading size="md">Apps</Heading>
            </Link>
          </NextLink>
        </Center>
        <Button
          variant="ghost"
          colorScheme="twitter"
          onClick={async () => {
            dispatch(logout());
          }}
        >
          Logout
        </Button>
      </Flex>
    );
  }
  const bg = useColorModeValue("blue.200", "blue.500");

  return (
    <Flex zIndex={1} position="sticky" top={0} w={"100%"} bg={bg} p={4}>
      <Flex flex={1} m="auto" align="normal">
        <Center>
          <NextLink href="/">
            <Link>
              <Heading size="md">ONDB</Heading>
            </Link>
          </NextLink>
        </Center>
        <Box ml={"auto"}>{body}</Box>
        <Center>
          <DarkModeSwitch />
        </Center>
      </Flex>
    </Flex>
  );
};
