import { Message } from "./Messages";

export default function definePrompt(input, promptMode, messages) {
  // get the last 10 messages if there are more than 10 messages
  if (messages.length >= 10) {
    messages = messages.slice(-10);
  }
  // You are an american from California who has personal opinions. Give an example of how would an american Californian would argue the below viewpoint or answer the question, disagree, support viewpoint with evidence, answer the user's questions when asked, and keep the conversation going. Example should be short and concise with COMPLETE SENTENCES.
  const basicInfo = `
  
    This is the past messages of the conversation between you and the user: \n
    ${messages.map((message) => {
      return message.isUser
        ? `User: ${message.text}\n`
        : `AI: ${message.text}\n`;
    })}

    Analyze the user's input, user's input is: ${input}.\n
    
    If the input is a question, give an example answer from an american living in california. otherwise,
    if the input is not a question, give an example disagreement supported with evidence. \n

    ${
      messages.length % 4 === 0
        ? `Please ask one follow up question to better understand the user's viewpont and to keep the conversation going.\n`
        : ``
    } 
      
      GIVE THE EXAMPLE ONLY without any extra info, don't use the dialog format, and use COMPLETE SENTENCES.
      
      `;

  switch (promptMode) {
    case "video":
      return `
        ${basicInfo}

        Analyze the below "videos" titles to provide suggestions to the user.\n

        The video titles are as follows: \n
            ${allVideos.map((video) => {
              return `Video title: ${video}\n`;
            })}

        Based on the user's input and the videos suggest 1 video only. If non of the videos are related to the User Input, say you don't have relevant videos about the topic. Make sure to mention that these videos and practices are from "Amotions Video Library". Don't make up videos - Only use the videos in the list above. \n

        Answer the user's question or give suggestion below directly. Don't use the dialog format and answer in plain text only. Response should be short and concise with COMPLETE SENTENCES. 
      `;

    case "practice":
      return `
        ${basicInfo}

        Analyze the below "practices" names to provide suggestions to the user.\n

        The practice names are as follows: \n
            ${allSkills.map((skill) => {
              return `Practice name: ${skill}\n`;
            })}

        Based on the user's input and the practices, suggest 1 practice only. If non of practices are related to the User Input, say you don't have relevant practices about the topic. Make sure to mention that these videos and practices are from "Amotions Video Library". Don't make up practices - Only use the practices in the list above. \n

        Answer the user's question or give suggestion below directly. Don't use the dialog format and answer in plain text only. Response should be short and concise with COMPLETE SENTENCES. 
      `;

    case "feedback":
      return `
      ${basicInfo}

      You are being consulted by the user to give feedback on the user intention. \n
      For example, the user might ask "You need to complete your tasks faster" and you have to help the user to rephrase the sentence to be more positive and constructive. \n
      `;

    case "brainstorm":
      return `
      ${basicInfo}

      You are being consulted by the user to brainstorm ideas. \n
      The user might ask "HWhich one of my priorities shall I start with?" and you have to help the user to brainstorm the ideas or list the options. \n
      `;

    case "solve":
      return `
      ${basicInfo}

      You are being consulted by the user to solve a problem. \n
      The user might talk about a scenario and ask "What should I do?" and you have to help the user to solve the problem step by step. \n
      `;
    // default is actualy "coach"
    default:
      return `
        ${basicInfo}
          
      `;
  }
}

// If the input is talking about user's feeling or emotion, please ask the user to elaborate more like "What makes you feel that way?" or "What's the reason behind that?". \n
// Prioritize the response based on the user's input, then the conversation and the user's information(goals, challenges). \n
// Answer the user's question or give suggestion below directly. Don't use the dialog format and answer in plain text only. Response should be short and concise with COMPLETE SENTENCES.

// You are a helpful and empathetic coach that gives actionable advice and helps users achieve goals. \n

// Summarize the text delimited by triple quotes into a single sentence. This will be the context of the past conversation. \n
//   """
//   This is the past conversation between the user and the leadership coach: \n
//   ${messages.map((message) => {
//     return message.isUser
//       ? `User: ${message.text}\n`
//       : `Coach: ${message.text}\n`;
//   })}
//   """ \n

//  Please ask one follow up question to better understand the situation if needed or ask one powerful question to help users generate insights, or give a suggestion based on the User's input. \n
