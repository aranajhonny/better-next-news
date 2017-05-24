import loadDB from './db'

export default async (id) => {
  const res = await fetch(`${BACKEND_URL}/api/item/${id}`);
  const json = await res.json();
  const story = json.data;

  return transform(story);
};


export async function observe (id, fn) {
  const onval = (data) => fn(transform(data.val()))

  const db = await loadDB()
  const item = db
    .child('item')
    .child(id)
  item.on('value', onval)
  return () => item.off('value', onval)
}

export function transform (val) {
  return {
    id: val.id,
    url: val.url,
    user: val.by,
    // time is seconds since epoch, not ms
    date: new Date(val.time * 1000),
    // sometimes `kids` is `undefined`
    comments: val.kids || [],
    commentsCount: val.descendants,
    score: val.score,
    title: val.title
  }
}
