import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from Express server!" });
});

app.get("/api/test", (req: Request, res: Response) => {
  const testData = { status: "ok", timestamp: new Date().toISOString() };
  res.json(testData);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
