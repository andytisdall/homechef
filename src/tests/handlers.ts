import {http, HttpResponse} from 'msw';

const BASE_URL = 'https://portal.ckoakland.org/api';

export const handlers = [
  http.get(BASE_URL + '/user', async () => {
    return HttpResponse.json(null);
  }),
];
