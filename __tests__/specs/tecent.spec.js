const tecent = require('services/tecent').default
const options = require('../options')('tecent')

it('tecent', async () => {
  const file = global.getAviTestFile()
  const { url } = await tecent(file, options)
  expect(url).toStartWith('https://')
  expect(url).toEndWith(file.name)
})
