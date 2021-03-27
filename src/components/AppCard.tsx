import { Box } from "@chakra-ui/layout";
import React from "react";
import OneClickApp from "../types/oneClickApp";
import { Text, useColorModeValue } from "@chakra-ui/react";
import TimeAgo from "react-timeago";
import NextLink from "next/link";
import { useDispatch } from "react-redux";
import { setApplicationID } from "../store/app/appSlice";

interface AppCardProps {
  app: OneClickApp;
}

const AppCard: React.FC<AppCardProps> = ({ app }) => {
  const dispatch = useDispatch();

  const bg = useColorModeValue("blue.200", "blue.500");
  return (
    <NextLink href={`app/${app.id}`}>
      <Box
        onClick={() => dispatch(setApplicationID(app.id))}
        cursor="pointer"
        m={4}
        p={4}
        bg={bg}
        borderRadius="lg"
      >
        <Text>{app.name}</Text>
        <Text fontSize="xs">
          <TimeAgo date={app.createdAt} />
        </Text>
      </Box>
    </NextLink>
  );
};

export default AppCard;
