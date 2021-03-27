import { StarIcon } from "@chakra-ui/icons";
import {
  SimpleGrid,
  Text,
  Box,
  Image,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import IframeResizer from "iframe-resizer-react";

import { Container } from "./Container";
import MotionBox from "./MotionBox";
import { Navbar } from "./Navbar";

export const Landing = () => {
  return (
    <Container flexDirection="column" width="100%">
      <Navbar />
      <SimpleGrid px={16} mx={16} py={8} m={8} columns={{ sm: 1, md: 1 }}>
        <MotionBox
          height="40px"
          initial={{ opacity: 0.0 }}
          animate={{ opacity: 1.0 }}
          transition={{ duration: 1.5 }}
          my={4}
          py={4}
        >
          <Text fontSize="4xl" textAlign="center" fontWeight="semibold">
            Turn Any Website into a Web App with ease.
          </Text>
        </MotionBox>
        <MotionBox
          height="40px"
          initial={{ opacity: 0.0 }}
          animate={{ opacity: 1.0 }}
          transition={{ duration: 1.5 }}
          my={4}
          py={8}
        >
          <Text
            fontSize="2xl"
            textColor="ActiveCaption"
            textAlign="center"
            fontWeight="light"
          >
            Build in seconds, not weeks. One Click DB is a small but powerful
            content management system, that allows you to build simple yet
            powerful backend for your websites easily and quickly. It's fast,
            lightweight and easy to use.
          </Text>
        </MotionBox>
        <Image
          src="/bg.svg"
          height={"350px"}
          objectFit="contain"
          width={"100%"}
          mt={16}
        />
        <SimpleGrid columns={{ sm: 1, md: 2 }} my={8} p={8}>
          <Box>
            <Image
              src="/list.svg"
              height={"full"}
              objectFit="contain"
              width={"100%"}
            />
          </Box>
          <MotionBox
            initial={{ opacity: 0.0 }}
            animate={{ opacity: 1.0 }}
            transition={{ duration: 1.5 }}
            p={8}
            mx={4}
          >
            <Text fontWeight="semibold" textAlign="center" fontSize="3xl">
              Features
            </Text>
            <List spacing={4}>
              <ListItem fontSize="2xl">
                <ListIcon as={StarIcon} color="yellow.300" />
                One Click installation
              </ListItem>
              <ListItem fontSize="2xl">
                <ListIcon as={StarIcon} color="yellow.300" />
                Create links easily
              </ListItem>
              <ListItem fontSize="2xl">
                <ListIcon as={StarIcon} color="yellow.300" />
                All regular features plus a lot more!
              </ListItem>
              <ListItem fontSize="2xl">
                <ListIcon as={StarIcon} color="yellow.300" />
                Turn Any Website into a Web App
              </ListItem>
              <ListItem fontSize="2xl">
                <ListIcon as={StarIcon} color="yellow.300" />
                Make remote configuration to your web app on the fly
              </ListItem>
              <ListItem fontSize="2xl">
                <ListIcon as={StarIcon} color="yellow.300" />
                Features to add i18n to your app and many more in the future.
              </ListItem>
            </List>
          </MotionBox>
        </SimpleGrid>
        <Box my={8}>
          <MotionBox
            initial={{ opacity: 0.0 }}
            animate={{ opacity: 1.0 }}
            transition={{ duration: 1.5 }}
          >
            <Text fontWeight="semibold" textAlign="center" fontSize="3xl">
              Testimonials
            </Text>
          </MotionBox>
          <IframeResizer
            src="https://embed.testimonial.to/w/ondb?theme=dark&card=large"
            style={{ width: "1px", minWidth: "100%" }}
          />
        </Box>
      </SimpleGrid>
    </Container>
  );
};
