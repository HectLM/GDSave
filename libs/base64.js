/**
 * Minified by jsDelivr using Terser v5.3.5.
 * Original file: /npm/js-base64@3.6.0/base64.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
!function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : function() {
        const r = e.Base64
          , o = t();
        o.noConflict = () => (e.Base64 = r,
        o),
        e.Meteor && (Base64 = o),
        e.Base64 = o
    }()
}("undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : this, (function() {
    "use strict";
    const e = "3.6.0"
      , t = "function" == typeof atob
      , r = "function" == typeof btoa
      , o = "function" == typeof Buffer
      , n = "function" == typeof TextDecoder ? new TextDecoder : void 0
      , a = "function" == typeof TextEncoder ? new TextEncoder : void 0
      , f = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="]
      , i = (e => {
        let t = {};
        return e.forEach(( (e, r) => t[e] = r)),
        t
    }
    )(f)
      , c = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/
      , u = String.fromCharCode.bind(String)
      , s = "function" == typeof Uint8Array.from ? Uint8Array.from.bind(Uint8Array) : (e, t=(e => e)) => new Uint8Array(Array.prototype.slice.call(e, 0).map(t))
      , d = e => e.replace(/[+\/]/g, (e => "+" == e ? "-" : "_")).replace(/=+$/m, "")
      , l = e => e.replace(/[^A-Za-z0-9\+\/]/g, "")
      , h = e => {
        let t, r, o, n, a = "";
        const i = e.length % 3;
        for (let i = 0; i < e.length; ) {
            if ((r = e.charCodeAt(i++)) > 255 || (o = e.charCodeAt(i++)) > 255 || (n = e.charCodeAt(i++)) > 255)
                throw new TypeError("invalid character found");
            t = r << 16 | o << 8 | n,
            a += f[t >> 18 & 63] + f[t >> 12 & 63] + f[t >> 6 & 63] + f[63 & t]
        }
        return i ? a.slice(0, i - 3) + "===".substring(i) : a
    }
      , p = r ? e => btoa(e) : o ? e => Buffer.from(e, "binary").toString("base64") : h
      , y = o ? e => Buffer.from(e).toString("base64") : e => {
        let t = [];
        for (let r = 0, o = e.length; r < o; r += 4096)
            t.push(u.apply(null, e.subarray(r, r + 4096)));
        return p(t.join(""))
    }
      , A = (e, t=!1) => t ? d(y(e)) : y(e)
      , b = e => {
        if (e.length < 2)
            return (t = e.charCodeAt(0)) < 128 ? e : t < 2048 ? u(192 | t >>> 6) + u(128 | 63 & t) : u(224 | t >>> 12 & 15) + u(128 | t >>> 6 & 63) + u(128 | 63 & t);
        var t = 65536 + 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320);
        return u(240 | t >>> 18 & 7) + u(128 | t >>> 12 & 63) + u(128 | t >>> 6 & 63) + u(128 | 63 & t)
    }
      , g = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g
      , B = e => e.replace(g, b)
      , x = o ? e => Buffer.from(e, "utf8").toString("base64") : a ? e => y(a.encode(e)) : e => p(B(e))
      , C = (e, t=!1) => t ? d(x(e)) : x(e)
      , m = e => C(e, !0)
      , U = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g
      , F = e => {
        switch (e.length) {
        case 4:
            var t = ((7 & e.charCodeAt(0)) << 18 | (63 & e.charCodeAt(1)) << 12 | (63 & e.charCodeAt(2)) << 6 | 63 & e.charCodeAt(3)) - 65536;
            return u(55296 + (t >>> 10)) + u(56320 + (1023 & t));
        case 3:
            return u((15 & e.charCodeAt(0)) << 12 | (63 & e.charCodeAt(1)) << 6 | 63 & e.charCodeAt(2));
        default:
            return u((31 & e.charCodeAt(0)) << 6 | 63 & e.charCodeAt(1))
        }
    }
      , w = e => e.replace(U, F)
      , S = e => {
        if (e = e.replace(/\s+/g, ""),
        !c.test(e))
            throw new TypeError("malformed base64.");
        e += "==".slice(2 - (3 & e.length));
        let t, r, o, n = "";
        for (let a = 0; a < e.length; )
            t = i[e.charAt(a++)] << 18 | i[e.charAt(a++)] << 12 | (r = i[e.charAt(a++)]) << 6 | (o = i[e.charAt(a++)]),
            n += 64 === r ? u(t >> 16 & 255) : 64 === o ? u(t >> 16 & 255, t >> 8 & 255) : u(t >> 16 & 255, t >> 8 & 255, 255 & t);
        return n
    }
      , E = t ? e => atob(l(e)) : o ? e => Buffer.from(e, "base64").toString("binary") : S
      , v = o ? e => s(Buffer.from(e, "base64")) : e => s(E(e), (e => e.charCodeAt(0)))
      , D = e => v(z(e))
      , R = o ? e => Buffer.from(e, "base64").toString("utf8") : n ? e => n.decode(v(e)) : e => w(E(e))
      , z = e => l(e.replace(/[-_]/g, (e => "-" == e ? "+" : "/")))
      , T = e => R(z(e))
      , Z = e => ({
        value: e,
        enumerable: !1,
        writable: !0,
        configurable: !0
    })
      , j = function() {
        const e = (e, t) => Object.defineProperty(String.prototype, e, Z(t));
        e("fromBase64", (function() {
            return T(this)
        }
        )),
        e("toBase64", (function(e) {
            return C(this, e)
        }
        )),
        e("toBase64URI", (function() {
            return C(this, !0)
        }
        )),
        e("toBase64URL", (function() {
            return C(this, !0)
        }
        )),
        e("toUint8Array", (function() {
            return D(this)
        }
        ))
    }
      , I = function() {
        const e = (e, t) => Object.defineProperty(Uint8Array.prototype, e, Z(t));
        e("toBase64", (function(e) {
            return A(this, e)
        }
        )),
        e("toBase64URI", (function() {
            return A(this, !0)
        }
        )),
        e("toBase64URL", (function() {
            return A(this, !0)
        }
        ))
    }
      , O = {
        version: e,
        VERSION: "3.6.0",
        atob: E,
        atobPolyfill: S,
        btoa: p,
        btoaPolyfill: h,
        fromBase64: T,
        toBase64: C,
        encode: C,
        encodeURI: m,
        encodeURL: m,
        utob: B,
        btou: w,
        decode: T,
        isValid: e => {
            if ("string" != typeof e)
                return !1;
            const t = e.replace(/\s+/g, "").replace(/=+$/, "");
            return !/[^\s0-9a-zA-Z\+/]/.test(t) || !/[^\s0-9a-zA-Z\-_]/.test(t)
        }
        ,
        fromUint8Array: A,
        toUint8Array: D,
        extendString: j,
        extendUint8Array: I,
        extendBuiltins: () => {
            j(),
            I()
        }
        ,
        Base64: {}
    };
    return Object.keys(O).forEach((e => O.Base64[e] = O[e])),
    O
}
));
//# sourceMappingURL=/sm/8bca8602e2256d240cef904e1c1df432ccfdd2a2a73f6911c60be79e526e3e1e.map