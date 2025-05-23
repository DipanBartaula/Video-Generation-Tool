from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import google.generativeai as genai
from langchain.output_parsers import PydanticOutputParser
from langchain.prompts import PromptTemplate


# Set Gemini API Key
os.environ["GEMINI_API_KEY"] = "AIzaSyAHYkHIApK8CFc789QcbcPZGXLncudCoSI"
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))



# Define the Pydantic model for LangChain parser
class String(BaseModel):
    question: str

    

    

# Initialize LangChain parser
parser = PydanticOutputParser(pydantic_object=String)

# Define the LangChain prompt
prompt = PromptTemplate(
    input_variables=["question"],
    template="You are a helpful assistant. Please answer this question: {question}\n",
    output_parser=parser,
)

# FastAPI setup
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Accept requests from any origin
    allow_credentials=True,
    allow_methods=["*"],  # Accept all HTTP methods
    allow_headers=["*"],  # Accept all headers
)

# Define the request model
class ChatRequest(BaseModel):
    text: str  # Text input to the API

# Define the response model
class ChatResponse(BaseModel):
    response: str  # Text response from Gemini

# Helper function to interact with Gemini
def prompt_chat(question: str):
    try:
        model = genai.GenerativeModel("gemini-1.5-pro-latest")
        response = model.generate_content(question)
        return response.text
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interacting with Gemini: {e}")

# FastAPI endpoint
@app.post("/chat")
async def chat_endpoint(chat_request: ChatRequest):
    """
    Takes a JSON input {text: <input_text>} and returns a response from Gemini.
    """
    input_text = chat_request.text
    print(f"Received input: {input_text}")
    
    try:
        response = prompt_chat(input_text)
        print(f"Generated response: {response}") 
        return ChatResponse(response=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
