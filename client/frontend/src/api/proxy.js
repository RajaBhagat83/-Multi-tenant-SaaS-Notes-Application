import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    // Construct the target URL on your EC2 backend
    const targetUrl = `http://ec2-54-227-48-68.compute-1.amazonaws.com:8000${req.url.replace("/api/proxy", "")}`;

    // Forward the request to the backend
    const backendResponse = await fetch(targetUrl, {
      method: req.method,
      headers: {
        ...req.headers,
        host: "ec2-54-227-48-68.compute-1.amazonaws.com",
      },
      body: req.method !== "GET" && req.method !== "HEAD" ? JSON.stringify(req.body) : undefined,
    });

    // Get backend response body as text
    const data = await backendResponse.text();

    // Forward status code and data back to the frontend
    res.status(backendResponse.status).send(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ message: "Proxy failed", error: error.toString() });
  }
}