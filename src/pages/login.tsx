"use client";
import {
  Grid,
  GridItem
} from '@chakra-ui/react'
import SigninForm from "../components/onboard/SigninForm"
import LeftSide from "../components/onboard/LeftSide"
import { withPublic } from "../lib/hooks/route";

function Login() {
  return (
    <Grid h='100vh' templateRows='repeat(1, 1fr)' templateColumns='repeat(12, 1fr)' gap={1}>
      <GridItem rowSpan={1} colSpan={6} bg='#01212E' display={{base: 'none', md:'block'}}>
          <LeftSide />
      </GridItem>
      <GridItem rowSpan={1} colSpan={{base: 12, lg: 6}} bg='white'>
        <SigninForm />
      </GridItem>
    </Grid>
  );
}

export default withPublic(Login)