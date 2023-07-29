import React from "react";
import { IconButton } from "@chakra-ui/react";
import { FaMicrophone } from "react-icons/fa";
import { useState, useEffect } from "react";
import "@babel/polyfill";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const MicButton = ({ handleSend, setValue }) => {
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  useEffect(() => {
    setValue(transcript);
  }, [transcript, setValue]);

  const handleClick = () => {
    listening
      ? SpeechRecognition.stopListening()
      : SpeechRecognition.startListening();
  };

  if (browserSupportsSpeechRecognition) {
    return (
      <IconButton
        id='recButton'
        className={listening ? "Rec" : "notRec"}
        onClick={handleClick}
        aria-label='Microphone'
        icon={<FaMicrophone />}
        size='md'
        colorScheme='teal'
        mr={"0.2rem"}
      />
    );
  }

  return null;
};

export default MicButton;
