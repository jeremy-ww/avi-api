const qiniu = require('services/qiniu').default
const options = require('../options')('qiniu')

it('qiniu', async () => {
  const file = global.getAviTestFile()
  const { url } = await qiniu(file, options)
  expect(url).toEndWith(file.name)
})
