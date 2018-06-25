const aliyun = require('services/aliyun').default
const options = require('../options')('aliyun')

it('aliyun', async () => {
  const file = global.getAviTestFile()
  const { url } = await aliyun(file, options)
  expect(url).toStartWith('https://')
  expect(url).toEndWith(file.name)
})
