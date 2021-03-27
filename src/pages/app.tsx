import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spinner,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { Container } from "next/app";
import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Formik, Form } from "formik";
import { InputField } from "../components/InputField";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../store/auth/authSlice";
import {
  createApplication,
  isAppLoading,
  userApps,
} from "../store/app/appSlice";
import AppCard from "../components/AppCard";
import OneClickApp from "../types/oneClickApp";
import { useRouter } from "next/router";
import { auth } from "../store/constants";

interface AppProps {}

const App: React.FC<AppProps> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useSelector(selectUser);
  const apps = useSelector(userApps);
  const isLoading = useSelector(isAppLoading);
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.currentUser === null) {
      router.push("/signin");
    }
  }, []);

  return (
    <Container m={16} p={16}>
      <Navbar />

      {apps.length == 0 && (
        <SimpleGrid>
          <Image
            src="/add.svg"
            height={"350px"}
            objectFit="contain"
            width={"100%"}
            mt={16}
          />
        </SimpleGrid>
      )}

      <SimpleGrid columns={{ sm: 1, md: 4 }} p={4} m={4}>
        {apps.map((app: OneClickApp) => (
          <AppCard key={app.id} app={app} />
        ))}
      </SimpleGrid>

      <Container alignContent="center">
        <Button
          position="fixed"
          bottom="0"
          w={"full"}
          my={8}
          colorScheme="twitter"
          onClick={onOpen}
        >
          Create a new Application
        </Button>
      </Container>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Formik
            initialValues={{ appName: "" }}
            onSubmit={async (values, { setErrors }) => {
              if (!values.appName) {
                setErrors({
                  appName: "App Name is required",
                });
              } else if (values.appName.length < 3) {
                setErrors({
                  appName:
                    "Length of application name should be greater than 3 characters",
                });
              } else {
                if (user != null) {
                  dispatch(createApplication(values.appName, user.uid));
                }
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <ModalHeader>Create your application</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <InputField
                    name="appName"
                    placeholder="Application Name"
                    label="Application Name"
                  />
                </ModalBody>

                <ModalFooter>
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <Button
                      type="submit"
                      isLoading={isSubmitting}
                      colorScheme="blue"
                      mr={3}
                    >
                      Create
                    </Button>
                  )}

                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default App;
