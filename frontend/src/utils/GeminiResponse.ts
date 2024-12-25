import { GoogleGenerativeAI } from "@google/generative-ai";
import base64 from "base64-js";

const toBase64 = async (str: string) => {
  const base64Img = await fetch(str)
    .then((res) => res.arrayBuffer())
    .then((buf) => base64.fromByteArray(new Uint8Array(buf)));
  return base64Img;
};

export const gemini = async (image: string, mime_type: string) => {
  const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_GEMINI_KEY as string
  );

  const imageBase64 = await toBase64(image);
  const sampleResponse = await toBase64("/images/sample.png");

  const prompt = `Make a product long description add some copywriting contetn for the product. for the ui refference use the image first image. the response should be in html for quil editor, and the rest of image or images are product sample image. Use h1 tag for heading to increase the text size, for lower text size use p tag. you can use ol li tags to create list but use "data-list" attribute with its value for the list items(li) and dont use any image tag and css.`;
  const content = [
    {
      role: "user",
      parts: [
        {
          inline_data: { mime_type: "image/png", data: sampleResponse },
        },
        {
          inline_data: { mime_type: mime_type, data: imageBase64 },
        },

        {
          text: prompt,
        },
      ],
    },
  ];

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // @ts-ignore
  const result = await model.generateContentStream({ contents: content });
  const dom = document.querySelector(".ql-editor");

  let response = "";
  dom ? (dom.innerHTML = "") : null;

  for await (const res of result.stream) {
    response += res.text();
    dom ? (dom.innerHTML += res.text()) : null;
  }

  dom ? (dom.innerHTML = response) : null;

  return response;
};
