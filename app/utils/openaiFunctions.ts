// openaiFunctions.ts
export const functions = {
  ingestPdf: {
    description: "Ingest a PDF file into the database",
    parameters: {
      type: "object",
      properties: {
        filePath: {
          type: "string",
          description: "The path to the PDF file to ingest",
        },
      },
      required: ["filePath"],
    },
  },
  queryDocuments: {
    description: "Query documents in the database",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "The query to search for",
        },
      },
      required: ["query"],
    },
  },
};
export const tools = [
  {
    type: "function",
    function: {
      name: "ingestPdf",
     description: "Ingest a PDF file into the database",
       parameters: {
      type: "object",
      properties: {
        filePath: {
          type: "string",
          description: "The path to the PDF file to ingest",
        },
      },
      required: ["filePath"],
    },
    },
  },
{
    type: "function",
    function: {
      name: "queryDocuments",
     description: "Query documents in the database",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "The query to search for",
        },
      },
      required: ["query"],
    },
    },
  },
];
