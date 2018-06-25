const smms = require('services/smms').default

it('smms', async () => {
  const file = global.getAviTestFile()
  const { url } = await smms(file)
  expect(url).not.toBeNull()
})
