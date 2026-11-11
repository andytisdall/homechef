import { http, HttpResponse } from "msw";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://portal.ckoakland.org/api"
    : "http://192.168.0.102:3001/api";

export const handlers = [
  http.get(BASE_URL + "/user", async () => {
    return HttpResponse.json(null);
  }),
];
