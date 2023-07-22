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
import { FcGoogle } from "react-icons/fc";
import router from "next/router";
import { useToast } from "@chakra-ui/react";
import { UserAuth } from "@/context/AuthContext";

const YourName = (props) => {
  const { formData, setFormData, step, setStep } = props;
  const { googleSignIn } = UserAuth();
  const toast = useToast();

  const handleCreate = () => {
    if (formData.firstName === "" || formData.lastName === "") {
      toast({
        title: "Attention",
        description: "First Name and Last Name cannot be empty!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      // .then((data) => {
      //   setUid(data.uid);
      // })
      .then(() => {
        router.push("/chat");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  const handleGoogleSignin = async () => {
    try {
      await googleSignIn();
      router.push("/chat");
    } catch (error) {
      console.log(error);
    }
  };

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
              <Heading fontSize={{ base: "2xl", md: "3xl" }}>Sign Up</Heading>
            </Stack>
          </Stack>
          <Box
            py={{ base: "0", sm: "12" }}
            px={{ base: "4", sm: "10" }}
            bg={{ base: "transparent", sm: "bg.surface" }}
            boxShadow={{ base: "none", sm: "md" }}
            borderRadius={{ base: "none", sm: "xl" }}
            transition='transform 0.6s'
          >
            <Stack spacing='6'>
              <Stack spacing='5'>
                <FormControl>
                  <FormLabel htmlFor='firstName'>First Name</FormLabel>
                  <Input
                    id='firstName'
                    value={formData.firstName}
                    type='text'
                    _focus={{
                      border: "1px solid #319795",
                      zIndex: "1",
                      boxShadow: "rgb(49, 151, 149) 0px 0px 0px 1px",
                    }}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor='lastName'>Last Name</FormLabel>
                  <Input
                    id='lastName'
                    value={formData.lastName}
                    type='text'
                    _focus={{
                      border: "1px solid #319795",
                      zIndex: "1",
                      boxShadow: "rgb(49, 151, 149) 0px 0px 0px 1px",
                    }}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                </FormControl>
              </Stack>
              <HStack>
                <Button colorScheme='teal' flex={1} onClick={() => setStep(0)}>
                  Back
                </Button>
                <Button colorScheme='teal' flex={1} onClick={handleCreate}>
                  Create
                </Button>
              </HStack>
              <Stack spacing='6'>
                <HStack>
                  <Divider />
                  <Text textStyle='sm' whiteSpace='nowrap' color='fg.muted'>
                    OR
                  </Text>
                  <Divider />
                </HStack>
                {/* <OAuthButtonGroup /> */}
                <Button
                  bg='white'
                  w={"full"}
                  maxW={"md"}
                  variant={"outline"}
                  leftIcon={<FcGoogle />}
                  onClick={handleGoogleSignin}
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

export default YourName;
