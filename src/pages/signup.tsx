import {
  Grid,
  GridItem,
} from '@chakra-ui/react'
import SignupForm from "../components/onboard/SignupForm"
import YourName from "../components/onboard/YourName"
import LeftSide from "../components/onboard/LeftSide"
import {useState} from "react"
import { withPublic } from "../lib/hooks/route";

type FormData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  status: string;
};

const Signup = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    status: "freemium",
  });

  // multi-step form handler
  const stepDisplay = () => {
    if (step === 0) {
      return (
        <SignupForm
          step={step}
          setStep={setStep}
          formData={formData}
          setFormData={setFormData}
        />
      );
    } else {
      return (
        <YourName 
          step={step}
          setStep={setStep}
          formData={formData}
          setFormData={setFormData}
          />
      );
    } 
  };

  return (
    <Grid h='100vh' templateRows='repeat(1, 1fr)' templateColumns='repeat(12, 1fr)' gap={1}>
      <GridItem rowSpan={1} colSpan={6} bg='#01212E' display={{base: 'none', lg:'block'}}>
          <LeftSide />
      </GridItem>
      <GridItem rowSpan={1} colSpan={{base: 12, lg: 6}} bg='white'>
        {stepDisplay()}
      </GridItem>

    </Grid>
  );
}

export default withPublic(Signup)