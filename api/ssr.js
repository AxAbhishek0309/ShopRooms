// Vercel serverless function — adapts the TanStack Start h3/fetch-style server
// to Vercel's req/res Node.js interface.

import { createServer } from "node:http";
import { Readable } from "node:stream";

let handlerPromise;

async function getHandler() {
  if (!handlerPromise) {
    handlerPromise = import("../dist/server/server.js").then((m) => m.default ?? m);
  }
  return handlerPromise;
}

function nodeReqToRequest(req) {
  const protocol = req.headers["x-forwarded-proto"] ?? "https";
  const host = req.headers["x-forwarded-host"] ?? req.headers.host ?? "localhost";
  const url = new URL(req.url, `${protocol}://${host}`);

  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value) {
      if (Array.isArray(value)) {
        for (const v of value) headers.append(key, v);
      } else {
        headers.set(key, value);
      }
    }
  }

  const hasBody = req.method !== "GET" && req.method !== "HEAD";

  return new Request(url.toString(), {
    method: req.method,
    headers,
    body: hasBody ? Readable.toWeb(req) : undefined,
    duplex: hasBody ? "half" : undefined,
  });
}

export default async function handler(req, res) {
  try {
    const server = await getHandler();
    const request = nodeReqToRequest(req);
    const response = await server.fetch(request, process.env, {});

    res.statusCode = response.status;
    for (const [key, value] of response.headers.entries()) {
      res.setHeader(key, value);
    }

    if (response.body) {
      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
    }
    res.end();
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}
