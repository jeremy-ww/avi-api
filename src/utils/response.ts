export default class Response {
  public readonly code: number
  public readonly message: string
  public readonly data: any

  constructor ({ code, message, data }: { code: number, message?: string, data?: any }) {
    this.code = code || 200
    this.message = message || 'Unknow Error'
    this.data = data || {}
  }

  static success (data?: any) {
    return new Response({
      code: 200,
      message: 'success',
      data
    })
  }

  static fail (code?: number, message?: string, data?: any) {
    return new Response({
      code: code || 500,
      message,
      data
    })
  }

  static badData (...args: any[]) {
    return Response.fail(422, ...args)
  }

  static badRequest (data?: any) {
    return Response.fail(400, 'Options is Missing!', data)
  }

  static fileRequired (data?: any) {
    return Response.fail(409, 'File is Required!', data)
  }

  static conflict (data?: any) {
    return Response.fail(409, 'The file already exists!', data)
  }

  static unauthorized (data?: any) {
    return Response.fail(401, 'Unauthorized', data)
  }
}
