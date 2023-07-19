import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
} from "@chakra-ui/react";
import { forwardRef, useRef } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

export const PasswordField = forwardRef((props, ref) => {
  const { name, formData, setFormData } = props;

  const { isOpen, onToggle } = useDisclosure();
  const inputRef = useRef(null);

  const mergeRef = useMergeRefs(inputRef, ref);
  const onClickReveal = () => {
    onToggle();
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    }
  };

  return (
    <FormControl>
      <FormLabel htmlFor='password'>{name}</FormLabel>
      <InputGroup>
        <InputRightElement>
          <IconButton
            variant='text'
            aria-label={isOpen ? "Mask password" : "Reveal password"}
            icon={isOpen ? <HiEye /> : <HiEyeOff />}
            onClick={onClickReveal}
          />
        </InputRightElement>
        <Input
          id='password'
          ref={mergeRef}
          name='password'
          type={isOpen ? "text" : "password"}
          autoComplete='current-password'
          required
          {...props}
          onChange={(e) => {
            // if setFormData is passed as prop then it's signing up which means we need to save to formData otherwise it's signin and we want to compare against database on click
            if (name && setFormData) {
              if (name.toLowerCase() === "password") {
                setFormData({ ...formData, password: e.target.value });
              } else {
                setFormData({ ...formData, confirmPassword: e.target.value });
              }
            }
          }}
        />
      </InputGroup>
    </FormControl>
  );
});

PasswordField.displayName = "PasswordField";
