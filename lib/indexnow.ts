const INDEXNOW_KEY = '8f2d5e1a-4b9c-4d8e-9f0a-1b2c3d4e5f6g'
const HOST = 'meetotu.com'

export async function pingIndexNow(urls: string[]): Promise<void> {
  await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    }),
  })
}
