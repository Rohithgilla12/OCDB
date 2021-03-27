import { Box, Button, Container, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { InputField } from "../components/InputField";
import { Navbar } from "../components/Navbar";
import { login, loginWithEmail } from "../store/auth/authSlice";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { auth } from "../store/constants";

interface SigninProps {}

const Signin: React.FC<SigninProps> = ({}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.currentUser !== null) {
      router.push("/app");
    }
  }, [auth.currentUser]);

  return (
    <Container flexDirection="column" width="100%" m={0} p={0} maxW="full">
      <Navbar />
      <Flex direction={"column"} px={16} my={16}>
        <Container>
          <Formik
            initialValues={{ email: "", displayName: "", password: "" }}
            onSubmit={async (values, { setErrors }) => {
              if (!values.email) {
                setErrors({
                  email: "Email is required",
                });
              }
              if (!values.password) {
                setErrors({
                  password: "Password is required",
                });
              }
              if (values.email && values.password) {
                dispatch(loginWithEmail(values.email, values.password));
              }
              router.push("/app");
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField
                  name="displayName"
                  placeholder="Display Name"
                  label="Display Name"
                />
                <Box mt={4}>
                  <InputField name="email" placeholder="Email" label="Email" />
                </Box>
                <Box mt={4}>
                  <InputField
                    name="password"
                    placeholder="password"
                    label="Password"
                    type="password"
                  />
                </Box>
                <Button
                  mt={4}
                  type="submit"
                  isLoading={isSubmitting}
                  colorScheme="green"
                  w={"full"}
                >
                  Sign In
                </Button>
              </Form>
            )}
          </Formik>
          <Button
            w={"full"}
            my={8}
            colorScheme="green"
            onClick={() => {
              dispatch(login());
            }}
          >
            Sign In With Google
          </Button>
        </Container>
      </Flex>
    </Container>
  );
};

export default Signin;
