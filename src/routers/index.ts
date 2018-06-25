import { callback, logout } from '../controllers/auth'
import setting from '../controllers/setting'
import imgur2 from '../controllers/imgur2'
import upload from '../controllers/upload'
import auth from '../middlewares/auth'
import user from '../controllers/user'
import ocr from '../controllers/ocr'
import * as Router from 'koa-router'
import index from '../controllers/'
const router = new Router()

router.get('/', index)
router.get('/user', user)
router.post('/upload', auth.upload, upload)
router.post('/setting', auth.base, setting)
router.post('/ocr/distinguish', ocr.distinguish)

router.get('/auth/imgur', imgur2.auth)
router.get('/auth/imgur/logout', logout)
router.get('/auth/imgur/callback', imgur2.callback)
router.get('/auth/imgur/catchtoken', imgur2.catchtoken)

// The default header limit of nginx is 1kb, too small for the proxy.
// Must re-config nginx as the link https://bit.ly/2up8x5x.
router.get('/auth/google/callback', callback)
router.get('/auth/google/logout', logout)
router.get('/auth/flickr/callback', callback)
router.get('/auth/flickr/logout', logout)

export default router
