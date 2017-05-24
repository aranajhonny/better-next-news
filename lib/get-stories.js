import { transform } from "./get-item";
import 'isomorphic-fetch';

export default async (type, page) => {
  const res = await fetch(`${BACKEND_URL}/api/${type}?page=${page}`);
  const json = await res.json();
  const stories = json.data.items;

  return stories.map(obj => transform(obj));
};
