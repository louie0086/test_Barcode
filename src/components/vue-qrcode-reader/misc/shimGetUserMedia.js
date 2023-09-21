import { shimGetUserMedia as chromeShim } from 'webrtc-adapter/dist/chrome/getusermedia'
import { shimGetUserMedia as firefoxShim } from 'webrtc-adapter/dist/firefox/getusermedia'
import { shimGetUserMedia as safariShim } from 'webrtc-adapter/dist/safari/safari_shim'
import { detectBrowser } from 'webrtc-adapter/dist/utils'

import { StreamApiNotSupportedError } from './errors'
import { indempotent } from './util'

export default indempotent(() => {
  const browserDetails = detectBrowser(window)

  switch (browserDetails.browser) {
    case 'chrome':
      chromeShim(window, browserDetails)
      break
    case 'firefox':
      firefoxShim(window, browserDetails)
      break
    case 'safari':
      safariShim(window, browserDetails)
      break
    default:
      throw new StreamApiNotSupportedError()
  }
})
