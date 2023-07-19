import { Image, Link } from "@chakra-ui/react";

const SignInHeader = () => {
  return (
    <>
      <Link href="/">
        <Image
          src="../../signinHeaderLogo.svg"
          alt="logo"
          w={{ base: "100px", md: "150px", lg: "200px" }}
          ml={{ base: "0.2rem", md: "0.5rem", lg: "1rem" }}
        />
      </Link>
    </>
  );
};

export default SignInHeader;
