'use server'
export default async function handler(req, res) {
    res.status(200).json({ message: 'Hello from the API!' });
  }

  export async function helloworld() {
    return({ message: 'Hello from the API!' });
  }