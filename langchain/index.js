// import { PineconeClient } from "@pinecone-database/pinecone";
// import { VectorDBQAChain } from "langchain/chains";
// import { OpenAIEmbeddings } from "langchain/embeddings/openai";
// import { OpenAI } from "langchain/llms/openai";
// import { PineconeStore } from "langchain/vectorstores/pinecone";

// export default async function handler(req, res) {
//   const { body } = req;
//   const { prompt } = body;
//   try {
//     const client = new PineconeClient();
//     await client.init({
//       apiKey: process.env.PINECONE_API_KEY,
//       environment: process.env.PINECONE_ENVIRONMENT_REGION
//     });

//     const pineconeIndex = client.Index(process.env.PINECONE_INDEX);

//     const vectorStore = await PineconeStore.fromExistingIndex(
//       new OpenAIEmbeddings({
//         openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
//       }),
//       { pineconeIndex }
//     );

//     // /* Use as part of a chain (currently no metadata filters) */
//     const model = new OpenAI({
//       openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
//     });

//     const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
//       returnSourceDocuments: true
//     });
//     const response = await chain.call({ query: prompt });
//     res.status(200).json({ loading: false, response: response.text });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       loading: false,
//       response: "Failed to get response from Langchain ⚠️"
//     });
//   }
//   // console.log(response);
// }
