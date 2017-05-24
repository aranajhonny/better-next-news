const prod = process.env.NODE_ENV === 'production'

module.exports = {
  'BACKEND_URL': prod ? 'https://better-next-news.now.sh' : 'http://localhost:3000'
}