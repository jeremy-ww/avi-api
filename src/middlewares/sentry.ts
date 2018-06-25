import * as Raven from 'raven'

if (process.env.NODE_ENV === 'production') {
  Raven
    .config('https://1f8d295d9b684b7ca92cad49fe01fd9b@sentry.io/1234887')
    .install()
}
