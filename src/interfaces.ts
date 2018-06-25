export interface UploadFile {
  name: string
  path: string
}

export type UploadType = 'amazon' | 'flickr' | 'imgur' | 'aliyun' | 'tecent' | 'qiniu' | 'upyun' | 'smms'

export interface UploadServicesMaping {
  smms: (file: UploadFile) => any
  qiniu: (file: UploadFile, options: any) => any
  upyun: (file: UploadFile, options: any) => any
  aliyun: (file: UploadFile, options: any) => any
  tecent: (file: UploadFile, options: any) => any
  imgur: (file: UploadFile, options: any, user: any) => any
  [key: string]: (file: UploadFile, options: any, user: any) => any
}

export interface AmazonResponse {
  ETag: string
  Location: string
  key: string
  Key: string
  Bucket: string
}

export interface FlickrSize {
  label: 'Square' | 'Large Square' | 'Thumbnail' | 'Small' | 'Small 320' | 'Medium' | 'Original'
  width: number | string
  height: number | string
  source: string
  url: string
  media: string
}

export interface FlickrResponse {
  sizes: {
    canblog: number
    canprint: number
    candownload: number
    size: FlickrSize[]
  }
  stat: string
}

export interface ImgurResponse {
  data: {
    id: string
    title: string | null
    description: string | null
    datetime: number
    type: string
    animated: boolean
    width: number
    height: number
    size: number
    views: number
    bandwidth: number
    vote: string | null
    favorite: boolean
    nsfw: string | null
    section: string | null
    account_url: string | null
    account_id: number
    is_ad: boolean
    in_most_viral: boolean
    tags: any[]
    ad_type: number
    ad_url: string
    in_gallery: boolean
    deletehash: string
    name: string
    link: string
  }
  success: boolean
  status: number
}

export interface AliyunResponse {
  name: string
  url: string
  res: {
    status: number
    statusCode: number
    headers: {
      'server': string
      'date': string
      'content-length': string
      'connection': string
      'x-oss-request-id': string
      'etag': string
      'x-oss-hash-crc64ecma': string
      'content-md5': string
      'x-oss-server-time': string
    }
    size: number
    aborted: boolean
    rt: number
    keepAliveSocket: number
    data: {
      type: string
      data: any[]
    }
    requestUrls: string[]
    timing: undefined | null
    remoteAddress: string
    remotePort: number
  }
}

export interface TecentResponse {
  Location: string
  ETag: string
  statusCode: number
  headers: {
    'content-type': string
    'content-length': string
    'connection': string
    'date': string
    'etag': string
    'server': string
    'x-cos-request-id': string
  }
}

export interface QiniuResponse {
  hash: string
  key: string
}

export interface UpyunResponse {
  'width': number
  'height': number
  'file-type': string
  'frames': number
}

export interface SmmsResponse {
  width: number
  height: number
  filename: string
  storename: string
  size: number
  path: string
  hash: string
  timestamp: number
  ip: string
  url: string
  delete: string
}

export interface TecentOCRRecord {
  x: number
  y: number
  width: number
  height: number
}

export interface TecentOCRWord {
  character: string
  confidence: number
}

export interface TecentOCRData {
  item: string
  itemstring: string
  itemcoord: TecentOCRRecord[]
  words: TecentOCRWord[]
}

export interface TecentOCRResponse {
  ret: number
  msg: string
  data: {
    item_list: TecentOCRData[]
  }
}
