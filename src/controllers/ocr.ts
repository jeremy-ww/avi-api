import Response from '../utils/response'
import ocr from '../services/ocr'
import { Context } from 'koa'

const distinguish = async (ctx: Context) => {
  const { image = '' } = ctx.request.body
  const items = await ocr(image)
  ctx.body = Response.success(items.map((item: any) => item.itemstring))
}

export default { distinguish }
