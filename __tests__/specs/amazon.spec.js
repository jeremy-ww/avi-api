const amazon = require('services/amazon').default
const options = require('../options')('amazon')

it('amazon', async () => {
  const file = global.getAviTestFile()
  const { url } = await amazon(file, options)
  expect(url).toStartWith('https://')
  expect(url).toEndWith(file.name)
})
