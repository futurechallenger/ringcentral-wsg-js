/* eslint-env jest */
import dotenv from 'dotenv'

import RingCentral from '../src/ringcentral'

dotenv.config()

jest.setTimeout(128000)

const rc = new RingCentral(
  process.env.RINGCENTRAL_CLIENT_ID,
  process.env.RINGCENTRAL_CLIENT_SECRET,
  process.env.RINGCENTRAL_SERVER_URL,
  process.env.RINGCENTRAL_WSG_URL
)

test('ringcentral', async () => {
  await rc.authorize({
    username: process.env.RINGCENTRAL_USERNAME,
    extension: process.env.RINGCENTRAL_EXTENSION,
    password: process.env.RINGCENTRAL_PASSWORD
  })

  const r = await rc.get('/restapi/v1.0/account/~/extension/~')
  // console.log(r.data)
  // console.log(r.headers)
  expect(r.status).toBe(200)

  await rc.revoke()
})
