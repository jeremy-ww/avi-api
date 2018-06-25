const upyun = require('services/upyun').default
const options = require('../options')('upyun')

it('upyun', async () => {
  const file = global.getAviTestFile()
  const { url } = await upyun(file, options)
  expect(url).toEndWith(file.name)
})
