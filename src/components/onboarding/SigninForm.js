import React from "react";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
  Flex,
} from "@chakra-ui/react";
import { PasswordField } from "./PasswordField";
import { FcGoogle } from "react-icons/fc";

const Signin = () => {
  return (
    <Flex justifyContent='center' alignItems='center' height='100%'>
      <Container
        justifyContent='center'
        alignItems='center'
        fontFamily={"Spline Sans Variable,-apple-system,system-ui,sans-serif"}
        maxW='lg'
        py={{ base: "12", md: "2" }}
        px={{ base: "0", sm: "8" }}
      >
        <Stack spacing='8'>
          <Stack spacing='6'>
            <Stack spacing={{ base: "2", md: "3" }} textAlign='center'>
              <Heading fontSize={{ base: "2xl", md: "3xl" }}>
                Log in to your account
              </Heading>
              <Text color='grey'>
                Dont have an account?{" "}
                <Link color='teal' href='/signup'>
                  Sign up
                </Link>
              </Text>
            </Stack>
          </Stack>
          <Box
            py={{ base: "0", sm: "12" }}
            px={{ base: "4", sm: "10" }}
            bg={{ base: "transparent", sm: "bg.surface" }}
            boxShadow={{ base: "none", sm: "md" }}
            borderRadius={{ base: "none", sm: "xl" }}
          >
            <Stack spacing='6'>
              <Stack spacing='5'>
                <FormControl>
                  <FormLabel htmlFor='email'>Email</FormLabel>
                  <Input id='email' type='email' />
                </FormControl>
                <PasswordField
                  name='Password'
                />
              </Stack>
              <HStack justify='space-between'>
                <Checkbox defaultChecked colorScheme='teal'>
                  Remember me
                </Checkbox>
                <Button color='teal' variant='text' size='sm'>
                  Forgot password?
                </Button>
              </HStack>
              <Stack spacing='6'>
                <Button colorScheme='teal'>Sign in</Button>
                <HStack>
                  <Divider />
                  <Text textStyle='sm' whiteSpace='nowrap' color='fg.muted'>
                    OR
                  </Text>
                  <Divider />
                </HStack>
                <Button
                  bg='white'
                  w={"full"}
                  maxW={"md"}
                  variant={"outline"}
                  leftIcon={<FcGoogle />}
                >
                  <Center>
                    <Text>Continue with Google</Text>
                  </Center>
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Flex>
  );
};

export default Signin;
