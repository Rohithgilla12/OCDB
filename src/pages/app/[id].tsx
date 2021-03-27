import {
  Box,
  Button,
  Flex,
  Text,
  Image,
  useClipboard,
  useColorModeValue,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TimeAgo from "react-timeago";
import { Container } from "../../components/Container";
import { InputField } from "../../components/InputField";
import MotionBox from "../../components/MotionBox";
import { Navbar } from "../../components/Navbar";
import { Pair } from "../../components/Pair";
import {
  createNewPair,
  currentApp,
  listenToPairs,
  setApplicationID,
} from "../../store/app/appSlice";

interface AppEditProps {}

const AppEdit: React.FC<AppEditProps> = ({}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { id } = router.query;

  useEffect(() => {
    dispatch(setApplicationID(id as string));
    dispatch(listenToPairs());
  }, [id]);

  const app = useSelector(currentApp);

  const bg = useColorModeValue("blue.700", "gray.700");

  const { hasCopied, onCopy } = useClipboard(
    `https://ocdb.vercel.app/api/ondb/${id}`
  );

  return (
    <Container>
      <Navbar />
      <Flex w={"full"}>
        <Box mx={8} flex="3">
          {app &&
            app.oneClicks?.map((oneclick) => (
              <Pair oneClick={oneclick} key={oneclick.id} />
            ))}
          {app && app.oneClicks?.length === 0 && (
            <Image
              src="/add.svg"
              height={"350px"}
              objectFit="contain"
              width={"100%"}
              mt={16}
            />
          )}
        </Box>
        <Box display="flex" flexDirection="column" flex="1">
          {app && (
            <MotionBox
              initial={{ opacity: 0.0 }}
              animate={{ opacity: 1.0 }}
              transition={{ duration: 1.5 }}
              borderRadius="xl"
              bg={bg}
              mr={8}
              my={4}
              p={4}
            >
              <Text fontWeight="semibold">Application Details</Text>
              <Text> {app.name}</Text>
              <TimeAgo date={app.createdAt} />
            </MotionBox>
          )}

          <Box borderRadius="xl" bg={bg} mr={8} my={4}>
            <Formik
              initialValues={{ key: "", value: "" }}
              onSubmit={async (values, { setErrors, resetForm }) => {
                if (!values.key) {
                  setErrors({
                    key: "Name is required",
                  });
                }
                if (!values.value) {
                  setErrors({
                    value: "Value cannot be empty",
                  });
                } else {
                  dispatch(createNewPair(values.key, values.value));
                  resetForm();
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Box m={4}>
                    <InputField name="key" placeholder="Name" label="Name" />
                  </Box>
                  <Box m={4}>
                    <InputField
                      name="value"
                      placeholder="Value"
                      label="Value"
                    />
                  </Box>
                  <Box m={4}>
                    <Button
                      type="submit"
                      isLoading={isSubmitting}
                      colorScheme="blue"
                      w={"full"}
                    >
                      Add to Database
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
          <MotionBox
            initial={{ opacity: 0.0 }}
            animate={{ opacity: 1.0 }}
            transition={{ duration: 1.5 }}
            borderRadius="xl"
            bg={bg}
            mr={8}
            my={4}
            p={4}
          >
            <NextLink href={`/api/ondb/${id}`}>
              <Button w={"full"} mr={8} variant="solid" colorScheme="twitter">
                API Endpoint
              </Button>
            </NextLink>
            <Button
              w={"full"}
              mr={8}
              mt={4}
              variant="solid"
              colorScheme="twitter"
              onClick={onCopy}
            >
              {hasCopied ? "Copied" : "Copy To Clipboard"}
            </Button>
          </MotionBox>
        </Box>
      </Flex>
    </Container>
  );
};

export default AppEdit;
