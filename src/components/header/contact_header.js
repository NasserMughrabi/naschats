import { Image, Link } from "@chakra-ui/react";

const ContactHeader = () => {
  return (
    <>
      <Link href="/">
        <Image
          src="../../contactHeaderLogo.svg"
          alt="logo"
          w={{ base: "100px", md: "150px", lg: "200px" }}
          ml={"1rem"}
        />
      </Link>
    </>
  );
};

export default ContactHeader;
