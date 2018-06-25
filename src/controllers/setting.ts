import Response from '../utils/response'
import setting from '../models/setting'
import getType from '../utils/getType'
import { Context } from 'koa'
import * as Joi from 'joi'

interface Types {
  [prop: string]: object
}

const types: Types = {
  boolean: Joi.boolean().required(),
  string: Joi.string().required()
}

interface Setting {
  options: {
    preference: string,
    markdown: boolean
  }
  aliyun: {
    accessKeyId: string
    accessKeySecret: string
    bucket: string
    region: string
  }
  tecent: {
    SecretId: string
    SecretKey: string
    Bucket: string
    Region: string
  }
  qiniu: {
    accessKey: string
    secretKey: string
    bucket: string
    domain: string
  }
  upyun: {
    domain: string
    operator: string
    password: string
    bucket: string
  }
  amazon: {
    accessKeyId: string
    secretAccessKey: string
    bucket: string
  }
  [prop: string]: object | string
}

const schema: Setting = {
  options: {
    preference: '',
    markdown: false
  },
  aliyun: {
    accessKeyId: '',
    accessKeySecret: '',
    bucket: '',
    region: ''
  },
  tecent: {
    SecretId: '',
    SecretKey: '',
    Bucket: '',
    Region: ''
  },
  qiniu: {
    accessKey: '',
    secretKey: '',
    bucket: '',
    domain: ''
  },
  upyun: {
    domain: '',
    operator: '',
    password: '',
    bucket: ''
  },
  amazon: {
    accessKeyId: '',
    secretAccessKey: '',
    bucket: ''
  }
}

function enhance (schema: any) {
  for (let key in schema) {
    schema[key] = types[getType(schema[key])]
  }
  return Joi.object().keys(schema)
}

Object.keys(schema).forEach(item => {
  schema[item] = enhance(schema[item])
})

export default async (ctx: Context) => {
  const { settings = {} } = ctx.request.body
  const { error } = Joi.validate(settings, schema)
  if (error) return (ctx.body = Response.badData())
  const { session: { user = {} } } = ctx
  await setting.update(user.id, settings)
  ctx.body = Response.success()
}
