import React from "react";
import Footer from "./Footer";
import Messages from "./Messages";
import Sidebar from "./Sidebar";
import { VStack, Divider, Flex, Grid, GridItem, Box } from "@chakra-ui/react";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import Youtube from "../chatOptions/Youtube";
import Lawyer from "../chatOptions/Lawyer";
import Tutor from "../chatOptions/Tutor";
import Trader from "../chatOptions/Trader";
import Doctor from "../chatOptions/Doctor";
import { useAuth } from "../../lib/hooks/auth";
import fetcher from "../../lib/fetcher";
import storeChat from "./storeChat";
import definePrompt from "./definePrompt";

const ChatIndex = () => {
  const [openSide, setOpenSide] = useState(false);
  const [useCase, setUseCase] = useState('Youtube');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [promptMode, setPromptMode] = useState("youtube");
  const { uid } = useAuth();

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };
  const handleSend = async () => {
    if (input) {
      const inputMessage = {
        text: input,
        uId: uid,
        timestamp: await fetcher("/api/time").then((res) => res.serverTime),
        isUser: true,
        canRefresh: false,
        promptMode: promptMode,
      };

      setMessages((prevMessages) => [...prevMessages, inputMessage]);
      // Store user's input in database
      await storeChat(
        inputMessage.text,
        inputMessage.uId,
        inputMessage.timestamp,
        inputMessage.isUser,
        inputMessage.canRefresh,
        promptMode
      );

      // Clear input
      setInput("");

      try {
        setIsLoading(true);

        const prompt = definePrompt(inputMessage.text, promptMode, messages);
        // summarizes the chathistory and rephrases the user input
        const { loading, response } = await fetch("/api/openai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: prompt,
          }),
        }).then((res) => res.json());
        setIsLoading(loading);

        const responseMessage = {
          text: response,
          uId: uid,
          timestamp: await fetcher("/api/time").then((res) => res.serverTime),
          isUser: false,
          canRefresh: true,
          promptMode: promptMode,
        };

        setMessages((prevMessages) => [...prevMessages, responseMessage]);

        // Store chatbot's response in database
        await storeChat(
          responseMessage.text,
          responseMessage.uId,
          responseMessage.timestamp,
          responseMessage.isUser,
          responseMessage.canRefresh,
          promptMode
        );
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        // Handle error
        throw error;
      }
    }
  };

  // Get chat history on initial load or preload questions
  useEffect(() => {
    const getMessages = async () => {
      if (messages.length === 0 && uid) {
        // Check if messages are already present
        const response = await fetch(`/api/chat/${uid}`, {
          method: "GET",
        });
        const data = await response.json();
        if (data.length > 0) {
          setMessages(data);
        } else {
          const preloadQuestions = [
            {
              text: "Hi, I am Nas, your AI coach. 🙂",
              uId: uid,
              timestamp: await fetcher("/api/time").then(
                (res) => res.serverTime
              ),
              isUser: false,
              canRefresh: false,
              promptMode: promptMode,
            },
            {
              text: "What's on your mind?",
              uId: uid,
              timestamp: await fetcher("/api/time").then(
                (res) => res.serverTime
              ),
              isUser: false,
              canRefresh: false,
              promptMode: promptMode,
            },
          ];
          // update messages state
          setMessages(preloadQuestions);
          // store messages in database
          for (const preloadQuestion of preloadQuestions) {
            await storeChat(
              preloadQuestion.text,
              preloadQuestion.uId,
              preloadQuestion.timestamp,
              preloadQuestion.isUser,
              preloadQuestion.canRefresh,
              promptMode
            );
          }
        }
      }
    };
    getMessages();
  }, [messages, uid, promptMode]);

  return (
    <Grid
      h='100vh'
      templateRows='repeat(12, 1fr)'
      templateColumns='repeat(12, 1fr)'
    >
      <GridItem rowSpan={1} colSpan={12}>
        <Navbar
          openSide={openSide}
          setOpenSide={setOpenSide}
          useCase={useCase}
        />
      </GridItem>
      <GridItem rowSpan={11} colSpan={12} bg='#0f3c4c'>
        <Flex h={{ base: "86%", md: "100%" }} gridRow='span 11'>
          <Sidebar openSide={openSide} setUseCase={setUseCase} />
          {useCase && useCase.toLowerCase() === "youtube" ? (
            <Flex flexDir={"column"} w={"100vw"}>
              <Youtube />
            </Flex>
          ) : useCase && useCase.toLowerCase() === "tutor" ? (
            <Flex flexDir={"column"} w={"100vw"}>
              <Tutor />
            </Flex>
          ) : useCase && useCase.toLowerCase() === "trader" ? (
            <Flex flexDir={"column"} w={"100vw"}>
              <Trader />
            </Flex>
          ) : useCase && useCase.toLowerCase() === "lawyer" ? (
            <Flex flexDir={"column"} w={"100vw"}>
              <Lawyer />
            </Flex>
          ) : useCase && useCase.toLowerCase() === "doctor" ? (
            <Flex flexDir={"column"} w={"100vw"}>
              <Doctor />
            </Flex>
          ) : (
            <Flex flexDir={"column"} w={"100vw"}>
              <Messages messages={messages} isLoading={isLoading} />
              <Footer
                handleSend={handleSend}
                handleInputChange={handleInputChange}
                setInput={setInput}
              />
            </Flex>
          )}
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default ChatIndex;
