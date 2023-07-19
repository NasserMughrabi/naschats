import {
  Grid,
  GridItem
} from '@chakra-ui/react'
import SigninForm from "../components/onboarding/SigninForm"
import LeftSide from "../components/onboarding/LeftSide"
import logo from './logo.png'; // Tell webpack this JS file uses this image


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

export default Login