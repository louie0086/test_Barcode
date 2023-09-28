/**
 * Skipped minification because the original files appears to be already minified.
 * Original file: /npm/barcode-detector@2.0.3/dist/iife/pure.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
var sr = (R, L, q) => {
  if (!L.has(R)) throw TypeError('Cannot ' + q)
}
var re = (R, L, q) => (
    sr(R, L, 'read from private field'), q ? q.call(R) : L.get(R)
  ),
  ur = (R, L, q) => {
    if (L.has(R))
      throw TypeError('Cannot add the same private member more than once')
    L instanceof WeakSet ? L.add(R) : L.set(R, q)
  },
  cr = (R, L, q, pt) => (
    sr(R, L, 'write to private field'), pt ? pt.call(R, q) : L.set(R, q), q
  )
var BarcodeDetectionAPI = (function (R) {
  var ft
  ;('use strict')
  const L = [
    'aztec',
    'code_128',
    'code_39',
    'code_93',
    'codabar',
    'data_matrix',
    'ean_13',
    'ean_8',
    'itf',
    'pdf417',
    'qr_code',
    'upc_a',
    'upc_e',
    'unknown',
  ]
  function q(c) {
    if (pt(c)) return { width: c.naturalWidth, height: c.naturalHeight }
    if (ne(c))
      return { width: c.width.baseVal.value, height: c.height.baseVal.value }
    if (ae(c)) return { width: c.videoWidth, height: c.videoHeight }
    if (ie(c)) return { width: c.width, height: c.height }
    if (ue(c)) return { width: c.displayWidth, height: c.displayHeight }
    if (oe(c)) return { width: c.width, height: c.height }
    if (se(c)) return { width: c.width, height: c.height }
    throw new TypeError(
      "The provided value is not of type '(Blob or HTMLCanvasElement or HTMLImageElement or HTMLVideoElement or ImageBitmap or ImageData or OffscreenCanvas or SVGImageElement or VideoFrame)'."
    )
  }
  function pt(c) {
    try {
      return c instanceof HTMLImageElement
    } catch {
      return !1
    }
  }
  function ne(c) {
    try {
      return c instanceof SVGImageElement
    } catch {
      return !1
    }
  }
  function ae(c) {
    try {
      return c instanceof HTMLVideoElement
    } catch {
      return !1
    }
  }
  function oe(c) {
    try {
      return c instanceof HTMLCanvasElement
    } catch {
      return !1
    }
  }
  function ie(c) {
    try {
      return c instanceof ImageBitmap
    } catch {
      return !1
    }
  }
  function se(c) {
    try {
      return c instanceof OffscreenCanvas
    } catch {
      return !1
    }
  }
  function ue(c) {
    try {
      return c instanceof VideoFrame
    } catch {
      return !1
    }
  }
  function ce(c) {
    try {
      return c instanceof Blob
    } catch {
      return !1
    }
  }
  function lr(c) {
    try {
      return c instanceof ImageData
    } catch {
      return !1
    }
  }
  function fr(c, m) {
    try {
      const u = new OffscreenCanvas(c, m)
      if (u.getContext('2d') instanceof OffscreenCanvasRenderingContext2D)
        return u
      throw void 0
    } catch {
      const u = document.createElement('canvas')
      return (u.width = c), (u.height = m), u
    }
  }
  async function le(c) {
    if (pt(c) && !(await mr(c)))
      throw new DOMException(
        'Failed to load or decode HTMLImageElement.',
        'InvalidStateError'
      )
    if (ne(c) && !(await yr(c)))
      throw new DOMException(
        'Failed to load or decode SVGImageElement.',
        'InvalidStateError'
      )
    if (ue(c) && vr(c))
      throw new DOMException('VideoFrame is closed.', 'InvalidStateError')
    if (ae(c) && (c.readyState === 0 || c.readyState === 1))
      throw new DOMException('Invalid element or state.', 'InvalidStateError')
    if (ie(c) && wr(c))
      throw new DOMException(
        'The image source is detached.',
        'InvalidStateError'
      )
    const { width: m, height: u } = q(c)
    if (m === 0 || u === 0) return null
    const $ = fr(m, u).getContext('2d')
    $.drawImage(c, 0, 0)
    try {
      return $.getImageData(0, 0, m, u)
    } catch {
      throw new DOMException('Source would taint origin.', 'SecurityError')
    }
  }
  async function dr(c) {
    let m
    try {
      if (createImageBitmap) m = await createImageBitmap(c)
      else if (Image) {
        m = new Image()
        let g = ''
        try {
          ;(g = URL.createObjectURL(c)), (m.src = g), await m.decode()
        } finally {
          URL.revokeObjectURL(g)
        }
      } else return c
    } catch {
      throw new DOMException(
        'Failed to load or decode Blob.',
        'InvalidStateError'
      )
    }
    return await le(m)
  }
  function hr(c) {
    const { width: m, height: u } = c
    if (m === 0 || u === 0) return null
    const g = c.getContext('2d')
    try {
      return g.getImageData(0, 0, m, u)
    } catch {
      throw new DOMException('Source would taint origin.', 'SecurityError')
    }
  }
  async function pr(c) {
    if (ce(c)) return await dr(c)
    if (lr(c)) {
      if (gr(c))
        throw new DOMException(
          'The image data has been detached.',
          'InvalidStateError'
        )
      return c
    }
    return oe(c) || se(c) ? hr(c) : await le(c)
  }
  async function mr(c) {
    try {
      return await c.decode(), !0
    } catch {
      return !1
    }
  }
  async function yr(c) {
    var m
    try {
      return await ((m = c.decode) == null ? void 0 : m.call(c)), !0
    } catch {
      return !1
    }
  }
  function vr(c) {
    return c.format === null
  }
  function gr(c) {
    return c.data.buffer.byteLength === 0
  }
  function wr(c) {
    return c.width === 0 && c.height === 0
  }
  function fe(c, m) {
    return c instanceof DOMException
      ? new DOMException(`${m}: ${c.message}`, c.name)
      : c instanceof Error
      ? new c.constructor(`${m}: ${c.message}`)
      : new Error(`${m}: ${c}`)
  }
  const de = (c) => {
      let m
      const u = new Set(),
        g = (O, G) => {
          const j = typeof O == 'function' ? O(m) : O
          if (!Object.is(j, m)) {
            const F = m
            ;(m = G ?? typeof j != 'object' ? j : Object.assign({}, m, j)),
              u.forEach((Y) => Y(m, F))
          }
        },
        $ = () => m,
        w = {
          setState: g,
          getState: $,
          subscribe: (O) => (u.add(O), () => u.delete(O)),
          destroy: () => {
            u.clear()
          },
        }
      return (m = c(g, $, w)), w
    },
    $r = (c) => (c ? de(c) : de),
    br = {
      locateFile: (c, m) => {
        var u
        const g = (u = c.match(/_(.+?)\.wasm$/)) == null ? void 0 : u[1]
        return g
          ? `https://fastly.jsdelivr.net/npm/@sec-ant/zxing-wasm@2.1.5/dist/${g}/${c}`
          : m + c
      },
    },
    ot = $r()(() => ({
      zxingModuleWeakMap: new WeakMap(),
      zxingModuleOverrides: br,
    }))
  function Cr(c) {
    ot.setState({ zxingModuleOverrides: c })
  }
  function Bt(c, m = ot.getState().zxingModuleOverrides) {
    const { zxingModuleWeakMap: u } = ot.getState(),
      g = u.get(c)
    if (g && Object.is(m, ot.getState().zxingModuleOverrides)) return g
    {
      ot.setState({ zxingModuleOverrides: m })
      const $ = c(m)
      return u.set(c, $), $
    }
  }
  const he = [
      'Aztec',
      'Codabar',
      'Code128',
      'Code39',
      'Code93',
      'DataBar',
      'DataBarExpanded',
      'DataMatrix',
      'EAN-13',
      'EAN-8',
      'ITF',
      'Linear-Codes',
      'Matrix-Codes',
      'MaxiCode',
      'MicroQRCode',
      'None',
      'PDF417',
      'QRCode',
      'UPC-A',
      'UPC-E',
    ],
    k = { tryHarder: !0, formats: [], maxSymbols: 255 }
  async function _r(
    c,
    {
      tryHarder: m = k.tryHarder,
      formats: u = k.formats,
      maxSymbols: g = k.maxSymbols,
    } = k,
    $
  ) {
    const w = await Bt($, ot.getState().zxingModuleOverrides),
      { size: O } = c,
      G = new Uint8Array(await c.arrayBuffer()),
      j = w._malloc(O)
    w.HEAP8.set(G, j)
    const F = w.readBarcodesFromImage(j, O, m, pe(u), g)
    w._free(j)
    const Y = []
    for (let N = 0; N < F.size(); ++N) {
      const z = F.get(N)
      Y.push({ ...z, format: me(z.format) })
    }
    return Y
  }
  async function Tr(
    c,
    {
      tryHarder: m = k.tryHarder,
      formats: u = k.formats,
      maxSymbols: g = k.maxSymbols,
    } = k,
    $
  ) {
    const w = await Bt($, ot.getState().zxingModuleOverrides),
      {
        data: O,
        width: G,
        height: j,
        data: { byteLength: F },
      } = c,
      Y = w._malloc(F)
    console.log('data:',O)
    console.log('byteLength:',F)
    console.log('bufferPtr:',Y)
    console.log('zxingInstance.HEAP8:',w.HEAP8)
    console.log('zxingInstance.HEAP8.byteLength:', w.HEAP8.byteLength);
    w.HEAP8.set(O, Y)
    const N = w.readBarcodesFromPixmap(Y, G, j, m, pe(u), g)
    w._free(Y)
    const z = []
    for (let X = 0; X < N.size(); ++X) {
      const K = N.get(X)
      z.push({ ...K, format: me(K.format) })
    }
    return z
  }
  function pe(c) {
    return c.join('|')
  }
  function me(c) {
    const m = ye(c)
    let u = 0,
      g = he.length - 1
    for (; u <= g; ) {
      const $ = Math.floor((u + g) / 2),
        w = he[$],
        O = ye(w)
      if (O === m) return w
      O < m ? (u = $ + 1) : (g = $ - 1)
    }
    return 'None'
  }
  function ye(c) {
    return c.toLowerCase().replace(/_-\[\]/g, '')
  }
  var Ut = (() => {
    var c =
      (document.currentScript && document.currentScript.src) ||
      new URL('pure.js', document.baseURI).href
    return function (m = {}) {
      var u = m,
        g,
        $
      u.ready = new Promise((t, e) => {
        ;(g = t), ($ = e)
      })
      var w = Object.assign({}, u),
        O = './this.program',
        G = typeof window == 'object',
        j = typeof importScripts == 'function'
      typeof process == 'object' &&
        typeof process.versions == 'object' &&
        process.versions.node
      var F = ''
      function Y(t) {
        return u.locateFile ? u.locateFile(t, F) : F + t
      }
      var N
      ;(G || j) &&
        (j
          ? (F = self.location.href)
          : typeof document < 'u' &&
            document.currentScript &&
            (F = document.currentScript.src),
        c && (F = c),
        F.indexOf('blob:') !== 0
          ? (F = F.substr(0, F.replace(/[?#].*/, '').lastIndexOf('/') + 1))
          : (F = ''),
        j &&
          (N = (t) => {
            var e = new XMLHttpRequest()
            return (
              e.open('GET', t, !1),
              (e.responseType = 'arraybuffer'),
              e.send(null),
              new Uint8Array(e.response)
            )
          })),
        u.print || console.log.bind(console)
      var z = u.printErr || console.error.bind(console)
      Object.assign(u, w),
        (w = null),
        u.arguments && u.arguments,
        u.thisProgram && (O = u.thisProgram),
        u.quit && u.quit
      var X
      u.wasmBinary && (X = u.wasmBinary),
        u.noExitRuntime,
        typeof WebAssembly != 'object' && Pt('no native wasm support detected')
      var K,
        mt = !1,
        J,
        B,
        yt,
        Tt,
        U,
        S,
        ve,
        ge
      function we() {
        var t = K.buffer;
        console.log('K.buffer.byteLength',K.buffer.length)
        ;(u.HEAP8 = J = new Int8Array(t)),
          (u.HEAP16 = yt = new Int16Array(t)),
          (u.HEAPU8 = B = new Uint8Array(t)),
          (u.HEAPU16 = Tt = new Uint16Array(t)),
          (u.HEAP32 = U = new Int32Array(t)),
          (u.HEAPU32 = S = new Uint32Array(t)),
          (u.HEAPF32 = ve = new Float32Array(t)),
          (u.HEAPF64 = ge = new Float64Array(t))
      }
      var $e = [],
        be = [],
        Ce = []
      function Dr() {
        if (u.preRun)
          for (
            typeof u.preRun == 'function' && (u.preRun = [u.preRun]);
            u.preRun.length;

          )
            Mr(u.preRun.shift())
        Lt($e)
      }
      function Or() {
        Lt(be)
      }
      function Fr() {
        if (u.postRun)
          for (
            typeof u.postRun == 'function' && (u.postRun = [u.postRun]);
            u.postRun.length;

          )
            Ir(u.postRun.shift())
        Lt(Ce)
      }
      function Mr(t) {
        $e.unshift(t)
      }
      function jr(t) {
        be.unshift(t)
      }
      function Ir(t) {
        Ce.unshift(t)
      }
      var it = 0,
        vt = null
      function Rr(t) {
        it++, u.monitorRunDependencies && u.monitorRunDependencies(it)
      }
      function Hr(t) {
        if (
          (it--,
          u.monitorRunDependencies && u.monitorRunDependencies(it),
          it == 0 && vt)
        ) {
          var e = vt
          ;(vt = null), e()
        }
      }
      function Pt(t) {
        u.onAbort && u.onAbort(t),
          (t = 'Aborted(' + t + ')'),
          z(t),
          (mt = !0),
          (t += '. Build with -sASSERTIONS for more info.')
        var e = new WebAssembly.RuntimeError(t)
        throw ($(e), e)
      }
      var Wr = 'data:application/octet-stream;base64,'
      function _e(t) {
        return t.startsWith(Wr)
      }
      var st
      u.locateFile
        ? ((st = 'zxing_reader.wasm'), _e(st) || (st = Y(st)))
        : (st = new URL('/reader/zxing_reader.wasm', self.location).href)
      function Te(t) {
        if (t == st && X) return new Uint8Array(X)
        if (N) return N(t)
        throw 'both async and sync fetching of the wasm failed'
      }
      function kr(t) {
        return !X && (G || j) && typeof fetch == 'function'
          ? fetch(t, { credentials: 'same-origin' })
              .then((e) => {
                if (!e.ok)
                  throw "failed to load wasm binary file at '" + t + "'"
                return e.arrayBuffer()
              })
              .catch(() => Te(t))
          : Promise.resolve().then(() => Te(t))
      }
      function Pe(t, e, r) {
        return kr(t)
          .then((n) => WebAssembly.instantiate(n, e))
          .then((n) => n)
          .then(r, (n) => {
            z(`failed to asynchronously prepare wasm: ${n}`), Pt(n)
          })
      }
      function Br(t, e, r, n) {
        return !t &&
          typeof WebAssembly.instantiateStreaming == 'function' &&
          !_e(e) &&
          typeof fetch == 'function'
          ? fetch(e, { credentials: 'same-origin' }).then((a) => {
              var o = WebAssembly.instantiateStreaming(a, r)
              return o.then(n, function (i) {
                return (
                  z(`wasm streaming compile failed: ${i}`),
                  z('falling back to ArrayBuffer instantiation'),
                  Pe(e, r, n)
                )
              })
            })
          : Pe(e, r, n)
      }
      function Ur() {
        var t = { a: $a }
        function e(n, a) {
          return (
            (D = n.exports), (K = D.qa), we(), (ke = D.ua), jr(D.ra), Hr(), D
          )
        }
        Rr()
        function r(n) {
          e(n.instance)
        }
        if (u.instantiateWasm)
          try {
            return u.instantiateWasm(t, e)
          } catch (n) {
            z(`Module.instantiateWasm callback failed with error: ${n}`), $(n)
          }
        return Br(X, st, t, r).catch($), {}
      }
      var Lt = (t) => {
          for (; t.length > 0; ) t.shift()(u)
        },
        Et = [],
        xt = 0,
        Vr = (t) => {
          var e = new At(t)
          return (
            e.get_caught() || (e.set_caught(!0), xt--),
            e.set_rethrown(!1),
            Et.push(e),
            er(e.excPtr),
            e.get_exception_ptr()
          )
        },
        tt = 0,
        Lr = () => {
          b(0, 0)
          var t = Et.pop()
          tr(t.excPtr), (tt = 0)
        }
      function At(t) {
        ;(this.excPtr = t),
          (this.ptr = t - 24),
          (this.set_type = function (e) {
            S[(this.ptr + 4) >> 2] = e
          }),
          (this.get_type = function () {
            return S[(this.ptr + 4) >> 2]
          }),
          (this.set_destructor = function (e) {
            S[(this.ptr + 8) >> 2] = e
          }),
          (this.get_destructor = function () {
            return S[(this.ptr + 8) >> 2]
          }),
          (this.set_caught = function (e) {
            ;(e = e ? 1 : 0), (J[(this.ptr + 12) >> 0] = e)
          }),
          (this.get_caught = function () {
            return J[(this.ptr + 12) >> 0] != 0
          }),
          (this.set_rethrown = function (e) {
            ;(e = e ? 1 : 0), (J[(this.ptr + 13) >> 0] = e)
          }),
          (this.get_rethrown = function () {
            return J[(this.ptr + 13) >> 0] != 0
          }),
          (this.init = function (e, r) {
            this.set_adjusted_ptr(0), this.set_type(e), this.set_destructor(r)
          }),
          (this.set_adjusted_ptr = function (e) {
            S[(this.ptr + 16) >> 2] = e
          }),
          (this.get_adjusted_ptr = function () {
            return S[(this.ptr + 16) >> 2]
          }),
          (this.get_exception_ptr = function () {
            var e = nr(this.get_type())
            if (e) return S[this.excPtr >> 2]
            var r = this.get_adjusted_ptr()
            return r !== 0 ? r : this.excPtr
          })
      }
      var zr = (t) => {
          throw (tt || (tt = t), tt)
        },
        zt = (t) => {
          var e = tt
          if (!e) return _t(0), 0
          var r = new At(e)
          r.set_adjusted_ptr(e)
          var n = r.get_type()
          if (!n) return _t(0), e
          for (var a in t) {
            var o = t[a]
            if (o === 0 || o === n) break
            var i = r.ptr + 16
            if (rr(o, n, i)) return _t(o), e
          }
          return _t(n), e
        },
        Yr = () => zt([]),
        Nr = (t) => zt([t]),
        Gr = (t, e) => zt([t, e]),
        Xr = (t) => {
          var e = new At(t).get_exception_ptr()
          return e
        },
        qr = () => {
          var t = Et.pop()
          t || Pt('no exception to throw')
          var e = t.excPtr
          throw (
            (t.get_rethrown() ||
              (Et.push(t), t.set_rethrown(!0), t.set_caught(!1), xt++),
            (tt = e),
            tt)
          )
        },
        Jr = (t, e, r) => {
          var n = new At(t)
          throw (n.init(e, r), (tt = t), xt++, tt)
        },
        Qr = () => xt,
        St = {},
        Ee = (t) => {
          for (; t.length; ) {
            var e = t.pop(),
              r = t.pop()
            r(e)
          }
        }
      function Yt(t) {
        return this.fromWireType(U[t >> 2])
      }
      var dt = {},
        ut = {},
        Dt = {},
        xe,
        Ot = (t) => {
          throw new xe(t)
        },
        ct = (t, e, r) => {
          t.forEach(function (s) {
            Dt[s] = e
          })
          function n(s) {
            var l = r(s)
            l.length !== t.length && Ot('Mismatched type converter count')
            for (var f = 0; f < t.length; ++f) et(t[f], l[f])
          }
          var a = new Array(e.length),
            o = [],
            i = 0
          e.forEach((s, l) => {
            ut.hasOwnProperty(s)
              ? (a[l] = ut[s])
              : (o.push(s),
                dt.hasOwnProperty(s) || (dt[s] = []),
                dt[s].push(() => {
                  ;(a[l] = ut[s]), ++i, i === o.length && n(a)
                }))
          }),
            o.length === 0 && n(a)
        },
        Zr = (t) => {
          var e = St[t]
          delete St[t]
          var r = e.rawConstructor,
            n = e.rawDestructor,
            a = e.fields,
            o = a
              .map((i) => i.getterReturnType)
              .concat(a.map((i) => i.setterArgumentType))
          ct([t], o, (i) => {
            var s = {}
            return (
              a.forEach((l, f) => {
                var h = l.fieldName,
                  y = i[f],
                  v = l.getter,
                  T = l.getterContext,
                  x = i[f + a.length],
                  H = l.setter,
                  A = l.setterContext
                s[h] = {
                  read: (W) => y.fromWireType(v(T, W)),
                  write: (W, d) => {
                    var p = []
                    H(A, W, x.toWireType(p, d)), Ee(p)
                  },
                }
              }),
              [
                {
                  name: e.name,
                  fromWireType: (l) => {
                    var f = {}
                    for (var h in s) f[h] = s[h].read(l)
                    return n(l), f
                  },
                  toWireType: (l, f) => {
                    for (var h in s)
                      if (!(h in f))
                        throw new TypeError(`Missing field: "${h}"`)
                    var y = r()
                    for (h in s) s[h].write(y, f[h])
                    return l !== null && l.push(n, y), y
                  },
                  argPackAdvance: rt,
                  readValueFromPointer: Yt,
                  destructorFunction: n,
                },
              ]
            )
          })
        },
        Kr = (t, e, r, n, a) => {},
        tn = () => {
          for (var t = new Array(256), e = 0; e < 256; ++e)
            t[e] = String.fromCharCode(e)
          Ae = t
        },
        Ae,
        V = (t) => {
          for (var e = '', r = t; B[r]; ) e += Ae[B[r++]]
          return e
        },
        ht,
        P = (t) => {
          throw new ht(t)
        }
      function en(t, e, r = {}) {
        var n = e.name
        if (
          (t || P(`type "${n}" must have a positive integer typeid pointer`),
          ut.hasOwnProperty(t))
        ) {
          if (r.ignoreDuplicateRegistrations) return
          P(`Cannot register type '${n}' twice`)
        }
        if (((ut[t] = e), delete Dt[t], dt.hasOwnProperty(t))) {
          var a = dt[t]
          delete dt[t], a.forEach((o) => o())
        }
      }
      function et(t, e, r = {}) {
        if (!('argPackAdvance' in e))
          throw new TypeError(
            'registerType registeredInstance requires argPackAdvance'
          )
        return en(t, e, r)
      }
      var rt = 8,
        rn = (t, e, r, n) => {
          ;(e = V(e)),
            et(t, {
              name: e,
              fromWireType: function (a) {
                return !!a
              },
              toWireType: function (a, o) {
                return o ? r : n
              },
              argPackAdvance: rt,
              readValueFromPointer: function (a) {
                return this.fromWireType(B[a])
              },
              destructorFunction: null,
            })
        },
        nn = (t) => ({
          count: t.count,
          deleteScheduled: t.deleteScheduled,
          preservePointerOnDelete: t.preservePointerOnDelete,
          ptr: t.ptr,
          ptrType: t.ptrType,
          smartPtr: t.smartPtr,
          smartPtrType: t.smartPtrType,
        }),
        Nt = (t) => {
          function e(r) {
            return r.$$.ptrType.registeredClass.name
          }
          P(e(t) + ' instance already deleted')
        },
        Gt = !1,
        Se = (t) => {},
        an = (t) => {
          t.smartPtr
            ? t.smartPtrType.rawDestructor(t.smartPtr)
            : t.ptrType.registeredClass.rawDestructor(t.ptr)
        },
        De = (t) => {
          t.count.value -= 1
          var e = t.count.value === 0
          e && an(t)
        },
        Oe = (t, e, r) => {
          if (e === r) return t
          if (r.baseClass === void 0) return null
          var n = Oe(t, e, r.baseClass)
          return n === null ? null : r.downcast(n)
        },
        Fe = {},
        on = () => Object.keys($t).length,
        sn = () => {
          var t = []
          for (var e in $t) $t.hasOwnProperty(e) && t.push($t[e])
          return t
        },
        gt = [],
        Xt = () => {
          for (; gt.length; ) {
            var t = gt.pop()
            ;(t.$$.deleteScheduled = !1), t.delete()
          }
        },
        wt,
        un = (t) => {
          ;(wt = t), gt.length && wt && wt(Xt)
        },
        cn = () => {
          ;(u.getInheritedInstanceCount = on),
            (u.getLiveInheritedInstances = sn),
            (u.flushPendingDeletes = Xt),
            (u.setDelayFunction = un)
        },
        $t = {},
        ln = (t, e) => {
          for (e === void 0 && P('ptr should not be undefined'); t.baseClass; )
            (e = t.upcast(e)), (t = t.baseClass)
          return e
        },
        fn = (t, e) => ((e = ln(t, e)), $t[e]),
        Ft = (t, e) => {
          ;(!e.ptrType || !e.ptr) &&
            Ot('makeClassHandle requires ptr and ptrType')
          var r = !!e.smartPtrType,
            n = !!e.smartPtr
          return (
            r !== n && Ot('Both smartPtrType and smartPtr must be specified'),
            (e.count = { value: 1 }),
            bt(Object.create(t, { $$: { value: e } }))
          )
        }
      function dn(t) {
        var e = this.getPointee(t)
        if (!e) return this.destructor(t), null
        var r = fn(this.registeredClass, e)
        if (r !== void 0) {
          if (r.$$.count.value === 0)
            return (r.$$.ptr = e), (r.$$.smartPtr = t), r.clone()
          var n = r.clone()
          return this.destructor(t), n
        }
        function a() {
          return this.isSmartPointer
            ? Ft(this.registeredClass.instancePrototype, {
                ptrType: this.pointeeType,
                ptr: e,
                smartPtrType: this,
                smartPtr: t,
              })
            : Ft(this.registeredClass.instancePrototype, {
                ptrType: this,
                ptr: t,
              })
        }
        var o = this.registeredClass.getActualType(e),
          i = Fe[o]
        if (!i) return a.call(this)
        var s
        this.isConst ? (s = i.constPointerType) : (s = i.pointerType)
        var l = Oe(e, this.registeredClass, s.registeredClass)
        return l === null
          ? a.call(this)
          : this.isSmartPointer
          ? Ft(s.registeredClass.instancePrototype, {
              ptrType: s,
              ptr: l,
              smartPtrType: this,
              smartPtr: t,
            })
          : Ft(s.registeredClass.instancePrototype, { ptrType: s, ptr: l })
      }
      var bt = (t) =>
          typeof FinalizationRegistry > 'u'
            ? ((bt = (e) => e), t)
            : ((Gt = new FinalizationRegistry((e) => {
                De(e.$$)
              })),
              (bt = (e) => {
                var r = e.$$,
                  n = !!r.smartPtr
                if (n) {
                  var a = { $$: r }
                  Gt.register(e, a, e)
                }
                return e
              }),
              (Se = (e) => Gt.unregister(e)),
              bt(t)),
        hn = () => {
          Object.assign(Mt.prototype, {
            isAliasOf(t) {
              if (!(this instanceof Mt) || !(t instanceof Mt)) return !1
              var e = this.$$.ptrType.registeredClass,
                r = this.$$.ptr
              t.$$ = t.$$
              for (
                var n = t.$$.ptrType.registeredClass, a = t.$$.ptr;
                e.baseClass;

              )
                (r = e.upcast(r)), (e = e.baseClass)
              for (; n.baseClass; ) (a = n.upcast(a)), (n = n.baseClass)
              return e === n && r === a
            },
            clone() {
              if ((this.$$.ptr || Nt(this), this.$$.preservePointerOnDelete))
                return (this.$$.count.value += 1), this
              var t = bt(
                Object.create(Object.getPrototypeOf(this), {
                  $$: { value: nn(this.$$) },
                })
              )
              return (t.$$.count.value += 1), (t.$$.deleteScheduled = !1), t
            },
            delete() {
              this.$$.ptr || Nt(this),
                this.$$.deleteScheduled &&
                  !this.$$.preservePointerOnDelete &&
                  P('Object already scheduled for deletion'),
                Se(this),
                De(this.$$),
                this.$$.preservePointerOnDelete ||
                  ((this.$$.smartPtr = void 0), (this.$$.ptr = void 0))
            },
            isDeleted() {
              return !this.$$.ptr
            },
            deleteLater() {
              return (
                this.$$.ptr || Nt(this),
                this.$$.deleteScheduled &&
                  !this.$$.preservePointerOnDelete &&
                  P('Object already scheduled for deletion'),
                gt.push(this),
                gt.length === 1 && wt && wt(Xt),
                (this.$$.deleteScheduled = !0),
                this
              )
            },
          })
        }
      function Mt() {}
      var pn = 48,
        mn = 57,
        Me = (t) => {
          if (t === void 0) return '_unknown'
          t = t.replace(/[^a-zA-Z0-9_]/g, '$')
          var e = t.charCodeAt(0)
          return e >= pn && e <= mn ? `_${t}` : t
        }
      function je(t, e) {
        return (
          (t = Me(t)),
          {
            [t]: function () {
              return e.apply(this, arguments)
            },
          }[t]
        )
      }
      var Ie = (t, e, r) => {
          if (t[e].overloadTable === void 0) {
            var n = t[e]
            ;(t[e] = function () {
              return (
                t[e].overloadTable.hasOwnProperty(arguments.length) ||
                  P(
                    `Function '${r}' called with an invalid number of arguments (${arguments.length}) - expects one of (${t[e].overloadTable})!`
                  ),
                t[e].overloadTable[arguments.length].apply(this, arguments)
              )
            }),
              (t[e].overloadTable = []),
              (t[e].overloadTable[n.argCount] = n)
          }
        },
        Re = (t, e, r) => {
          u.hasOwnProperty(t)
            ? ((r === void 0 ||
                (u[t].overloadTable !== void 0 &&
                  u[t].overloadTable[r] !== void 0)) &&
                P(`Cannot register public name '${t}' twice`),
              Ie(u, t, t),
              u.hasOwnProperty(r) &&
                P(
                  `Cannot register multiple overloads of a function with the same number of arguments (${r})!`
                ),
              (u[t].overloadTable[r] = e))
            : ((u[t] = e), r !== void 0 && (u[t].numArguments = r))
        }
      function yn(t, e, r, n, a, o, i, s) {
        ;(this.name = t),
          (this.constructor = e),
          (this.instancePrototype = r),
          (this.rawDestructor = n),
          (this.baseClass = a),
          (this.getActualType = o),
          (this.upcast = i),
          (this.downcast = s),
          (this.pureVirtualFunctions = [])
      }
      var qt = (t, e, r) => {
        for (; e !== r; )
          e.upcast ||
            P(
              `Expected null or instance of ${r.name}, got an instance of ${e.name}`
            ),
            (t = e.upcast(t)),
            (e = e.baseClass)
        return t
      }
      function vn(t, e) {
        if (e === null)
          return this.isReference && P(`null is not a valid ${this.name}`), 0
        e.$$ || P(`Cannot pass "${Zt(e)}" as a ${this.name}`),
          e.$$.ptr ||
            P(`Cannot pass deleted object as a pointer of type ${this.name}`)
        var r = e.$$.ptrType.registeredClass,
          n = qt(e.$$.ptr, r, this.registeredClass)
        return n
      }
      function gn(t, e) {
        var r
        if (e === null)
          return (
            this.isReference && P(`null is not a valid ${this.name}`),
            this.isSmartPointer
              ? ((r = this.rawConstructor()),
                t !== null && t.push(this.rawDestructor, r),
                r)
              : 0
          )
        e.$$ || P(`Cannot pass "${Zt(e)}" as a ${this.name}`),
          e.$$.ptr ||
            P(`Cannot pass deleted object as a pointer of type ${this.name}`),
          !this.isConst &&
            e.$$.ptrType.isConst &&
            P(
              `Cannot convert argument of type ${
                e.$$.smartPtrType ? e.$$.smartPtrType.name : e.$$.ptrType.name
              } to parameter type ${this.name}`
            )
        var n = e.$$.ptrType.registeredClass
        if (((r = qt(e.$$.ptr, n, this.registeredClass)), this.isSmartPointer))
          switch (
            (e.$$.smartPtr === void 0 &&
              P('Passing raw pointer to smart pointer is illegal'),
            this.sharingPolicy)
          ) {
            case 0:
              e.$$.smartPtrType === this
                ? (r = e.$$.smartPtr)
                : P(
                    `Cannot convert argument of type ${
                      e.$$.smartPtrType
                        ? e.$$.smartPtrType.name
                        : e.$$.ptrType.name
                    } to parameter type ${this.name}`
                  )
              break
            case 1:
              r = e.$$.smartPtr
              break
            case 2:
              if (e.$$.smartPtrType === this) r = e.$$.smartPtr
              else {
                var a = e.clone()
                ;(r = this.rawShare(
                  r,
                  at.toHandle(() => a.delete())
                )),
                  t !== null && t.push(this.rawDestructor, r)
              }
              break
            default:
              P('Unsupporting sharing policy')
          }
        return r
      }
      function wn(t, e) {
        if (e === null)
          return this.isReference && P(`null is not a valid ${this.name}`), 0
        e.$$ || P(`Cannot pass "${Zt(e)}" as a ${this.name}`),
          e.$$.ptr ||
            P(`Cannot pass deleted object as a pointer of type ${this.name}`),
          e.$$.ptrType.isConst &&
            P(
              `Cannot convert argument of type ${e.$$.ptrType.name} to parameter type ${this.name}`
            )
        var r = e.$$.ptrType.registeredClass,
          n = qt(e.$$.ptr, r, this.registeredClass)
        return n
      }
      function He(t) {
        return this.fromWireType(S[t >> 2])
      }
      var $n = () => {
        Object.assign(jt.prototype, {
          getPointee(t) {
            return this.rawGetPointee && (t = this.rawGetPointee(t)), t
          },
          destructor(t) {
            this.rawDestructor && this.rawDestructor(t)
          },
          argPackAdvance: rt,
          readValueFromPointer: He,
          deleteObject(t) {
            t !== null && t.delete()
          },
          fromWireType: dn,
        })
      }
      function jt(t, e, r, n, a, o, i, s, l, f, h) {
        ;(this.name = t),
          (this.registeredClass = e),
          (this.isReference = r),
          (this.isConst = n),
          (this.isSmartPointer = a),
          (this.pointeeType = o),
          (this.sharingPolicy = i),
          (this.rawGetPointee = s),
          (this.rawConstructor = l),
          (this.rawShare = f),
          (this.rawDestructor = h),
          !a && e.baseClass === void 0
            ? n
              ? ((this.toWireType = vn), (this.destructorFunction = null))
              : ((this.toWireType = wn), (this.destructorFunction = null))
            : (this.toWireType = gn)
      }
      var We = (t, e, r) => {
          u.hasOwnProperty(t) || Ot('Replacing nonexistant public symbol'),
            u[t].overloadTable !== void 0 && r !== void 0
              ? (u[t].overloadTable[r] = e)
              : ((u[t] = e), (u[t].argCount = r))
        },
        bn = (t, e, r) => {
          var n = u['dynCall_' + t]
          return r && r.length ? n.apply(null, [e].concat(r)) : n.call(null, e)
        },
        It = [],
        ke,
        E = (t) => {
          var e = It[t]
          return (
            e ||
              (t >= It.length && (It.length = t + 1), (It[t] = e = ke.get(t))),
            e
          )
        },
        Cn = (t, e, r) => {
          if (t.includes('j')) return bn(t, e, r)
          var n = E(e).apply(null, r)
          return n
        },
        _n = (t, e) => {
          var r = []
          return function () {
            return (r.length = 0), Object.assign(r, arguments), Cn(t, e, r)
          }
        },
        Z = (t, e) => {
          t = V(t)
          function r() {
            return t.includes('j') ? _n(t, e) : E(e)
          }
          var n = r()
          return (
            typeof n != 'function' &&
              P(`unknown function pointer with signature ${t}: ${e}`),
            n
          )
        },
        Tn = (t, e) => {
          var r = je(e, function (n) {
            ;(this.name = e), (this.message = n)
            var a = new Error(n).stack
            a !== void 0 &&
              (this.stack =
                this.toString() +
                `
` +
                a.replace(/^Error(:[^\n]*)?\n/, ''))
          })
          return (
            (r.prototype = Object.create(t.prototype)),
            (r.prototype.constructor = r),
            (r.prototype.toString = function () {
              return this.message === void 0
                ? this.name
                : `${this.name}: ${this.message}`
            }),
            r
          )
        },
        Be,
        Ue = (t) => {
          var e = Ke(t),
            r = V(e)
          return nt(e), r
        },
        Rt = (t, e) => {
          var r = [],
            n = {}
          function a(o) {
            if (!n[o] && !ut[o]) {
              if (Dt[o]) {
                Dt[o].forEach(a)
                return
              }
              r.push(o), (n[o] = !0)
            }
          }
          throw (e.forEach(a), new Be(`${t}: ` + r.map(Ue).join([', '])))
        },
        Pn = (t, e, r, n, a, o, i, s, l, f, h, y, v) => {
          ;(h = V(h)),
            (o = Z(a, o)),
            s && (s = Z(i, s)),
            f && (f = Z(l, f)),
            (v = Z(y, v))
          var T = Me(h)
          Re(T, function () {
            Rt(`Cannot construct ${h} due to unbound types`, [n])
          }),
            ct([t, e, r], n ? [n] : [], function (x) {
              x = x[0]
              var H, A
              n
                ? ((H = x.registeredClass), (A = H.instancePrototype))
                : (A = Mt.prototype)
              var W = je(T, function () {
                  if (Object.getPrototypeOf(this) !== d)
                    throw new ht("Use 'new' to construct " + h)
                  if (p.constructor_body === void 0)
                    throw new ht(h + ' has no accessible constructor')
                  var kt = p.constructor_body[arguments.length]
                  if (kt === void 0)
                    throw new ht(
                      `Tried to invoke ctor of ${h} with invalid number of parameters (${
                        arguments.length
                      }) - expected (${Object.keys(
                        p.constructor_body
                      ).toString()}) parameters instead!`
                    )
                  return kt.apply(this, arguments)
                }),
                d = Object.create(A, { constructor: { value: W } })
              W.prototype = d
              var p = new yn(h, W, d, v, H, o, s, f)
              p.baseClass &&
                (p.baseClass.__derivedClasses === void 0 &&
                  (p.baseClass.__derivedClasses = []),
                p.baseClass.__derivedClasses.push(p))
              var M = new jt(h, p, !0, !1, !1),
                I = new jt(h + '*', p, !1, !1, !1),
                lt = new jt(h + ' const*', p, !1, !0, !1)
              return (
                (Fe[t] = { pointerType: I, constPointerType: lt }),
                We(T, W),
                [M, I, lt]
              )
            })
        },
        Jt = (t, e) => {
          for (var r = [], n = 0; n < t; n++) r.push(S[(e + n * 4) >> 2])
          return r
        }
      function Qt(t, e, r, n, a, o) {
        var i = e.length
        i < 2 &&
          P(
            "argTypes array size mismatch! Must at least get return value and 'this' types!"
          )
        for (
          var s = e[1] !== null && r !== null, l = !1, f = 1;
          f < e.length;
          ++f
        )
          if (e[f] !== null && e[f].destructorFunction === void 0) {
            l = !0
            break
          }
        var h = e[0].name !== 'void',
          y = i - 2,
          v = new Array(y),
          T = [],
          x = []
        return function () {
          arguments.length !== y &&
            P(
              `function ${t} called with ${arguments.length} arguments, expected ${y}`
            ),
            (x.length = 0)
          var H
          ;(T.length = s ? 2 : 1),
            (T[0] = a),
            s && ((H = e[1].toWireType(x, this)), (T[1] = H))
          for (var A = 0; A < y; ++A)
            (v[A] = e[A + 2].toWireType(x, arguments[A])), T.push(v[A])
          var W = n.apply(null, T)
          function d(p) {
            if (l) Ee(x)
            else
              for (var M = s ? 1 : 2; M < e.length; M++) {
                var I = M === 1 ? H : v[M - 2]
                e[M].destructorFunction !== null && e[M].destructorFunction(I)
              }
            if (h) return e[0].fromWireType(p)
          }
          return d(W)
        }
      }
      var En = (t, e, r, n, a, o) => {
          var i = Jt(e, r)
          ;(a = Z(n, a)),
            ct([], [t], function (s) {
              s = s[0]
              var l = `constructor ${s.name}`
              if (
                (s.registeredClass.constructor_body === void 0 &&
                  (s.registeredClass.constructor_body = []),
                s.registeredClass.constructor_body[e - 1] !== void 0)
              )
                throw new ht(
                  `Cannot register multiple constructors with identical number of parameters (${
                    e - 1
                  }) for class '${
                    s.name
                  }'! Overload resolution is currently only performed using the parameter count, not actual type info!`
                )
              return (
                (s.registeredClass.constructor_body[e - 1] = () => {
                  Rt(`Cannot construct ${s.name} due to unbound types`, i)
                }),
                ct(
                  [],
                  i,
                  (f) => (
                    f.splice(1, 0, null),
                    (s.registeredClass.constructor_body[e - 1] = Qt(
                      l,
                      f,
                      null,
                      a,
                      o
                    )),
                    []
                  )
                ),
                []
              )
            })
        },
        xn = (t, e, r, n, a, o, i, s, l) => {
          var f = Jt(r, n)
          ;(e = V(e)),
            (o = Z(a, o)),
            ct([], [t], function (h) {
              h = h[0]
              var y = `${h.name}.${e}`
              e.startsWith('@@') && (e = Symbol[e.substring(2)]),
                s && h.registeredClass.pureVirtualFunctions.push(e)
              function v() {
                Rt(`Cannot call ${y} due to unbound types`, f)
              }
              var T = h.registeredClass.instancePrototype,
                x = T[e]
              return (
                x === void 0 ||
                (x.overloadTable === void 0 &&
                  x.className !== h.name &&
                  x.argCount === r - 2)
                  ? ((v.argCount = r - 2), (v.className = h.name), (T[e] = v))
                  : (Ie(T, e, y), (T[e].overloadTable[r - 2] = v)),
                ct([], f, function (H) {
                  var A = Qt(y, H, h, o, i)
                  return (
                    T[e].overloadTable === void 0
                      ? ((A.argCount = r - 2), (T[e] = A))
                      : (T[e].overloadTable[r - 2] = A),
                    []
                  )
                }),
                []
              )
            })
        }
      function An() {
        Object.assign(Ve.prototype, {
          get(t) {
            return this.allocated[t]
          },
          has(t) {
            return this.allocated[t] !== void 0
          },
          allocate(t) {
            var e = this.freelist.pop() || this.allocated.length
            return (this.allocated[e] = t), e
          },
          free(t) {
            ;(this.allocated[t] = void 0), this.freelist.push(t)
          },
        })
      }
      function Ve() {
        ;(this.allocated = [void 0]), (this.freelist = [])
      }
      var Q = new Ve(),
        Le = (t) => {
          t >= Q.reserved && --Q.get(t).refcount === 0 && Q.free(t)
        },
        Sn = () => {
          for (var t = 0, e = Q.reserved; e < Q.allocated.length; ++e)
            Q.allocated[e] !== void 0 && ++t
          return t
        },
        Dn = () => {
          Q.allocated.push(
            { value: void 0 },
            { value: null },
            { value: !0 },
            { value: !1 }
          ),
            (Q.reserved = Q.allocated.length),
            (u.count_emval_handles = Sn)
        },
        at = {
          toValue: (t) => (
            t || P('Cannot use deleted val. handle = ' + t), Q.get(t).value
          ),
          toHandle: (t) => {
            switch (t) {
              case void 0:
                return 1
              case null:
                return 2
              case !0:
                return 3
              case !1:
                return 4
              default:
                return Q.allocate({ refcount: 1, value: t })
            }
          },
        },
        On = (t, e) => {
          ;(e = V(e)),
            et(t, {
              name: e,
              fromWireType: (r) => {
                var n = at.toValue(r)
                return Le(r), n
              },
              toWireType: (r, n) => at.toHandle(n),
              argPackAdvance: rt,
              readValueFromPointer: Yt,
              destructorFunction: null,
            })
        },
        Zt = (t) => {
          if (t === null) return 'null'
          var e = typeof t
          return e === 'object' || e === 'array' || e === 'function'
            ? t.toString()
            : '' + t
        },
        Fn = (t, e) => {
          switch (e) {
            case 4:
              return function (r) {
                return this.fromWireType(ve[r >> 2])
              }
            case 8:
              return function (r) {
                return this.fromWireType(ge[r >> 3])
              }
            default:
              throw new TypeError(`invalid float width (${e}): ${t}`)
          }
        },
        Mn = (t, e, r) => {
          ;(e = V(e)),
            et(t, {
              name: e,
              fromWireType: (n) => n,
              toWireType: (n, a) => a,
              argPackAdvance: rt,
              readValueFromPointer: Fn(e, r),
              destructorFunction: null,
            })
        },
        jn = (t, e, r, n, a, o, i) => {
          var s = Jt(e, r)
          ;(t = V(t)),
            (a = Z(n, a)),
            Re(
              t,
              function () {
                Rt(`Cannot call ${t} due to unbound types`, s)
              },
              e - 1
            ),
            ct([], s, function (l) {
              var f = [l[0], null].concat(l.slice(1))
              return We(t, Qt(t, f, null, a, o), e - 1), []
            })
        },
        In = (t, e, r) => {
          switch (e) {
            case 1:
              return r ? (n) => J[n >> 0] : (n) => B[n >> 0]
            case 2:
              return r ? (n) => yt[n >> 1] : (n) => Tt[n >> 1]
            case 4:
              return r ? (n) => U[n >> 2] : (n) => S[n >> 2]
            default:
              throw new TypeError(`invalid integer width (${e}): ${t}`)
          }
        },
        Rn = (t, e, r, n, a) => {
          e = V(e)
          var o = (h) => h
          if (n === 0) {
            var i = 32 - 8 * r
            o = (h) => (h << i) >>> i
          }
          var s = e.includes('unsigned'),
            l = (h, y) => {},
            f
          s
            ? (f = function (h, y) {
                return l(y, this.name), y >>> 0
              })
            : (f = function (h, y) {
                return l(y, this.name), y
              }),
            et(t, {
              name: e,
              fromWireType: o,
              toWireType: f,
              argPackAdvance: rt,
              readValueFromPointer: In(e, r, n !== 0),
              destructorFunction: null,
            })
        },
        Hn = (t, e, r) => {
          var n = [
              Int8Array,
              Uint8Array,
              Int16Array,
              Uint16Array,
              Int32Array,
              Uint32Array,
              Float32Array,
              Float64Array,
            ],
            a = n[e]
          function o(i) {
            var s = S[i >> 2],
              l = S[(i + 4) >> 2]
            return new a(J.buffer, l, s)
          }
          ;(r = V(r)),
            et(
              t,
              {
                name: r,
                fromWireType: o,
                argPackAdvance: rt,
                readValueFromPointer: o,
              },
              { ignoreDuplicateRegistrations: !0 }
            )
        },
        ze = (t, e, r, n) => {
          if (!(n > 0)) return 0
          for (var a = r, o = r + n - 1, i = 0; i < t.length; ++i) {
            var s = t.charCodeAt(i)
            if (s >= 55296 && s <= 57343) {
              var l = t.charCodeAt(++i)
              s = (65536 + ((s & 1023) << 10)) | (l & 1023)
            }
            if (s <= 127) {
              if (r >= o) break
              e[r++] = s
            } else if (s <= 2047) {
              if (r + 1 >= o) break
              ;(e[r++] = 192 | (s >> 6)), (e[r++] = 128 | (s & 63))
            } else if (s <= 65535) {
              if (r + 2 >= o) break
              ;(e[r++] = 224 | (s >> 12)),
                (e[r++] = 128 | ((s >> 6) & 63)),
                (e[r++] = 128 | (s & 63))
            } else {
              if (r + 3 >= o) break
              ;(e[r++] = 240 | (s >> 18)),
                (e[r++] = 128 | ((s >> 12) & 63)),
                (e[r++] = 128 | ((s >> 6) & 63)),
                (e[r++] = 128 | (s & 63))
            }
          }
          return (e[r] = 0), r - a
        },
        Wn = (t, e, r) => ze(t, B, e, r),
        Ye = (t) => {
          for (var e = 0, r = 0; r < t.length; ++r) {
            var n = t.charCodeAt(r)
            n <= 127
              ? e++
              : n <= 2047
              ? (e += 2)
              : n >= 55296 && n <= 57343
              ? ((e += 4), ++r)
              : (e += 3)
          }
          return e
        },
        Ne = typeof TextDecoder < 'u' ? new TextDecoder('utf8') : void 0,
        kn = (t, e, r) => {
          for (var n = e + r, a = e; t[a] && !(a >= n); ) ++a
          if (a - e > 16 && t.buffer && Ne) return Ne.decode(t.subarray(e, a))
          for (var o = ''; e < a; ) {
            var i = t[e++]
            if (!(i & 128)) {
              o += String.fromCharCode(i)
              continue
            }
            var s = t[e++] & 63
            if ((i & 224) == 192) {
              o += String.fromCharCode(((i & 31) << 6) | s)
              continue
            }
            var l = t[e++] & 63
            if (
              ((i & 240) == 224
                ? (i = ((i & 15) << 12) | (s << 6) | l)
                : (i = ((i & 7) << 18) | (s << 12) | (l << 6) | (t[e++] & 63)),
              i < 65536)
            )
              o += String.fromCharCode(i)
            else {
              var f = i - 65536
              o += String.fromCharCode(55296 | (f >> 10), 56320 | (f & 1023))
            }
          }
          return o
        },
        Kt = (t, e) => (t ? kn(B, t, e) : ''),
        Bn = (t, e) => {
          e = V(e)
          var r = e === 'std::string'
          et(t, {
            name: e,
            fromWireType(n) {
              var a = S[n >> 2],
                o = n + 4,
                i
              if (r)
                for (var s = o, l = 0; l <= a; ++l) {
                  var f = o + l
                  if (l == a || B[f] == 0) {
                    var h = f - s,
                      y = Kt(s, h)
                    i === void 0
                      ? (i = y)
                      : ((i += String.fromCharCode(0)), (i += y)),
                      (s = f + 1)
                  }
                }
              else {
                for (var v = new Array(a), l = 0; l < a; ++l)
                  v[l] = String.fromCharCode(B[o + l])
                i = v.join('')
              }
              return nt(n), i
            },
            toWireType(n, a) {
              a instanceof ArrayBuffer && (a = new Uint8Array(a))
              var o,
                i = typeof a == 'string'
              i ||
                a instanceof Uint8Array ||
                a instanceof Uint8ClampedArray ||
                a instanceof Int8Array ||
                P('Cannot pass non-string to std::string'),
                r && i ? (o = Ye(a)) : (o = a.length)
              var s = ee(4 + o + 1),
                l = s + 4
              if (((S[s >> 2] = o), r && i)) Wn(a, l, o + 1)
              else if (i)
                for (var f = 0; f < o; ++f) {
                  var h = a.charCodeAt(f)
                  h > 255 &&
                    (nt(l),
                    P(
                      'String has UTF-16 code units that do not fit in 8 bits'
                    )),
                    (B[l + f] = h)
                }
              else for (var f = 0; f < o; ++f) B[l + f] = a[f]
              return n !== null && n.push(nt, s), s
            },
            argPackAdvance: rt,
            readValueFromPointer: He,
            destructorFunction(n) {
              nt(n)
            },
          })
        },
        Ge = typeof TextDecoder < 'u' ? new TextDecoder('utf-16le') : void 0,
        Un = (t, e) => {
          for (var r = t, n = r >> 1, a = n + e / 2; !(n >= a) && Tt[n]; ) ++n
          if (((r = n << 1), r - t > 32 && Ge))
            return Ge.decode(B.subarray(t, r))
          for (var o = '', i = 0; !(i >= e / 2); ++i) {
            var s = yt[(t + i * 2) >> 1]
            if (s == 0) break
            o += String.fromCharCode(s)
          }
          return o
        },
        Vn = (t, e, r) => {
          if ((r === void 0 && (r = 2147483647), r < 2)) return 0
          r -= 2
          for (
            var n = e, a = r < t.length * 2 ? r / 2 : t.length, o = 0;
            o < a;
            ++o
          ) {
            var i = t.charCodeAt(o)
            ;(yt[e >> 1] = i), (e += 2)
          }
          return (yt[e >> 1] = 0), e - n
        },
        Ln = (t) => t.length * 2,
        zn = (t, e) => {
          for (var r = 0, n = ''; !(r >= e / 4); ) {
            var a = U[(t + r * 4) >> 2]
            if (a == 0) break
            if ((++r, a >= 65536)) {
              var o = a - 65536
              n += String.fromCharCode(55296 | (o >> 10), 56320 | (o & 1023))
            } else n += String.fromCharCode(a)
          }
          return n
        },
        Yn = (t, e, r) => {
          if ((r === void 0 && (r = 2147483647), r < 4)) return 0
          for (var n = e, a = n + r - 4, o = 0; o < t.length; ++o) {
            var i = t.charCodeAt(o)
            if (i >= 55296 && i <= 57343) {
              var s = t.charCodeAt(++o)
              i = (65536 + ((i & 1023) << 10)) | (s & 1023)
            }
            if (((U[e >> 2] = i), (e += 4), e + 4 > a)) break
          }
          return (U[e >> 2] = 0), e - n
        },
        Nn = (t) => {
          for (var e = 0, r = 0; r < t.length; ++r) {
            var n = t.charCodeAt(r)
            n >= 55296 && n <= 57343 && ++r, (e += 4)
          }
          return e
        },
        Gn = (t, e, r) => {
          r = V(r)
          var n, a, o, i, s
          e === 2
            ? ((n = Un), (a = Vn), (i = Ln), (o = () => Tt), (s = 1))
            : e === 4 && ((n = zn), (a = Yn), (i = Nn), (o = () => S), (s = 2)),
            et(t, {
              name: r,
              fromWireType: (l) => {
                for (
                  var f = S[l >> 2], h = o(), y, v = l + 4, T = 0;
                  T <= f;
                  ++T
                ) {
                  var x = l + 4 + T * e
                  if (T == f || h[x >> s] == 0) {
                    var H = x - v,
                      A = n(v, H)
                    y === void 0
                      ? (y = A)
                      : ((y += String.fromCharCode(0)), (y += A)),
                      (v = x + e)
                  }
                }
                return nt(l), y
              },
              toWireType: (l, f) => {
                typeof f != 'string' &&
                  P(`Cannot pass non-string to C++ string type ${r}`)
                var h = i(f),
                  y = ee(4 + h + e)
                return (
                  (S[y >> 2] = h >> s),
                  a(f, y + 4, h + e),
                  l !== null && l.push(nt, y),
                  y
                )
              },
              argPackAdvance: rt,
              readValueFromPointer: Yt,
              destructorFunction(l) {
                nt(l)
              },
            })
        },
        Xn = (t, e, r, n, a, o) => {
          St[t] = {
            name: V(e),
            rawConstructor: Z(r, n),
            rawDestructor: Z(a, o),
            fields: [],
          }
        },
        qn = (t, e, r, n, a, o, i, s, l, f) => {
          St[t].fields.push({
            fieldName: V(e),
            getterReturnType: r,
            getter: Z(n, a),
            getterContext: o,
            setterArgumentType: i,
            setter: Z(s, l),
            setterContext: f,
          })
        },
        Jn = (t, e) => {
          ;(e = V(e)),
            et(t, {
              isVoid: !0,
              name: e,
              argPackAdvance: 0,
              fromWireType: () => {},
              toWireType: (r, n) => {},
            })
        },
        Qn = {},
        Zn = (t) => {
          var e = Qn[t]
          return e === void 0 ? V(t) : e
        },
        Xe = () => {
          if (typeof globalThis == 'object') return globalThis
          function t(e) {
            e.$$$embind_global$$$ = e
            var r =
              typeof $$$embind_global$$$ == 'object' &&
              e.$$$embind_global$$$ == e
            return r || delete e.$$$embind_global$$$, r
          }
          if (
            typeof $$$embind_global$$$ == 'object' ||
            (typeof global == 'object' && t(global)
              ? ($$$embind_global$$$ = global)
              : typeof self == 'object' &&
                t(self) &&
                ($$$embind_global$$$ = self),
            typeof $$$embind_global$$$ == 'object')
          )
            return $$$embind_global$$$
          throw Error('unable to get global object.')
        },
        Kn = (t) =>
          t === 0 ? at.toHandle(Xe()) : ((t = Zn(t)), at.toHandle(Xe()[t])),
        ta = (t) => {
          t > 4 && (Q.get(t).refcount += 1)
        },
        qe = (t, e) => {
          var r = ut[t]
          return r === void 0 && P(e + ' has unknown type ' + Ue(t)), r
        },
        ea = (t) => {
          var e = new Array(t + 1)
          return function (r, n, a) {
            e[0] = r
            for (var o = 0; o < t; ++o) {
              var i = qe(S[(n + o * 4) >> 2], 'parameter ' + o)
              ;(e[o + 1] = i.readValueFromPointer(a)), (a += i.argPackAdvance)
            }
            var s = new (r.bind.apply(r, e))()
            return at.toHandle(s)
          }
        },
        Je = {},
        ra = (t, e, r, n) => {
          t = at.toValue(t)
          var a = Je[e]
          return a || ((a = ea(e)), (Je[e] = a)), a(t, r, n)
        },
        na = (t, e) => {
          t = qe(t, '_emval_take_value')
          var r = t.readValueFromPointer(e)
          return at.toHandle(r)
        },
        aa = () => {
          Pt('')
        },
        oa = (t, e, r) => B.copyWithin(t, e, e + r),
        ia = () => 2147483648,
        sa = (t) => {
          var e = K.buffer,
            r = (t - e.byteLength + 65535) / 65536
          try {
            return K.grow(r), we(), 1
          } catch {}
        },
        ua = (t) => {
          var e = B.length
          t >>>= 0
          var r = ia()
          if (t > r) return !1
          for (
            var n = (l, f) => l + ((f - (l % f)) % f), a = 1;
            a <= 4;
            a *= 2
          ) {
            var o = e * (1 + 0.2 / a)
            o = Math.min(o, t + 100663296)
            var i = Math.min(r, n(Math.max(t, o), 65536)),
              s = sa(i)
            if (s) return !0
          }
          return !1
        },
        te = {},
        ca = () => O || './this.program',
        Ct = () => {
          if (!Ct.strings) {
            var t =
                (
                  (typeof navigator == 'object' &&
                    navigator.languages &&
                    navigator.languages[0]) ||
                  'C'
                ).replace('-', '_') + '.UTF-8',
              e = {
                USER: 'web_user',
                LOGNAME: 'web_user',
                PATH: '/',
                PWD: '/',
                HOME: '/home/web_user',
                LANG: t,
                _: ca(),
              }
            for (var r in te) te[r] === void 0 ? delete e[r] : (e[r] = te[r])
            var n = []
            for (var r in e) n.push(`${r}=${e[r]}`)
            Ct.strings = n
          }
          return Ct.strings
        },
        la = (t, e) => {
          for (var r = 0; r < t.length; ++r) J[e++ >> 0] = t.charCodeAt(r)
          J[e >> 0] = 0
        },
        fa = (t, e) => {
          var r = 0
          return (
            Ct().forEach((n, a) => {
              var o = e + r
              ;(S[(t + a * 4) >> 2] = o), la(n, o), (r += n.length + 1)
            }),
            0
          )
        },
        da = (t, e) => {
          var r = Ct()
          S[t >> 2] = r.length
          var n = 0
          return r.forEach((a) => (n += a.length + 1)), (S[e >> 2] = n), 0
        },
        ha = (t) => t,
        Ht = (t) => t % 4 === 0 && (t % 100 !== 0 || t % 400 === 0),
        pa = (t, e) => {
          for (var r = 0, n = 0; n <= e; r += t[n++]);
          return r
        },
        Qe = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        Ze = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        ma = (t, e) => {
          for (var r = new Date(t.getTime()); e > 0; ) {
            var n = Ht(r.getFullYear()),
              a = r.getMonth(),
              o = (n ? Qe : Ze)[a]
            if (e > o - r.getDate())
              (e -= o - r.getDate() + 1),
                r.setDate(1),
                a < 11
                  ? r.setMonth(a + 1)
                  : (r.setMonth(0), r.setFullYear(r.getFullYear() + 1))
            else return r.setDate(r.getDate() + e), r
          }
          return r
        }
      function ya(t, e, r) {
        var n = r > 0 ? r : Ye(t) + 1,
          a = new Array(n),
          o = ze(t, a, 0, a.length)
        return e && (a.length = o), a
      }
      var va = (t, e) => {
          J.set(t, e)
        },
        ga = (t, e, r, n) => {
          var a = S[(n + 40) >> 2],
            o = {
              tm_sec: U[n >> 2],
              tm_min: U[(n + 4) >> 2],
              tm_hour: U[(n + 8) >> 2],
              tm_mday: U[(n + 12) >> 2],
              tm_mon: U[(n + 16) >> 2],
              tm_year: U[(n + 20) >> 2],
              tm_wday: U[(n + 24) >> 2],
              tm_yday: U[(n + 28) >> 2],
              tm_isdst: U[(n + 32) >> 2],
              tm_gmtoff: U[(n + 36) >> 2],
              tm_zone: a ? Kt(a) : '',
            },
            i = Kt(r),
            s = {
              '%c': '%a %b %d %H:%M:%S %Y',
              '%D': '%m/%d/%y',
              '%F': '%Y-%m-%d',
              '%h': '%b',
              '%r': '%I:%M:%S %p',
              '%R': '%H:%M',
              '%T': '%H:%M:%S',
              '%x': '%m/%d/%y',
              '%X': '%H:%M:%S',
              '%Ec': '%c',
              '%EC': '%C',
              '%Ex': '%m/%d/%y',
              '%EX': '%H:%M:%S',
              '%Ey': '%y',
              '%EY': '%Y',
              '%Od': '%d',
              '%Oe': '%e',
              '%OH': '%H',
              '%OI': '%I',
              '%Om': '%m',
              '%OM': '%M',
              '%OS': '%S',
              '%Ou': '%u',
              '%OU': '%U',
              '%OV': '%V',
              '%Ow': '%w',
              '%OW': '%W',
              '%Oy': '%y',
            }
          for (var l in s) i = i.replace(new RegExp(l, 'g'), s[l])
          var f = [
              'Sunday',
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
            ],
            h = [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ]
          function y(d, p, M) {
            for (
              var I = typeof d == 'number' ? d.toString() : d || '';
              I.length < p;

            )
              I = M[0] + I
            return I
          }
          function v(d, p) {
            return y(d, p, '0')
          }
          function T(d, p) {
            function M(lt) {
              return lt < 0 ? -1 : lt > 0 ? 1 : 0
            }
            var I
            return (
              (I = M(d.getFullYear() - p.getFullYear())) === 0 &&
                (I = M(d.getMonth() - p.getMonth())) === 0 &&
                (I = M(d.getDate() - p.getDate())),
              I
            )
          }
          function x(d) {
            switch (d.getDay()) {
              case 0:
                return new Date(d.getFullYear() - 1, 11, 29)
              case 1:
                return d
              case 2:
                return new Date(d.getFullYear(), 0, 3)
              case 3:
                return new Date(d.getFullYear(), 0, 2)
              case 4:
                return new Date(d.getFullYear(), 0, 1)
              case 5:
                return new Date(d.getFullYear() - 1, 11, 31)
              case 6:
                return new Date(d.getFullYear() - 1, 11, 30)
            }
          }
          function H(d) {
            var p = ma(new Date(d.tm_year + 1900, 0, 1), d.tm_yday),
              M = new Date(p.getFullYear(), 0, 4),
              I = new Date(p.getFullYear() + 1, 0, 4),
              lt = x(M),
              kt = x(I)
            return T(lt, p) <= 0
              ? T(kt, p) <= 0
                ? p.getFullYear() + 1
                : p.getFullYear()
              : p.getFullYear() - 1
          }
          var A = {
            '%a': (d) => f[d.tm_wday].substring(0, 3),
            '%A': (d) => f[d.tm_wday],
            '%b': (d) => h[d.tm_mon].substring(0, 3),
            '%B': (d) => h[d.tm_mon],
            '%C': (d) => {
              var p = d.tm_year + 1900
              return v((p / 100) | 0, 2)
            },
            '%d': (d) => v(d.tm_mday, 2),
            '%e': (d) => y(d.tm_mday, 2, ' '),
            '%g': (d) => H(d).toString().substring(2),
            '%G': (d) => H(d),
            '%H': (d) => v(d.tm_hour, 2),
            '%I': (d) => {
              var p = d.tm_hour
              return p == 0 ? (p = 12) : p > 12 && (p -= 12), v(p, 2)
            },
            '%j': (d) =>
              v(
                d.tm_mday + pa(Ht(d.tm_year + 1900) ? Qe : Ze, d.tm_mon - 1),
                3
              ),
            '%m': (d) => v(d.tm_mon + 1, 2),
            '%M': (d) => v(d.tm_min, 2),
            '%n': () => `
`,
            '%p': (d) => (d.tm_hour >= 0 && d.tm_hour < 12 ? 'AM' : 'PM'),
            '%S': (d) => v(d.tm_sec, 2),
            '%t': () => '	',
            '%u': (d) => d.tm_wday || 7,
            '%U': (d) => {
              var p = d.tm_yday + 7 - d.tm_wday
              return v(Math.floor(p / 7), 2)
            },
            '%V': (d) => {
              var p = Math.floor((d.tm_yday + 7 - ((d.tm_wday + 6) % 7)) / 7)
              if (((d.tm_wday + 371 - d.tm_yday - 2) % 7 <= 2 && p++, p)) {
                if (p == 53) {
                  var M = (d.tm_wday + 371 - d.tm_yday) % 7
                  M != 4 && (M != 3 || !Ht(d.tm_year)) && (p = 1)
                }
              } else {
                p = 52
                var I = (d.tm_wday + 7 - d.tm_yday - 1) % 7
                ;(I == 4 || (I == 5 && Ht((d.tm_year % 400) - 1))) && p++
              }
              return v(p, 2)
            },
            '%w': (d) => d.tm_wday,
            '%W': (d) => {
              var p = d.tm_yday + 7 - ((d.tm_wday + 6) % 7)
              return v(Math.floor(p / 7), 2)
            },
            '%y': (d) => (d.tm_year + 1900).toString().substring(2),
            '%Y': (d) => d.tm_year + 1900,
            '%z': (d) => {
              var p = d.tm_gmtoff,
                M = p >= 0
              return (
                (p = Math.abs(p) / 60),
                (p = (p / 60) * 100 + (p % 60)),
                (M ? '+' : '-') + ('0000' + p).slice(-4)
              )
            },
            '%Z': (d) => d.tm_zone,
            '%%': () => '%',
          }
          i = i.replace(/%%/g, '\0\0')
          for (var l in A)
            i.includes(l) && (i = i.replace(new RegExp(l, 'g'), A[l](o)))
          i = i.replace(/\0\0/g, '%')
          var W = ya(i, !1)
          return W.length > e ? 0 : (va(W, t), W.length - 1)
        },
        wa = (t, e, r, n, a) => ga(t, e, r, n)
      ;(xe = u.InternalError =
        class extends Error {
          constructor(t) {
            super(t), (this.name = 'InternalError')
          }
        }),
        tn(),
        (ht = u.BindingError =
          class extends Error {
            constructor(t) {
              super(t), (this.name = 'BindingError')
            }
          }),
        hn(),
        cn(),
        $n(),
        (Be = u.UnboundTypeError = Tn(Error, 'UnboundTypeError')),
        An(),
        Dn()
      var $a = {
          q: Vr,
          u: Lr,
          a: Yr,
          h: Nr,
          l: Gr,
          I: Xr,
          P: qr,
          n: Jr,
          ba: Qr,
          d: zr,
          oa: Zr,
          Y: Kr,
          fa: rn,
          na: Pn,
          ma: En,
          D: xn,
          ea: On,
          W: Mn,
          J: jn,
          w: Rn,
          s: Hn,
          V: Bn,
          L: Gn,
          Q: Xn,
          pa: qn,
          ga: Jn,
          U: Le,
          la: Kn,
          R: ta,
          ia: ra,
          ka: na,
          K: aa,
          da: oa,
          ca: ua,
          $: fa,
          aa: da,
          H: ka,
          T: Xa,
          B: Ua,
          p: Ra,
          b: ba,
          C: Wa,
          ha: La,
          c: Ea,
          j: Aa,
          i: Ta,
          x: Ba,
          O: Ha,
          v: ja,
          G: Ya,
          N: Na,
          A: Va,
          F: qa,
          Z: Qa,
          X: Za,
          k: xa,
          f: Pa,
          e: _a,
          g: Ca,
          M: Ga,
          m: Ma,
          o: Sa,
          S: Da,
          t: Fa,
          ja: Ia,
          y: za,
          r: Oa,
          E: Ja,
          z: ha,
          _: wa,
        },
        D = Ur(),
        nt = (u._free = (t) => (nt = u._free = D.sa)(t)),
        ee = (u._malloc = (t) => (ee = u._malloc = D.ta)(t)),
        Ke = (t) => (Ke = D.va)(t)
      u.__embind_initialize_bindings = () =>
        (u.__embind_initialize_bindings = D.wa)()
      var b = (t, e) => (b = D.xa)(t, e),
        _t = (t) => (_t = D.ya)(t),
        C = () => (C = D.za)(),
        _ = (t) => (_ = D.Aa)(t),
        tr = (t) => (tr = D.Ba)(t),
        er = (t) => (er = D.Ca)(t),
        rr = (t, e, r) => (rr = D.Da)(t, e, r),
        nr = (t) => (nr = D.Ea)(t)
      u.dynCall_viijii = (t, e, r, n, a, o, i) =>
        (u.dynCall_viijii = D.Fa)(t, e, r, n, a, o, i)
      var ar = (u.dynCall_jiii = (t, e, r, n) =>
          (ar = u.dynCall_jiii = D.Ga)(t, e, r, n)),
        or = (u.dynCall_jiiii = (t, e, r, n, a) =>
          (or = u.dynCall_jiiii = D.Ha)(t, e, r, n, a))
      ;(u.dynCall_iiiiij = (t, e, r, n, a, o, i) =>
        (u.dynCall_iiiiij = D.Ia)(t, e, r, n, a, o, i)),
        (u.dynCall_iiiiijj = (t, e, r, n, a, o, i, s, l) =>
          (u.dynCall_iiiiijj = D.Ja)(t, e, r, n, a, o, i, s, l)),
        (u.dynCall_iiiiiijj = (t, e, r, n, a, o, i, s, l, f) =>
          (u.dynCall_iiiiiijj = D.Ka)(t, e, r, n, a, o, i, s, l, f))
      function ba(t, e) {
        var r = C()
        try {
          return E(t)(e)
        } catch (n) {
          if ((_(r), n !== n + 0)) throw n
          b(1, 0)
        }
      }
      function Ca(t, e, r, n) {
        var a = C()
        try {
          E(t)(e, r, n)
        } catch (o) {
          if ((_(a), o !== o + 0)) throw o
          b(1, 0)
        }
      }
      function _a(t, e, r) {
        var n = C()
        try {
          E(t)(e, r)
        } catch (a) {
          if ((_(n), a !== a + 0)) throw a
          b(1, 0)
        }
      }
      function Ta(t, e, r, n, a) {
        var o = C()
        try {
          return E(t)(e, r, n, a)
        } catch (i) {
          if ((_(o), i !== i + 0)) throw i
          b(1, 0)
        }
      }
      function Pa(t, e) {
        var r = C()
        try {
          E(t)(e)
        } catch (n) {
          if ((_(r), n !== n + 0)) throw n
          b(1, 0)
        }
      }
      function Ea(t, e, r) {
        var n = C()
        try {
          return E(t)(e, r)
        } catch (a) {
          if ((_(n), a !== a + 0)) throw a
          b(1, 0)
        }
      }
      function xa(t) {
        var e = C()
        try {
          E(t)()
        } catch (r) {
          if ((_(e), r !== r + 0)) throw r
          b(1, 0)
        }
      }
      function Aa(t, e, r, n) {
        var a = C()
        try {
          return E(t)(e, r, n)
        } catch (o) {
          if ((_(a), o !== o + 0)) throw o
          b(1, 0)
        }
      }
      function Sa(t, e, r, n, a, o) {
        var i = C()
        try {
          E(t)(e, r, n, a, o)
        } catch (s) {
          if ((_(i), s !== s + 0)) throw s
          b(1, 0)
        }
      }
      function Da(t, e, r, n, a, o, i) {
        var s = C()
        try {
          E(t)(e, r, n, a, o, i)
        } catch (l) {
          if ((_(s), l !== l + 0)) throw l
          b(1, 0)
        }
      }
      function Oa(t, e, r, n, a, o, i, s, l, f, h) {
        var y = C()
        try {
          E(t)(e, r, n, a, o, i, s, l, f, h)
        } catch (v) {
          if ((_(y), v !== v + 0)) throw v
          b(1, 0)
        }
      }
      function Fa(t, e, r, n, a, o, i, s) {
        var l = C()
        try {
          E(t)(e, r, n, a, o, i, s)
        } catch (f) {
          if ((_(l), f !== f + 0)) throw f
          b(1, 0)
        }
      }
      function Ma(t, e, r, n, a) {
        var o = C()
        try {
          E(t)(e, r, n, a)
        } catch (i) {
          if ((_(o), i !== i + 0)) throw i
          b(1, 0)
        }
      }
      function ja(t, e, r, n, a, o, i) {
        var s = C()
        try {
          return E(t)(e, r, n, a, o, i)
        } catch (l) {
          if ((_(s), l !== l + 0)) throw l
          b(1, 0)
        }
      }
      function Ia(t, e, r, n, a, o, i, s, l) {
        var f = C()
        try {
          E(t)(e, r, n, a, o, i, s, l)
        } catch (h) {
          if ((_(f), h !== h + 0)) throw h
          b(1, 0)
        }
      }
      function Ra(t) {
        var e = C()
        try {
          return E(t)()
        } catch (r) {
          if ((_(e), r !== r + 0)) throw r
          b(1, 0)
        }
      }
      function Ha(t, e, r, n, a, o, i) {
        var s = C()
        try {
          return E(t)(e, r, n, a, o, i)
        } catch (l) {
          if ((_(s), l !== l + 0)) throw l
          b(1, 0)
        }
      }
      function Wa(t, e, r, n) {
        var a = C()
        try {
          return E(t)(e, r, n)
        } catch (o) {
          if ((_(a), o !== o + 0)) throw o
          b(1, 0)
        }
      }
      function ka(t, e, r, n) {
        var a = C()
        try {
          return E(t)(e, r, n)
        } catch (o) {
          if ((_(a), o !== o + 0)) throw o
          b(1, 0)
        }
      }
      function Ba(t, e, r, n, a, o) {
        var i = C()
        try {
          return E(t)(e, r, n, a, o)
        } catch (s) {
          if ((_(i), s !== s + 0)) throw s
          b(1, 0)
        }
      }
      function Ua(t, e, r, n, a, o) {
        var i = C()
        try {
          return E(t)(e, r, n, a, o)
        } catch (s) {
          if ((_(i), s !== s + 0)) throw s
          b(1, 0)
        }
      }
      function Va(t, e, r, n, a, o, i, s, l, f) {
        var h = C()
        try {
          return E(t)(e, r, n, a, o, i, s, l, f)
        } catch (y) {
          if ((_(h), y !== y + 0)) throw y
          b(1, 0)
        }
      }
      function La(t, e, r) {
        var n = C()
        try {
          return E(t)(e, r)
        } catch (a) {
          if ((_(n), a !== a + 0)) throw a
          b(1, 0)
        }
      }
      function za(t, e, r, n, a, o, i, s, l, f) {
        var h = C()
        try {
          E(t)(e, r, n, a, o, i, s, l, f)
        } catch (y) {
          if ((_(h), y !== y + 0)) throw y
          b(1, 0)
        }
      }
      function Ya(t, e, r, n, a, o, i, s) {
        var l = C()
        try {
          return E(t)(e, r, n, a, o, i, s)
        } catch (f) {
          if ((_(l), f !== f + 0)) throw f
          b(1, 0)
        }
      }
      function Na(t, e, r, n, a, o, i, s, l) {
        var f = C()
        try {
          return E(t)(e, r, n, a, o, i, s, l)
        } catch (h) {
          if ((_(f), h !== h + 0)) throw h
          b(1, 0)
        }
      }
      function Ga(t, e, r, n, a, o, i) {
        var s = C()
        try {
          E(t)(e, r, n, a, o, i)
        } catch (l) {
          if ((_(s), l !== l + 0)) throw l
          b(1, 0)
        }
      }
      function Xa(t, e, r, n) {
        var a = C()
        try {
          return E(t)(e, r, n)
        } catch (o) {
          if ((_(a), o !== o + 0)) throw o
          b(1, 0)
        }
      }
      function qa(t, e, r, n, a, o, i, s, l, f, h, y) {
        var v = C()
        try {
          return E(t)(e, r, n, a, o, i, s, l, f, h, y)
        } catch (T) {
          if ((_(v), T !== T + 0)) throw T
          b(1, 0)
        }
      }
      function Ja(t, e, r, n, a, o, i, s, l, f, h, y, v, T, x, H) {
        var A = C()
        try {
          E(t)(e, r, n, a, o, i, s, l, f, h, y, v, T, x, H)
        } catch (W) {
          if ((_(A), W !== W + 0)) throw W
          b(1, 0)
        }
      }
      function Qa(t, e, r, n) {
        var a = C()
        try {
          return ar(t, e, r, n)
        } catch (o) {
          if ((_(a), o !== o + 0)) throw o
          b(1, 0)
        }
      }
      function Za(t, e, r, n, a) {
        var o = C()
        try {
          return or(t, e, r, n, a)
        } catch (i) {
          if ((_(o), i !== i + 0)) throw i
          b(1, 0)
        }
      }
      var Wt
      vt = function t() {
        Wt || ir(), Wt || (vt = t)
      }
      function ir() {
        if (it > 0 || (Dr(), it > 0)) return
        function t() {
          Wt ||
            ((Wt = !0),
            (u.calledRun = !0),
            !mt &&
              (Or(),
              g(u),
              u.onRuntimeInitialized && u.onRuntimeInitialized(),
              Fr()))
        }
        u.setStatus
          ? (u.setStatus('Running...'),
            setTimeout(function () {
              setTimeout(function () {
                u.setStatus('')
              }, 1),
                t()
            }, 1))
          : t()
      }
      if (u.preInit)
        for (
          typeof u.preInit == 'function' && (u.preInit = [u.preInit]);
          u.preInit.length > 0;

        )
          u.preInit.pop()()
      return ir(), m.ready
    }
  })()
  function Pr(c) {
    return Bt(Ut, c)
  }
  async function Er(
    c,
    {
      tryHarder: m = k.tryHarder,
      formats: u = k.formats,
      maxSymbols: g = k.maxSymbols,
    } = k
  ) {
    return _r(c, { tryHarder: m, formats: u, maxSymbols: g }, Ut)
  }
  async function xr(
    c,
    {
      tryHarder: m = k.tryHarder,
      formats: u = k.formats,
      maxSymbols: g = k.maxSymbols,
    } = k
  ) {
    return Tr(c, { tryHarder: m, formats: u, maxSymbols: g }, Ut)
  }
  const Vt = new Map([
    ['aztec', 'Aztec'],
    ['code_128', 'Code128'],
    ['code_39', 'Code39'],
    ['code_93', 'Code93'],
    ['codabar', 'Codabar'],
    ['data_matrix', 'DataMatrix'],
    ['ean_13', 'EAN-13'],
    ['ean_8', 'EAN-8'],
    ['itf', 'ITF'],
    ['pdf417', 'PDF417'],
    ['qr_code', 'QRCode'],
    ['upc_a', 'UPC-A'],
    ['upc_e', 'UPC-E'],
  ])
  function Ar(c) {
    for (const [m, u] of Vt) if (c === u) return m
    return 'unknown'
  }
  class Sr extends EventTarget {
    constructor(u = {}) {
      var g
      super()
      ur(this, ft, void 0)
      try {
        const $ =
          (g = u == null ? void 0 : u.formats) == null
            ? void 0
            : g.filter((w) => w !== 'unknown')
        if (($ == null ? void 0 : $.length) === 0)
          throw new TypeError('Hint option provided, but is empty.')
        $ == null ||
          $.forEach((w) => {
            if (!L.includes(w))
              throw new TypeError(
                `Failed to read the 'formats' property from 'BarcodeDetectorOptions': The provided value '${w}' is not a valid enum value of type BarcodeFormat.`
              )
          }),
          cr(this, ft, $ ?? []),
          Pr()
            .then((w) => {
              this.dispatchEvent(new CustomEvent('load', { detail: w }))
            })
            .catch((w) => {
              this.dispatchEvent(new CustomEvent('error', { detail: w }))
            })
      } catch ($) {
        throw fe($, "Failed to construct 'BarcodeDetector'")
      }
    }
    static async getSupportedFormats() {
      return L.filter((u) => u !== 'unknown')
    }
    async detect(u) {
      try {
        const g = await pr(u)
        if (g === null) return []
        let $
        try {
          ce(g)
            ? ($ = await Er(g, {
                tryHarder: !0,
                formats: re(this, ft).map((w) => Vt.get(w)),
              }))
            : ($ = await xr(g, {
                tryHarder: !0,
                formats: re(this, ft).map((w) => Vt.get(w)),
              }))
        } catch (w) {
          throw (
            (console.error(w),
            new DOMException(
              'Barcode detection service unavailable.',
              'NotSupportedError'
            ))
          )
        }
        return $.map((w) => {
          const {
              topLeft: { x: O, y: G },
              topRight: { x: j, y: F },
              bottomLeft: { x: Y, y: N },
              bottomRight: { x: z, y: X },
            } = w.position,
            K = Math.min(O, j, Y, z),
            mt = Math.min(G, F, N, X),
            J = Math.max(O, j, Y, z),
            B = Math.max(G, F, N, X)
          return {
            boundingBox: new DOMRectReadOnly(K, mt, J - K, B - mt),
            rawValue: new TextDecoder().decode(w.bytes),
            format: Ar(w.format),
            cornerPoints: [
              { x: O, y: G },
              { x: j, y: F },
              { x: z, y: X },
              { x: Y, y: N },
            ],
          }
        })
      } catch (g) {
        throw fe(g, "Failed to execute 'detect' on 'BarcodeDetector'")
      }
    }
  }
  return (
    (ft = new WeakMap()),
    (R.BarcodeDetector = Sr),
    (R.setZXingModuleOverrides = Cr),
    Object.defineProperty(R, Symbol.toStringTag, { value: 'Module' }),
    R
  )
})({})
