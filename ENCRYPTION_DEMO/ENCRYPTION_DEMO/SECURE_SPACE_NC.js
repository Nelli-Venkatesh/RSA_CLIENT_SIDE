
/*
==================================================================================
			******************* SECURE SPACE **********************
==================================================================================
*/

/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/



function base64url(source) {
    encodedSource = CryptoJS.enc.Base64.stringify(source);
    encodedSource = encodedSource.replace(/=+$/, '');
    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');
    return encodedSource;
}


!function (t, r) { "object" == typeof exports ? module.exports = exports = r() : "function" == typeof define && define.amd ? define([], r) : t.CryptoJS = r() }(this, function () {
    var t = t || function (t, r) { var e = Object.create || function () { function t() { } return function (r) { var e; return t.prototype = r, e = new t, t.prototype = null, e } }(), i = {}, n = i.lib = {}, o = n.Base = function () { return { extend: function (t) { var r = e(this); return t && r.mixIn(t), r.hasOwnProperty("init") && this.init !== r.init || (r.init = function () { r.$super.init.apply(this, arguments) }), r.init.prototype = r, r.$super = this, r }, create: function () { var t = this.extend(); return t.init.apply(t, arguments), t }, init: function () { }, mixIn: function (t) { for (var r in t) t.hasOwnProperty(r) && (this[r] = t[r]); t.hasOwnProperty("toString") && (this.toString = t.toString) }, clone: function () { return this.init.prototype.extend(this) } } }(), s = n.WordArray = o.extend({ init: function (t, e) { t = this.words = t || [], e != r ? this.sigBytes = e : this.sigBytes = 4 * t.length }, toString: function (t) { return (t || c).stringify(this) }, concat: function (t) { var r = this.words, e = t.words, i = this.sigBytes, n = t.sigBytes; if (this.clamp(), i % 4) for (var o = 0; o < n; o++) { var s = e[o >>> 2] >>> 24 - o % 4 * 8 & 255; r[i + o >>> 2] |= s << 24 - (i + o) % 4 * 8 } else for (var o = 0; o < n; o += 4)r[i + o >>> 2] = e[o >>> 2]; return this.sigBytes += n, this }, clamp: function () { var r = this.words, e = this.sigBytes; r[e >>> 2] &= 4294967295 << 32 - e % 4 * 8, r.length = t.ceil(e / 4) }, clone: function () { var t = o.clone.call(this); return t.words = this.words.slice(0), t }, random: function (r) { for (var e, i = [], n = function (r) { var r = r, e = 987654321, i = 4294967295; return function () { e = 36969 * (65535 & e) + (e >> 16) & i, r = 18e3 * (65535 & r) + (r >> 16) & i; var n = (e << 16) + r & i; return n /= 4294967296, n += .5, n * (t.random() > .5 ? 1 : -1) } }, o = 0; o < r; o += 4) { var a = n(4294967296 * (e || t.random())); e = 987654071 * a(), i.push(4294967296 * a() | 0) } return new s.init(i, r) } }), a = i.enc = {}, c = a.Hex = { stringify: function (t) { for (var r = t.words, e = t.sigBytes, i = [], n = 0; n < e; n++) { var o = r[n >>> 2] >>> 24 - n % 4 * 8 & 255; i.push((o >>> 4).toString(16)), i.push((15 & o).toString(16)) } return i.join("") }, parse: function (t) { for (var r = t.length, e = [], i = 0; i < r; i += 2)e[i >>> 3] |= parseInt(t.substr(i, 2), 16) << 24 - i % 8 * 4; return new s.init(e, r / 2) } }, h = a.Latin1 = { stringify: function (t) { for (var r = t.words, e = t.sigBytes, i = [], n = 0; n < e; n++) { var o = r[n >>> 2] >>> 24 - n % 4 * 8 & 255; i.push(String.fromCharCode(o)) } return i.join("") }, parse: function (t) { for (var r = t.length, e = [], i = 0; i < r; i++)e[i >>> 2] |= (255 & t.charCodeAt(i)) << 24 - i % 4 * 8; return new s.init(e, r) } }, l = a.Utf8 = { stringify: function (t) { try { return decodeURIComponent(escape(h.stringify(t))) } catch (t) { throw new Error("Malformed UTF-8 data") } }, parse: function (t) { return h.parse(unescape(encodeURIComponent(t))) } }, f = n.BufferedBlockAlgorithm = o.extend({ reset: function () { this._data = new s.init, this._nDataBytes = 0 }, _append: function (t) { "string" == typeof t && (t = l.parse(t)), this._data.concat(t), this._nDataBytes += t.sigBytes }, _process: function (r) { var e = this._data, i = e.words, n = e.sigBytes, o = this.blockSize, a = 4 * o, c = n / a; c = r ? t.ceil(c) : t.max((0 | c) - this._minBufferSize, 0); var h = c * o, l = t.min(4 * h, n); if (h) { for (var f = 0; f < h; f += o)this._doProcessBlock(i, f); var u = i.splice(0, h); e.sigBytes -= l } return new s.init(u, l) }, clone: function () { var t = o.clone.call(this); return t._data = this._data.clone(), t }, _minBufferSize: 0 }), u = (n.Hasher = f.extend({ cfg: o.extend(), init: function (t) { this.cfg = this.cfg.extend(t), this.reset() }, reset: function () { f.reset.call(this), this._doReset() }, update: function (t) { return this._append(t), this._process(), this }, finalize: function (t) { t && this._append(t); var r = this._doFinalize(); return r }, blockSize: 16, _createHelper: function (t) { return function (r, e) { return new t.init(e).finalize(r) } }, _createHmacHelper: function (t) { return function (r, e) { return new u.HMAC.init(t, e).finalize(r) } } }), i.algo = {}); return i }(Math); return function () { function r(t, r, e) { for (var i = [], o = 0, s = 0; s < r; s++)if (s % 4) { var a = e[t.charCodeAt(s - 1)] << s % 4 * 2, c = e[t.charCodeAt(s)] >>> 6 - s % 4 * 2; i[o >>> 2] |= (a | c) << 24 - o % 4 * 8, o++ } return n.create(i, o) } var e = t, i = e.lib, n = i.WordArray, o = e.enc; o.Base64 = { stringify: function (t) { var r = t.words, e = t.sigBytes, i = this._map; t.clamp(); for (var n = [], o = 0; o < e; o += 3)for (var s = r[o >>> 2] >>> 24 - o % 4 * 8 & 255, a = r[o + 1 >>> 2] >>> 24 - (o + 1) % 4 * 8 & 255, c = r[o + 2 >>> 2] >>> 24 - (o + 2) % 4 * 8 & 255, h = s << 16 | a << 8 | c, l = 0; l < 4 && o + .75 * l < e; l++)n.push(i.charAt(h >>> 6 * (3 - l) & 63)); var f = i.charAt(64); if (f) for (; n.length % 4;)n.push(f); return n.join("") }, parse: function (t) { var e = t.length, i = this._map, n = this._reverseMap; if (!n) { n = this._reverseMap = []; for (var o = 0; o < i.length; o++)n[i.charCodeAt(o)] = o } var s = i.charAt(64); if (s) { var a = t.indexOf(s); a !== -1 && (e = a) } return r(t, e, n) }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" } }(), function (r) { function e(t, r, e, i, n, o, s) { var a = t + (r & e | ~r & i) + n + s; return (a << o | a >>> 32 - o) + r } function i(t, r, e, i, n, o, s) { var a = t + (r & i | e & ~i) + n + s; return (a << o | a >>> 32 - o) + r } function n(t, r, e, i, n, o, s) { var a = t + (r ^ e ^ i) + n + s; return (a << o | a >>> 32 - o) + r } function o(t, r, e, i, n, o, s) { var a = t + (e ^ (r | ~i)) + n + s; return (a << o | a >>> 32 - o) + r } var s = t, a = s.lib, c = a.WordArray, h = a.Hasher, l = s.algo, f = []; !function () { for (var t = 0; t < 64; t++)f[t] = 4294967296 * r.abs(r.sin(t + 1)) | 0 }(); var u = l.MD5 = h.extend({ _doReset: function () { this._hash = new c.init([1732584193, 4023233417, 2562383102, 271733878]) }, _doProcessBlock: function (t, r) { for (var s = 0; s < 16; s++) { var a = r + s, c = t[a]; t[a] = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8) } var h = this._hash.words, l = t[r + 0], u = t[r + 1], d = t[r + 2], v = t[r + 3], p = t[r + 4], _ = t[r + 5], y = t[r + 6], g = t[r + 7], B = t[r + 8], w = t[r + 9], k = t[r + 10], S = t[r + 11], m = t[r + 12], x = t[r + 13], b = t[r + 14], H = t[r + 15], z = h[0], A = h[1], C = h[2], D = h[3]; z = e(z, A, C, D, l, 7, f[0]), D = e(D, z, A, C, u, 12, f[1]), C = e(C, D, z, A, d, 17, f[2]), A = e(A, C, D, z, v, 22, f[3]), z = e(z, A, C, D, p, 7, f[4]), D = e(D, z, A, C, _, 12, f[5]), C = e(C, D, z, A, y, 17, f[6]), A = e(A, C, D, z, g, 22, f[7]), z = e(z, A, C, D, B, 7, f[8]), D = e(D, z, A, C, w, 12, f[9]), C = e(C, D, z, A, k, 17, f[10]), A = e(A, C, D, z, S, 22, f[11]), z = e(z, A, C, D, m, 7, f[12]), D = e(D, z, A, C, x, 12, f[13]), C = e(C, D, z, A, b, 17, f[14]), A = e(A, C, D, z, H, 22, f[15]), z = i(z, A, C, D, u, 5, f[16]), D = i(D, z, A, C, y, 9, f[17]), C = i(C, D, z, A, S, 14, f[18]), A = i(A, C, D, z, l, 20, f[19]), z = i(z, A, C, D, _, 5, f[20]), D = i(D, z, A, C, k, 9, f[21]), C = i(C, D, z, A, H, 14, f[22]), A = i(A, C, D, z, p, 20, f[23]), z = i(z, A, C, D, w, 5, f[24]), D = i(D, z, A, C, b, 9, f[25]), C = i(C, D, z, A, v, 14, f[26]), A = i(A, C, D, z, B, 20, f[27]), z = i(z, A, C, D, x, 5, f[28]), D = i(D, z, A, C, d, 9, f[29]), C = i(C, D, z, A, g, 14, f[30]), A = i(A, C, D, z, m, 20, f[31]), z = n(z, A, C, D, _, 4, f[32]), D = n(D, z, A, C, B, 11, f[33]), C = n(C, D, z, A, S, 16, f[34]), A = n(A, C, D, z, b, 23, f[35]), z = n(z, A, C, D, u, 4, f[36]), D = n(D, z, A, C, p, 11, f[37]), C = n(C, D, z, A, g, 16, f[38]), A = n(A, C, D, z, k, 23, f[39]), z = n(z, A, C, D, x, 4, f[40]), D = n(D, z, A, C, l, 11, f[41]), C = n(C, D, z, A, v, 16, f[42]), A = n(A, C, D, z, y, 23, f[43]), z = n(z, A, C, D, w, 4, f[44]), D = n(D, z, A, C, m, 11, f[45]), C = n(C, D, z, A, H, 16, f[46]), A = n(A, C, D, z, d, 23, f[47]), z = o(z, A, C, D, l, 6, f[48]), D = o(D, z, A, C, g, 10, f[49]), C = o(C, D, z, A, b, 15, f[50]), A = o(A, C, D, z, _, 21, f[51]), z = o(z, A, C, D, m, 6, f[52]), D = o(D, z, A, C, v, 10, f[53]), C = o(C, D, z, A, k, 15, f[54]), A = o(A, C, D, z, u, 21, f[55]), z = o(z, A, C, D, B, 6, f[56]), D = o(D, z, A, C, H, 10, f[57]), C = o(C, D, z, A, y, 15, f[58]), A = o(A, C, D, z, x, 21, f[59]), z = o(z, A, C, D, p, 6, f[60]), D = o(D, z, A, C, S, 10, f[61]), C = o(C, D, z, A, d, 15, f[62]), A = o(A, C, D, z, w, 21, f[63]), h[0] = h[0] + z | 0, h[1] = h[1] + A | 0, h[2] = h[2] + C | 0, h[3] = h[3] + D | 0 }, _doFinalize: function () { var t = this._data, e = t.words, i = 8 * this._nDataBytes, n = 8 * t.sigBytes; e[n >>> 5] |= 128 << 24 - n % 32; var o = r.floor(i / 4294967296), s = i; e[(n + 64 >>> 9 << 4) + 15] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), e[(n + 64 >>> 9 << 4) + 14] = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8), t.sigBytes = 4 * (e.length + 1), this._process(); for (var a = this._hash, c = a.words, h = 0; h < 4; h++) { var l = c[h]; c[h] = 16711935 & (l << 8 | l >>> 24) | 4278255360 & (l << 24 | l >>> 8) } return a }, clone: function () { var t = h.clone.call(this); return t._hash = this._hash.clone(), t } }); s.MD5 = h._createHelper(u), s.HmacMD5 = h._createHmacHelper(u) }(Math), function () { var r = t, e = r.lib, i = e.WordArray, n = e.Hasher, o = r.algo, s = [], a = o.SHA1 = n.extend({ _doReset: function () { this._hash = new i.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]) }, _doProcessBlock: function (t, r) { for (var e = this._hash.words, i = e[0], n = e[1], o = e[2], a = e[3], c = e[4], h = 0; h < 80; h++) { if (h < 16) s[h] = 0 | t[r + h]; else { var l = s[h - 3] ^ s[h - 8] ^ s[h - 14] ^ s[h - 16]; s[h] = l << 1 | l >>> 31 } var f = (i << 5 | i >>> 27) + c + s[h]; f += h < 20 ? (n & o | ~n & a) + 1518500249 : h < 40 ? (n ^ o ^ a) + 1859775393 : h < 60 ? (n & o | n & a | o & a) - 1894007588 : (n ^ o ^ a) - 899497514, c = a, a = o, o = n << 30 | n >>> 2, n = i, i = f } e[0] = e[0] + i | 0, e[1] = e[1] + n | 0, e[2] = e[2] + o | 0, e[3] = e[3] + a | 0, e[4] = e[4] + c | 0 }, _doFinalize: function () { var t = this._data, r = t.words, e = 8 * this._nDataBytes, i = 8 * t.sigBytes; return r[i >>> 5] |= 128 << 24 - i % 32, r[(i + 64 >>> 9 << 4) + 14] = Math.floor(e / 4294967296), r[(i + 64 >>> 9 << 4) + 15] = e, t.sigBytes = 4 * r.length, this._process(), this._hash }, clone: function () { var t = n.clone.call(this); return t._hash = this._hash.clone(), t } }); r.SHA1 = n._createHelper(a), r.HmacSHA1 = n._createHmacHelper(a) }(), function (r) { var e = t, i = e.lib, n = i.WordArray, o = i.Hasher, s = e.algo, a = [], c = []; !function () { function t(t) { for (var e = r.sqrt(t), i = 2; i <= e; i++)if (!(t % i)) return !1; return !0 } function e(t) { return 4294967296 * (t - (0 | t)) | 0 } for (var i = 2, n = 0; n < 64;)t(i) && (n < 8 && (a[n] = e(r.pow(i, .5))), c[n] = e(r.pow(i, 1 / 3)), n++), i++ }(); var h = [], l = s.SHA256 = o.extend({ _doReset: function () { this._hash = new n.init(a.slice(0)) }, _doProcessBlock: function (t, r) { for (var e = this._hash.words, i = e[0], n = e[1], o = e[2], s = e[3], a = e[4], l = e[5], f = e[6], u = e[7], d = 0; d < 64; d++) { if (d < 16) h[d] = 0 | t[r + d]; else { var v = h[d - 15], p = (v << 25 | v >>> 7) ^ (v << 14 | v >>> 18) ^ v >>> 3, _ = h[d - 2], y = (_ << 15 | _ >>> 17) ^ (_ << 13 | _ >>> 19) ^ _ >>> 10; h[d] = p + h[d - 7] + y + h[d - 16] } var g = a & l ^ ~a & f, B = i & n ^ i & o ^ n & o, w = (i << 30 | i >>> 2) ^ (i << 19 | i >>> 13) ^ (i << 10 | i >>> 22), k = (a << 26 | a >>> 6) ^ (a << 21 | a >>> 11) ^ (a << 7 | a >>> 25), S = u + k + g + c[d] + h[d], m = w + B; u = f, f = l, l = a, a = s + S | 0, s = o, o = n, n = i, i = S + m | 0 } e[0] = e[0] + i | 0, e[1] = e[1] + n | 0, e[2] = e[2] + o | 0, e[3] = e[3] + s | 0, e[4] = e[4] + a | 0, e[5] = e[5] + l | 0, e[6] = e[6] + f | 0, e[7] = e[7] + u | 0 }, _doFinalize: function () { var t = this._data, e = t.words, i = 8 * this._nDataBytes, n = 8 * t.sigBytes; return e[n >>> 5] |= 128 << 24 - n % 32, e[(n + 64 >>> 9 << 4) + 14] = r.floor(i / 4294967296), e[(n + 64 >>> 9 << 4) + 15] = i, t.sigBytes = 4 * e.length, this._process(), this._hash }, clone: function () { var t = o.clone.call(this); return t._hash = this._hash.clone(), t } }); e.SHA256 = o._createHelper(l), e.HmacSHA256 = o._createHmacHelper(l) }(Math), function () { function r(t) { return t << 8 & 4278255360 | t >>> 8 & 16711935 } var e = t, i = e.lib, n = i.WordArray, o = e.enc; o.Utf16 = o.Utf16BE = { stringify: function (t) { for (var r = t.words, e = t.sigBytes, i = [], n = 0; n < e; n += 2) { var o = r[n >>> 2] >>> 16 - n % 4 * 8 & 65535; i.push(String.fromCharCode(o)) } return i.join("") }, parse: function (t) { for (var r = t.length, e = [], i = 0; i < r; i++)e[i >>> 1] |= t.charCodeAt(i) << 16 - i % 2 * 16; return n.create(e, 2 * r) } }; o.Utf16LE = { stringify: function (t) { for (var e = t.words, i = t.sigBytes, n = [], o = 0; o < i; o += 2) { var s = r(e[o >>> 2] >>> 16 - o % 4 * 8 & 65535); n.push(String.fromCharCode(s)) } return n.join("") }, parse: function (t) { for (var e = t.length, i = [], o = 0; o < e; o++)i[o >>> 1] |= r(t.charCodeAt(o) << 16 - o % 2 * 16); return n.create(i, 2 * e) } } }(), function () { if ("function" == typeof ArrayBuffer) { var r = t, e = r.lib, i = e.WordArray, n = i.init, o = i.init = function (t) { if (t instanceof ArrayBuffer && (t = new Uint8Array(t)), (t instanceof Int8Array || "undefined" != typeof Uint8ClampedArray && t instanceof Uint8ClampedArray || t instanceof Int16Array || t instanceof Uint16Array || t instanceof Int32Array || t instanceof Uint32Array || t instanceof Float32Array || t instanceof Float64Array) && (t = new Uint8Array(t.buffer, t.byteOffset, t.byteLength)), t instanceof Uint8Array) { for (var r = t.byteLength, e = [], i = 0; i < r; i++)e[i >>> 2] |= t[i] << 24 - i % 4 * 8; n.call(this, e, r) } else n.apply(this, arguments) }; o.prototype = i } }(), function (r) { function e(t, r, e) { return t ^ r ^ e } function i(t, r, e) { return t & r | ~t & e } function n(t, r, e) { return (t | ~r) ^ e } function o(t, r, e) { return t & e | r & ~e } function s(t, r, e) { return t ^ (r | ~e) } function a(t, r) { return t << r | t >>> 32 - r } var c = t, h = c.lib, l = h.WordArray, f = h.Hasher, u = c.algo, d = l.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]), v = l.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]), p = l.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]), _ = l.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]), y = l.create([0, 1518500249, 1859775393, 2400959708, 2840853838]), g = l.create([1352829926, 1548603684, 1836072691, 2053994217, 0]), B = u.RIPEMD160 = f.extend({ _doReset: function () { this._hash = l.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520]) }, _doProcessBlock: function (t, r) { for (var c = 0; c < 16; c++) { var h = r + c, l = t[h]; t[h] = 16711935 & (l << 8 | l >>> 24) | 4278255360 & (l << 24 | l >>> 8) } var f, u, B, w, k, S, m, x, b, H, z = this._hash.words, A = y.words, C = g.words, D = d.words, R = v.words, E = p.words, M = _.words; S = f = z[0], m = u = z[1], x = B = z[2], b = w = z[3], H = k = z[4]; for (var F, c = 0; c < 80; c += 1)F = f + t[r + D[c]] | 0, F += c < 16 ? e(u, B, w) + A[0] : c < 32 ? i(u, B, w) + A[1] : c < 48 ? n(u, B, w) + A[2] : c < 64 ? o(u, B, w) + A[3] : s(u, B, w) + A[4], F |= 0, F = a(F, E[c]), F = F + k | 0, f = k, k = w, w = a(B, 10), B = u, u = F, F = S + t[r + R[c]] | 0, F += c < 16 ? s(m, x, b) + C[0] : c < 32 ? o(m, x, b) + C[1] : c < 48 ? n(m, x, b) + C[2] : c < 64 ? i(m, x, b) + C[3] : e(m, x, b) + C[4], F |= 0, F = a(F, M[c]), F = F + H | 0, S = H, H = b, b = a(x, 10), x = m, m = F; F = z[1] + B + b | 0, z[1] = z[2] + w + H | 0, z[2] = z[3] + k + S | 0, z[3] = z[4] + f + m | 0, z[4] = z[0] + u + x | 0, z[0] = F }, _doFinalize: function () { var t = this._data, r = t.words, e = 8 * this._nDataBytes, i = 8 * t.sigBytes; r[i >>> 5] |= 128 << 24 - i % 32, r[(i + 64 >>> 9 << 4) + 14] = 16711935 & (e << 8 | e >>> 24) | 4278255360 & (e << 24 | e >>> 8), t.sigBytes = 4 * (r.length + 1), this._process(); for (var n = this._hash, o = n.words, s = 0; s < 5; s++) { var a = o[s]; o[s] = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8) } return n }, clone: function () { var t = f.clone.call(this); return t._hash = this._hash.clone(), t } }); c.RIPEMD160 = f._createHelper(B), c.HmacRIPEMD160 = f._createHmacHelper(B) }(Math), function () { var r = t, e = r.lib, i = e.Base, n = r.enc, o = n.Utf8, s = r.algo; s.HMAC = i.extend({ init: function (t, r) { t = this._hasher = new t.init, "string" == typeof r && (r = o.parse(r)); var e = t.blockSize, i = 4 * e; r.sigBytes > i && (r = t.finalize(r)), r.clamp(); for (var n = this._oKey = r.clone(), s = this._iKey = r.clone(), a = n.words, c = s.words, h = 0; h < e; h++)a[h] ^= 1549556828, c[h] ^= 909522486; n.sigBytes = s.sigBytes = i, this.reset() }, reset: function () { var t = this._hasher; t.reset(), t.update(this._iKey) }, update: function (t) { return this._hasher.update(t), this }, finalize: function (t) { var r = this._hasher, e = r.finalize(t); r.reset(); var i = r.finalize(this._oKey.clone().concat(e)); return i } }) }(), function () { var r = t, e = r.lib, i = e.Base, n = e.WordArray, o = r.algo, s = o.SHA1, a = o.HMAC, c = o.PBKDF2 = i.extend({ cfg: i.extend({ keySize: 4, hasher: s, iterations: 1 }), init: function (t) { this.cfg = this.cfg.extend(t) }, compute: function (t, r) { for (var e = this.cfg, i = a.create(e.hasher, t), o = n.create(), s = n.create([1]), c = o.words, h = s.words, l = e.keySize, f = e.iterations; c.length < l;) { var u = i.update(r).finalize(s); i.reset(); for (var d = u.words, v = d.length, p = u, _ = 1; _ < f; _++) { p = i.finalize(p), i.reset(); for (var y = p.words, g = 0; g < v; g++)d[g] ^= y[g] } o.concat(u), h[0]++ } return o.sigBytes = 4 * l, o } }); r.PBKDF2 = function (t, r, e) { return c.create(e).compute(t, r) } }(), function () { var r = t, e = r.lib, i = e.Base, n = e.WordArray, o = r.algo, s = o.MD5, a = o.EvpKDF = i.extend({ cfg: i.extend({ keySize: 4, hasher: s, iterations: 1 }), init: function (t) { this.cfg = this.cfg.extend(t) }, compute: function (t, r) { for (var e = this.cfg, i = e.hasher.create(), o = n.create(), s = o.words, a = e.keySize, c = e.iterations; s.length < a;) { h && i.update(h); var h = i.update(t).finalize(r); i.reset(); for (var l = 1; l < c; l++)h = i.finalize(h), i.reset(); o.concat(h) } return o.sigBytes = 4 * a, o } }); r.EvpKDF = function (t, r, e) { return a.create(e).compute(t, r) } }(), function () { var r = t, e = r.lib, i = e.WordArray, n = r.algo, o = n.SHA256, s = n.SHA224 = o.extend({ _doReset: function () { this._hash = new i.init([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428]) }, _doFinalize: function () { var t = o._doFinalize.call(this); return t.sigBytes -= 4, t } }); r.SHA224 = o._createHelper(s), r.HmacSHA224 = o._createHmacHelper(s) }(), function (r) { var e = t, i = e.lib, n = i.Base, o = i.WordArray, s = e.x64 = {}; s.Word = n.extend({ init: function (t, r) { this.high = t, this.low = r } }), s.WordArray = n.extend({ init: function (t, e) { t = this.words = t || [], e != r ? this.sigBytes = e : this.sigBytes = 8 * t.length }, toX32: function () { for (var t = this.words, r = t.length, e = [], i = 0; i < r; i++) { var n = t[i]; e.push(n.high), e.push(n.low) } return o.create(e, this.sigBytes) }, clone: function () { for (var t = n.clone.call(this), r = t.words = this.words.slice(0), e = r.length, i = 0; i < e; i++)r[i] = r[i].clone(); return t } }) }(), function (r) { var e = t, i = e.lib, n = i.WordArray, o = i.Hasher, s = e.x64, a = s.Word, c = e.algo, h = [], l = [], f = []; !function () { for (var t = 1, r = 0, e = 0; e < 24; e++) { h[t + 5 * r] = (e + 1) * (e + 2) / 2 % 64; var i = r % 5, n = (2 * t + 3 * r) % 5; t = i, r = n } for (var t = 0; t < 5; t++)for (var r = 0; r < 5; r++)l[t + 5 * r] = r + (2 * t + 3 * r) % 5 * 5; for (var o = 1, s = 0; s < 24; s++) { for (var c = 0, u = 0, d = 0; d < 7; d++) { if (1 & o) { var v = (1 << d) - 1; v < 32 ? u ^= 1 << v : c ^= 1 << v - 32 } 128 & o ? o = o << 1 ^ 113 : o <<= 1 } f[s] = a.create(c, u) } }(); var u = []; !function () { for (var t = 0; t < 25; t++)u[t] = a.create() }(); var d = c.SHA3 = o.extend({ cfg: o.cfg.extend({ outputLength: 512 }), _doReset: function () { for (var t = this._state = [], r = 0; r < 25; r++)t[r] = new a.init; this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32 }, _doProcessBlock: function (t, r) { for (var e = this._state, i = this.blockSize / 2, n = 0; n < i; n++) { var o = t[r + 2 * n], s = t[r + 2 * n + 1]; o = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), s = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8); var a = e[n]; a.high ^= s, a.low ^= o } for (var c = 0; c < 24; c++) { for (var d = 0; d < 5; d++) { for (var v = 0, p = 0, _ = 0; _ < 5; _++) { var a = e[d + 5 * _]; v ^= a.high, p ^= a.low } var y = u[d]; y.high = v, y.low = p } for (var d = 0; d < 5; d++)for (var g = u[(d + 4) % 5], B = u[(d + 1) % 5], w = B.high, k = B.low, v = g.high ^ (w << 1 | k >>> 31), p = g.low ^ (k << 1 | w >>> 31), _ = 0; _ < 5; _++) { var a = e[d + 5 * _]; a.high ^= v, a.low ^= p } for (var S = 1; S < 25; S++) { var a = e[S], m = a.high, x = a.low, b = h[S]; if (b < 32) var v = m << b | x >>> 32 - b, p = x << b | m >>> 32 - b; else var v = x << b - 32 | m >>> 64 - b, p = m << b - 32 | x >>> 64 - b; var H = u[l[S]]; H.high = v, H.low = p } var z = u[0], A = e[0]; z.high = A.high, z.low = A.low; for (var d = 0; d < 5; d++)for (var _ = 0; _ < 5; _++) { var S = d + 5 * _, a = e[S], C = u[S], D = u[(d + 1) % 5 + 5 * _], R = u[(d + 2) % 5 + 5 * _]; a.high = C.high ^ ~D.high & R.high, a.low = C.low ^ ~D.low & R.low } var a = e[0], E = f[c]; a.high ^= E.high, a.low ^= E.low } }, _doFinalize: function () { var t = this._data, e = t.words, i = (8 * this._nDataBytes, 8 * t.sigBytes), o = 32 * this.blockSize; e[i >>> 5] |= 1 << 24 - i % 32, e[(r.ceil((i + 1) / o) * o >>> 5) - 1] |= 128, t.sigBytes = 4 * e.length, this._process(); for (var s = this._state, a = this.cfg.outputLength / 8, c = a / 8, h = [], l = 0; l < c; l++) { var f = s[l], u = f.high, d = f.low; u = 16711935 & (u << 8 | u >>> 24) | 4278255360 & (u << 24 | u >>> 8), d = 16711935 & (d << 8 | d >>> 24) | 4278255360 & (d << 24 | d >>> 8), h.push(d), h.push(u) } return new n.init(h, a) }, clone: function () { for (var t = o.clone.call(this), r = t._state = this._state.slice(0), e = 0; e < 25; e++)r[e] = r[e].clone(); return t } }); e.SHA3 = o._createHelper(d), e.HmacSHA3 = o._createHmacHelper(d) }(Math), function () { function r() { return s.create.apply(s, arguments) } var e = t, i = e.lib, n = i.Hasher, o = e.x64, s = o.Word, a = o.WordArray, c = e.algo, h = [r(1116352408, 3609767458), r(1899447441, 602891725), r(3049323471, 3964484399), r(3921009573, 2173295548), r(961987163, 4081628472), r(1508970993, 3053834265), r(2453635748, 2937671579), r(2870763221, 3664609560), r(3624381080, 2734883394), r(310598401, 1164996542), r(607225278, 1323610764), r(1426881987, 3590304994), r(1925078388, 4068182383), r(2162078206, 991336113), r(2614888103, 633803317), r(3248222580, 3479774868), r(3835390401, 2666613458), r(4022224774, 944711139), r(264347078, 2341262773), r(604807628, 2007800933), r(770255983, 1495990901), r(1249150122, 1856431235), r(1555081692, 3175218132), r(1996064986, 2198950837), r(2554220882, 3999719339), r(2821834349, 766784016), r(2952996808, 2566594879), r(3210313671, 3203337956), r(3336571891, 1034457026), r(3584528711, 2466948901), r(113926993, 3758326383), r(338241895, 168717936), r(666307205, 1188179964), r(773529912, 1546045734), r(1294757372, 1522805485), r(1396182291, 2643833823), r(1695183700, 2343527390), r(1986661051, 1014477480), r(2177026350, 1206759142), r(2456956037, 344077627), r(2730485921, 1290863460), r(2820302411, 3158454273), r(3259730800, 3505952657), r(3345764771, 106217008), r(3516065817, 3606008344), r(3600352804, 1432725776), r(4094571909, 1467031594), r(275423344, 851169720), r(430227734, 3100823752), r(506948616, 1363258195), r(659060556, 3750685593), r(883997877, 3785050280), r(958139571, 3318307427), r(1322822218, 3812723403), r(1537002063, 2003034995), r(1747873779, 3602036899), r(1955562222, 1575990012), r(2024104815, 1125592928), r(2227730452, 2716904306), r(2361852424, 442776044), r(2428436474, 593698344), r(2756734187, 3733110249), r(3204031479, 2999351573), r(3329325298, 3815920427), r(3391569614, 3928383900), r(3515267271, 566280711), r(3940187606, 3454069534), r(4118630271, 4000239992), r(116418474, 1914138554), r(174292421, 2731055270), r(289380356, 3203993006), r(460393269, 320620315), r(685471733, 587496836), r(852142971, 1086792851), r(1017036298, 365543100), r(1126000580, 2618297676), r(1288033470, 3409855158), r(1501505948, 4234509866), r(1607167915, 987167468), r(1816402316, 1246189591)], l = []; !function () { for (var t = 0; t < 80; t++)l[t] = r() }(); var f = c.SHA512 = n.extend({ _doReset: function () { this._hash = new a.init([new s.init(1779033703, 4089235720), new s.init(3144134277, 2227873595), new s.init(1013904242, 4271175723), new s.init(2773480762, 1595750129), new s.init(1359893119, 2917565137), new s.init(2600822924, 725511199), new s.init(528734635, 4215389547), new s.init(1541459225, 327033209)]) }, _doProcessBlock: function (t, r) { for (var e = this._hash.words, i = e[0], n = e[1], o = e[2], s = e[3], a = e[4], c = e[5], f = e[6], u = e[7], d = i.high, v = i.low, p = n.high, _ = n.low, y = o.high, g = o.low, B = s.high, w = s.low, k = a.high, S = a.low, m = c.high, x = c.low, b = f.high, H = f.low, z = u.high, A = u.low, C = d, D = v, R = p, E = _, M = y, F = g, P = B, W = w, O = k, U = S, I = m, K = x, X = b, L = H, j = z, N = A, T = 0; T < 80; T++) { var Z = l[T]; if (T < 16) var q = Z.high = 0 | t[r + 2 * T], G = Z.low = 0 | t[r + 2 * T + 1]; else { var J = l[T - 15], $ = J.high, Q = J.low, V = ($ >>> 1 | Q << 31) ^ ($ >>> 8 | Q << 24) ^ $ >>> 7, Y = (Q >>> 1 | $ << 31) ^ (Q >>> 8 | $ << 24) ^ (Q >>> 7 | $ << 25), tt = l[T - 2], rt = tt.high, et = tt.low, it = (rt >>> 19 | et << 13) ^ (rt << 3 | et >>> 29) ^ rt >>> 6, nt = (et >>> 19 | rt << 13) ^ (et << 3 | rt >>> 29) ^ (et >>> 6 | rt << 26), ot = l[T - 7], st = ot.high, at = ot.low, ct = l[T - 16], ht = ct.high, lt = ct.low, G = Y + at, q = V + st + (G >>> 0 < Y >>> 0 ? 1 : 0), G = G + nt, q = q + it + (G >>> 0 < nt >>> 0 ? 1 : 0), G = G + lt, q = q + ht + (G >>> 0 < lt >>> 0 ? 1 : 0); Z.high = q, Z.low = G } var ft = O & I ^ ~O & X, ut = U & K ^ ~U & L, dt = C & R ^ C & M ^ R & M, vt = D & E ^ D & F ^ E & F, pt = (C >>> 28 | D << 4) ^ (C << 30 | D >>> 2) ^ (C << 25 | D >>> 7), _t = (D >>> 28 | C << 4) ^ (D << 30 | C >>> 2) ^ (D << 25 | C >>> 7), yt = (O >>> 14 | U << 18) ^ (O >>> 18 | U << 14) ^ (O << 23 | U >>> 9), gt = (U >>> 14 | O << 18) ^ (U >>> 18 | O << 14) ^ (U << 23 | O >>> 9), Bt = h[T], wt = Bt.high, kt = Bt.low, St = N + gt, mt = j + yt + (St >>> 0 < N >>> 0 ? 1 : 0), St = St + ut, mt = mt + ft + (St >>> 0 < ut >>> 0 ? 1 : 0), St = St + kt, mt = mt + wt + (St >>> 0 < kt >>> 0 ? 1 : 0), St = St + G, mt = mt + q + (St >>> 0 < G >>> 0 ? 1 : 0), xt = _t + vt, bt = pt + dt + (xt >>> 0 < _t >>> 0 ? 1 : 0); j = X, N = L, X = I, L = K, I = O, K = U, U = W + St | 0, O = P + mt + (U >>> 0 < W >>> 0 ? 1 : 0) | 0, P = M, W = F, M = R, F = E, R = C, E = D, D = St + xt | 0, C = mt + bt + (D >>> 0 < St >>> 0 ? 1 : 0) | 0 } v = i.low = v + D, i.high = d + C + (v >>> 0 < D >>> 0 ? 1 : 0), _ = n.low = _ + E, n.high = p + R + (_ >>> 0 < E >>> 0 ? 1 : 0), g = o.low = g + F, o.high = y + M + (g >>> 0 < F >>> 0 ? 1 : 0), w = s.low = w + W, s.high = B + P + (w >>> 0 < W >>> 0 ? 1 : 0), S = a.low = S + U, a.high = k + O + (S >>> 0 < U >>> 0 ? 1 : 0), x = c.low = x + K, c.high = m + I + (x >>> 0 < K >>> 0 ? 1 : 0), H = f.low = H + L, f.high = b + X + (H >>> 0 < L >>> 0 ? 1 : 0), A = u.low = A + N, u.high = z + j + (A >>> 0 < N >>> 0 ? 1 : 0) }, _doFinalize: function () { var t = this._data, r = t.words, e = 8 * this._nDataBytes, i = 8 * t.sigBytes; r[i >>> 5] |= 128 << 24 - i % 32, r[(i + 128 >>> 10 << 5) + 30] = Math.floor(e / 4294967296), r[(i + 128 >>> 10 << 5) + 31] = e, t.sigBytes = 4 * r.length, this._process(); var n = this._hash.toX32(); return n }, clone: function () { var t = n.clone.call(this); return t._hash = this._hash.clone(), t }, blockSize: 32 }); e.SHA512 = n._createHelper(f), e.HmacSHA512 = n._createHmacHelper(f) }(), function () { var r = t, e = r.x64, i = e.Word, n = e.WordArray, o = r.algo, s = o.SHA512, a = o.SHA384 = s.extend({ _doReset: function () { this._hash = new n.init([new i.init(3418070365, 3238371032), new i.init(1654270250, 914150663), new i.init(2438529370, 812702999), new i.init(355462360, 4144912697), new i.init(1731405415, 4290775857), new i.init(2394180231, 1750603025), new i.init(3675008525, 1694076839), new i.init(1203062813, 3204075428)]) }, _doFinalize: function () { var t = s._doFinalize.call(this); return t.sigBytes -= 16, t } }); r.SHA384 = s._createHelper(a), r.HmacSHA384 = s._createHmacHelper(a) }(), t.lib.Cipher || function (r) { var e = t, i = e.lib, n = i.Base, o = i.WordArray, s = i.BufferedBlockAlgorithm, a = e.enc, c = (a.Utf8, a.Base64), h = e.algo, l = h.EvpKDF, f = i.Cipher = s.extend({ cfg: n.extend(), createEncryptor: function (t, r) { return this.create(this._ENC_XFORM_MODE, t, r) }, createDecryptor: function (t, r) { return this.create(this._DEC_XFORM_MODE, t, r) }, init: function (t, r, e) { this.cfg = this.cfg.extend(e), this._xformMode = t, this._key = r, this.reset() }, reset: function () { s.reset.call(this), this._doReset() }, process: function (t) { return this._append(t), this._process() }, finalize: function (t) { t && this._append(t); var r = this._doFinalize(); return r }, keySize: 4, ivSize: 4, _ENC_XFORM_MODE: 1, _DEC_XFORM_MODE: 2, _createHelper: function () { function t(t) { return "string" == typeof t ? m : w } return function (r) { return { encrypt: function (e, i, n) { return t(i).encrypt(r, e, i, n) }, decrypt: function (e, i, n) { return t(i).decrypt(r, e, i, n) } } } }() }), u = (i.StreamCipher = f.extend({ _doFinalize: function () { var t = this._process(!0); return t }, blockSize: 1 }), e.mode = {}), d = i.BlockCipherMode = n.extend({ createEncryptor: function (t, r) { return this.Encryptor.create(t, r) }, createDecryptor: function (t, r) { return this.Decryptor.create(t, r) }, init: function (t, r) { this._cipher = t, this._iv = r } }), v = u.CBC = function () { function t(t, e, i) { var n = this._iv; if (n) { var o = n; this._iv = r } else var o = this._prevBlock; for (var s = 0; s < i; s++)t[e + s] ^= o[s] } var e = d.extend(); return e.Encryptor = e.extend({ processBlock: function (r, e) { var i = this._cipher, n = i.blockSize; t.call(this, r, e, n), i.encryptBlock(r, e), this._prevBlock = r.slice(e, e + n) } }), e.Decryptor = e.extend({ processBlock: function (r, e) { var i = this._cipher, n = i.blockSize, o = r.slice(e, e + n); i.decryptBlock(r, e), t.call(this, r, e, n), this._prevBlock = o } }), e }(), p = e.pad = {}, _ = p.Pkcs7 = { pad: function (t, r) { for (var e = 4 * r, i = e - t.sigBytes % e, n = i << 24 | i << 16 | i << 8 | i, s = [], a = 0; a < i; a += 4)s.push(n); var c = o.create(s, i); t.concat(c) }, unpad: function (t) { var r = 255 & t.words[t.sigBytes - 1 >>> 2]; t.sigBytes -= r } }, y = (i.BlockCipher = f.extend({ cfg: f.cfg.extend({ mode: v, padding: _ }), reset: function () { f.reset.call(this); var t = this.cfg, r = t.iv, e = t.mode; if (this._xformMode == this._ENC_XFORM_MODE) var i = e.createEncryptor; else { var i = e.createDecryptor; this._minBufferSize = 1 } this._mode && this._mode.__creator == i ? this._mode.init(this, r && r.words) : (this._mode = i.call(e, this, r && r.words), this._mode.__creator = i) }, _doProcessBlock: function (t, r) { this._mode.processBlock(t, r) }, _doFinalize: function () { var t = this.cfg.padding; if (this._xformMode == this._ENC_XFORM_MODE) { t.pad(this._data, this.blockSize); var r = this._process(!0) } else { var r = this._process(!0); t.unpad(r) } return r }, blockSize: 4 }), i.CipherParams = n.extend({ init: function (t) { this.mixIn(t) }, toString: function (t) { return (t || this.formatter).stringify(this) } })), g = e.format = {}, B = g.OpenSSL = { stringify: function (t) { var r = t.ciphertext, e = t.salt; if (e) var i = o.create([1398893684, 1701076831]).concat(e).concat(r); else var i = r; return i.toString(c) }, parse: function (t) { var r = c.parse(t), e = r.words; if (1398893684 == e[0] && 1701076831 == e[1]) { var i = o.create(e.slice(2, 4)); e.splice(0, 4), r.sigBytes -= 16 } return y.create({ ciphertext: r, salt: i }) } }, w = i.SerializableCipher = n.extend({ cfg: n.extend({ format: B }), encrypt: function (t, r, e, i) { i = this.cfg.extend(i); var n = t.createEncryptor(e, i), o = n.finalize(r), s = n.cfg; return y.create({ ciphertext: o, key: e, iv: s.iv, algorithm: t, mode: s.mode, padding: s.padding, blockSize: t.blockSize, formatter: i.format }) }, decrypt: function (t, r, e, i) { i = this.cfg.extend(i), r = this._parse(r, i.format); var n = t.createDecryptor(e, i).finalize(r.ciphertext); return n }, _parse: function (t, r) { return "string" == typeof t ? r.parse(t, this) : t } }), k = e.kdf = {}, S = k.OpenSSL = { execute: function (t, r, e, i) { i || (i = o.random(8)); var n = l.create({ keySize: r + e }).compute(t, i), s = o.create(n.words.slice(r), 4 * e); return n.sigBytes = 4 * r, y.create({ key: n, iv: s, salt: i }) } }, m = i.PasswordBasedCipher = w.extend({ cfg: w.cfg.extend({ kdf: S }), encrypt: function (t, r, e, i) { i = this.cfg.extend(i); var n = i.kdf.execute(e, t.keySize, t.ivSize); i.iv = n.iv; var o = w.encrypt.call(this, t, r, n.key, i); return o.mixIn(n), o }, decrypt: function (t, r, e, i) { i = this.cfg.extend(i), r = this._parse(r, i.format); var n = i.kdf.execute(e, t.keySize, t.ivSize, r.salt); i.iv = n.iv; var o = w.decrypt.call(this, t, r, n.key, i); return o } }) }(), t.mode.CFB = function () { function r(t, r, e, i) { var n = this._iv; if (n) { var o = n.slice(0); this._iv = void 0 } else var o = this._prevBlock; i.encryptBlock(o, 0); for (var s = 0; s < e; s++)t[r + s] ^= o[s] } var e = t.lib.BlockCipherMode.extend(); return e.Encryptor = e.extend({ processBlock: function (t, e) { var i = this._cipher, n = i.blockSize; r.call(this, t, e, n, i), this._prevBlock = t.slice(e, e + n) } }), e.Decryptor = e.extend({ processBlock: function (t, e) { var i = this._cipher, n = i.blockSize, o = t.slice(e, e + n); r.call(this, t, e, n, i), this._prevBlock = o } }), e }(), t.mode.ECB = function () { var r = t.lib.BlockCipherMode.extend(); return r.Encryptor = r.extend({ processBlock: function (t, r) { this._cipher.encryptBlock(t, r) } }), r.Decryptor = r.extend({ processBlock: function (t, r) { this._cipher.decryptBlock(t, r) } }), r }(), t.pad.AnsiX923 = { pad: function (t, r) { var e = t.sigBytes, i = 4 * r, n = i - e % i, o = e + n - 1; t.clamp(), t.words[o >>> 2] |= n << 24 - o % 4 * 8, t.sigBytes += n }, unpad: function (t) { var r = 255 & t.words[t.sigBytes - 1 >>> 2]; t.sigBytes -= r } }, t.pad.Iso10126 = { pad: function (r, e) { var i = 4 * e, n = i - r.sigBytes % i; r.concat(t.lib.WordArray.random(n - 1)).concat(t.lib.WordArray.create([n << 24], 1)) }, unpad: function (t) { var r = 255 & t.words[t.sigBytes - 1 >>> 2]; t.sigBytes -= r } }, t.pad.Iso97971 = { pad: function (r, e) { r.concat(t.lib.WordArray.create([2147483648], 1)), t.pad.ZeroPadding.pad(r, e) }, unpad: function (r) { t.pad.ZeroPadding.unpad(r), r.sigBytes-- } }, t.mode.OFB = function () { var r = t.lib.BlockCipherMode.extend(), e = r.Encryptor = r.extend({ processBlock: function (t, r) { var e = this._cipher, i = e.blockSize, n = this._iv, o = this._keystream; n && (o = this._keystream = n.slice(0), this._iv = void 0), e.encryptBlock(o, 0); for (var s = 0; s < i; s++)t[r + s] ^= o[s] } }); return r.Decryptor = e, r }(), t.pad.NoPadding = { pad: function () { }, unpad: function () { } }, function (r) { var e = t, i = e.lib, n = i.CipherParams, o = e.enc, s = o.Hex, a = e.format; a.Hex = { stringify: function (t) { return t.ciphertext.toString(s) }, parse: function (t) { var r = s.parse(t); return n.create({ ciphertext: r }) } } }(), function () { var r = t, e = r.lib, i = e.BlockCipher, n = r.algo, o = [], s = [], a = [], c = [], h = [], l = [], f = [], u = [], d = [], v = []; !function () { for (var t = [], r = 0; r < 256; r++)r < 128 ? t[r] = r << 1 : t[r] = r << 1 ^ 283; for (var e = 0, i = 0, r = 0; r < 256; r++) { var n = i ^ i << 1 ^ i << 2 ^ i << 3 ^ i << 4; n = n >>> 8 ^ 255 & n ^ 99, o[e] = n, s[n] = e; var p = t[e], _ = t[p], y = t[_], g = 257 * t[n] ^ 16843008 * n; a[e] = g << 24 | g >>> 8, c[e] = g << 16 | g >>> 16, h[e] = g << 8 | g >>> 24, l[e] = g; var g = 16843009 * y ^ 65537 * _ ^ 257 * p ^ 16843008 * e; f[n] = g << 24 | g >>> 8, u[n] = g << 16 | g >>> 16, d[n] = g << 8 | g >>> 24, v[n] = g, e ? (e = p ^ t[t[t[y ^ p]]], i ^= t[t[i]]) : e = i = 1 } }(); var p = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], _ = n.AES = i.extend({ _doReset: function () { if (!this._nRounds || this._keyPriorReset !== this._key) { for (var t = this._keyPriorReset = this._key, r = t.words, e = t.sigBytes / 4, i = this._nRounds = e + 6, n = 4 * (i + 1), s = this._keySchedule = [], a = 0; a < n; a++)if (a < e) s[a] = r[a]; else { var c = s[a - 1]; a % e ? e > 6 && a % e == 4 && (c = o[c >>> 24] << 24 | o[c >>> 16 & 255] << 16 | o[c >>> 8 & 255] << 8 | o[255 & c]) : (c = c << 8 | c >>> 24, c = o[c >>> 24] << 24 | o[c >>> 16 & 255] << 16 | o[c >>> 8 & 255] << 8 | o[255 & c], c ^= p[a / e | 0] << 24), s[a] = s[a - e] ^ c } for (var h = this._invKeySchedule = [], l = 0; l < n; l++) { var a = n - l; if (l % 4) var c = s[a]; else var c = s[a - 4]; l < 4 || a <= 4 ? h[l] = c : h[l] = f[o[c >>> 24]] ^ u[o[c >>> 16 & 255]] ^ d[o[c >>> 8 & 255]] ^ v[o[255 & c]] } } }, encryptBlock: function (t, r) { this._doCryptBlock(t, r, this._keySchedule, a, c, h, l, o) }, decryptBlock: function (t, r) { var e = t[r + 1]; t[r + 1] = t[r + 3], t[r + 3] = e, this._doCryptBlock(t, r, this._invKeySchedule, f, u, d, v, s); var e = t[r + 1]; t[r + 1] = t[r + 3], t[r + 3] = e }, _doCryptBlock: function (t, r, e, i, n, o, s, a) { for (var c = this._nRounds, h = t[r] ^ e[0], l = t[r + 1] ^ e[1], f = t[r + 2] ^ e[2], u = t[r + 3] ^ e[3], d = 4, v = 1; v < c; v++) { var p = i[h >>> 24] ^ n[l >>> 16 & 255] ^ o[f >>> 8 & 255] ^ s[255 & u] ^ e[d++], _ = i[l >>> 24] ^ n[f >>> 16 & 255] ^ o[u >>> 8 & 255] ^ s[255 & h] ^ e[d++], y = i[f >>> 24] ^ n[u >>> 16 & 255] ^ o[h >>> 8 & 255] ^ s[255 & l] ^ e[d++], g = i[u >>> 24] ^ n[h >>> 16 & 255] ^ o[l >>> 8 & 255] ^ s[255 & f] ^ e[d++]; h = p, l = _, f = y, u = g } var p = (a[h >>> 24] << 24 | a[l >>> 16 & 255] << 16 | a[f >>> 8 & 255] << 8 | a[255 & u]) ^ e[d++], _ = (a[l >>> 24] << 24 | a[f >>> 16 & 255] << 16 | a[u >>> 8 & 255] << 8 | a[255 & h]) ^ e[d++], y = (a[f >>> 24] << 24 | a[u >>> 16 & 255] << 16 | a[h >>> 8 & 255] << 8 | a[255 & l]) ^ e[d++], g = (a[u >>> 24] << 24 | a[h >>> 16 & 255] << 16 | a[l >>> 8 & 255] << 8 | a[255 & f]) ^ e[d++]; t[r] = p, t[r + 1] = _, t[r + 2] = y, t[r + 3] = g }, keySize: 8 }); r.AES = i._createHelper(_) }(), function () {
        function r(t, r) { var e = (this._lBlock >>> t ^ this._rBlock) & r; this._rBlock ^= e, this._lBlock ^= e << t } function e(t, r) {
            var e = (this._rBlock >>> t ^ this._lBlock) & r; this._lBlock ^= e, this._rBlock ^= e << t;
        } var i = t, n = i.lib, o = n.WordArray, s = n.BlockCipher, a = i.algo, c = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4], h = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32], l = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28], f = [{ 0: 8421888, 268435456: 32768, 536870912: 8421378, 805306368: 2, 1073741824: 512, 1342177280: 8421890, 1610612736: 8389122, 1879048192: 8388608, 2147483648: 514, 2415919104: 8389120, 2684354560: 33280, 2952790016: 8421376, 3221225472: 32770, 3489660928: 8388610, 3758096384: 0, 4026531840: 33282, 134217728: 0, 402653184: 8421890, 671088640: 33282, 939524096: 32768, 1207959552: 8421888, 1476395008: 512, 1744830464: 8421378, 2013265920: 2, 2281701376: 8389120, 2550136832: 33280, 2818572288: 8421376, 3087007744: 8389122, 3355443200: 8388610, 3623878656: 32770, 3892314112: 514, 4160749568: 8388608, 1: 32768, 268435457: 2, 536870913: 8421888, 805306369: 8388608, 1073741825: 8421378, 1342177281: 33280, 1610612737: 512, 1879048193: 8389122, 2147483649: 8421890, 2415919105: 8421376, 2684354561: 8388610, 2952790017: 33282, 3221225473: 514, 3489660929: 8389120, 3758096385: 32770, 4026531841: 0, 134217729: 8421890, 402653185: 8421376, 671088641: 8388608, 939524097: 512, 1207959553: 32768, 1476395009: 8388610, 1744830465: 2, 2013265921: 33282, 2281701377: 32770, 2550136833: 8389122, 2818572289: 514, 3087007745: 8421888, 3355443201: 8389120, 3623878657: 0, 3892314113: 33280, 4160749569: 8421378 }, { 0: 1074282512, 16777216: 16384, 33554432: 524288, 50331648: 1074266128, 67108864: 1073741840, 83886080: 1074282496, 100663296: 1073758208, 117440512: 16, 134217728: 540672, 150994944: 1073758224, 167772160: 1073741824, 184549376: 540688, 201326592: 524304, 218103808: 0, 234881024: 16400, 251658240: 1074266112, 8388608: 1073758208, 25165824: 540688, 41943040: 16, 58720256: 1073758224, 75497472: 1074282512, 92274688: 1073741824, 109051904: 524288, 125829120: 1074266128, 142606336: 524304, 159383552: 0, 176160768: 16384, 192937984: 1074266112, 209715200: 1073741840, 226492416: 540672, 243269632: 1074282496, 260046848: 16400, 268435456: 0, 285212672: 1074266128, 301989888: 1073758224, 318767104: 1074282496, 335544320: 1074266112, 352321536: 16, 369098752: 540688, 385875968: 16384, 402653184: 16400, 419430400: 524288, 436207616: 524304, 452984832: 1073741840, 469762048: 540672, 486539264: 1073758208, 503316480: 1073741824, 520093696: 1074282512, 276824064: 540688, 293601280: 524288, 310378496: 1074266112, 327155712: 16384, 343932928: 1073758208, 360710144: 1074282512, 377487360: 16, 394264576: 1073741824, 411041792: 1074282496, 427819008: 1073741840, 444596224: 1073758224, 461373440: 524304, 478150656: 0, 494927872: 16400, 511705088: 1074266128, 528482304: 540672 }, { 0: 260, 1048576: 0, 2097152: 67109120, 3145728: 65796, 4194304: 65540, 5242880: 67108868, 6291456: 67174660, 7340032: 67174400, 8388608: 67108864, 9437184: 67174656, 10485760: 65792, 11534336: 67174404, 12582912: 67109124, 13631488: 65536, 14680064: 4, 15728640: 256, 524288: 67174656, 1572864: 67174404, 2621440: 0, 3670016: 67109120, 4718592: 67108868, 5767168: 65536, 6815744: 65540, 7864320: 260, 8912896: 4, 9961472: 256, 11010048: 67174400, 12058624: 65796, 13107200: 65792, 14155776: 67109124, 15204352: 67174660, 16252928: 67108864, 16777216: 67174656, 17825792: 65540, 18874368: 65536, 19922944: 67109120, 20971520: 256, 22020096: 67174660, 23068672: 67108868, 24117248: 0, 25165824: 67109124, 26214400: 67108864, 27262976: 4, 28311552: 65792, 29360128: 67174400, 30408704: 260, 31457280: 65796, 32505856: 67174404, 17301504: 67108864, 18350080: 260, 19398656: 67174656, 20447232: 0, 21495808: 65540, 22544384: 67109120, 23592960: 256, 24641536: 67174404, 25690112: 65536, 26738688: 67174660, 27787264: 65796, 28835840: 67108868, 29884416: 67109124, 30932992: 67174400, 31981568: 4, 33030144: 65792 }, { 0: 2151682048, 65536: 2147487808, 131072: 4198464, 196608: 2151677952, 262144: 0, 327680: 4198400, 393216: 2147483712, 458752: 4194368, 524288: 2147483648, 589824: 4194304, 655360: 64, 720896: 2147487744, 786432: 2151678016, 851968: 4160, 917504: 4096, 983040: 2151682112, 32768: 2147487808, 98304: 64, 163840: 2151678016, 229376: 2147487744, 294912: 4198400, 360448: 2151682112, 425984: 0, 491520: 2151677952, 557056: 4096, 622592: 2151682048, 688128: 4194304, 753664: 4160, 819200: 2147483648, 884736: 4194368, 950272: 4198464, 1015808: 2147483712, 1048576: 4194368, 1114112: 4198400, 1179648: 2147483712, 1245184: 0, 1310720: 4160, 1376256: 2151678016, 1441792: 2151682048, 1507328: 2147487808, 1572864: 2151682112, 1638400: 2147483648, 1703936: 2151677952, 1769472: 4198464, 1835008: 2147487744, 1900544: 4194304, 1966080: 64, 2031616: 4096, 1081344: 2151677952, 1146880: 2151682112, 1212416: 0, 1277952: 4198400, 1343488: 4194368, 1409024: 2147483648, 1474560: 2147487808, 1540096: 64, 1605632: 2147483712, 1671168: 4096, 1736704: 2147487744, 1802240: 2151678016, 1867776: 4160, 1933312: 2151682048, 1998848: 4194304, 2064384: 4198464 }, { 0: 128, 4096: 17039360, 8192: 262144, 12288: 536870912, 16384: 537133184, 20480: 16777344, 24576: 553648256, 28672: 262272, 32768: 16777216, 36864: 537133056, 40960: 536871040, 45056: 553910400, 49152: 553910272, 53248: 0, 57344: 17039488, 61440: 553648128, 2048: 17039488, 6144: 553648256, 10240: 128, 14336: 17039360, 18432: 262144, 22528: 537133184, 26624: 553910272, 30720: 536870912, 34816: 537133056, 38912: 0, 43008: 553910400, 47104: 16777344, 51200: 536871040, 55296: 553648128, 59392: 16777216, 63488: 262272, 65536: 262144, 69632: 128, 73728: 536870912, 77824: 553648256, 81920: 16777344, 86016: 553910272, 90112: 537133184, 94208: 16777216, 98304: 553910400, 102400: 553648128, 106496: 17039360, 110592: 537133056, 114688: 262272, 118784: 536871040, 122880: 0, 126976: 17039488, 67584: 553648256, 71680: 16777216, 75776: 17039360, 79872: 537133184, 83968: 536870912, 88064: 17039488, 92160: 128, 96256: 553910272, 100352: 262272, 104448: 553910400, 108544: 0, 112640: 553648128, 116736: 16777344, 120832: 262144, 124928: 537133056, 129024: 536871040 }, { 0: 268435464, 256: 8192, 512: 270532608, 768: 270540808, 1024: 268443648, 1280: 2097152, 1536: 2097160, 1792: 268435456, 2048: 0, 2304: 268443656, 2560: 2105344, 2816: 8, 3072: 270532616, 3328: 2105352, 3584: 8200, 3840: 270540800, 128: 270532608, 384: 270540808, 640: 8, 896: 2097152, 1152: 2105352, 1408: 268435464, 1664: 268443648, 1920: 8200, 2176: 2097160, 2432: 8192, 2688: 268443656, 2944: 270532616, 3200: 0, 3456: 270540800, 3712: 2105344, 3968: 268435456, 4096: 268443648, 4352: 270532616, 4608: 270540808, 4864: 8200, 5120: 2097152, 5376: 268435456, 5632: 268435464, 5888: 2105344, 6144: 2105352, 6400: 0, 6656: 8, 6912: 270532608, 7168: 8192, 7424: 268443656, 7680: 270540800, 7936: 2097160, 4224: 8, 4480: 2105344, 4736: 2097152, 4992: 268435464, 5248: 268443648, 5504: 8200, 5760: 270540808, 6016: 270532608, 6272: 270540800, 6528: 270532616, 6784: 8192, 7040: 2105352, 7296: 2097160, 7552: 0, 7808: 268435456, 8064: 268443656 }, { 0: 1048576, 16: 33555457, 32: 1024, 48: 1049601, 64: 34604033, 80: 0, 96: 1, 112: 34603009, 128: 33555456, 144: 1048577, 160: 33554433, 176: 34604032, 192: 34603008, 208: 1025, 224: 1049600, 240: 33554432, 8: 34603009, 24: 0, 40: 33555457, 56: 34604032, 72: 1048576, 88: 33554433, 104: 33554432, 120: 1025, 136: 1049601, 152: 33555456, 168: 34603008, 184: 1048577, 200: 1024, 216: 34604033, 232: 1, 248: 1049600, 256: 33554432, 272: 1048576, 288: 33555457, 304: 34603009, 320: 1048577, 336: 33555456, 352: 34604032, 368: 1049601, 384: 1025, 400: 34604033, 416: 1049600, 432: 1, 448: 0, 464: 34603008, 480: 33554433, 496: 1024, 264: 1049600, 280: 33555457, 296: 34603009, 312: 1, 328: 33554432, 344: 1048576, 360: 1025, 376: 34604032, 392: 33554433, 408: 34603008, 424: 0, 440: 34604033, 456: 1049601, 472: 1024, 488: 33555456, 504: 1048577 }, { 0: 134219808, 1: 131072, 2: 134217728, 3: 32, 4: 131104, 5: 134350880, 6: 134350848, 7: 2048, 8: 134348800, 9: 134219776, 10: 133120, 11: 134348832, 12: 2080, 13: 0, 14: 134217760, 15: 133152, 2147483648: 2048, 2147483649: 134350880, 2147483650: 134219808, 2147483651: 134217728, 2147483652: 134348800, 2147483653: 133120, 2147483654: 133152, 2147483655: 32, 2147483656: 134217760, 2147483657: 2080, 2147483658: 131104, 2147483659: 134350848, 2147483660: 0, 2147483661: 134348832, 2147483662: 134219776, 2147483663: 131072, 16: 133152, 17: 134350848, 18: 32, 19: 2048, 20: 134219776, 21: 134217760, 22: 134348832, 23: 131072, 24: 0, 25: 131104, 26: 134348800, 27: 134219808, 28: 134350880, 29: 133120, 30: 2080, 31: 134217728, 2147483664: 131072, 2147483665: 2048, 2147483666: 134348832, 2147483667: 133152, 2147483668: 32, 2147483669: 134348800, 2147483670: 134217728, 2147483671: 134219808, 2147483672: 134350880, 2147483673: 134217760, 2147483674: 134219776, 2147483675: 0, 2147483676: 133120, 2147483677: 2080, 2147483678: 131104, 2147483679: 134350848 }], u = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679], d = a.DES = s.extend({ _doReset: function () { for (var t = this._key, r = t.words, e = [], i = 0; i < 56; i++) { var n = c[i] - 1; e[i] = r[n >>> 5] >>> 31 - n % 32 & 1 } for (var o = this._subKeys = [], s = 0; s < 16; s++) { for (var a = o[s] = [], f = l[s], i = 0; i < 24; i++)a[i / 6 | 0] |= e[(h[i] - 1 + f) % 28] << 31 - i % 6, a[4 + (i / 6 | 0)] |= e[28 + (h[i + 24] - 1 + f) % 28] << 31 - i % 6; a[0] = a[0] << 1 | a[0] >>> 31; for (var i = 1; i < 7; i++)a[i] = a[i] >>> 4 * (i - 1) + 3; a[7] = a[7] << 5 | a[7] >>> 27 } for (var u = this._invSubKeys = [], i = 0; i < 16; i++)u[i] = o[15 - i] }, encryptBlock: function (t, r) { this._doCryptBlock(t, r, this._subKeys) }, decryptBlock: function (t, r) { this._doCryptBlock(t, r, this._invSubKeys) }, _doCryptBlock: function (t, i, n) { this._lBlock = t[i], this._rBlock = t[i + 1], r.call(this, 4, 252645135), r.call(this, 16, 65535), e.call(this, 2, 858993459), e.call(this, 8, 16711935), r.call(this, 1, 1431655765); for (var o = 0; o < 16; o++) { for (var s = n[o], a = this._lBlock, c = this._rBlock, h = 0, l = 0; l < 8; l++)h |= f[l][((c ^ s[l]) & u[l]) >>> 0]; this._lBlock = c, this._rBlock = a ^ h } var d = this._lBlock; this._lBlock = this._rBlock, this._rBlock = d, r.call(this, 1, 1431655765), e.call(this, 8, 16711935), e.call(this, 2, 858993459), r.call(this, 16, 65535), r.call(this, 4, 252645135), t[i] = this._lBlock, t[i + 1] = this._rBlock }, keySize: 2, ivSize: 2, blockSize: 2 }); i.DES = s._createHelper(d); var v = a.TripleDES = s.extend({ _doReset: function () { var t = this._key, r = t.words; this._des1 = d.createEncryptor(o.create(r.slice(0, 2))), this._des2 = d.createEncryptor(o.create(r.slice(2, 4))), this._des3 = d.createEncryptor(o.create(r.slice(4, 6))) }, encryptBlock: function (t, r) { this._des1.encryptBlock(t, r), this._des2.decryptBlock(t, r), this._des3.encryptBlock(t, r) }, decryptBlock: function (t, r) { this._des3.decryptBlock(t, r), this._des2.encryptBlock(t, r), this._des1.decryptBlock(t, r) }, keySize: 6, ivSize: 2, blockSize: 2 }); i.TripleDES = s._createHelper(v)
    }(), function () { function r() { for (var t = this._S, r = this._i, e = this._j, i = 0, n = 0; n < 4; n++) { r = (r + 1) % 256, e = (e + t[r]) % 256; var o = t[r]; t[r] = t[e], t[e] = o, i |= t[(t[r] + t[e]) % 256] << 24 - 8 * n } return this._i = r, this._j = e, i } var e = t, i = e.lib, n = i.StreamCipher, o = e.algo, s = o.RC4 = n.extend({ _doReset: function () { for (var t = this._key, r = t.words, e = t.sigBytes, i = this._S = [], n = 0; n < 256; n++)i[n] = n; for (var n = 0, o = 0; n < 256; n++) { var s = n % e, a = r[s >>> 2] >>> 24 - s % 4 * 8 & 255; o = (o + i[n] + a) % 256; var c = i[n]; i[n] = i[o], i[o] = c } this._i = this._j = 0 }, _doProcessBlock: function (t, e) { t[e] ^= r.call(this) }, keySize: 8, ivSize: 0 }); e.RC4 = n._createHelper(s); var a = o.RC4Drop = s.extend({ cfg: s.cfg.extend({ drop: 192 }), _doReset: function () { s._doReset.call(this); for (var t = this.cfg.drop; t > 0; t--)r.call(this) } }); e.RC4Drop = n._createHelper(a) }(), t.mode.CTRGladman = function () { function r(t) { if (255 === (t >> 24 & 255)) { var r = t >> 16 & 255, e = t >> 8 & 255, i = 255 & t; 255 === r ? (r = 0, 255 === e ? (e = 0, 255 === i ? i = 0 : ++i) : ++e) : ++r, t = 0, t += r << 16, t += e << 8, t += i } else t += 1 << 24; return t } function e(t) { return 0 === (t[0] = r(t[0])) && (t[1] = r(t[1])), t } var i = t.lib.BlockCipherMode.extend(), n = i.Encryptor = i.extend({ processBlock: function (t, r) { var i = this._cipher, n = i.blockSize, o = this._iv, s = this._counter; o && (s = this._counter = o.slice(0), this._iv = void 0), e(s); var a = s.slice(0); i.encryptBlock(a, 0); for (var c = 0; c < n; c++)t[r + c] ^= a[c] } }); return i.Decryptor = n, i }(), function () { function r() { for (var t = this._X, r = this._C, e = 0; e < 8; e++)a[e] = r[e]; r[0] = r[0] + 1295307597 + this._b | 0, r[1] = r[1] + 3545052371 + (r[0] >>> 0 < a[0] >>> 0 ? 1 : 0) | 0, r[2] = r[2] + 886263092 + (r[1] >>> 0 < a[1] >>> 0 ? 1 : 0) | 0, r[3] = r[3] + 1295307597 + (r[2] >>> 0 < a[2] >>> 0 ? 1 : 0) | 0, r[4] = r[4] + 3545052371 + (r[3] >>> 0 < a[3] >>> 0 ? 1 : 0) | 0, r[5] = r[5] + 886263092 + (r[4] >>> 0 < a[4] >>> 0 ? 1 : 0) | 0, r[6] = r[6] + 1295307597 + (r[5] >>> 0 < a[5] >>> 0 ? 1 : 0) | 0, r[7] = r[7] + 3545052371 + (r[6] >>> 0 < a[6] >>> 0 ? 1 : 0) | 0, this._b = r[7] >>> 0 < a[7] >>> 0 ? 1 : 0; for (var e = 0; e < 8; e++) { var i = t[e] + r[e], n = 65535 & i, o = i >>> 16, s = ((n * n >>> 17) + n * o >>> 15) + o * o, h = ((4294901760 & i) * i | 0) + ((65535 & i) * i | 0); c[e] = s ^ h } t[0] = c[0] + (c[7] << 16 | c[7] >>> 16) + (c[6] << 16 | c[6] >>> 16) | 0, t[1] = c[1] + (c[0] << 8 | c[0] >>> 24) + c[7] | 0, t[2] = c[2] + (c[1] << 16 | c[1] >>> 16) + (c[0] << 16 | c[0] >>> 16) | 0, t[3] = c[3] + (c[2] << 8 | c[2] >>> 24) + c[1] | 0, t[4] = c[4] + (c[3] << 16 | c[3] >>> 16) + (c[2] << 16 | c[2] >>> 16) | 0, t[5] = c[5] + (c[4] << 8 | c[4] >>> 24) + c[3] | 0, t[6] = c[6] + (c[5] << 16 | c[5] >>> 16) + (c[4] << 16 | c[4] >>> 16) | 0, t[7] = c[7] + (c[6] << 8 | c[6] >>> 24) + c[5] | 0 } var e = t, i = e.lib, n = i.StreamCipher, o = e.algo, s = [], a = [], c = [], h = o.Rabbit = n.extend({ _doReset: function () { for (var t = this._key.words, e = this.cfg.iv, i = 0; i < 4; i++)t[i] = 16711935 & (t[i] << 8 | t[i] >>> 24) | 4278255360 & (t[i] << 24 | t[i] >>> 8); var n = this._X = [t[0], t[3] << 16 | t[2] >>> 16, t[1], t[0] << 16 | t[3] >>> 16, t[2], t[1] << 16 | t[0] >>> 16, t[3], t[2] << 16 | t[1] >>> 16], o = this._C = [t[2] << 16 | t[2] >>> 16, 4294901760 & t[0] | 65535 & t[1], t[3] << 16 | t[3] >>> 16, 4294901760 & t[1] | 65535 & t[2], t[0] << 16 | t[0] >>> 16, 4294901760 & t[2] | 65535 & t[3], t[1] << 16 | t[1] >>> 16, 4294901760 & t[3] | 65535 & t[0]]; this._b = 0; for (var i = 0; i < 4; i++)r.call(this); for (var i = 0; i < 8; i++)o[i] ^= n[i + 4 & 7]; if (e) { var s = e.words, a = s[0], c = s[1], h = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8), l = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8), f = h >>> 16 | 4294901760 & l, u = l << 16 | 65535 & h; o[0] ^= h, o[1] ^= f, o[2] ^= l, o[3] ^= u, o[4] ^= h, o[5] ^= f, o[6] ^= l, o[7] ^= u; for (var i = 0; i < 4; i++)r.call(this) } }, _doProcessBlock: function (t, e) { var i = this._X; r.call(this), s[0] = i[0] ^ i[5] >>> 16 ^ i[3] << 16, s[1] = i[2] ^ i[7] >>> 16 ^ i[5] << 16, s[2] = i[4] ^ i[1] >>> 16 ^ i[7] << 16, s[3] = i[6] ^ i[3] >>> 16 ^ i[1] << 16; for (var n = 0; n < 4; n++)s[n] = 16711935 & (s[n] << 8 | s[n] >>> 24) | 4278255360 & (s[n] << 24 | s[n] >>> 8), t[e + n] ^= s[n] }, blockSize: 4, ivSize: 2 }); e.Rabbit = n._createHelper(h) }(), t.mode.CTR = function () { var r = t.lib.BlockCipherMode.extend(), e = r.Encryptor = r.extend({ processBlock: function (t, r) { var e = this._cipher, i = e.blockSize, n = this._iv, o = this._counter; n && (o = this._counter = n.slice(0), this._iv = void 0); var s = o.slice(0); e.encryptBlock(s, 0), o[i - 1] = o[i - 1] + 1 | 0; for (var a = 0; a < i; a++)t[r + a] ^= s[a] } }); return r.Decryptor = e, r }(), function () { function r() { for (var t = this._X, r = this._C, e = 0; e < 8; e++)a[e] = r[e]; r[0] = r[0] + 1295307597 + this._b | 0, r[1] = r[1] + 3545052371 + (r[0] >>> 0 < a[0] >>> 0 ? 1 : 0) | 0, r[2] = r[2] + 886263092 + (r[1] >>> 0 < a[1] >>> 0 ? 1 : 0) | 0, r[3] = r[3] + 1295307597 + (r[2] >>> 0 < a[2] >>> 0 ? 1 : 0) | 0, r[4] = r[4] + 3545052371 + (r[3] >>> 0 < a[3] >>> 0 ? 1 : 0) | 0, r[5] = r[5] + 886263092 + (r[4] >>> 0 < a[4] >>> 0 ? 1 : 0) | 0, r[6] = r[6] + 1295307597 + (r[5] >>> 0 < a[5] >>> 0 ? 1 : 0) | 0, r[7] = r[7] + 3545052371 + (r[6] >>> 0 < a[6] >>> 0 ? 1 : 0) | 0, this._b = r[7] >>> 0 < a[7] >>> 0 ? 1 : 0; for (var e = 0; e < 8; e++) { var i = t[e] + r[e], n = 65535 & i, o = i >>> 16, s = ((n * n >>> 17) + n * o >>> 15) + o * o, h = ((4294901760 & i) * i | 0) + ((65535 & i) * i | 0); c[e] = s ^ h } t[0] = c[0] + (c[7] << 16 | c[7] >>> 16) + (c[6] << 16 | c[6] >>> 16) | 0, t[1] = c[1] + (c[0] << 8 | c[0] >>> 24) + c[7] | 0, t[2] = c[2] + (c[1] << 16 | c[1] >>> 16) + (c[0] << 16 | c[0] >>> 16) | 0, t[3] = c[3] + (c[2] << 8 | c[2] >>> 24) + c[1] | 0, t[4] = c[4] + (c[3] << 16 | c[3] >>> 16) + (c[2] << 16 | c[2] >>> 16) | 0, t[5] = c[5] + (c[4] << 8 | c[4] >>> 24) + c[3] | 0, t[6] = c[6] + (c[5] << 16 | c[5] >>> 16) + (c[4] << 16 | c[4] >>> 16) | 0, t[7] = c[7] + (c[6] << 8 | c[6] >>> 24) + c[5] | 0 } var e = t, i = e.lib, n = i.StreamCipher, o = e.algo, s = [], a = [], c = [], h = o.RabbitLegacy = n.extend({ _doReset: function () { var t = this._key.words, e = this.cfg.iv, i = this._X = [t[0], t[3] << 16 | t[2] >>> 16, t[1], t[0] << 16 | t[3] >>> 16, t[2], t[1] << 16 | t[0] >>> 16, t[3], t[2] << 16 | t[1] >>> 16], n = this._C = [t[2] << 16 | t[2] >>> 16, 4294901760 & t[0] | 65535 & t[1], t[3] << 16 | t[3] >>> 16, 4294901760 & t[1] | 65535 & t[2], t[0] << 16 | t[0] >>> 16, 4294901760 & t[2] | 65535 & t[3], t[1] << 16 | t[1] >>> 16, 4294901760 & t[3] | 65535 & t[0]]; this._b = 0; for (var o = 0; o < 4; o++)r.call(this); for (var o = 0; o < 8; o++)n[o] ^= i[o + 4 & 7]; if (e) { var s = e.words, a = s[0], c = s[1], h = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8), l = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8), f = h >>> 16 | 4294901760 & l, u = l << 16 | 65535 & h; n[0] ^= h, n[1] ^= f, n[2] ^= l, n[3] ^= u, n[4] ^= h, n[5] ^= f, n[6] ^= l, n[7] ^= u; for (var o = 0; o < 4; o++)r.call(this) } }, _doProcessBlock: function (t, e) { var i = this._X; r.call(this), s[0] = i[0] ^ i[5] >>> 16 ^ i[3] << 16, s[1] = i[2] ^ i[7] >>> 16 ^ i[5] << 16, s[2] = i[4] ^ i[1] >>> 16 ^ i[7] << 16, s[3] = i[6] ^ i[3] >>> 16 ^ i[1] << 16; for (var n = 0; n < 4; n++)s[n] = 16711935 & (s[n] << 8 | s[n] >>> 24) | 4278255360 & (s[n] << 24 | s[n] >>> 8), t[e + n] ^= s[n] }, blockSize: 4, ivSize: 2 }); e.RabbitLegacy = n._createHelper(h) }(), t.pad.ZeroPadding = { pad: function (t, r) { var e = 4 * r; t.clamp(), t.sigBytes += e - (t.sigBytes % e || e) }, unpad: function (t) { for (var r = t.words, e = t.sigBytes - 1; !(r[e >>> 2] >>> 24 - e % 4 * 8 & 255);)e--; t.sigBytes = e + 1 } }, t
});

!function (r, e) { "object" == typeof exports ? module.exports = exports = e(require("./core")) : "function" == typeof define && define.amd ? define(["./core"], e) : e(r.CryptoJS) }(this, function (r) { return function () { function e(r, e, t) { for (var a = [], o = 0, i = 0; i < e; i++)if (i % 4) { var f = t[r.charCodeAt(i - 1)] << i % 4 * 2, c = t[r.charCodeAt(i)] >>> 6 - i % 4 * 2; a[o >>> 2] |= (f | c) << 24 - o % 4 * 8, o++ } return n.create(a, o) } var t = r, a = t.lib, n = a.WordArray, o = t.enc; o.Base64 = { stringify: function (r) { var e = r.words, t = r.sigBytes, a = this._map; r.clamp(); for (var n = [], o = 0; o < t; o += 3)for (var i = e[o >>> 2] >>> 24 - o % 4 * 8 & 255, f = e[o + 1 >>> 2] >>> 24 - (o + 1) % 4 * 8 & 255, c = e[o + 2 >>> 2] >>> 24 - (o + 2) % 4 * 8 & 255, s = i << 16 | f << 8 | c, h = 0; h < 4 && o + .75 * h < t; h++)n.push(a.charAt(s >>> 6 * (3 - h) & 63)); var p = a.charAt(64); if (p) for (; n.length % 4;)n.push(p); return n.join("") }, parse: function (r) { var t = r.length, a = this._map, n = this._reverseMap; if (!n) { n = this._reverseMap = []; for (var o = 0; o < a.length; o++)n[a.charCodeAt(o)] = o } var i = a.charAt(64); if (i) { var f = r.indexOf(i); f !== -1 && (t = f) } return e(r, t, n) }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" } }(), r.enc.Base64 });


function Encrypt_Data(data, key_value, iv_value) {
    if (key_value.length != 16) {
        alert("Key value should be 16 digit long for data Encryption");
        return;
    }
    if (iv_value.length != 16) {
        alert("IV value should be 16 digit long for data Decryption");
        return;
    }

    var key = CryptoJS.enc.Utf8.parse(key_value);
    var iv = CryptoJS.enc.Utf8.parse(iv_value);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), key,
        {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

    return encrypted.toString();

}

function Decrypt_Data(data, key_value, iv_value) {
    if (key_value.length != 16) {
        alert("Key value should be 16 digit long for data Encryption");
        return;
    }
    if (iv_value.length != 16) {
        alert("IV value should be 16 digit long for data Decryption");
        return;
    }
    var key = CryptoJS.enc.Utf8.parse(key_value);
    var iv = CryptoJS.enc.Utf8.parse(iv_value);

    var decrypted = CryptoJS.AES.decrypt(data, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
}

function random_key_generator(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

/*
=======================================================================
END OF AES
=======================================================================
*/




/*
=======================================================================
					RSA STARTING
=======================================================================
*/

//============================================================================
// Jocys.com JavaScript.NET Classes               (In C# Object Oriented Style)
// Created by Evaldas Jocys <evaldas@jocys.com>
//=============================================================================
// Namespaces
//-----------------------------------------------------------------------------
// <PropertyGroup>
//		<RootNamespace>System</RootNamespace>
// <PropertyGroup>
//-----------------------------------------------------------------------------

var System = {};

window.System = {
    __namespace: true,
    __typeName: "Sys",
    getName: function () { return "Sys"; },
    __upperCaseTypes: {}
};

//-----------------------------------------------------------------------------
// CLASS: System.Type
//-----------------------------------------------------------------------------

System.Type = function () {
    /// <summary>
    /// Initializes a new instance of the System.Type class.
    /// </summary>
    /// <remarks>These XML Comments were created only for IntelliSense.</remarks>
    /// <summary>
    /// Initializes a new instance of the System.Type class.
    /// </summary>
    this.Name = "name";
    this.Namespace = "";
    this.FullName = "";
    //---------------------------------------------------------
    this.ToString = function () {
        /// <summary>
        /// Returns a String representing the name of the current Type.
        /// </summary>
        /// <returns>A String representing the name of the current System.Type.</returns>
        return this.FullName;
    };
    //---------------------------------------------------------
    function initialize() {
        var tn = "";
        tn = arguments[0];
        this.FullName = tn;
        var ta = [];
        if (tn) {
            ta = tn.split('.');
            this.Name = ta[ta.length - 1];
            this.Namespace = ta.slice(0, ta.length - 2).join('.');
            //tnarguments[0];
            //tn.
            //this.Namespace = nspace;
            //this.Name = name;
            //this.FullName = this.Namespace +"."+ this.Name
        }
    }
    initialize.apply(this, arguments);
};

//-----------------------------------------------------------------------------

System.Type.Inherits = function (d, s) {
    for (var property in s) {
        if (property === "__typeName") continue;
        if (property === "GetType") continue;
        d[property] = s[property];
    }
    return s;
};

//-----------------------------------------------------------------------------

System.Type.RegisterNamespace = function (namespacePath) {
    // If Microsoft Ajax function exist then...
    if (typeof Type !== "undefined" && typeof Type.registerNamespace === "function") {
        // Register namespace.
        //Type.registerNamespace.
        Type.registerNamespace.apply(this, arguments);
    } else {
        var rootObject = window;
        var namespaceParts = namespacePath.split('.');
        for (var i = 0; i < namespaceParts.length; i++) {
            var currentPart = namespaceParts[i];
            var ns = rootObject[currentPart];
            if (!ns) ns = rootObject[currentPart] = {};
            ns.__typeName = namespacePath;
            ns.__namespace = true;
            rootObject = ns;
        }
    }
};

//-----------------------------------------------------------------------------

System.Type.RegisterClass = function (typeName, baseType, interfaceTypes) {
    var o = eval(typeName);
    // If Microsoft Ajax function exist then...
    if (typeof Type !== "undefined" && typeof Type.registerClass === "function") {
        // Register class.
        Type.registerClass.apply(o, arguments);
    } else {
        o.__typeName = typeName;
        o.__class = true;
    }
    o.prototype.GetType = function () { return new System.Type(typeName); };
};

//-----------------------------------------------------------------------------

System.Type.RegisterInterface = function (typeName, baseType) { };

//-----------------------------------------------------------------------------

System.Type.RegisterEnum = function (type, flags) {
    // If Microsoft Ajax function exist then...
    var o = eval(type);
    if (typeof Type !== "undefined" && typeof Type.registerEnum === "function") {
        // Register namespace.
        Type.registerEnum.apply(o, arguments);
    } else {
        for (var i in o.prototype) o[i] = o.prototype[i];
        o.__enum = true;
        o.__flags = flags;
    }
};

//-----------------------------------------------------------------------------

System.Type.RegisterProperty = function (name) {
    var o = me[name];
    me[name] = function (value) {
        if (arguments.length === 0) return me[name].get();
        if (arguments.length === 1) me[name].set(value);
    };
};

//-----------------------------------------------------------------------------

System.Type.RegisterNamespace("System");
System.Type.RegisterClass("System.Type");

//-----------------------------------------------------------------------------


System.Type.GetType = function (typeName) {
    /// <summary>
    /// Gets the System.Type with the specified name, performing a case-sensitive
    /// search.
    /// </summary>
    /// <param type="string" name="typeName">The name of the System.Type.AssemblyQualifiedName to get.</param>
    /// <returns type="System.Type">
    /// The System.Type with the specified name, if found; otherwise, null.
    /// </returns>
    var type = new System.Type(typeName);
    return type;
};

//=============================================================================

//=============================================================================
// TypeCode Enum
//-----------------------------------------------------------------------------

System.TypeCode = function () {
    /// <summary>Specifies the type of an object.</summary>
    /// <field name="Empty" type="Number" integer="true" static="true">A null reference.</field>
    /// <field name="Object" type="Number" integer="true" static="true">Represents any reference or value type not represented by another TypeCode.</field>
    /// <field name="DBNull" type="Number" integer="true" static="true">A database null (column) value.</field>
    /// <field name="Boolean" type="Number" integer="true" static="true">A simple type representing Boolean values of true or false.</field>
    /// <field name="Char" type="Number" integer="true" static="true">Unsigned 16-bit integers with values between 0 and 65535.</field>
    /// <field name="SByte" type="Number" integer="true" static="true">Signed 8-bit integers with values between -128 and 127.</field>
    /// <field name="Byte" type="Number" integer="true" static="true">Unsigned 8-bit integers with values between 0 and 255.</field>
    /// <field name="Int16" type="Number" integer="true" static="true">Signed 16-bit integers with values between -32768 and 32767.</field>
    /// <field name="UInt16" type="Number" integer="true" static="true">Unsigned 16-bit integers with values between 0 and 65535.</field>
    /// <field name="Int32" type="Number" integer="true" static="true">Signed 32-bit integers with values between -2147483648 and 2147483647.</field>
    /// <field name="UInt32" type="Number" integer="true" static="true">Unsigned 32-bit integers with values between 0 and 4294967295.</field>
    /// <field name="Int64" type="Number" integer="true" static="true">Signed 64-bit integers with values between -9223372036854775808 and 9223372036854775807.</field>
    /// <field name="UInt64" type="Number" integer="true" static="true">Unsigned 64-bit integers with values between 0 and 18446744073709551615.</field>
    /// <field name="Single" type="Number" integer="true" static="true">A floating point type representing values ranging from approximately 1.5 x 10 -45 to 3.4 x 10 38 with a precision of 7 digits.</field>
    /// <field name="Double" type="Number" integer="true" static="true">A floating point type representing values ranging from approximately 5.0 x 10 -324 to 1.7 x 10 308 with a precision of 15-16 digits.</field>
    /// <field name="Decimal" type="Number" integer="true" static="true">A simple type representing values ranging from 1.0 x 10 -28 to approximately 7.9 x 10 28 with 28-29 significant digits.</field>
    /// <field name="DateTime" type="Number" integer="true" static="true">A type representing a date and time value.</field>
    /// <field name="String" type="Number" integer="true" static="true">A sealed class type representing Unicode character strings.</field>
};

System.TypeCode.prototype = {
    Empty: 0,
    Object: 1,
    DBNull: 2,
    Boolean: 3,
    Char: 4,
    SByte: 5,
    Byte: 6,
    Int16: 7,
    UInt16: 8,
    Int32: 9,
    UInt32: 10,
    Int64: 11,
    UInt64: 12,
    Single: 13,
    Double: 14,
    Decimal: 15,
    DateTime: 16,
    String: 18
};

System.Type.RegisterEnum("System.TypeCode");

//=============================================================================
// TimeUnitType Enum
//-----------------------------------------------------------------------------

System.TimeUnitType = function () { };

System.TimeUnitType.prototype = {
    Seconds: 0,
    Minutes: 1,
    Hours: 2,
    Days: 3
};

System.Type.RegisterEnum("System.TimeUnitType");

//=============================================================================
// Extensions
//-----------------------------------------------------------------------------

System.SR = function () { };
System.SR.prototype = {
    // System.resources
    NotReadableStream: "The base stream is not readable.",
    NotWriteableStream: "The base stream is not writeable.",
    ArgumentOutOfRange_Enum: "Enum value was out of legal range."
};
System.Type.RegisterClass("System.SR");

System.SR.GetString = function (name) {
    /// <summary>
    /// Searches for a <see cref="T:System.String" /> resource with the specified name.
    /// </summary>
    /// <param name="name">Name of the resource to search for.</param>
    /// <returns>The value of a resource, if the value is a <see cref="T:System.String" />.</returns>
    var message = System.SR.prototype[name];
    if (!message) message = name;
    return message;
};

//=============================================================================
// Extensions
//-----------------------------------------------------------------------------
System.Extensions = function () {
    /// <summary>
    /// Create class to extend javascript objects. This function will run at the end
    /// of this file.
    /// </summary>
    //---------------------------------------------------------
    // METHOD: Apply
    //---------------------------------------------------------
    this.Apply = function () {
        var isServerSide = false;
        if (typeof Response === "object") isServerSide = true;
        if (!isServerSide) {
            // Create function $(...) - Get objects by Ids.
            if (typeof this.$ === "undefined") this.$ = function () {
                return document.getElementById(arguments[0]);
            };
        }

        // EXTENSIONS: Object
        //Object.prototype.ToTrace = function(){ System.Class.ListProperties(this,this.toString());};
        //		Object.prototype.GetType = function(){
        //			//if (typeof(this.GetType) == "function") return this.GetType();
        //			var type = new System.Type();
        //			type.Name = typeof(this);
        //			return type;
        //		}


        // EXTENSIONS: Date
        Date.prototype.SubtractDays = System.DateTime.SubtractDays;
        Date.prototype.SubtractMonths = System.DateTime.SubtractMonths;
        Date.prototype.GetFromString = System.DateTime.GetFromString;
        Date.prototype.GetFromUtcString = System.DateTime.GetFromUtcString;
        Date.prototype.DefaultFormat = "yyyy-MM-dd HH:mm:ss";
        Date.prototype.ToString = System.DateTime.ToString;
        Date.prototype.Subtract = System.DateTime.Subtract;
        Date.prototype.Ticks = System.DateTime.Ticks;
        Date.prototype.ToUniversalTime = System.DateTime.ToUniversalTime;
        Number.prototype.ToString = Number.prototype.toString;

        // EXTENSIONS: String
        String.prototype.Trim = function (string) { return System.Text.Trim(this, string); };
        String.prototype.ToCamelCase = function () { return System.Text.ToCamelCase(this); };
        String.Format = function (format, args) {
            /// <summary>Appends the string returned by processing a composite format string.</summary>
            /// <param name="format">A composite format string.</param>
            /// <param name="An array of objects to format.">A composite format string.</param>
            /// <returns>A reference to this instance with format appended.</returns>
            //
            // Sync this method with String.Format later.
            args = Array.prototype.slice.call(arguments, 1);
            var value = format.replace(/{(\d+)(:([xX]?\d+))?(,([-]?\d+))?}/g,
                function (matchString, number) {
                    var value = typeof args[number] !== 'undefined' ? args[number] : matchString;
                    var hexMatch = matchString.match(":([xX])(\\d+)");
                    if (hexMatch) {
                        value = value.toString(16);
                        // Change case.
                        value = hexMatch[1] === "x"
                            ? value.toLowerCase()
                            : value.toUpperCase();
                        // Add zeros.
                        num = parseInt(hexMatch[2]);
                        var z = "";
                        for (i = value.length; i < num; i++)
                            z += "0";
                        value = z + value;
                    }
                    var padMatch = matchString.match(",([-]?\\d+)");
                    var num;
                    if (padMatch) {
                        num = parseInt(padMatch[1]);
                        value = value.toString();
                        var ln = Math.abs(num);
                        var s = "";
                        for (i = value.length; i < ln; i++)
                            s += " ";
                        value = num >= 0
                            ? s + value
                            : value + s;
                    }
                    return value;
                });
            return value;
        };
        String.Join = function (separator, value, startIndex, count) {
            if (!separator) separator = "";
            if (!startIndex) startIndex = 0;
            if (!count) count = value.length;
            if (count === 0) return "";
            var length = 0;
            var end = startIndex + count - 1;
            var s = "";
            for (var i = startIndex; i <= end; i++) {
                if (i > startIndex) s += separator;
                s += value[i];
            }
            return s;
        };
        // EXTENSIONS: Array
        Array.prototype.Clone = function () {
            var buffer = this.slice(0, this.length);
            for (var i = 0; i < this.length; i++) buffer[i] = this[i];
            return buffer;
        };
        //		// Firefox InnerText
        //		if (typeof HTMLElement != "undefined" && typeof HTMLElement.prototype.__defineGetter__ != "undefined"){
        //			HTMLElement.prototype.__defineGetter__("innerText", function(){ return this.textContent; });
        //			HTMLElement.prototype.__defineSetter__("innerText", function(sText){ this.innerHTML = sText.textContent; });
        //		}


    };
};
System.Type.RegisterClass("System.Extensions");


//=============================================================================
// CLASS: System.IO.Compression.DeflateStream
//-----------------------------------------------------------------------------

System.AsyncCallback = function (ar) {
    /// <summary>
    /// References a method to be called when a corresponding asynchronous operation completes.
    /// </summary>
    /// <param name="ar">The result of the asynchronous operation.</param>
};
System.Type.RegisterClass("System.AsyncCallback");

System.AsyncWriteDelegate = function (array, offset, count, isAsync) {
    // internal delegate void AsyncWriteDelegate(byte[] array, int offset, int count, bool isAsync);
};
System.Type.RegisterClass("System.AsyncWriteDelegate");

//=============================================================================
// Client side extensions
//-----------------------------------------------------------------------------

System.GetScriptsPath = function () {
    var url = "";
    var i;
    var match;
    var rx = new RegExp("System(\.debug)?\.js", "gi");
    var head = document.getElementsByTagName("head")[0];
    var scripts = head.getElementsByTagName("script");
    for (i = 0; i < scripts.length; i++) {
        match = scripts[i].src.match(rx);
        if (match) {
            url = scripts[i].src.replace(rx, "");
            break;
        }
    }
    // If url is still empty then...
    if (url.length === 0) {
        scripts = document.getElementsByTagName("script");
        for (i = 0; i < scripts.length; i++) {
            match = scripts[i].src.match(rx);
            if (match) {
                url = scripts[i].src.replace(rx, "");
                break;
            }
        }
    }
    return url;
};

// Make this class static.
System.Extensions = new System.Extensions();
// Use this to apply extensions to current context.
// System.Extensions.Apply.apply(this);

//=============================================================================
// System.Type.Class
//-----------------------------------------------------------------------------

/* Every JavaScript object has a prototype property. This property is what makes
OOP possible in JavaScript, but it is a bit unusual if you come from other
OO languages. Here's how it works. When you access an object property, the
interpreter will look at the current object's properties to see if one by that
name exists. If the name does not exist there, then the interpreter looks at the
prototype property of the object to see if that object, the one pointed to by
the prototype property, has the named property. If there is no property there,
then the interpreter looks to see if the prototype property has a prototype
property. If it does, then this process continues until either the property is
found or until there are no more prototype properties to search. */

System.Type.Class = System.Type.Class ? System.Type.Class : {};

System.Type.Class.Root = this;

System.Type.Class.Inherit = function () {
    /// <summary>
    /// 
    /// </summary>
    /// <returns>void</returns>
    Trace.Write("exec System.Class.Inherit(arguments){", 1);
    // Create object
    this.Classes = [];
    this.Objects = [];
    var i;
    for (i = 0; i < arguments.length; i++) {
        // We need to tell to class to skip initialization.
        arguments[i].prototype.NoInit = true;
        this.Objects.push(new arguments[i]);
        arguments[i].prototype.NoInit = false;
        this.Classes.push(arguments[i]);
    }
    for (i = 0; i < this.Objects.length; i++) {
        if (i === 0) {
            Trace.Write("Inherit: '" + this.Objects[i].Type + "' Class From: ", 1);
        } else {
            Trace.Write(this.Objects[i].Type);
        }
    }
    Trace.Write("Done", -2);

    var finClass = this.Classes[0];
    var finObject = this.Objects[0];

    for (var cid = this.Classes.length - 1; cid > 0; cid--) {
        var srcClass = this.Classes[cid];
        var srcObject = this.Objects[cid];
        var dstObject = this.Objects[cid - 1];
        var dstClass = this.Classes[cid - 1];

        Trace.Write("// Inherit: '" + dstObject.Type + "' From: '" + srcObject.Type + "'");
        //Trace.Write("Inherit: "+dstClass+" From: "+srcClass);

        //METHOD1: Copy properties one by one into destination class prototype object.
        finClass.prototype = srcObject;
        Trace.Write("1. Import Class Properties: " + finObject.Type + ".prototype <- " + srcObject.Type, 1);
        // Copy one by one method.
        //for (var property in srcObject){
        //	Trace.Write("."+property+"");
        //	finClass.prototype[property] = srcObject[property];
        //}
        Trace.Write("End Import", -2);
        // The constructor property is used in scripts to determine an object's
        // type. When we redefined the destinationClass prototype, we effectively
        // changed the constructor to sourceClass. We need to fix this and
        // Update subclass properties and methods.
        Trace.Write("2. Fix Prototype Constructor", 1);
        finClass.prototype.constructor = finClass;
        // Copy one by one method.
        //Trace.Write("Assign property: "+finObject.Type+" <- "+srcObject.Type+"["+property+"]");
        //for (var property in finObject){
        //	finClass.prototype.constructor[property] = finObject[property];
        //}
        Trace.Write("End Fix", -2);
        // Allow to call methods in a superclass that are hidden by redefined methods in a subclass.
        Trace.Write("3. Allow to call methods in a superclass", 1);
        //destinationClass.superclass = sourceClass.prototype;
        Trace.Write("Import Superclass Properties: " + finObject.Type + ".superclass <- " + srcObject.Type + ".prototype");
        finClass.superclass = srcClass.prototype;
        // Copy one by one method.
        //for (var property in srcClass.prototype){
        //	//Trace.Write("Assign property: "+finObject.Type+" <- "+srcObject.Type+"["+property+"]");
        //	finClass.superclass[property] = srcClass.prototype[property];
        //}
        Trace.Write("End Import", -2);
        //System.Class.ListProperties(finClass,"finClass");
    }
    Trace.Write("} //System.Class.Inherit(arrguments)", -2);
};

System.Type.Class.Inherit = function (classTo, classFrom) {
    /// <summary>
    /// Inherit one class (subclass) from another (superclass);
    /// </summary>
    /// <returns>void</returns>
    classTo.prototype = new classFrom();
    // Update subclass properties and methods.
    classTo.prototype.constructor = classTo;
    // Allow to call methods in a superclass that are hidden by redefined methods in a subclass.
    classTo.superclass = classFrom.prototype;
};


System.Type.Class.Exists = function (path) {
    /// <summary>
    /// Check if namespace exists.
    /// </summary>
    /// <returns>
    /// True if namespace exists, false if not.
    /// </returns>
    var rootObject;
    // If this is server side then...
    if (typeof Response === "object") {
        rootObject = System.Class.Root;
    } else {
        rootObject = System.Class.Root; //window;
    }
    var exists = true;
    var parts = path.split('.');
    for (var i = 0; i < parts.length; i++) {
        var part = parts[i];
        // If namespace does not exists then...
        //Trace.Write("Part: "+part);
        if (!rootObject[part]) {
            // return false.
            exists = false;
            break;
        }
        rootObject = rootObject[part];
    }
    return exists;
};

// Added for compatibility only. Will be removed later.
// Make sure that the sub namespace Client exists.
System.Class = System.Class ? System.Class : {};
System.Class.Inherit = System.Type.Class.Inherit;
System.Class.Root = this;

//=============================================================================
// CLASS: Uri
//-----------------------------------------------------------------------------

System.Uri = function (uriString) {
    /// <summary>
    /// Initializes a new instance of the System.Uri class with the specified URI.
    /// </summary>
    /// <param type="string" name="uriString">A URI</param>
    //---------------------------------------------------------
    // http://www.domain.com:80/default.aspx?AudioMin=0&AudioMax=100
    this.OriginalString;
    // http://www.domain.com:80/default.aspx
    this.AbsolutePath;
    // ?AudioMin=0&AudioMax=100
    this.Query;
    this.QueryParams;
    this.GetType = function () { return new System.Type("System.Uri"); };
    //---------------------------------------------------------
    this.GetQueryValue = function (name, ignoreCase) {
        var value = null;
        var pName;
        if (ignoreCase === true) name = name.toLowerCase();
        for (var property in this.QueryParams) {
            pName = property;
            if (ignoreCase === true) pName = property.toLowerCase();
            if (name === pName) {
                value = this.QueryParams[property];
                break;
            }
        }
        return value;
    };
    //---------------------------------------------------------
    this.GetParameters = function (uri) {
        var results = {};
        if (uri === null) return results;
        var query = uri.substring(uri.indexOf("?") + 1, uri.length);
        var arr = query.split("&");
        var item;
        var name;
        var value;
        for (var i = 0; i < arr.length; i++) {
            item = arr[i];
            name = item.substring(0, item.indexOf("="));
            value = item.substring(item.indexOf("=") + 1, item.length);
            value = unescape(value);
            results[name] = value;
        }
        return results;
    };
    //---------------------------------------------------------
    function initialize() {
        var u = arguments[0];
        this.OriginalString = u;
        this.AbsolutePath = u.indexOf("?") > -1 ? u.substring(0, u.indexOf("?") - 1) : u;
        this.Query = u.indexOf("?") > -1 ? u.substring(u.indexOf("?"), u.length) : null;
        this.QueryParams = this.GetParameters(this.Query);
    }
    initialize.apply(this, arguments);
};
System.Type.RegisterClass("System.Uri");

//=============================================================================
// CLASS: EventItem
//-----------------------------------------------------------------------------

//Using Delegates (C# Programming Guide)
// http://msdn2.microsoft.com/en-us/library/ms173172.aspx

System.EventItem = function () {
    this.Node;
    this.Name;
    this.Handler;
    this.Capture;
};
System.Type.RegisterClass("System.EventItem");

//=============================================================================
// CLASS: EventHandler (Delegate)
//-----------------------------------------------------------------------------

System.EventHandler = function (target, method, timeout) {
    /// <summary>
    /// This helper class simulates .NET concept of event delegate. (EventHandler)
    /// </summary>
    /// <param type="function" name="method">Method represented by Delegate.<param>
    /// <param type="object" name="target">Context on which delegate invokes the instance method.<param>
    /// <param type="int" name="timout">Add delay (in miliseconds) between event notification from source object and call of recipient object that have registered to receive that event.</param>
    var me = this;
    //---------------------------------------------------------
    this.Method = null;
    this.Target = null;
    this.Timeout = null;
    //---------------------------------------------------------
    this.Invoke = function () {
        if (typeof this.Timeout === "number") {
            setTimeout(function () { return this.Method.apply(this.Target, arguments); }, this.Timeout);
        } else {
            return this.Method.apply(this.Target, arguments);
        }
    };
    //---------------------------------------------------------
    this.InvokeNative = function () {
        var e = arguments[0] || window.event;
        var sender = e.target || e.srcElement;
        var args = new Array(2);
        args[0] = sender;
        args[1] = e;
        if (typeof timeout === "number") {
            setTimeout(function () { return method.apply(target, args); }, timeout);
        } else {
            return method.apply(target, args);
        }
    };
    //---------------------------------------------------------
    this.Initialize = function () {
        this.Target = target;
        this.Method = method;
        //System.Class.Properties.ToTrace(me);
        //Trace.Write(typeof(me.Target)+": "+nativeEvent);
    };
    this.Initialize();
};
System.Type.RegisterClass("System.EventHandler");

//=============================================================================
// CLASS: Event
//-----------------------------------------------------------------------------

System.Event = function (name) {
    /// <summary>
    /// This class simulates .NET eventing. (event delegate)
    /// </summary>
    //---------------------------------------------------------
    this.args = {};
    this._delegates = [];
    this.name = name;
    //---------------------------------------------------------
    this.Add = function (delegate) {
        /// <summary>
        /// This function is used to add a callback object.
        /// and a method.
        /// </summary>
        this._delegates[this._delegates.length] = delegate;
    };
    //---------------------------------------------------------
    this.Remove = function (delegate) {
        /// <summary>
        /// This function is used to remove a callback object.
        /// and a method.
        /// </summary>
        for (i = this._delegates.length - 1; i >= 0; i = i - 1) {
            if (delegate === this._delegates[i]) {
                this._delegates.splice(i, 1);
            }
        }
    };
    //---------------------------------------------------------
    this.Fire = function (sender, eventArgs) {
        /// <summary>
        /// This function makes a call back into the object
        /// that has registered for the event.
        /// </summary>
        for (var i = 0; i < this._delegates.length; i++) {
            this._delegates[i].Invoke(sender, eventArgs);
        }
    };
};
System.Type.RegisterClass("System.Event");

//=============================================================================
// CLASS: EventArgs
//-----------------------------------------------------------------------------

System.EventArgs = function (name) {
    /// <summary>
    /// Event arguments.
    /// </summary>
    /// <param name="name">Name of event</param>
    this.Name = "";
    //---------------------------------------------------------
    this.ToString = function () {
        /// <summary>
        /// Convert this object to string representation.
        /// </summary>
        var results = "";
        for (var property in this) {
            var skip = false;
            // Don't show own methods.
            skip = skip || property === "Initialize";
            skip = skip || property === "ToString";
            if (!skip) results += property + "='" + this[property] + "';";
        }
        results = "e[" + results + "]";
        return results;
    };
    //---------------------------------------------------------
    this.Initialize = function (name) {
        this.Name = name ? name : "";
    };
    this.Initialize.apply(this, arguments);
};
System.Type.RegisterClass("System.EventArgs");

//=============================================================================
// CLASS: EventsManager
//-----------------------------------------------------------------------------

System.EventsManager = function (context) {
    /// <summary>
    /// Provides a way for automagically removing events from nodes and thus preventing memory leakage.
    /// </summary>
    /// <param name="context">Optional context of events. Default: window</param>
    /// <example>
    /// // Attach SomeButton_Click function to "click" event of "SomeButton" button.
    /// Events.Add("SomeButton", "click", SomeButton_Click, false);
    /// // Attach ButtonWithDelay_Click function to event "click" of "ButtonWithDelay" button.
    /// // Delay execution by 2 seconds and run ButtonWithDelay_Click in this context.
    /// Events.Add("ButtonWithDelay", "click", ButtonWithDelay_Click, false, this, 2000);
    /// </example>
    /// <remarks>
    /// Original Idea by Mark Wubben
    /// Rewriten as class by Evaldas Jocys [evaldas@jocys.com]
    /// See http://novemberborn.net/javascript/event-cache for more information.
    /// </remarks>
    //---------------------------------------------------------
    // Public properties.
    //---------------------------------------------------------
    // An array whose items are arrays which contain the information in the
    // following order: node, eventName, eventHandler, capture.
    this.Items = null;
    this.Context = null;
    //---------------------------------------------------------
    // Private properties.
    //---------------------------------------------------------
    var me = this;
    //---------------------------------------------------------
    // METHOD: Add
    //---------------------------------------------------------
    this.Add = function (node, eventName, eventHandler, capture) {
        /// <param type="bool" name="capture">true or false if we need to atach something to native DOM object.</param>
        var success = true;
        var id;
        if (typeof node === "string") {
            node = this.Context.document.getElementById(node);
            id = node;
        } else {
            id = node.id;
        }
        var traceFound = typeof Trace !== "undefined";
        if (traceFound) {
            Trace.Write("call " + this.GetType().Name + ".Add(node, '" + eventName + "', eventHandler, " + capture + ")");
        }
        if (node) {
            if (typeof capture !== "boolean") {
                node[eventName].Add(eventHandler);
            } else {
                if (eventHandler.GetType && eventHandler.GetType().FullName === "System.EventHandler") eventHandler = eventHandler.InvokeNative;
                // Attach handler to native DOM object.
                if (node.addEventListener) {
                    node.addEventListener(eventName, eventHandler, capture);
                } else if (node.attachEvent) {
                    if (traceFound) Trace.Write("thru System.EventHandler: " + eventHandler.Type);
                    var r = node.attachEvent("on" + eventName, eventHandler);
                } else { /* */ }
                this.AddItem(node, eventName, eventHandler, capture);
            }
        } else {
            if (traceFound) Trace.Write("Error: " + this.GetType().Name + ".Add(...) - node '" + id + "' was not found!");
            success = false;
        }
        return success;
    };
    //---------------------------------------------------------
    // METHOD: Remove
    //---------------------------------------------------------
    // Use value returned by by this.Add if you want to remove same function.
    this.Remove = function (node, eventName, eventHandler) {
        if (typeof node === "string") node = this.Context.document.getElementById(node);
        this.RemoveItem(node, eventName, eventHandler);
    };
    //---------------------------------------------------------
    // METHOD: AddItem
    //---------------------------------------------------------
    // node - A reference to the node on which the event has been set.
    // eventName - The name of the event.
    // eventHandler - A reference to the function which handles the event.
    // capture - determines whether the event is triggered in capture mode
    // or not. Does not apply to Internet Explorer.
    this.AddItem = function (node, eventName, eventHandler, capture) {
        var ev = new System.EventItem();
        ev.Node = node;
        ev.Name = eventName;
        ev.Handler = eventHandler;
        ev.Capture = capture;
        this.Items.push(ev);
    };
    //---------------------------------------------------------
    // METHOD: RemoveItem
    //---------------------------------------------------------
    this.RemoveItem = function (node, eventName, eventHandler) {
        var i, item;
        for (i = this.Items.length - 1; i >= 0; i = i - 1) {
            item = this.Items[i];
            if (typeof item.Capture !== "boolean") {
                item.Node[item.Name].Remove(item.Handler);
            } else {
                if (eventHandler.GetType && eventHandler.GetType().FullName === "System.EventHandler") eventHandler = eventHandler.InvokeNative;
                if (node === item.Node && eventName === item.Name && eventHandler === item.Handler) {
                    if (item.Node.removeEventListener) {
                        item.Node.removeEventListener(item.Name, item.Handler, item.Capture);
                    } else if (item.Node.detachEvent) {
                        item.Node.detachEvent("on" + item.Name, item.Handler);
                    }
                }
            }
        }
    };
    //---------------------------------------------------------
    // METHOD: Dispose
    //---------------------------------------------------------
    // Remove all cached events.
    this.Dispose = function () {
        var i, item;
        for (i = me.Items.length - 1; i >= 0; i = i - 1) {
            item = me.Items[i];
            if (typeof item.Capture !== "boolean") {
                item.Node[item.Name].Remove(item.Handler);
            } else {
                var eventHandler = item.Handler;
                if (eventHandler.GetType && eventHandler.GetType().FullName === "System.EventHandler") eventHandler = eventHandler.InvokeNative;
                if (item.Node.removeEventListener) {
                    item.Node.removeEventListener(item.Name, item.Handler, item.Capture);
                } else if (item.Node.detachEvent) {
                    item.Node.detachEvent("on" + item.Name, item.Handler);
                }
            }
        }
    };
    //---------------------------------------------------------
    // INIT: Class
    //---------------------------------------------------------
    this.InitializeClass = function () {
        this.Context = context ? context : window;
        this.Items = [];
        this.Add(this.Context, 'unload', new System.EventHandler(this, this.Dispose), false);
    };
    this.InitializeClass();
};
System.Type.RegisterClass("System.EventsManager");

// If script is not on server side then...
if (typeof Response !== "object") {
    var Events = new System.EventsManager();
    System.EventsManager.Current = new System.EventsManager();
}

//=============================================================================
// CLASS: Exceptions
//-----------------------------------------------------------------------------

// From MicrosoftAjax.debug.js
Error.create = function (message, errorInfo) {
    var err = new Error(message);
    err.message = message;
    if (errorInfo) {
        for (var v in errorInfo) {
            err[v] = errorInfo[v];
        }
    }
    err.popStackFrame();
    return err;
};

// From MicrosoftAjax.debug.js
Error.prototype.popStackFrame = function () {
    if (arguments.length !== 0) throw Error.parameterCount();
    if (typeof this.stack === "undefined" || this.stack === null ||
        typeof this.fileName === "undefined" || this.fileName === null ||
        typeof this.lineNumber === "undefined" || this.lineNumber === null) {
        return;
    }
    var stackFrames = this.stack.split("\n");
    var currentFrame = stackFrames[0];
    var pattern = this.fileName + ":" + this.lineNumber;
    while (typeof currentFrame !== "undefined" &&
        currentFrame !== null &&
        currentFrame.indexOf(pattern) === -1) {
        stackFrames.shift();
        currentFrame = stackFrames[0];
    }
    var nextFrame = stackFrames[1];
    if (typeof nextFrame === "undefined" || nextFrame === null) {
        return;
    }
    var nextFrameParts = nextFrame.match(/@(.*):(\d+)$/);
    if (typeof nextFrameParts === "undefined" || nextFrameParts === null) {
        return;
    }
    this.fileName = nextFrameParts[1];
    this.lineNumber = parseInt(nextFrameParts[2]);
    stackFrames.shift();
    this.stack = stackFrames.join("\n");
};

/// <summary>Initializes a new instance of the System.Exception class with a specified error message.</summary>
/// <param name="message">The message that describes the error.</param>
System.Exception = function (message) { };

/// <summary>Initializes a new instance of the System.Exception class.</summary>
System.Exception = function () {
    switch (arguments.length) {
        case 0:
            break;
        case 1:
            if (typeof arguments[0].GetType === "function") return arguments[0];
            this.message = arguments[0];
            break;
        case 2:
            break;
        default:
            break;
    }
    var err = Error.create(this.message, { name: this.GetType().FullName });
    err.popStackFrame();
    return err;
};
System.Type.RegisterClass("System.Exception");

System.ArgumentNullException = function (paramName, message) {
    /// <summary>
    /// Initializes an instance of the <see cref="T:System.ArgumentNullException" /> class with a specified error message and the name of the parameter that causes this exception.
    /// </summary>
    /// <param name="paramName" type="String" optional="true" mayBeNull="true">The name of the parameter that caused the exception.</param>
    /// <param name="message" type="String" optional="true" mayBeNull="true">A message that describes the error.</param>
    //---------------------------------------------------------
    this.message = "";
    this.message += message ? message : "Value cannot be null.";
    this.message += "\r\nParameter name: '" + paramName + "'";
    var err = Error.create(this.message, { name: this.GetType().FullName });
    err.popStackFrame();
    return err;
};
System.Type.RegisterClass("System.ArgumentNullException");

System.ArgumentException = function (message, paramName) {
    /// <summary>
    /// Initializes a new instance of the <see cref="T:System.ArgumentException" /> class with a specified error message and the name of the parameter that causes this exception.
    /// </summary>
    /// <param name="message" type="String" optional="true" mayBeNull="true">The error message that explains the reason for the exception.</param>
    /// <param name="paramName" type="String" optional="true" mayBeNull="true">The name of the parameter that caused the current exception.</param>
    var base = new System.Type.Inherits(this, new System.Exception());
    this.message = "";
    this.message += message;
    this.message += paramName ? "\r\nParameter name: '" + paramName + "'" : "";
    var err = Error.create(this.message, { name: this.GetType().FullName });
    err.popStackFrame();
    return err;
};
System.Type.RegisterClass("System.ArgumentException");

System.ObjectDisposedException = function (objectName, message) {
    /// <summary>
    /// Initializes a new instance of the <see cref="T:System.ObjectDisposedException" /> class with the specified object name and message.
    /// </summary>
    /// <param name="objectName"" type="String" optional="true" mayBeNull="true">The name of the disposed object.</param>
    /// <param name="message"" type="String" optional="true" mayBeNull="true">The error message that explains the reason for the exception.</param>
    var base = new System.Type.Inherits(this, new System.Exception());
    this.message = "";
    this.message += message ? message : "Cannot access a disposed object.";
    this.message += "\r\nObject name: '" + objectName + "'";
    var err = Error.create(this.message, { name: this.GetType().FullName });
    err.popStackFrame();
    return err;
};
System.Type.RegisterClass("System.ObjectDisposedException");

System.Class.ExceptionToString = function (ex) {
    /// <summary>
    /// 
    /// </summary>
    /// <returns>void</returns>
    // If this is server side;
    var ex1 = new System.Exception(ex);
    var errorString = "";
    if (typeof Response === "object") {
        // ex.name;
        errorString = "Error: Exception[number=" + ex1.number + "; name='" + ex1.GetType().FullName + "'; message='" + ex1.message + "'; description='" + ex1.description + "']";
    } else {
        errorString = "Error: Exception[result=" + ex1.result + "; name='" + ex1.GetType().FullName + "'; message='" + ex1.message + "']";
    }
    return errorString;
};

System.Class.ExceptionToTrace = function (ex) {
    /// <summary>
    /// 
    /// </summary>
    /// <returns>void</returns>
    Trace.Write(System.Class.ExceptionToString(ex));
};

System.Class.Properties = {};

System.Class.Properties.ToString = function (object) {
    /// <summary>
    /// 
    /// </summary>
    /// <returns type="String" />
    var results = "";
    results += typeof object + " properties:\r\n";
    for (var property in object) {
        var valueType = typeof object[property];
        var value = object[property];
        results += valueType + " " + property + " = " + value + "\r\n";
    }
    return results;
};

System.Class.Properties.ToTrace = function (object, name, recursive, levels) {
    /// <summary>
    /// 
    /// </summary>
    /// <returns>void</returns>
    //var testClass = {};
    //var type = object.Type ? object.Type : ""
    if (typeof object === "object" && typeof name === "undefined") {
        try {
            name = new String(object);
        } catch (ex) {
            System.Class.ExceptionToTrace(ex);
        }
    }
    // By default go 2 levels inside;
    if (typeof levels === "undefined") levels = 3;
    if (recursive === false) levels = 0;
    //if (name != null) Trace.Write(name+" { "+"<font color=\"gray\"> = "+new String(object)+"</font>");
    try {
        Trace.LevelUpdate(1);
        for (var property in object) {
            var text = "." + property;
            if (typeof object[property] === "string") {
                text += "<font color=\"gray\"> = '" + object[property] + "'</font>";
            } else {
                text += "<font color=\"gray\"> = " + object[property] + "</font>";
            }
            if (levels > 1) {
                var goInside = typeof object[property] === "object" || property === "prototype" || property === "superclass";
                if (object[property] === null) goInside = false;
                if (goInside) {
                    var childName = "." + property;
                    var childLevels = levels - 1;
                    Trace.Write(text + " {", 1);
                    System.Class.ListProperties(object[property], childName, true, childLevels);
                    Trace.Write("}", -2);
                } else {
                    Trace.Write(text);
                }
            }
        }
    } catch (ex) {
        //Trace.Write("Error: "+ex.message);
        //System.Class.ExceptionToTrace(ex);
    }
    Trace.LevelUpdate(-1);
    if (name !== null) Trace.Write("}");
};

System.Class.ListProperties = function (object, name, recursive, levels) {
    /// <summary>
    /// Outdated: Use System.Class.Properties.ToTrace
    /// </summary>
    /// <returns>void</returns>
    System.Class.Properties.ToTrace(object, name, recursive, levels);
};

//=============================================================================
// System.Parse
//-----------------------------------------------------------------------------

System.Parse = function (object, value) {
    /// <summary>
    /// 
    /// </summary>
    /// <returns type="Object" />
    var results = null;
    switch (typeof object) {
        case "boolean":
            results = System.Bool.Parse(value);
            break;
        case "number":
            results = parseFloat(value);
            break;
        case "string":
            results = value;
            //if (object == "Guid"){
            //}
            break;
        case "object":
            results = value;
            // If this is Date.
            if (typeof object["getDate"] === "function") {
                results = new Date().GetFromString(value);
            }
            break;
        default:
            results = value;
            //alert("number: "+value+" - "+results);
            break;
    }
    return results;
};

//=============================================================================
// System.Bool
//-----------------------------------------------------------------------------

System.Bool = function () { };
System.Type.RegisterClass("System.Bool");

System.Bool.Parse = function (value) {
    /// <summary>
    /// 
    /// </summary>
    /// <returns type="Boolean"></returns>
    var results = new String(value).toLowerCase();
    if (results === "true" || results === "1" || results === "-1" || results === "on" || results === "yes") {
        results = true;
    } else {
        results = false;
    }
    return results;
};

System.Bool.IsBoolean = function (value) {
    /// <summary>
    /// Not a Number.
    /// </summary>
    /// <returns type="Boolean" />
    value = new String(value).toLowerCase();
    var results =
        value === "true" || value === "false" ||
        value === "1" || value === "0" ||
        value === "-1" ||
        value === "on" || value === "off" ||
        value === "yes" || value === "no";
    return results;
};

//=============================================================================
// System.Guid
//-----------------------------------------------------------------------------

System.Guid = function () {
    /// <summary>
    /// A read-only instance of the System.Guid class whose value is guaranteed to
    /// be all zeros.
    /// </summary>
};

System.Guid = function (g) {
    /// <summary>
    /// Initializes a new instance of the System.Guid class using the value represented
    /// by the specified string.
    /// </summary>
    /// <param name="g" type="String">
    /// A System.String that contains a GUID in one of the following formats ('d'
    /// represents a hexadecimal digit whose case is ignored): 32 contiguous digits:
    /// dddddddddddddddddddddddddddddddd -or- Groups of 8, 4, 4, 4, and 12 digits
    /// with hyphens between the groups. The entire GUID can optionally be enclosed
    /// in matching braces or parentheses: dddddddd-dddd-dddd-dddd-dddddddddddd -or-
    /// {dddddddd-dddd-dddd-dddd-dddddddddddd} -or- (dddddddd-dddd-dddd-dddd-dddddddddddd)
    /// -or- Groups of 8, 4, and 4 digits, and a subset of eight groups of 2 digits,
    /// with each group prefixed by "0x" or "0X", and separated by commas. The entire
    /// GUID, as well as the subset, is enclosed in matching braces: {0xdddddddd,
    /// 0xdddd, 0xdddd,{0xdd,0xdd,0xdd,0xdd,0xdd,0xdd,0xdd,0xdd}} All braces, commas,
    /// and "0x" prefixes are required. All embedded spaces are ignored. All leading
    /// zeroes in a group are ignored.The digits shown in a group are the maximum
    /// number of meaningful digits that can appear in that group. You can specify
    /// from 1 to the number of digits shown for a group. The specified digits are
    /// assumed to be the low order digits of the group.
    /// </param>
};


System.Guid = function (b) {
    /// <summary>
    /// Initializes a new instance of the System.Guid class using the specified array
    /// of bytes.
    /// </summary>
    /// <param name="b" type="Byte[]">
    /// A 16 element byte array containing values with which to initialize the GUID.
    /// </param>
    this.Bytes = new Array;
    // Bytes array have different order as represented in hex string.
    this.ByteOrder = [3, 2, 1, 0, 5, 4, 7, 6, 8, 9, 10, 11, 12, 13, 14, 15];
    //---------------------------------------------------------
    // METHOD: ToString.
    //---------------------------------------------------------
    this.ToString = function (format) {
        // Format (default is D):
        // N: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        // D: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
        // B: {xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx}
        // P: (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
        format = format ? format : "D";
        var addHyphens = "DBP".indexOf(format) > -1;
        var guid = "";
        for (var i = 0; i < 16; i++) {
            if (addHyphens) guid += i === 4 || i === 6 || i === 8 || i === 10 ? "-" : "";
            var pos = this.ByteOrder[i];
            guid += this.numberToHex(this.Bytes[pos]);
        }
        if (format === "B") guid = "{" + guid + "}";
        if (format === "P") guid = "(" + guid + ")";
        return guid;
    };
    // Add automatic conversion to string in javascript.
    // For example Response.Write(guid) instead of Response.Write(guid.ToString());
    this.toString = this.ToString;
    //---------------------------------------------------------
    // METHOD: ToByteArray
    //---------------------------------------------------------
    this.ToByteArray = function () {
        return this.Bytes;
    };
    //---------------------------------------------------------
    // METHOD: Equals
    //---------------------------------------------------------
    this.Equals = function (value) {
        var guid = value;
        var results = true;
        if (typeof value !== "object") {
            guid = new System.Guid(value);
        }
        // Compare;
        for (var i = 0; i < 16; i++) {
            if (this.Bytes[i] !== guid.Bytes[i]) {
                results = false;
                break;
            }
        }
        return results;
    };
    //---------------------------------------------------------
    // PRIVATE METHOD: numberToHex
    //---------------------------------------------------------
    this.numberToHex = function (value) {
        var hex = value <= 0xF ? "0" : "";
        hex += value.toString(16);
        return hex;
    };
    //---------------------------------------------------------
    // PRIVATE METHOD: stringToHexes
    //---------------------------------------------------------
    this.GuidStringToBytes = function (value) {
        // Strip separators.
        var regExp = new RegExp("[{}\(\)-]", "g");
        var guid = value.replace(regExp, "");
        // Convert Hex string to bytes.
        var bytes = [];
        for (var i = 0; i < 16; i++) {
            var pos = this.ByteOrder[i];
            var b1 = guid.charAt(pos * 2);
            var b2 = guid.charAt(pos * 2 + 1);
            bytes.push(unescape("%" + b1 + b2).charCodeAt(0));
        }
        return bytes;
    };
    //---------------------------------------------------------
    // INIT: Initialize class.
    //---------------------------------------------------------
    this.InitializeClass = function () {
        this.Bytes = [];
        // Create guid by type of value.
        var a0 = arguments[0];
        var i;
        switch (typeof a0) {
            case "null":
                for (i = 0; i < 16; i++) this.Bytes.push(0);
                break;
            case "undefined":
                for (i = 0; i < 16; i++) this.Bytes.push(0);
                break;
            case "string":
                this.Bytes = this.GuidStringToBytes(a0);
                break;
            case "object":
                if (a0.GetType && a0.GetType().FullName === "System.Guid") {
                    // Treat as another guid.
                    for (i = 0; i < 16; i++) {
                        this.Bytes.push(a0.Bytes[i]);
                    }
                } else {
                    // Get first 16 elements of array as bytes.
                    for (i = 0; i < 16; i++) {
                        this.Bytes.push(a0[i]);
                    }
                }
                break;
            default:
                break;
        }
    };
    this.InitializeClass.apply(this, arguments);
};
System.Type.RegisterClass("System.Guid");

System.Guid.Empty = new System.Guid("00000000-0000-0000-0000-000000000000");

System.Guid.NewGuid = function () {
    /// <summary>
    /// Initializes a new instance of the System.Guid class.
    /// </summary>
    /// <returns type="System.Guid">
    /// A new System.Guid object.
    /// </returns>
    // Create random guid.
    var bytes = [];
    for (var i = 0; i < 16; i++) {
        // Push random number [0-FF].
        var dec = Math.floor(Math.random() * 0xFF);
        bytes.push(dec);
    }
    var guid = new System.Guid(bytes);
    return guid;
};

//=============================================================================
// System.Math
//-----------------------------------------------------------------------------

System.Math = System.Math ? System.Math : {};

System.Math.ShiftRight = function (number, positions) {
    /// <summary>
    /// Shifts the values of the bits to the right (arithmetic shift '>>').
    /// </summary>
    /// <remarks>
    /// JavaScript can store whole numbers properly with 52 bit precision only.
    /// 0xFFFFFFFFFFFFF. Any numbers larger than that will be f**ked during
    /// conversions. For examle: 0xEFFFFFFFFFFFFF = 67553994410557439,
    /// but output of Document.Write(0xEFFFFFFFFFFFFF) will be 67553994410557440
    /// </remarks>
    var h = Math.pow(2, positions);
    var d = number & h - 1;
    var n = number - d;
    return n / h;
};

System.Math.ShiftLRight = function (number, positions) {
    /// <summary>
    /// Shifts the values of the bits to the right (logical shift '>>').
    /// </summary>
    /// <remarks>
    var h = Math.pow(2, positions);
    var d = number & h - 1;
    var n = number - d;
    return n / h;
};

System.Math.ShiftLeft = function (number, positions) {
    /// <summary>
    /// Shifts the values of the bits to the left (arithmetic shift '<<').
    /// </summary>
    return number * Math.pow(2, positions);
};

//=============================================================================
// Random
//-----------------------------------------------------------------------------

System.Random = function () {
    /// <summary>
    /// Initializes a new instance of the Random class, using a time-dependent default
    /// seed value.
    /// </summary>
    //---------------------------------------------------------
    this.Next = function (maxValue) {
        /// <summary>
        /// Returns a nonnegative random number less than the specified maximum.
        /// </summary>
        /// <param type="int" name="maxValue">
        /// The exclusive upper bound of the random number returned. maxValue must be
        /// greater than or equal to zero.
        /// </param>
        /// <returns>
        /// A 32-bit signed integer greater than or equal to zero, and less than maxValue;
        /// that is, the range of return values includes zero but not maxValue.
        /// </returns>
    };
    //---------------------------------------------------------
    this.Next = function (minValue, maxValue) {
        /// <summary>
        /// Returns a random number within a specified range.
        /// </summary>
        /// <param type="int" name="minValue">
        /// The inclusive lower bound of the random number returned.
        /// </param>
        /// <param type="int" name="maxValue">
        ///  The exclusive upper bound of the random number returned. maxValue must be
        ///  greater than or equal to minValue.
        /// </param>
        /// <returns>
        /// A 32-bit signed integer greater than or equal to minValue and less than maxValue;
        /// If minValue equals maxValue, minValue is returned.
        /// </returns>
        //---------------------
        // Math.random() Generates a number from 0 to slightly less than 1 (shown as <1).
        // This is perfectly random because each number will appear the same number of times.
        // Process arguments.
        switch (arguments.length) {
            case 0:
                maxValue = Math.pow(2, 31);
                minValue = 0;
                break;
            case 1:
                maxValue = arguments[0];
                minValue = 0;
                break;
            case 2:
                break;
            default:
                return 0;
        }
        var number = minValue;
        if (maxValue > minValue) {
            number = Math.floor(Math.random() * (maxValue - minValue)) + minValue;
        }
        return number;
    };
    //---------------------------------------------------------
    this.NextBytes = function (buffer) {
        /// <summary>
        /// Fills the elements of a specified array of bytes with random numbers.
        /// </summary>
        /// <param type="byte[]" name="buffer">
        /// An array of bytes to contain random numbers.
        /// </param>
        /// <returns>
        ///  An array of bytes to contain random numbers.
        /// </returns>
        /// <remarks>
        /// Each element of the array of bytes is set to a random number greater than or equal to zero, and less than or equal to 255 (hexadecimal 0xFF).
        /// </remarks>
        //---------------------
        var length = buffer.length;
        for (var i = 0; i < length; i++) {
            buffer[i] = this.Next(0, 256);
        }
        return buffer;
    };
    //---------------------------------------------------------
    this.InitializeClass = function () {
    };
    this.InitializeClass.apply(this, arguments);
};
System.Type.RegisterClass("System.Random");


//=============================================================================
// System.Char
//-----------------------------------------------------------------------------

System.Char = function () { };
System.Type.RegisterClass("System.Char");

//=============================================================================
// System.TimeSpan
//-----------------------------------------------------------------------------

// Examples:
//
// Add 84 milliseconds:
// var span = new System.TimeSpan(84);
//
// Add 5 hours, 7 minutes, 10 seconds, and 0 milliseconds:
// var span = new System.TimeSpan(5,7,10,0);
//
// var dateStart = new Date();
// ...run some process here...
// var dateEd = new Date();
// var span = new System.TimeSpan(dateEd.getTime() - dateStart.getTime());
//

System.TimeSpan = function () {
    /// <summary>
    /// 
    /// </summary>
    //---------------------------------------------------------
    // Public properties.:
    //---------------------------------------------------------
    // Same as total milliseconds.
    this.Ticks = 0;
    // Span Values.
    this.Milliseconds = 0;
    this.Seconds = 0;
    this.Minutes = 0;
    this.Hours = 0;
    this.Days = 0;
    // Total Values.
    this.TotalMilliseconds = 0;
    this.TotalSeconds = 0;
    this.TotalMinutes = 0;
    this.TotalHours = 0;
    this.TotalDays = 0;
    //---------------------------------------------------------
    // Private properties.:
    //---------------------------------------------------------
    var me = this;
    //---------------------------------------------------------
    // PRIVATE METHOD: addValues
    //---------------------------------------------------------
    function addValues() {
        //Trace.Write(arguments.length);
        var args = ["Days", "Hours", "Minutes", "Seconds", "Milliseconds"];
        var j = arguments.length;
        for (var i = 0; i < j; i++) {
            var step = args.length - arguments.length;
            //Trace.Write(args[step+i]+" = "+arguments[i]);
            this[args[step + i]] = arguments[i];
        }
        normalizeValues();
        updateTicksAndTotals();
    }
    //---------------------------------------------------------
    // PRIVATE METHOD: updateTotals
    //---------------------------------------------------------
    function normalizeValues() {
        var tmpVal = 0;
        var tmpAdd = 0;
        // Normalize milliseconds.
        tmpVal = me.Milliseconds % 1000;
        tmpAdd = (me.Milliseconds - tmpVal) / 1000;
        me.Milliseconds = tmpVal;
        me.Seconds += tmpAdd;
        // Normalize seconds.
        tmpVal = me.Seconds % 60;
        tmpAdd = (me.Seconds - tmpVal) / 60;
        me.Seconds = tmpVal;
        me.Minutes += tmpAdd;
        // Normalize Minutes.
        tmpVal = me.Minutes % 60;
        tmpAdd = (me.Minutes - tmpVal) / 60;
        me.Minutes = tmpVal;
        me.Hours += tmpAdd;
        // Normalize Hours.
        tmpVal = me.Hours % 24;
        tmpAdd = (me.Hours - tmpVal) / 24;
        me.Hours = tmpVal;
        me.Days += tmpAdd;
        //Trace.Write("Nms: "+me.Milliseconds);
        //Trace.Write("Nss: "+me.Seconds);
        //Trace.Write("Nmm: "+me.Minutes);
        //Trace.Write("Nhh: "+me.Hours);
        //Trace.Write("Ndd: "+me.Days);
    }
    //---------------------------------------------------------
    // PRIVATE METHOD: resetValues
    //---------------------------------------------------------
    function resetValues() {
        me.Ticks = 0;
        me.Milliseconds = 0;
        me.Seconds = 0;
        me.Minutes = 0;
        me.Hours = 0;
        me.Days = 0;
        me.TotalMilliseconds = 0;
        me.TotalSeconds = 0;
        me.TotalMinutes = 0;
        me.TotalHours = 0;
        me.TotalDays = 0;
    }
    //---------------------------------------------------------
    // PRIVATE METHOD: updateTotals
    //---------------------------------------------------------
    function updateTicksAndTotals() {
        var tmp = me.Days * 24; // Result: hours.
        tmp = (tmp + me.Hours) * 60; // Result: minutes.
        tmp = (tmp + me.Minutes) * 60; // Result: seconds.
        me.Ticks = (tmp + me.Seconds) * 1000 + me.Milliseconds; // Result: milliseconds.
        me.TotalMilliseconds = me.Ticks;
        me.TotalSeconds = me.TotalMilliseconds / 1000;
        me.TotalMinutes = me.TotalSeconds / 60;
        me.TotalHours = me.TotalMinutes / 60;
        me.TotalDays = me.TotalHours / 24;
        //Trace.Write("Tck: "+me.Ticks);
        //Trace.Write("Tms: "+me.TotalMilliseconds);
        //Trace.Write("Tss: "+me.TotalSeconds);
        //Trace.Write("Tmm: "+me.TotalMinutes);
        //Trace.Write("Thh: "+me.TotalHours);
        //Trace.Write("Tdd: "+me.TotalDays);
    }
    //---------------------------------------------------------
    // METHOD: Add
    //---------------------------------------------------------
    this.Add = function () {
        var span = arguments[0];
        //Trace.Write(typeof(arguments[0]));
        if (typeof arguments[0] === "number") {
            span = new System.TimeSpan.apply(this, arguments);
        }
        var ticks = this.Ticks + span.Ticks;
        var newSpan = new System.TimeSpan(ticks);
        return newSpan;
    };
    //---------------------------------------------------------
    // METHOD: Subtract
    //---------------------------------------------------------
    this.Subtract = function () {
        var span = arguments[0];
        if (typeof arguments[0] === "number") {
            span = new System.TimeSpan.apply(this, arguments);
        }
        var ticks = this.Ticks - span.Ticks;
        var newSpan = new System.TimeSpan(ticks);
        return newSpan;
    };
    //---------------------------------------------------------
    // METHOD: ToString
    //---------------------------------------------------------
    this.ToString = function (format) {
        var results = "";
        var sDays = format === "X" ? " days " : " ";
        var sHours = format === "X" ? " hours " : ":";
        var sMinutes = format === "X" ? " min " : ":";
        var sSeconds = format === "X" ? " sec" : "";
        if (this.TotalDays >= 1 || format === "F") results += this.Days + sDays;
        results += (this.Hours < 10 ? "0" : "") + this.Hours + sHours;
        results += (this.Minutes < 10 ? "0" : "") + this.Minutes + sMinutes;
        results += (this.Seconds < 10 ? "0" : "") + this.Seconds + sSeconds;
        if (format === "F") results += "." + this.Milliseconds;
        return results;
    };
    this.toString = this.ToString;
    //---------------------------------------------------------
    // INIT: Class
    //---------------------------------------------------------
    this.InitializeClass = function () {
        addValues.apply(this, arguments);
    };
    this.InitializeClass.apply(this, arguments);
};
System.Type.RegisterClass("System.TimeSpan");

System.TimeSpan.TicksPerMillisecond = 1;

//=============================================================================
// System.Buffer
//-----------------------------------------------------------------------------

System.Array = function () {
    //---------------------------------------------------------
    this.Initialize = function () {
    };
    this.Initialize.apply(this, arguments);
};
System.Type.RegisterClass("System.Array");

// Add static method.
System.Array.Reverse = function (array, index, length) {
    /// <summary>
    /// Reverses the sequence of the elements in a range of elements in the one-dimensional
    /// </summary>
    /// <param name="array">The one-dimensional System.Array to reverse.</param>
    /// <param name="index">The starting index of the section to reverse.</param>
    /// <param name="length">The number of elements in the section to reverse.</param>
    index = index ? index : 0;
    length = length ? length : array.length;
    // Make a copy of reversed block.
    var iArray = array.slice(index, index + length).reverse();
    for (var i = 0; i < length; i++) array[i + index] = iArray[i];
};

// Add static method.
System.Array._Copy1 = function (sourceArray, destinationArray, length) {
    /// <summary>
    /// Copy array
    /// </summary>
    for (var i = 0; i < length; i++) {
        destinationArray[i] = sourceArray[i];
    }
};

// Add static method.
System.Array._Copy2 = function (sourceArray, sourceIndex, destinationArray, destinationIndex, length) {
    /// <summary>
    /// Copy array
    /// </summary>
    for (var i = 0; i < length; i++) {
        destinationArray[destinationIndex + i] = sourceArray[sourceIndex + i];
    }
};

System.Array.Copy = function () {
    if (arguments.length === 3) System.Array._Copy1.apply(this, arguments);
    if (arguments.length === 5) System.Array._Copy2.apply(this, arguments);
};

System.Array.FillMultiDimensional = function (array, dimensions, value) {
    var x;
    if (dimensions.length > 0) {
        for (x = 0; x < array.length; x++) {
            var ar = new Array(dimensions[0]);
            var dims = dimensions.slice(1);
            System.Array.FillMultiDimensional(ar, dims, value);
            array[x] = ar;
        }
    } else {
        // if this array is placed at last level.
        for (x = 0; x < array.length; x++) {
            // set default value.
            array[x] = value;
        }
    }
    return array;
};

System.Array.GetMultiDimensional = function (dimensions, value) {
    /// <sumary>
    /// Get multi-dimensional array with default values.
    /// </summary>
    /// <param name="dimensions" type="int[]">List of dimension sizes.</param>
    /// <param name="value">Default value of array.</param>
    /// <example>
    /// Get 16x16 array filled with zeroes.
    /// var matrix = System.Array.GetMultiDimensional([16,16] ,0);
    /// </example>
    var array = new Array(dimensions[0]);
    return System.Array.FillMultiDimensional(array, dimensions.slice(1), value);
};
System.Array.Clear = function (array, index, length) {
    /// <sumary>
    /// Zeroize array.
    /// </summary>
    for (var i = 0; i < length; i++) array[i + index] = 0;
};


System.Array.SortComparer = function (index, direction) {
    var d = direction ? [-1, 1] : [1, -1];
    return function (a, b) {
        return a[index] === b[index]
            ? 0 : a[index] < b[index]
                ? d[0] : d[1];
    };
};

System.Array.Sort = function (array, index, direction) {
    /// <sumary>
    /// Sort array.
    /// </summary>
    /// <param name="array" type="Array">two-dimentional array or one-dimentional array of objects</param>
    /// <param name="index">Index or column name.</param>
    /// <param name="direction">Sort direction. True - ascending; False - descending.</param>
    direction = direction === false ? false : true;
    array.sort(System.Array.SortComparer(index, direction));
};

System.Array.Resize = function (array, newSize, defaultValue) {
    /// <sumary>Resize array.</summary>
    if (typeof defaultValue === "undefined")
        defaultValue = 0;
    while (newSize > array.length)
        array.push(defaultValue);
    array.length = newSize;
};

//=============================================================================
// System.Buffer
//-----------------------------------------------------------------------------

System.Buffer = function () {
    //---------------------------------------------------------
    this.Initialize = function () {
    };
    this.Initialize.apply(this, arguments);
};
System.Type.RegisterClass("System.Buffer");

// Add static method.
System.Buffer.BlockCopy = function (src, srcOffset, dst, dstOffset, count) {
    /// <summary>
    /// Copies a specified number of bytes from a source array starting at a particular
    /// offset to a destination array starting at a particular offset.
    /// </summary>
    /// <param name="src">The source buffer.</param>
    /// <param name="srcOffset">The byte offset into src.</param>
    /// <param name="dst">The destination buffer.</param>
    /// <param name="dstOffset">The byte offset into dst.</param>
    /// <param name="count">The number of bytes to copy.</param>
    for (var i = 0; i < count; i++) {
        dst[dstOffset + i] = src[srcOffset + i];
    }
};

//=============================================================================
// System.Byte[]
//-----------------------------------------------------------------------------

System.Byte = function () {
    /// <summary>
    /// Get array of bytes.
    /// </summary>
    /// <example>
    /// To get one-dimentional array:
    ///     var bytes = new System.Bytes(16);
    /// To get multi-dimentional array:
    ///     var x = 3; y = 5; z = 2; ...
    ///     var bytes = new System.Bytes(x, y, z, ...);
    /// To get value from multi-dimentional array:
    ///     var value = bytes[0][2][1];
    /// It's same as in C#
    /// </example>
    // Convert arguments to dimensions array.
    var dims = [];
    for (var i = 0; i < arguments.length; i++) {
        dims.push(arguments[i]);
    }
    // Return multi-dimensional array filled with zero.
    return System.Array.GetMultiDimensional(dims, 0);
};
System.Type.RegisterClass("System.Byte");

//=============================================================================
// System.Int32
//-----------------------------------------------------------------------------

System.Int32 = function (value) {
    /// <summary>
    /// 
    /// </summary>
    this.Int = 0;
    this.DefaultFormat = "";
    //---------------------------------------------------------
    // METHOD: ToString
    //---------------------------------------------------------
    this.ToString = function (format) {
        var converted = "";
        switch (format) {
            case "B":
                if (this.Int >= 1048576) {
                    converted = Math.round(this.Int / 1048576 * 10) / 10 + " MB";
                } else if (this.Int >= 1024) {
                    converted = Math.round(this.Int / 1024 * 10) / 10 + " KB";
                } else {
                    converted = new String(this.Int);
                }
                break;
            case "X2":
            case "X4":
            case "X6":
            case "X8":
                var hex = this.Int.toString(16);
                var len = parseInt(format.substr(1));
                var pfx = "00000000".substr(0, len);
                converted = pfx.substr(0, len - hex.length) + hex;
                break;
            default:
                converted = new String(this.Int);
                break;
        }
        return converted;
    };
    //---------------------------------------------------------
    // INIT: Class
    //---------------------------------------------------------
    this.InitializeClass = function () {
        this.Int = parseInt(value);
        this.DefaultFormat = "";
    };
    this.InitializeClass();
};
System.Type.RegisterClass("System.Int32");

//=============================================================================
// System.UInt32
//-----------------------------------------------------------------------------

// Unsigned 32-bit integer: 0 to 4,294,967,295 [0x00000000 - 0xFFFFFFFF]
System.UInt32 = System.Byte;
System.Int16 = System.Byte;
System.UInt16 = System.Byte;

//=============================================================================
// System.DateTime
//-----------------------------------------------------------------------------

//System.DateTime.ExpressionISO = new RegExp("([1-9][1-9][1-9][1-9])-([1-9][0-9])-([0-9][0-9])T([0-9][0-9]):([0-9][0-9]):([0-9][0-9]):([0-9][0-9]).*");

System.DateTime = function (year, month, day, hour, minute, second, millisecond) {
    /// <summary>
    /// System.DateTime class. Some methods will be applied to JavaScript Date object.
    /// </summary>
    //	this.DefaultFormat = "";
    //	this.Date = new Date;
    //	//---------------------------------------------------------
    //	this.addZero = function (number) {
    //		/// <summary>
    //		/// Add leading zero to number in forder to format date properly.
    //		/// </summary>
    //		return (number < 10) ? '0' + number : number;
    //	}
    //	//---------------------------------------------------------
    //	this.ToString = function (format) {
    //		// This function will be created by runing
    //		// System.Extensions.Apply() at the end of this script file.
    //	}
    //	//---------------------------------------------------------
    //	this.InitializeClass = function () {
    //		this.DefaultFormat = "YYYY-MM-DD HH:NN:SS";
    //		this.Date = date ? date : new Date;
    //	}
    //	this.InitializeClass();
    year = year === null ? 0 : year;
    month = month === null ? 1 : month;
    day = day === null ? 1 : day;
    hour = hour === null ? 0 : hour;
    minute = minute === null ? 0 : minute;
    second = second === null ? 0 : second;
    millisecond = millisecond === null ? 0 : millisecond;
    var d = new Date(year, month - 1, day, hour, minute, second, millisecond);
    return d;
};
System.Type.RegisterClass("System.DateTime");

// Create public static method System.DateTime.Now.ToString();

System.DateTime.Now = function () {
    /// <summary>
    /// Gets a DateTime object that is set to the current date and time on this computer,
    /// expressed as the local time.
    /// </summary>
    return new Date();
};

System.DateTime.UtcNow = function () {
    /// <summary>
    /// Gets a DateTime object that is set to the current date and time on this computer,
    /// expressed as the Coordinated Universal Time (UTC).
    /// </summary>
    var now = new Date();
    var utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
    return utc;
};

System.DateTime.ToUniversalTime = function () {
    /// <summary>
    /// Gets a DateTime object that is set to the current date and time on this computer,
    /// expressed as the Coordinated Universal Time (UTC).
    /// </summary>
    /// <remarks>
    /// There is no native support for most of DateTime localization methods in JavaScript (like DateTimeKind enum in C#).
    /// This means that "System.DateTime.UtcNow.ToUniversalTime" will produce different results in C# and JavaScript.
    /// </remarks>
    var d = this;
    var utc = new Date(d.getTime() + d.getTimezoneOffset() * 60000);
    return utc;
};

//System.DateTime._minDate = -8640000000000000;
System.DateTime._jsZero = 62135596800000;

/// <summary>
/// DateTime regular expressions.
/// </summary>
System.DateTime.Expressions = {
    Default: new RegExp("(0[1-9]|1[012])/(0[1-9]|[12][0-9]|3[01])/([0-9][0-9])"),
    UtcDate: new RegExp("([0-9][0-9][0-9][0-9])-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])"),
    UtcTime: new RegExp("([01][0-9]|[2][0123]):([012345][0-9]):([012345][0-9])"),
    UtcMs: new RegExp("\.([0-9]+)"),
    Zone: new RegExp("([+-])([01][0-9]|[2][0123]):([012345][0-9])"),
    Utc: new RegExp("([0-9][0-9][0-9][0-9])-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])" + "[T ]" + "([01][0-9]|[2][0123]):([012345][0-9]):([012345][0-9])")
};

// Outdated: must be updated.
System.DateTime.Expression = new RegExp("(0[1-9]|1[012])/(0[1-9]|[12][0-9]|3[01])/([0-9][0-9])");
System.DateTime.ExpressionUtcDate = new RegExp("([0-9][0-9][0-9][0-9])-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])");
System.DateTime.ExpressionUtcTime = new RegExp("([01][0-9]|[2][0123]):([012345][0-9]):([012345][0-9])");
System.DateTime.ExpressionUtcMs = new RegExp("\.([0-9]+)");
System.DateTime.ExpressionZone = new RegExp("([+-])([01][0-9]|[2][0123]):([012345][0-9])");
System.DateTime.ExpressionUtc = new RegExp(System.DateTime.ExpressionUtcDate.toString() + "[T ]" + System.DateTime.ExpressionUtcTime.toString());

System.DateTime.Subtract = function (value) {
    /// <summary>
    /// Subtract date.
    /// </summary>
    /// <returns type="System.TimeSpan" />
    //var span = arguments[0];
    //if (typeof (arguments[0]) == "number") {
    //	span = new System.TimeSpan.apply(this, arguments);
    //}
    //var ticks = this.Ticks - span.Ticks;
    //var newSpan = new System.TimeSpan(ticks);
    //return newSpan;
    var diff = this.getTime() - value.getTime() + System.DateTime._jsZero;
    return diff;
};

System.DateTime.Ticks = function () {
    var d = this;
    var diff = Date.UTC(
        d.getFullYear(),
        d.getMonth(),
        d.getDate(),
        d.getHours(),
        d.getMinutes(),
        d.getSeconds(),
        d.getMilliseconds()
    ) + System.DateTime._jsZero;
    return diff;
};

System.DateTime.SubtractDays = function (days, round) {
    /// <summary>
    /// 
    /// </summary>
    date = this;
    var newDate = new Date(date - new System.TimeSpan(days, 0, 0, 0, 0).Ticks);
    // crop hours, minutes seconds.
    var nDate = newDate;
    if (round) {
        nDate = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate());
    }
    return nDate;
};

System.DateTime.SubtractMonths = function (months, round) {
    /// <summary>
    /// 
    /// </summary>
    date = this;
    var totalMonths = date.getFullYear() * 12 + date.getMonth();
    totalMonths = totalMonths - months;
    var newYear = Math.floor(totalMonths / 12);
    var newMonth = totalMonths - newYear * 12;
    date.setFullYear(newYear);
    date.setMonth(newMonth);
    var newDate = date;
    // Crop hours, minutes seconds.
    if (round) {
        newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }
    return newDate;
};

System.DateTime.GetFromString = function (dateString, ignoreTimeZoneAndParseAsUtc) {
    /// <summary>
    /// 
    /// </summary>
    date = this;
    // extract variable;
    var yyyy = 0;
    var MM = 0;
    var dd = 0;
    var dateMatch = dateString.match(System.DateTime.ExpressionUtcDate);
    if (dateMatch) {
        yyyy = dateMatch[0].replace(System.DateTime.ExpressionUtcDate, "$1");
        MM = dateMatch[0].replace(System.DateTime.ExpressionUtcDate, "$2");
        dd = dateMatch[0].replace(System.DateTime.ExpressionUtcDate, "$3");
    }
    var hh = 0;
    var mm = 0;
    var ss = 0;
    var timeMatch = dateString.match(System.DateTime.ExpressionUtcTime);
    if (timeMatch) {
        hh = timeMatch[0].replace(System.DateTime.ExpressionUtcTime, "$1");
        mm = timeMatch[0].replace(System.DateTime.ExpressionUtcTime, "$2");
        ss = timeMatch[0].replace(System.DateTime.ExpressionUtcTime, "$3");
    }
    var fff = 0;
    var msMatch = dateString.match(System.DateTime.ExpressionUtcMs);
    if (msMatch) {
        fff = msMatch[0].replace(System.DateTime.ExpressionUtcMs, "$1");
        fff = parseFloat("0." + fff);
        fff = parseInt(fff * 1000);
    }
    var znMatch = dateString.match(System.DateTime.ExpressionZone);
    var zn = 0;
    var zh = 0;
    var zm = 0;
    if (znMatch) {
        zn = parseInt(parseFloat(znMatch[0].replace(System.DateTime.ExpressionZone, "$1") + "1"));
        zh = parseInt(parseFloat(znMatch[0].replace(System.DateTime.ExpressionZone, "$2")) * zn);
        zm = parseInt(parseFloat(znMatch[0].replace(System.DateTime.ExpressionZone, "$3")) * zn);
    }
    if (ignoreTimeZoneAndParseAsUtc) {
        date.setUTCFullYear(yyyy, MM - 1, dd);
        date.setUTCHours(hh, mm, ss, fff);
    } else {
        // Check for marks which are same as "+00:00".
        var zeroZone = false;
        zeroZone = zeroZone || dateString.indexOf("GMT") > -1;
        zeroZone = zeroZone || dateString.indexOf("Z") > -1;
        // If timezone was not specified then treat string as local time.
        // This is default behaviour on all platforms.
        if (zn === 0 && !zeroZone) {
            date.setFullYear(yyyy, MM - 1, dd);
            date.setHours(hh, mm, ss, fff);
        } else {
            // Time zone was specified so we can use time zone.
            date.setUTCFullYear(yyyy, MM - 1, dd);
            date.setUTCHours(hh, mm, ss, fff);
            // This date contains time zone.
            date = new Date(date.getTime() - (zh * 60 + zm) * 60 * 1000);
        }
    }
    //alert(zn+":"+zh+":"+zm);
    return date;
};

System.DateTime.GetFromUtcString = function (dateString) {
    /// <summary>
    /// Gets Date from UTC string
    /// </summary>
    date = this;
    date.GetFromString(dateString, true);
    return date;
};


System.DateTime.ToString = function (format) {
    /// <summary>
    /// Converts the value of this instance to its equivalent string representation
    /// using the specified format.
    /// </summary>
    /// <param name="format" type="String">A format string.</param>
    /// <returns>A string representation of value of this instance as specified by format.</returns>
};

System.DateTime.ToString = function (dateTime, format) {
    /// <summary>
    /// Converts DateTime to its equivalent string representation
    /// using the specified format.
    /// </summary>
    /// <param name="dateTime" type="DateTime">DateTime.</param>
    /// <param name="format" type="String">A format string.</param>
    /// <returns>A string representation of value of this instance as specified by format.</returns>
    //---------------------------------------------------------
    // INIT: Arguments
    //---------------------------------------------------------
    var date;
    switch (arguments.length) {
        case 0:
            date = this;
            format = date.DefaultFormat;
            break;
        case 1:
            date = this;
            format = arguments[0];
            break;
        case 2:
            date = arguments[0];
            format = arguments[1];
            break;
        default:
            return "";
    }
    //---------------------------------------------------------
    //ms-help://MS.VSCC.v80/MS.MSDN.v80/MS.VisualStudio.v80.en/dv_fxfund/html/98b374e3-0cc2-4c78-ab44-efb671d71984.htm
    date.addZero = function (number) { return number < 10 ? '0' + number : number; };
    // www is provided for old compatibility. Use 'dddd' and 'ddd' instead.
    var wwwArray = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
    var dddArray = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
    var ddddArray = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thuesday", "Friday", "Saturday");
    var MMMArray = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
    if (format === null) { format = date.DefaultFormat; }
    // "X" format is used to store DateTome values inside XML files of DataSet.
    if (format === "Outlook") {
        var now = new Date();
        if (date.getFullYear() === now.getFullYear()
            && date.getMonth() === now.getMonth()
            && date.getDate() === now.getDate()) {
            results = "ddd HH:mm";
        } else {
            format = "yyyy-MM-dd HH:mm";
        }
    }
    if (format === "X") { format = "yyyy-MM-ddTHH:mm:ss.fffzzz"; }
    // Generate values from Date.
    var fff = date.getMilliseconds();
    var yyyy = date.getFullYear();
    var yy = new String(date.addZero(yyyy));
    yy = yy.substr(yy.length - 2, 2);
    var www = wwwArray[date.getDay()]; // Outdated!!!
    var dddd = ddddArray[date.getDay()];
    var ddd = dddArray[date.getDay()];
    var dd = date.addZero(date.getDate());
    var MMM = MMMArray[date.getMonth()];
    var MM = date.addZero(date.getMonth() + 1);
    var hAmPm = date.getHours() % 12;
    if (hAmPm === 0) hAmPm = 12;
    var hh = date.addZero(hAmPm); // 12 format
    var HH = date.addZero(date.getHours()); // 24 format
    var mm = date.addZero(date.getMinutes());
    var ss = date.addZero(date.getSeconds());
    var tt = date.getHours() < 12 ? "AM" : "PM";
    var zzz = date.addZero(date.getTimezoneOffset());
    var offset = date.getTimezoneOffset();
    var negative = offset < 0;
    if (negative) offset = offset * -1;
    zzz = date.addZero(Math.floor(offset / 60)) + ":" + date.addZero(offset % 60);
    if (negative || offset === 0) {
        zzz = "+" + zzz;
    } else {
        zzz = "-" + zzz;
    }
    // Apply format.
    var strDate = new String(format);
    strDate = strDate.replace("yyyy", yyyy);
    strDate = strDate.replace("yy", yy);
    strDate = strDate.replace("www", www);
    strDate = strDate.replace(new RegExp("[d]{4-10}", "g"), dddd);
    strDate = strDate.replace(new RegExp("[d]{3}", "g"), ddd);
    strDate = strDate.replace("dd", dd);
    strDate = strDate.replace("MMM", MMM);
    strDate = strDate.replace("MM", MM);
    strDate = strDate.replace("ss", ss);
    strDate = strDate.replace("hh", hh);
    strDate = strDate.replace("HH", HH);
    strDate = strDate.replace("mm", mm);
    strDate = strDate.replace("ss", ss);
    strDate = strDate.replace("tt", tt);
    strDate = strDate.replace("ffffff", (fff + "000000").substr(0, 6));
    strDate = strDate.replace("fff", (fff + "000").substr(0, 3));
    strDate = strDate.replace("zzz", zzz);
    return strDate;
};

System.DateTime.ToUtcString = function (format) {
    /// <summary>
    /// Converts LocalTime to UTC String.
    /// </summary>
    /// <returns type="String" />
    var offset = this.getTime() + this.getTimezoneOffset() * 60000;
    var ss = new Date(offset);
    return ss.toString(format);
};

System.DateTime.ToDifferenceString = function (dateOld, dateNew) {
    /// <summary>
    /// 
    /// </summary>
    /// <returns type="String" />
    this.addZero = function (number) { return number < 10 ? '0' + number : number; };
    dateNew = dateNew ? dateNew : new Date();
    var ms = dateNew.getTime() - dateOld.getTime();
    var nd = new Date(ms);
    var ph = nd.getHours();
    var pm = nd.getMinutes();
    var ps = nd.getSeconds();
    var msPassed = 1000 * (60 * (60 * ph + pm) + ps) + nd.getMilliseconds();
    var d = (nd.getTime() - msPassed) / 24 / 60 / 60 / 1000;
    var results = Math.round(d) + "d " + ph + "h " + pm + "m"; //+":"+this.addZero(ps);
    //	var ds = new String(d);
    //	if (d > 0){
    //		if (ds.substr(ds.length-1,ds.length) == "1"){
    //			 results = d+"d "+results;
    //		}else{
    //			 results = d+"d "+results;
    //		}
    //	}
    return results;
};

System.DateTime.GetDayType = function (d, trimResults) {
    d = d ? d : new Date();
    var results = "";
    //if (d.getMonth() === 8 && d.getDate() === 21) results = "New Year";
    if (d.getMonth() === 9 && d.getDate() === 31) results = "Halloween";
    if (d.getMonth() === 11 && d.getDate() === 31) results = "New Year";
    if (trimResults) {
        results = results.replace(" ", "");
    }
    return results;
};

//-------------------------------------------------------------
// Check DateTime
//-------------------------------------------------------------

System.DateTime.Separator = "/";
System.DateTime.YearMin = 1900;
System.DateTime.YearMax = 2100;
System.DateTime.DateFormat = "dd/mm/yyyy";
System.DateTime.Expression = new RegExp("(0[1-9]|1[012])/(0[1-9]|[12][0-9]|3[01])/([0-9][0-9])");

System.DateTime.StripCharsInBag = function (s, bag) {
    /// <summary>
    /// 
    /// </summary>
    var returnString = "";
    // Search through string's characters one by one.
    // If character is not in bag, append to returnString.
    for (var i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        if (bag.indexOf(c) === -1) returnString += c;
    }
    return returnString;
};

System.DateTime.DaysInFebruary = function (valYear) {
    /// <summary>
    /// 
    /// </summary>
    // February has 29 days in any year evenly divisible by four,
    // EXCEPT for centurial years which are not also divisible by 400.
    return valYear % 4 === 0 && (!(valYear % 100 === 0) || valYear % 400 === 0) ? 29 : 28;
};

System.DateTime.DaysArray = function (valYear) {
    /// <summary>
    /// 
    /// </summary>
    var arrDays = new Array;
    for (var i = 1; i <= 12; i++) {
        arrDays[i] = 31;
        if (i === 4 || i === 6 || i === 9 || i === 11) { arrDays[i] = 30; }
    }
    // Set February days.
    arrDays[2] = System.DateTime.DaysInFebruary(valYear);
    return arrDays;
};

System.DateTime.IsDate = function (valDate) {
    /// <summary>
    /// 
    /// </summary>
    /// <returns type="bool" />
    var dateString = new String(valDate);
    results = "";
    // Get Day, Month, Year;
    if (!System.DateTime.Expression.test(dateString)) return "Invalid! <span style=\"color: gray;\">Format: mm/dd/yyyy</span>";
    // Date looks OK so continue to check.
    var MM = parseInt(dateString.replace(System.DateTime.Expression, "$1"), 10);
    var DD = parseInt(dateString.replace(System.DateTime.Expression, "$2"), 10);
    var YY = parseInt(dateString.replace(System.DateTime.Expression, "$3"), 10);
    //alert(DD+"/"+MM+"/"+YY);
    if (YY >= 0 && YY <= 50) YY += 2000;
    if (YY > 50 && YY <= 99) YY += 1900;
    var DaysInMonth = System.DateTime.DaysArray(YY)[MM];
    //alert(DD+"/"+MM+"/"+YY+" - "+DaysInMonth);
    if (MM < 1 || MM > 12) return "Invalid Month";
    if (DD > DaysInMonth) return "Invalid Day";
    if (YY < System.DateTime.YearMin || YY > System.DateTime.YearMax) return "Invalid Year";
    return results;
};

//-------------------------------------------------------------
// Extend JavaScript Date object.
//-------------------------------------------------------------

Date.prototype.GetFromString = System.DateTime.GetFromString;
Date.prototype.GetFromUtcString = System.DateTime.GetFromUtcString;
Date.prototype.DefaultFormat = "yyyy-MM-dd HH:mm:ss";
Date.prototype.ToString = System.DateTime.ToString;

//=============================================================================
// System.Web.UI.Console
//-----------------------------------------------------------------------------

System.Type.RegisterNamespace("System.Web.UI");

System.Web.IsIE = function () {
    var ua = window.navigator.userAgent;
    return ua.indexOf('MSIE ') > 0 || // IE
        ua.indexOf('Trident/') > 0 || // IE11
        ua.indexOf('Edge/') > 0; // IE12+
};

System.Web.UI.Console = function (id, context) {
    /// <summary
    /// Provides command line interface web control. You can use this class to create chat, trace, shell or other window.
    /// </summary>
    //---------------------------------------------------------
    // Public properties.
    this.IsEnabled = new Boolean;
    this.IsServerSide = new Boolean;
    this.IsInterfaceReady = false;
    // Write to output.
    this.CurrentLevel = 0;
    this.Node;
    this.TableNode;
    this.FrameNode;
    this.ControlNode;
    this.LogDoc = null;
    this.LogDiv = null;
    this.UncommittedNodes = new Array;
    this.CssPrefix = "SWUI_Console";
    this.Id;
    // Declare Style.
    this.IdentSize = unescape("%A0%A0%A0%A0");
    this.CurrentIdent = "";
    this.LogStyle = {};
    this.LogStyle2 = {};
    this.TimeStamp = "yyyy-MM-dd HH:mm:ss";
    this.Context = null;
    this.Style = "";
    this.AutoScroll = true;
    // Command line interface control.
    this.CmdLine;
    // TraceLevelSwitch controls general messages. In order to 
    // receive general trace messages change the value to the 
    // appropriate level:
    //   0 (Off)     - No messages.
    //   1 (Error)   - Only Error messages.
    //   2 (Warning) - Same as 1 + Warning messages.
    //   3 (Info)    - Same as 2 + Informational messages.
    //   4 (Verbose) - Same as 3 + Verbose messages.
    this.TraceLevelSwitch = 4;
    //---------------------------------------------------------
    // Private properties.
    var me = this;
    var intLevel = 0;
    //---------------------------------------------------------
    // Occurs when an application writes to its redirected StandardOutput
    // stream.
    //this.InputDataReceived;
    //this.OutputDataReceived;
    //---------------------------------------------------------
    function createLogStyle() {
        this.LogStyle["onevent"] = { F: "'([oO]n)([a-zA-Z]+)'", R: "<span style=\"color: #800000;\">'$1$2'</span>", O: "g" };
        this.LogStyle["on"] = { F: "^(on )(.*)", R: "<span style=\"color: #808080;\">on </span>$2", O: "i" };
        this.LogStyle["true"] = { F: "(true)", R: "<span style=\"color: #0000E0;\">$1</span>", O: "ig" };
        this.LogStyle["false"] = { F: "(false)", R: "<span style=\"color: #0000E0;\">$1</span>", O: "ig" };
        this.LogStyle["set"] = { F: "^(set )(.*)", R: "<span style=\"color: #707000;\">set </span>$2", O: "i" };
        this.LogStyle["get"] = { F: "^(get )(.*)", R: "<span style=\"color: #707000;\">get </span>$2", O: "i" };
        this.LogStyle["call"] = { F: "^(call )(.*)", R: "<span style=\"color: #0000FF;\">call</span> $2", O: "i" };
        this.LogStyle["warning"] = { F: "^(warning)(.*)", R: "<span style=\"color: #b8860b;\">Warning</span>$2", O: "i" };
        this.LogStyle["error"] = { F: "^(error)(.*)", R: "<span style=\"color: #ff0000;\">Error</span>$2", O: "i" };
        this.LogStyle["exec"] = { F: "^(exec)(.*)", R: "<span style=\"color: #cc0099;\">exec</span>$2", O: "i" };
        this.LogStyle["info"] = { F: "^(info.*)", R: "<span style=\"color: #c0c000;\">$1</span>", O: "i" };
        this.LogStyle["comment1"] = { F: "([^:])//(.*)$", R: "$1<span style=\"color: #008000\">//$2</span>", O: "g" };
        this.LogStyle["comment2"] = { F: "^//(.*)$", R: "<span style=\"color: #008000\">//$1</span>", O: "g" };
        this.LogStyle2["date"] = { F: "#date#", R: me.returnDate, O: "i" };
        this.LogStyle2["ident"] = { F: "#ident#", R: me.returnIdent, O: "i" };
        // Create regular expressions.
        var property;
        for (property in this.LogStyle) {
            this.LogStyle[property].Fx = new RegExp(this.LogStyle[property].F, this.LogStyle[property].O);
        }
        for (property in this.LogStyle2) {
            this.LogStyle2[property].Fx = new RegExp(this.LogStyle2[property].F, this.LogStyle2[property].O);
        }
    }
    //---------------------------------------------------------
    this.SetStyle = function (name) {
        if (this.Style === "Matrix" && typeof name === "undefined") {
            this.Style = "Matrix";
        } else {
            this.Style = new String(name);
        }
        this.returnIdent = function () { return me.CurrentIdent; };
        this.returnDate = function () { return "<span style=\"color: #A0A0A0;\">" + new Date().ToString(me.TimeStamp) + ": </span>"; };
        this.Font = "";
        createLogStyle.call(this);
        // Switch styles.
        if (this.Style === "Matrix") {
            this.TimeStamp = "dd:HH:mm:ss";
        } else {
            this.TimeStamp = "yyyy-MM-dd HH:mm:ss";
        }
        var prefix = this.CssPrefix + (name ? "_" + name : "");
        this.StyleMessage = "white-space: nowrap; text-align: left;";
        if (this.Node) {
            this.Node.className = prefix;
            this.HeadNode.className = prefix + "_Head";
            this.HeadContentNode.className = prefix + "_HeadContent";
            this.BodyNode.className = prefix + "_Body";
            this.BodyContentNode.className = prefix + "_BodyContent";
            this.FootNode.className = prefix + "_Foot";
            this.FootContentNode.className = prefix + "_FootContent";
        }
        if (this.IsServerSide) this.StyleMessage += "font-size: 8pt; font-family: Verdana;";
    };
    //---------------------------------------------------------
    this.LevelUpdate = function (level) {
        // If level was not submited then...
        if (level === null) {
            // Do nothing (keep current level).
        } else {
            // Check level.
            if (level === 0) {
                // Reset levels.
                this.CurrentLevel = 0;
            } else {
                if (level > 1) level = 1;
                if (level < -1) level = -1;
                // Change level.
                this.CurrentLevel = this.CurrentLevel + level;
            }
        }
        me.CurrentIdent = "";
        for (var i = 0; i < this.CurrentLevel; i++) {
            me.CurrentIdent += this.IdentSize;
        }
    };
    //---------------------------------------------------------
    var layoutControl;
    function layoutControl_ShortCutAction(sender, e) {
        var allowDefaultBrowserAction = null;
        if (e.EventName === "OnKeyDown") {
            // We can customize special actions for our keys.
            switch (e.KeyName) {
                //case "CTRL+T": alert("CTRL+T was pressed!"); break;                        
                //case "CTRL+S": alert("CTRL+S was pressed!"); break;                        
                //case "RETURN": allowDefaultBrowserAction = false; break;                        
                default:
            }
        }
        return allowDefaultBrowserAction;
    }
    //---------------------------------------------------------
    function CommandLineTextBox_Command(sender, e) {
        sender.Parent.Write("guest$ " + e.Command);
        var lcmd = e.Command.toLowerCase();
        switch (lcmd) {
            case "/console cls":
                me.Clear();
                break;
            case "/console help":
                sender.Parent.Write("CLS - Clears the screen.");
                break;
            default:
                if (lcmd.indexOf("/console kbd ") > -1) {
                    var layoutName = e.Command.substr(13);
                    me.ChangeLayout(layoutName);
                } else if (lcmd.indexOf("/console style ") > -1) {
                    var styleName = e.Command.substr(15);
                    me.SetStyle(styleName);
                } else {
                    sender.Parent.Write("'" + e.Command + "' is not recognized as an internal or external command,");
                    sender.Parent.Write("operable program or batch file.");
                }
                break;
        }
    }
    //---------------------------------------------------------
    this.ChangeLayout = function (layoutName) {
        if (!System.Type.Class.Exists("System.Web.UI.ShortKeys.KeysManager")) {
            // Can't change layout because 'System.Web.UI.ShortKeys.KeysManager' class doesn't exist.
        } else {
            // Disable Previous Layout.
            if (layoutControl) {
                // Dispose Previous Layout
                layoutControl.Dispose();
            }
            layoutControl = new System.Web.UI.ShortKeys.KeysManager("LayoutControl", this.CmdLine.LineNode);
            if (layoutName !== "") {
                if (!System.Type.Class.Exists("System.Globalization.KeyboardLayouts.Layout")) {
                    // Can't change layout because 'System.Globalization.KeyboardLayouts.Layout' class doesn't exist.
                } else {
                    layoutControl.KeyboardLayout = new System.Globalization.KeyboardLayouts.Layout(layoutName);
                }
            }
            // Prevent browser keys "New Tab" and "Save".
            layoutControl.PreventKeys(["CTRL+T", "CTRL+S"]);
            // Allow "Save" again.
            layoutControl.AllowKeys(["CTRL+S"]);
            // a
            layoutControl.OnShortCutAction = layoutControl_ShortCutAction;
        }
    };
    //---------------------------------------------------------
    this.Clear = function () {
        this.BodyContentNode.innerHTML = "";
    };
    //---------------------------------------------------------
    this.CreateInterface = function () {
        if (!this.FrameNode) {
            this.Node = this.Context.getElementById(this.Id);
            var bodyExist = this.Context.getElementsByTagName("body").length > 0;
            if (bodyExist) {
                if (!this.Node) {
                    this.Node = this.Context.createElement("div");
                    this.Node.id = this.Id;
                    this.HeadNode = this.Context.createElement("div");
                    this.HeadContentNode = this.Context.createElement("div");
                    this.HeadContentNode.innerHTML = "Trace Log";
                    this.BodyNode = this.Context.createElement("div");
                    this.BodyContentNode = this.Context.createElement("div");
                    this.FootNode = this.Context.createElement("div");
                    this.FootContentNode = this.Context.createElement("div");
                    this.Node.appendChild(this.HeadNode);
                    this.Node.appendChild(this.BodyNode);
                    this.Node.appendChild(this.FootNode);
                    this.HeadNode.appendChild(this.HeadContentNode);
                    this.BodyNode.appendChild(this.BodyContentNode);
                    this.FootNode.appendChild(this.FootContentNode);
                    if (!System.Type.Class.Exists("System.Web.UI.HtmlControls.TextBox.CommandLine")) {
                        // Can't create command line because 'System.Web.UI.HtmlControls.TextBox.CommandLine' class doesn't exist.
                        this.CmdLine = this.Context.createElement("div");
                        this.CmdLine.innerHTML = "[Clear]";
                        this.CmdLine.style.cursor = "pointer";
                        this.CmdLine.onclick = function () { me.Clear(); };
                        this.FootContentNode.appendChild(this.CmdLine);
                    } else {
                        // Create command line.
                        var cmdTextBox = this.Context.createElement("input");
                        cmdTextBox.id = this.Id + "CommandLine";
                        this.FootContentNode.appendChild(cmdTextBox);
                        this.CmdLine = new System.Web.UI.HtmlControls.TextBox.CommandLine(cmdTextBox, this.Context);
                        this.CmdLine.Parent = this;
                        this.CmdLine.Command = CommandLineTextBox_Command;
                    }
                    this.ChangeLayout("Lithuanian (UK)");
                    this.SetStyle();
                    this.IsInterfaceReady = true;
                    this.Write("Info: --- Document Body Initialized ---");
                }
            }
        }
    };
    //---------------------------------------------------------
    this.GetHtml = function (message, level, addTimeAndIdent) {
        // If level = 2 then increase level now.
        if (level === 2 || level === -2) this.LevelUpdate(level);
        // Start to create message.
        var strMessage = new String(message);
        var property;
        // Replace some special words.
        var regex;
        var repto;
        for (property in this.LogStyle) {
            regex = this.LogStyle[property].Fx;
            repto = this.LogStyle[property].R;
            strMessage = strMessage.replace(regex, repto);
        }
        var dateTime = "#date##ident#";
        for (property in this.LogStyle2) {
            regex = this.LogStyle2[property].Fx;
            repto = this.LogStyle2[property].R;
            dateTime = dateTime.replace(regex, repto);
        }
        if (addTimeAndIdent !== false) strMessage = dateTime + strMessage;
        // If level = 1 then increase level later
        if (level === 1 || level === -1) this.LevelUpdate(level);
        return strMessage;
    };
    //---------------------------------------------------------
    this.TraceError = function (message) {
        if (this.TraceLevelSwitch > 0) this.Write(message);
    };
    //---------------------------------------------------------
    this.TraceWarning = function (message) {
        if (this.TraceLevelSwitch > 1) this.Write(message);
    };
    //---------------------------------------------------------
    this.TraceInformation = function (message) {
        if (this.TraceLevelSwitch > 2) this.Write(message);
    };
    //---------------------------------------------------------
    function appendTextNode(htmlText) {
        var textNode = this.Context.createElement("div");
        textNode.styleText = this.StyleMessage;
        textNode.innerHTML = htmlText;
        var d = me.BodyContentNode;
        var distanceFromBottom = d.scrollHeight - d.scrollTop - d.clientHeight;
        this.BodyContentNode.appendChild(textNode);
        if (this.AutoScroll) try {
            // If scroolbar at the bottom then scroll to bottom.
            if (distanceFromBottom <= 0) {
                this.ScrollDown(true);
            }
        } catch (ex) {
            // Ignore
        }
    }
    //---------------------------------------------------------
    function initializeTraceLog() {
        var bodyExist = this.Context.getElementsByTagName("body").length > 0;
        if (bodyExist) {
            var traceLog = this.Context.getElementById("TraceLog");
            // If placeholder exist but frame doesn't then...
            if (traceLog) {
                var traceFrame = this.Context.getElementById("SystemTraceLogFrame");
                if (!traceFrame) {
                    this.Id = "SystemTraceLog";
                    this.CreateInterface();
                    var pn = traceLog.parentNode;
                    var div = this.Context.createElement("div");
                    div.id = "TraceLog";
                    div.style.cssText = traceLog.style.cssText;
                    div.appendChild(this.Node);
                    pn.replaceChild(div, traceLog);
                }
            }
        }
    }
    //---------------------------------------------------------
    this.Write = function (message, level, forceWrite, addTimeAndIdent) {
        //Trace.Write("on "+this.Id+".Write('"+message+"', '"+level+"', '"+forceWrite+"', '"+addTimeAndIdent+"')");
        if (this.TraceLevelSwitch > 3) {
            var finalText = "";
            if (this.IsEnabled || forceWrite === true) {
                finalText = this.GetHtml(message, level, addTimeAndIdent);
                // Write trace text to output.
                if (this.IsServerSide) {
                    finalText = "<div style=\"" + this.StyleMessage + "\">" + finalText + "</div>\r\n";
                    Response.Write(finalText);
                    if (Response.Buffer === true) Response.Flush();
                } else {
                    // We need to insert trace log interface if this is TraceLog.
                    if (this.Id === "TraceLog") initializeTraceLog.call(this);
                    if (this.IsInterfaceReady) {
                        if (this.UncommittedNodes.length > 0) {
                            for (var i = 0; i < this.UncommittedNodes.length; i++) {
                                appendTextNode.call(this, this.UncommittedNodes[i]);
                            }
                            // Reset uncommitted array.
                            this.UncommittedNodes = [];
                        }
                        appendTextNode.call(this, finalText);
                    } else {
                        this.UncommittedNodes.push(finalText);
                    }
                }
            }
            return finalText;
        }
    };
    //---------------------------------------------------------
    this.ScrollDown = function (force) {
        if (force) {
            this.BodyNode.scrollTop += this.BodyNode.scrollHeight - this.BodyNode.scrollTop;
        } else {
            var d = me.BodyContentNode;
            var distanceFromBottom = d.scrollHeight - d.scrollTop - d.clientHeight;
            // If scroolbar at the bottom then scroll to bottom.
            if (distanceFromBottom <= 0) {
                //this.LogBody.scrollTop = this.LogBody.scrollHeight;
                this.BodyNode.scrollTop += this.BodyNode.scrollHeight - this.BodyNode.scrollTop;
            }
        }
    };
    //---------------------------------------------------------
    // Write this message even if debug mode is disabled.
    this.WriteError = function (message, level) {
        this.Write("error: " + message, level, true);
    };
    //---------------------------------------------------------
    this.WriteRecordSet = function (recordSet, forceWrite) {
        if (this.IsEnabled === true || forceWrite === true) {
            this.Write("Route thru Records...", 1);
            var columnsCount = 0;
            var rowsCount = 0;
            if (recordSet.Fields !== null) {
                columnsCount = recordSet.Fields.Count;
                // If table was retrieved then...
                if (columnsCount > 0) {
                    var arrResults = new Array(recordSet.GetRows);
                    rowsCount = arrResults.length;
                    //rowsCount = varRecordSet.RecordCount;
                }
                this.Write("// RecordSet[" + columnsCount + "," + rowsCount + "]");
                recordSet.MoveFirst();
            }
            // If database returned some results then...
            if (rowsCount > 0) {
                // Show returned records.
                for (var i = 0; i < columnsCount; i++) {
                    var tmpName = new String(recordSet(i).Name);
                    var tmpValue = recordSet(i).Value;
                    if (tmpName.indexOf("password") > -1) tmpValue = "&lt;********&gt;";
                    this.Write(tmpName + " = '" + tmpValue + "'");
                }
            }
            this.Write("...End", -2);
        }
    };
    //---------------------------------------------------------
    this.InitializeInterface = function () {
    };
    //---------------------------------------------------------
    this.InitializeEvents = function () {
    };
    //---------------------------------------------------------
    this.Dispose = function () {
        // Dispose interface.
        // Disable Events.
        if (this.Node) {
            // DOM removal - no leaks.
            //this.FrameNode.parentNode.removeChild(this.FrameNode);
            this.Table.tBodies[0].rows[0].childNodes[0].removeChild(this.FrameNode);
            this.Node.removeChild(this.TableNode);
        }
    };
    //---------------------------------------------------------
    this.Initialize = function () {
        // By default trace is disabled.
        this.IsEnabled = false;
        this.Id = arguments[0];
        // If Server side Response object exist then...
        this.IsServerSide = typeof Response === "object";
        // If this is not on server then...
        if (!this.IsServerSide) {
            // Set submited values or default values.
            var ctx = arguments[1];
            this.Context = ctx ? ctx : document;
            // Create Interfac.e
            //this.CreateInterface();
        }
        this.SetStyle();
    };
    this.Initialize.apply(this, arguments);
};
System.Type.RegisterClass("System.Web.UI.Console");

// Declare public object.
var Trace = new System.Web.UI.Console("TraceLog");

//-----------------------------------------------------------------------------

System.Web.Events = System.Web.Events ? System.Web.Events : {};

System.Web.Events.Add = function (sourceObjectId, eventName, objectName, delegateName) {
    /// <summary>
    /// 
    /// </summary>
    var eventId = objectName + "." + delegateName;
    var delegateScript = eventId + " = function(e){ var e = e ? e : window.event; var sender = e.target ? e.target : e.srcElement; " + objectName + ".OnEvent(sender,e); }";
    var eventScript = "";
    if (this.attachEvent) {
        eventScript = "document.getElementById(\"" + sourceObjectId + "\").attachEvent(\"on" + eventName + "\", " + eventId + ");";
    } else {
        eventScript = "document.getElementById(\"" + sourceObjectId + "\").addEventListener(\"" + eventName + "\", " + eventId + ",true);";
    }
    Trace.Write(this.GetType().Name + "(" + sourceObjectId + ", " + eventName + ", " + objectName + ", " + delegateName + ");", 1);
    Trace.Write("// " + delegateScript);
    Trace.Write("// " + eventScript);
    Trace.Write("// return " + eventId);
    Trace.Write("}", -2);
    eval(delegateScript);
    eval(eventScript);
    return eventId;
};

System.Web.Events.Remove = function (sourceObjectId, eventName, objectName, delegateName) {
    /// <summary>
    /// 
    /// </summary>
    var eventId = objectName + "." + delegateName;
    var eventScript = "";
    if (this.detachEvent) {
        eventScript = "document.getElementById(\"" + sourceObjectId + "\").detachEvent(\"on" + eventName + "\", " + eventId + ");";
    } else {
        eventScript = "document.getElementById(\"" + sourceObjectId + "\").removeEventListener(\"" + eventName + "\", " + eventId + ",true);";
    }
    Trace.Write(this.GetType().Name + "(" + sourceObjectId + ", " + eventName + ", " + objectName + ", " + delegateName + ");", 1);
    Trace.Write("// " + eventScript);
    Trace.Write("}", -2);
    eval(eventScript);
};

//=============================================================================
// CLASS: HttpRequest
//-----------------------------------------------------------------------------

//about SOAP Envelopes JavaScript: http://www.codeproject.com/webservices/aspwebsvr.asp
//http://www.codeproject.com/Ajax/JavaScriptSOAPClient.asp

System.Web.HttpRequest = function () {
    /// <summary>
    /// 
    /// </summary>
    this.HttpRequest = {};
    this.QueryUrl = "";
    this.QueryData = "";
    this.States = new Array("Uninitialized", "Loading...", "Loaded", "Interactive", "Complete");
    this.IsWebService;
    this.UniqueId = "";
    this.DownloadSize = 0;
    this.DownloadSizeLastP = 0;
    this.DownloadTotal = 0;
    this.DownloadTimeBegin = new Date;
    this.DownlaodTimeEnd = new Date;
    this.Busy = false;
    this.IsServerSide = typeof Response === "object";
    var me = this;
    //---------------------------------------------------------
    // DELEGATE: Events
    //---------------------------------------------------------
    this.OnDataReady = function (sender, data) {
        Trace.Write("results");
    };
    this.OnDataError;
    //---------------------------------------------------------
    // METHOD: Send
    //---------------------------------------------------------
    this.Send = function (queryUrl, queryData) {
        this.QueryUrl = new String(queryUrl);
        this.QueryData = new String(queryData);
        if (typeof this.IsWebService === "undefined") {
            this.IsWebService = this.QueryUrl.indexOf("asmx") > -1;
        }
        Trace.Write(this.UniqueId + ": Send: [" + this.QueryData.length + " bytes] // IsWebService = " + this.IsWebService + "; QueryUrl=" + queryUrl + "?" + queryData);
        this.HttpRequest.onreadystatechange = this.OnReadyStateChange;
        if (System.Web.IsIE()) { /* */ } else { this.HttpRequest.onprogress = this.OnProgress; }
        if (this.IsWebService) {
            // Open("method", "URL"[, asyncFlag[, "userName"[, "password"]]])
            this.HttpRequest.open("GET", this.QueryUrl + "?" + this.QueryData, true);
            // Firefox has problem with retrieveing XML and parsing it at same time.
            // It takes 2-3 times longer and it just stucks. So we need to get it as
            // plain text and parse it later.
            //if (!System.Web.IsIE()) this.HttpRequest.overrideMimeType("text/plain");
            // Need to investigate 'close' and 'keep-alive' because maybe 'keep-alive' can improve speed on
            // time sync (where couple fast coneections made.
            this.HttpRequest.setRequestHeader("Connection", "close");
            //this.HttpRequest.setRequestHeader("Cache-Control","max-age=0");
            this.HttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            this.HttpRequest.setRequestHeader("Accept-Ranges", "bytes");
            //this.HttpRequest.setRequestHeader("Content-Length", this.QueryData.length);
            this.HttpRequest.setRequestHeader("POSTDATA", this.QueryData);
            //this.HttpRequest.setRequestHeader("SOAPAction", "http://tempuri.org/Add");
        } else {
            this.HttpRequest.open("GET", this.QueryUrl + "?" + this.QueryData, true);
            this.HttpRequest.setRequestHeader("Connection", "close");
            this.HttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            this.HttpRequest.setRequestHeader("Content-Length", this.QueryData.length);
            this.HttpRequest.setRequestHeader("POSTDATA", this.QueryData);
        }
        if (System.Web.IsIE()) {
            this.HttpRequest.send(this.QueryData);
        } else {
            //var stream = Components.classes['@mozilla.org/is/string-input-stream;1'].createInstance(Components.interfaces.nsIStringInputStream);
            //stream.setData("\r\n" + this.QueryData, -1);
            //this.HttpRequest.send(stream);
            this.HttpRequest.send(this.QueryData);
        }
    };
    //---------------------------------------------------------
    // EVENT: OnReadyState
    //---------------------------------------------------------
    this.OnReadyState = function (sender, e) {
        //Trace.Write("results");
    };
    //---------------------------------------------------------
    // HANDLER: public OnProgress
    //---------------------------------------------------------
    this.OnProgress = function (evt) {
        var id = "on " + me.UniqueId + "<span style=\"color: gray;\">.OnProgress:</span> ";
        var state = me.StateToString() + "[" + me.HttpRequest.readyState + "]";
        // 3. INTERACTIVE - Called multiple times while downloading in progress.
        // responseText holds the partial data.
        if (me.HttpRequest.readyState === 3 || me.HttpRequest.readyState === 4) {
            // We will show download statistics only then interface is not busy.
            if (!me.Busy) {
                me.Busy = true;
                // If this is IE.
                if (System.Web.IsIE()) {
                    me.DownloadSize = -1;
                    me.DownloadTotal = -1;
                } else {
                    me.DownloadSize = me.HttpRequest.responseText.length;
                    me.DownloadTotal = me.HttpRequest.getResponseHeader("Content-Length");
                }
                // For some reason DownloadSize ends smaller than total reported by server.
                if (me.HttpRequest.readyState === 4) me.DownloadSize = me.DownloadTotal;
                var e = new System.EventArgs("onstatechange");
                e["Size"] = me.DownloadSize;
                e["Total"] = me.DownloadTotal;
                if (me.OnReadyState) me.OnReadyState(me, e);
                Trace.Write(id + state + ": Bytes Retrieved: " + me.DownloadSize + " / " + me.DownloadTotal);
                me.Busy = false;
            }
        }
    };
    //---------------------------------------------------------
    // METHOD: OnReadyStateChange
    //---------------------------------------------------------
    this.OnReadyStateChange = function (evt) {
        var id = "on " + me.UniqueId + "<span style=\"color: gray;\">.OnReadyStateChange:</span> ";
        var state = me.StateToString() + "[" + me.HttpRequest.readyState + "]";
        // 0. UNINITIALIZED - open() has not been called yet.
        if (me.HttpRequest.readyState < 3 || me.HttpRequest.readyState === 4) {
            if (typeof Trace === "object") Trace.Write(id + "; state='" + state + "'");
        }
        // 1. LOADING - send() has not been called yet.
        if (me.HttpRequest.readyState === 1) {
            me.TimeBegin = new Date;
        }
        // 2. LOADED - send() has been called, headers and status are available.
        // Contact established with server but nothing downloaded yet.
        if (me.HttpRequest.readyState === 2) { /* */ }
        // 3. INTERACTIVE - Called multiple times while downloading in progress.
        // responseText holds the partial data.
        if (me.HttpRequest.readyState === 3) {
            // Dont include any interface actions here, because this slows down downloading a lot.
            // Use OnProgress event instead.
        }
        // 4. COMPLETED - Finished with all operations.
        if (me.HttpRequest.readyState === 4) {
            // Calculate time.
            me.TimeEnd = new Date;
            var scriptTime = me.TimeEnd.getTime() - me.TimeBegin.getTime();
            var scriptRunTime = new Date(scriptTime);
            Trace.Write(id + "Download Time: " + scriptRunTime.getMinutes() + ":" + scriptRunTime.getMinutes() + ":" + scriptRunTime.getSeconds() + "." + scriptRunTime.getMilliseconds());
            // Fire on progress event.
            me.OnProgress();
            var downSize = me.DownloadSize + " Bytes";
            if (me.DownloadSize >= 1000) downSize = Math.round(me.DownloadSize / 1024) + " KB";
            Trace.Write(id + "Downloaded: " + downSize);
            // Proceed.
            var reqStatus = -1;
            try {
                reqStatus = me.HttpRequest.status;
            } catch (ex) {  /* */ }
            // If request was "OK" then...
            Trace.Write(id + "Request Status: " + reqStatus);
            var error = false;
            if (reqStatus === 200) {
                Trace.Write(id + "Returning Results");
                var data;
                if (me.IsWebService) {
                    //if (!System.Web.IsIE()){
                    //var xmlDocument = new System.Xml.XslTemplate();
                    //xmlDocument.async = false;
                    //xmlDocument.loadXML(me.HttpRequest.responseText);
                    //data = xmlDocument;
                    // new
                    //	var vParser = new DOMParser();
                    //	data = vParser.parseFromString(me.HttpRequest.responseText, "text/xml");
                    //	if(data == null) Trace.Write("XML Doc Load Failed");
                    //}else{
                    data = me.HttpRequest.responseXML;
                    // Turn on advanced selections.
                    if (typeof data === "undefined") {
                        Trace.Write("Error: " + me.UniqueId + " data has no properties!");
                        error = true;
                    } else {
                        try {
                            data.setProperty("SelectionLanguage", "XPath");
                        } catch (ex) {
                            Trace.Write("Error: data.setProperty(\"SelectionLanguage\", \"XPath\") because " + ex.message);
                        }
                    }
                    //}
                } else {
                    data = me.HttpRequest.responseText;
                }
                if (!error) me.OnDataReady(me, data);
                //Trace.Write("Response text: '"+responseText+"'");
            } else {
                var reqText = "";
                var reqStatusText = "";
                try {
                    reqText = me.HttpRequest.responseText;
                    reqStatusText = me.HttpRequest.statusText;
                } catch (ex) { /* */ }
                Trace.Write(id + "There was a problem retrieving the XML data: " + reqStatus + " - " + reqStatusText + " - " + me.QueryUrl + ": " + reqText);
                var e = new System.EventArgs("OnDataError");
                if (me.OnDataError) me.OnDataError(me, e);
            }
        }
    };
    //---------------------------------------------------------
    // METHOD: StateToString
    //---------------------------------------------------------
    this.Reload = function () {
        Trace.Write("Reload: " + this.QueryUrl + "?" + this.QueryData);
        return me.Send(this.QueryUrl, this.QueryData);
    };
    //---------------------------------------------------------
    // METHOD: StateToString
    //---------------------------------------------------------
    this.StateToString = function () {
        return this.States[this.HttpRequest.readyState];
    };
    //---------------------------------------------------------
    // METHOD: StateToString
    //---------------------------------------------------------
    this.PatamatersToQuery = function () {
        var query = "";
        if (this.Parameters) {
            for (var property in this.Parameters) {
                if (query.length > 0) query += "&";
                query += property + "=" + escape(this.Parameters[property]);
            }
        }
        return query;
    };
    //---------------------------------------------------------
    // INIT: Class
    //---------------------------------------------------------
    this.InitializeClass = function () {
        this.HttpRequest = new System.Xml.XmlRequest();
        var random = new String(Math.random());
        this.UniqueId = "WebService-" + random.substring(2);
    };
    this.InitializeClass();
};
System.Type.RegisterClass("System.Web.HttpRequest");

//==============================================================================
// Extend Mozzila Firefox with IE methods.
//------------------------------------------------------------------------------

if (typeof Response !== "object") {
    // If this is not IE.
    if (!System.Web.IsIE()) {
        //Add METHOD: .SelectNodes(path, node)
        // Examples:
        //	xmlDocument.selectNodes("//pro:lists/pro:product[@type='tshirt']/itin:itinerary/itin:sold")
        //	xmlDocument.selectNodes("Item/Name/text()")
        if (document.implementation && document.implementation.hasFeature("XPath", "3.0")) {
            //------------------------------------------------------------------
            //Add METHOD: .selectNodes(path, node)
            //------------------------------------------------------------------
            // Prototying the XMLDocument.
            XMLDocument.prototype.selectNodes = function (cXPathString, xNode) {
                if (!xNode) { xNode = this; }
                var oNSResolver = this.createNSResolver(this.documentElement);
                var aItems = this.evaluate(cXPathString, xNode, oNSResolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                var aResult = [];
                for (var i = 0; i < aItems.snapshotLength; i++) {
                    aResult[i] = aItems.snapshotItem(i);
                }
                return aResult;
            };
            // Prototying the Element.
            Element.prototype.selectNodes = function (cXPathString) {
                if (this.ownerDocument.selectNodes) {
                    return this.ownerDocument.selectNodes(cXPathString, this);
                } else {
                    throw "For XML Elements Only";
                }
            };
            //------------------------------------------------------------------
            //Add METHOD: .selectSingleNode(path, node)
            //------------------------------------------------------------------
            // Prototyping the XMLDocument.
            XMLDocument.prototype.selectSingleNode = function (cXPathString, xNode) {
                if (!xNode) { xNode = this; }
                var xItems = this.selectNodes(cXPathString, xNode);
                if (xItems.length > 0) {
                    return xItems[0];
                } else {
                    return null;
                }
            };
            // Prototying the Element.
            Element.prototype.selectSingleNode = function (cXPathString) {
                if (this.ownerDocument.selectSingleNode) {
                    return this.ownerDocument.selectSingleNode(cXPathString, this);
                }
                else {
                    throw "For XML Elements Only";
                }
            };
        }
        //------------------------------------------------------------------
        // Add METHOD: XMLDocument.setProperty(name, value);
        //------------------------------------------------------------------
        if (typeof XMLDocument !== 'undefined' && typeof XMLDocument.setProperty === 'undefined') {
            // Prototying the XMLDocument.
            XMLDocument.prototype.setProperty = function (name, value) {
                if (name === "SelectionNamespaces") {
                    namespaces = {};
                    var a = value.split(" xmlns:");
                    for (var i = 1; i < a.length; i++) {
                        var s = a[i].split("=");
                        namespaces[s[0]] = s[1].replace(/\"/g, "");
                    }
                    this._ns = {
                        lookupNamespaceURI: function (prefix) { return namespaces[prefix]; }
                    };
                }
            };
            XMLDocument.prototype._ns = {
                lookupNamespaceURI: function () { return null; }
            };
        }
    }
}

//=============================================================================
// NameSPACE: Timers
//-----------------------------------------------------------------------------

// Make sure that the sub namespace exists.
System.Timers = System.Timers ? System.Timers : {};

// Example:
// var timer = new System.Timers.Timer("myTimer", 4000, true);
// timer.customAction = someFunction;
// timer.Start();
// function someFunction(sender, e){
//		if (...) sender.Stop();
// }

System.Timers.Timer = function (id, interval, autoReset) {
    /// <summary>
    /// 
    /// </summary>
    var me = this;
    this.Interval = 0;
    this.TimerId;
    this.RunAtStart;
    this.StartDate;
    this.StopDate;
    this.State = "stopped";
    this.customAction;
    this.AutoReset = false;
    this.RunOnce = false;
    //---------------------------------------------------------
    // DELEGATES: Events
    //---------------------------------------------------------
    this.OnStop;
    this.OnStart;
    this.OnResume;
    this.OnElapsed; // Occurs when the interval elapses.
    //---------------------------------------------------------
    // METHOD: OnEvent
    //---------------------------------------------------------
    this.OnEvent = function (sender, e) {
        //Trace.Write("Timer[TimerId="+me.TimerId+"].OnEvent("+sender.Type+", '"+e.Name+"')");
    };
    //---------------------------------------------------------
    // METHOD: Action
    //---------------------------------------------------------
    this._action = function () {
        var autoReset;
        // If timer is not running then...
        if (me.TimerId === -1) {
            Trace.Write("Warning: Can't do " + this.id + "[id=" + me.TimerId + "]._action(). Timer is stopped.");
        } else {
            Trace.Write(me.id + "._action() // TimerId = " + me.TimerId);
            me.StopDate = new Date();
            window.clearInterval(me.TimerId);
            me.TimerId = -1;
            me.State = "stopped";
            var e = new System.EventArgs("OnAction");
            me.OnEvent(me, e);
            if (me.OnElapsed) me.OnElapsed(me, e);
            // me.Action is outdated plese use: timer.OnElapsed = timer_elapsed;
            if (me.Action !== null) autoReset = me.Action(me, e);
        }
        // If autoReset walue was returend by me.Action then override me.AutoReset value;
        autoReset = autoReset === true || autoReset === false ? autoReset : me.AutoReset;
        // Run as soon as posible if timer was rescheduled;
        if (autoReset === true) {
            me.AutoReset = false;
            Trace.Write("// " + me.id + ".AutoReset == true // AutoReset timer...");
            me.Resume(true);
        }
    };
    //---------------------------------------------------------
    // METHOD: ResetAndExecute
    //---------------------------------------------------------
    this.ResetAndExecute = function () {
        me.Reset(true);
    };
    //---------------------------------------------------------
    // METHOD: Reset
    //---------------------------------------------------------
    this.Reset = function (executeOnStart) {
        me.Stop();
        // By default executeOnStart is false.
        me.RunAtStart = executeOnStart === true;
        me.Start(true);
    };
    //---------------------------------------------------------
    // METHOD: Start
    //---------------------------------------------------------
    this.Start = function (autoReset) {
        // By default AutoReset is true.
        me.AutoReset = autoReset !== false;
        // If timer is not running then...
        if (me.TimerId === -1) {
            Trace.Write(this.id + ".Start(" + me.AutoReset + ") // TimerId = " + me.TimerId);
            me.State = "running";
            me.StartDate = new Date();
            if (me.RunAtStart === true) {
                me.RunAtStart = false;
                me.TimerId = window.setTimeout(me._action, 0);
            } else {
                me.TimerId = window.setTimeout(me._action, me.Interval);
            }
            var e = new System.EventArgs("OnStart");
            me.OnEvent(me, e);
            if (me.OnStart) me.OnStart(me, e);
        } else {
            Trace.Write("Warning: Can't " + this.id + "[id=" + me.TimerId + "].Start(). Timer is running.");
        }
    };
    //---------------------------------------------------------
    // METHOD: Resume
    //---------------------------------------------------------
    this.Resume = function (autoReset) {
        // By default AutoReset is true.
        me.AutoReset = autoReset !== false;
        // If timer is not running then...
        if (me.TimerId === -1) {
            // Now we need to calculate time difference from last stop.
            me.State = "running";
            var now = new Date();
            var diff = now.getTime() - me.StopDate.getTime();
            var waitTime = me.Interval - diff;
            Trace.Write(this.id + ".Resume(" + me.AutoReset + ") // Time passed from: LastStop = " + diff + "; Difference with iterval = " + waitTime);
            if (waitTime < 0) waitTime = 0;
            // Start task
            me.StartDate = new Date();
            // AutoReset timer.
            if (me.RunAtStart === true) {
                me.RunAtStart = false;
                me.TimerId = window.setTimeout(me._action, 0);
            } else {
                me.TimerId = window.setTimeout(me._action, waitTime);
            }
            var e = new System.EventArgs("OnResume");
            me.OnEvent(me, e);
        } else {
            Trace.Write("Warning: Can't " + this.id + "[id=" + me.TimerId + "].Resume(). Timer is already running.");
        }
    };
    //---------------------------------------------------------
    // METHOD: Stop
    //---------------------------------------------------------
    this.Stop = function () {
        // If timer is not running then...
        if (me.TimerId === -1) {
            Trace.Write("Warning: Can't " + this.id + "[id=" + me.TimerId + "].Stop(). Timer is already stopped.");
        } else {
            Trace.Write(this.id + ".Stop() // TimerId = " + me.TimerId);
            me.StopDate = new Date();
            window.clearTimeout(me.TimerId);
            me.TimerId = -1;
            me.State = "stopped";
            var e = new System.EventArgs("OnStoped");
            me.OnEvent(me, e);
            if (me.OnStop) me.OnStop(me, e);
        }
    };
    //---------------------------------------------------------
    this.Initialize = function () {
        this.id = id ? id : this.GetType().Name;
        this.TimerId = -1;
        this.RunAtStart = false;
        this.Interval = interval ? parseInt(interval) : 4000;
        // By default auto reset is true.
        me.AutoReset = autoReset !== false;
    };
    this.Initialize.apply(this, arguments);
};
System.Type.RegisterClass("System.Timers.Timer");

System.Timers.ProgressTimer = function (id, task, interval, context) {
    /// <summary>
    /// 
    /// </summary>
    //---------------------------------------------------------
    // Public properties.
    //---------------------------------------------------------
    this.TimerId;
    this.Interval;
    //---------------------------------------------------------
    // Private properties.
    //---------------------------------------------------------
    var me = this;
    //---------------------------------------------------------
    // PROPERTY: Task
    //---------------------------------------------------------
    this.Task;
    this.Done;
    this.Args;
    this.Context;
    this.Tick = function () {
        // If we have task then...
        if (!this.Done) {
            // Execute it and remove it;
            this.Task.apply(this, this.Args);
            this.Done = true;
        } else {
            // Stop timer.
            window.clearInterval(this.TimerId);
            this.TimerId = -1;
        }
    };
    //---------------------------------------------------------
    // METHOD: Execute
    //---------------------------------------------------------
    this.Execute = function () {
        //Trace.Write("Execute "+this.TimerId);
        this.Args = arguments;
        this.Done = false;
        // If timer is not started then...
        if (this.TimerId === -1) {
            // Start Timer.
            this.TimerId = setInterval(function () { me.Tick(); }, this.Interval);
        }
    };
    //---------------------------------------------------------
    // INIT: Class
    //---------------------------------------------------------
    this.InitializeClass = function () {
        this.id = id ? id : this.GetType().Name;
        this.Task = task;
        this.TimerId = -1;
        this.Context = context ? context : this;
        this.Done = true;
        // Be default statistics will be updated 5 times per second;
        this.Interval = interval ? parseInt(interval) : 200;
    };
    this.InitializeClass();
};
System.Type.RegisterClass("System.Timers.ProgressTimer");


System.Timers.Synchronizer = function (id, serviceUrl) {
    /// <summary>
    /// 
    /// </summary>
    //---------------------------------------------------------
    // Delegates:
    //---------------------------------------------------------
    this.OnResults;
    //---------------------------------------------------------
    // Public properties.
    //---------------------------------------------------------
    this.QueryUrl = "";
    this.QueryData = "";
    this.Browser;
    // http://www.bldrdoc.gov/doc-tour/atomic_clock.html
    this.TimeServerUrl = "http://132.163.4.101:14/index.cgi";
    this.ServiceUrl = "";
    this.QueryUrl = "";
    this.TestType = "";
    this.TimeArray = [];
    //---------------------------------------------------------
    // METHOD: TestStart
    //---------------------------------------------------------
    this.TestTimes = 10;
    this.TestStart = function () {
        if (this.TimeArray.length === this.TestTimes) {
            me.Results();
        } else {
            var args = {};
            args["LocalTimeStart"] = new Date();
            this.TimeArray.push(args);
            Trace.Write("exec " + this.id + ".TestServer() // Request No." + this.TimeArray.length);
            this.Browser.UniqueId = this.id + ".Browser";
            //this.QueryUrl = this.ServerUrl;
            this.QueryData = "";
            //this.QueryData += "&UserPass="+userPass;
            this.Browser.OnDataReady = this.OnDataReady;
            this.Browser.Send(this.QueryUrl, this.QueryData);
        }
    };
    //---------------------------------------------------------
    // METHOD: TestServer
    //---------------------------------------------------------
    this.Test = function (testType) {
        this.TestType = testType;
        switch (testType) {
            case "Server":
                this.QueryUrl = this.ServiceUrl + "/GetServerUtcTime";
                break;
            case "Database":
                this.QueryUrl = this.ServiceUrl + "/GetDatabaseUtcTime";
                break;
            case "Remote":
                this.QueryUrl = this.ServiceUrl + "/GetRemoteUtcTime";
                break;
            default:
                this.QueryUrl = this.ServiceUrl + "/GetServerUtcTime";
                break;
        }
        this.TimeArray = [];
        this.TestStart();
    };
    //---------------------------------------------------------
    // METHOD: CountResults
    //---------------------------------------------------------
    this.Results = function () {
        Trace.Write(this.id + ".Results()");
        // Find smallest gap.
        // 10 seconds.
        var bestTime = 10000;
        var bestNo = -1;
        for (var i = 0; i < this.TimeArray.length; i++) {
            var item = this.TimeArray[i];
            var delayTime = item.LocalTimeEnd.getTime() - item.LocalTimeStart.getTime();
            if (delayTime < bestTime) {
                bestTime = delayTime;
                bestNo = i;
            }
            Trace.Write("Delay Time " + i + ": " + delayTime);
        }
        Trace.Write("Best Time " + bestNo + ": " + bestTime);
        if (bestNo === -1) {
            Trace.Write("Error: Server reply is slower than 10 seconds!!!");
        } else {
            var averageLocalTime = this.TimeArray[bestNo].LocalTimeStart.getTime() + bestTime / 2;
            var localTime = new Date(averageLocalTime);
            var serverTime = this.TimeArray[bestNo].ServerUtcTime;
            Trace.Write("// Local Time: " + localTime.ToString("yyyy-MM-dd HH:mm:ss.fff") + " - Server Time: " + serverTime.ToString("yyyy-MM-dd HH:mm:ss.fff"));
            var difference = localTime.getTime() - serverTime.getTime();
            Trace.Write(this.TestType + " Time Difference: " + difference / 1000 + " seconds");
            var e = new System.EventArgs("OnTimeSyncResults");
            e["Difference"] = difference / 1000;
            e["Bias"] = bestTime / 1000;
            e["Distance"] = e.Difference < 0 ? e.Difference * -1 : e.Difference;
            e["Sign"] = e.Difference < 0 ? "-" : "+";
            e["TestType"] = this.TestType;
            e["Message"] = "Time Difference between your PC and " + this.TestType + " is: " + e.Difference + " sec. [Bias: ±" + e.Bias + " sec]";
            if (this.OnResults) this.OnResults(this, e);
        }
    };
    //---------------------------------------------------------
    // METHOD: TestTimeServer
    //---------------------------------------------------------
    this.OnDataReady = function (sender, data) {
        Trace.Write("on " + me.id + ".OnDataReady(sender,data)");
        var pathToDatetime = "child::*[name()='dateTime']/text()";
        var serverUtcTimeString = data.selectSingleNode(pathToDatetime).nodeValue;
        var serverUtcTime = System.Xml.Node.parseDateTime(data.selectSingleNode(pathToDatetime));
        me.TimeArray[me.TimeArray.length - 1]["ServerUtcTime"] = serverUtcTime;
        me.TimeArray[me.TimeArray.length - 1]["LocalTimeEnd"] = new Date();
        Trace.Write("Server Local Time: " + serverUtcTimeString);
        Trace.Write("Server Local Time: " + serverUtcTime.ToString("yyyy-MM-dd HH:mm:ss.fff"));
        me.TestStart();
    };
    //---------------------------------------------------------
    // Private properties.
    //---------------------------------------------------------
    var me = this;
    //---------------------------------------------------------
    // INIT: Class
    //---------------------------------------------------------
    this.InitializeClass = function () {
        this.id = id ? id : this.GetType().Name;
        this.ServiceUrl = serviceUrl ? serviceUrl : "/WebServices/Time.asmx";
        this.Browser = new System.Web.HttpRequest();
    };
    this.InitializeClass();
};
System.Type.RegisterClass("System.Timers.Synchronizer");

//=============================================================================
// CLASS: Clipboard
//-----------------------------------------------------------------------------
// Make sure that the namespace exists.
System.Clipboard = function () { };
System.Type.RegisterClass("System.Clipboard");

System.Clipboard.Copy = function (contents) {
    /// <summary>
    /// 
    /// </summary>
    var success = false;
    // If this is IE.
    if (window.clipboardData) {
        window.clipboardData.setData("Text", contents);
        success = true;
        // If this is netscape/mozilla.
    } else if (window.netscape) {
        try {
            // This is importent but it's not noted anywhere.
            netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
            var copytext = "Text to copy";
            var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
            if (!str) return false;
            str.data = copytext;
            var trans = Components.classes["@mozilla.org/widget/transferable;1"].createInstance(Components.interfaces.nsITransferable);
            if (!trans) return false;
            trans.addDataFlavor("text/unicode");
            trans.setTransferData("text/unicode", str, copytext.length * 2);
            var clipid = Components.interfaces.nsIClipboard;
            var clip = Components.classes["@mozilla.org/widget/clipboard;1"].getService(clipid);
            if (!clip) return false;
            clip.setData(trans, null, clipid.kGlobalClipboard);
        } catch (ex) {
            System.Clipboard.FlashCopy(contents);
            //if (ex.indexOf("denied") > -1){
            //	alert(ex);
            //	System.Clipboard.FlashCopy(contents);
            //}else{
            //	Trace.Write(ex);
            //}
        }
    }
    // Trace.Write("Following info was copied to your clipboard:" + clipboard);
    return success;
};

System.Clipboard.FlashCopy = function (contents) {
    //Trace.Write("Try to copy with Macromedia Flash");
    var flashcopier = 'FlashCopier';
    if (!document.getElementById(flashcopier)) {
        var divholder = document.createElement('div');
        divholder.id = flashcopier;
        document.body.appendChild(divholder);
    }
    var path = System.GetScriptsPath() + "/Adobe.Flash.Clipboard.swf";
    document.getElementById(flashcopier).innerHTML = '';
    var divinfo = '<embed src="' + path + '" FlashVars="clipboard=' + encodeURIComponent(contents) + '" width="0" height="0" type="application/x-shockwave-flash"></embed>';
    document.getElementById(flashcopier).innerHTML = divinfo;
};



System.Clipboard.Paste = function (contents) {
    /// <summary>
    /// 
    /// </summary>
    var success = false;
    // If this is IE.
    if (window.clipboardData) {
        window.clipboardData.getData("Text");
        success = true;
        // If this is netscape/mozilla.
    } else if (window.netscape) { /* */ }
};

//=============================================================================
// CLASS: Matrix
//-----------------------------------------------------------------------------

System.Matrix = {};
System.Matrix.Current = null;

System.Matrix.Ask = function () {
    /// <summary>
    /// 
    /// </summary>
    document.getElementById("TheMatrixDiv").style.display = "";
    if (System.Matrix.Current !== null) System.Matrix.Current.Stop();
    System.Matrix.Current = new System.Matrix.Type("\nYou take the blue pill and the story ends.\r\nYou wake in your bed and believe whatever you want to believe.\r\nYou take the red pill and you stay in Wonderland...\r\n...and I show you how deep the rabbit-hole goes.\r\nRemember - all I am offering is the truth, nothing more.\r\nWelcome to The Matrix!... ");
    System.Matrix.Current.Start();
};

System.Matrix.Leave = function () {
    /// <summary>
    /// 
    /// </summary>
    if (System.Matrix.Current !== null) System.Matrix.Current.Stop();
    document.getElementById("TheMatrixDiv").style.display = "none";
    Trace.IsEnabled = false;
    CrmInt.ShowHideTrace(false);
    //Trace.Node.style.display = "none";
    Trace.SetStyle("default");
    //document.body.style.background = "#9EBEF5";
    //parent.document.body.style.background = "#9EBEF5";
};

System.Matrix.Enter = function () {
    /// <summary>
    /// 
    /// </summary>
    var mxDiv = document.getElementById("TheMatrixDiv");
    if (mxDiv) mxDiv.style.display = "none";
    Trace.SetStyle("Matrix");
    if (CrmInt) CrmInt.ShowHideTrace(true);
    Trace.IsEnabled = true;
    //Trace.Node.style.display = "";
    //document.body.style.background = "#000000";
    //parent.document.body.style.background = "#000000";
};

System.Matrix.Type = function (message) {
    /// <summary>
    /// 
    /// </summary>
    var me = this;
    me.pos = -1;
    me.message = message;
    me.TextNode = document.createElement("span");
    me.TextNode.style.color = "#00A000";
    me.CursorNode = document.createElement("span");
    me.CursorNode.appendChild(document.createTextNode(""));
    me.CursorNode.style.color = "#20ff20";
    document.getElementById("TheMatrixConsole").appendChild(me.TextNode);
    document.getElementById("TheMatrixConsole").appendChild(me.CursorNode);
    me.TimerId;
    this.Start = function () {
        me.pos++;
        var prevNode = me.CursorNode.firstChild;
        me.TextNode.appendChild(prevNode);
        var letter = me.message.charAt(me.pos);
        node = document.createTextNode(letter);
        if (letter === "\n") me.TextNode.appendChild(document.createTextNode("Morpheus:> "));
        if (letter === "\r") node = document.createElement("br");
        me.CursorNode.appendChild(node);
        if (me.pos < me.message.length) {
            var delay = 100;
            if (letter === "\r") delay = 1000;
            if (letter === " ") delay = 0;
            me.TimerId = window.setTimeout(me.Start, delay);
        } else {
            me.CursorNode.style.textDecoration = "blink";
        }
    };
    this.Stop = function () {
        window.clearTimeout(me.TimerId);
        me.TextNode.innerHTML = "";
        me.CursorNode.innerHTML = "";
        me.CursorNode.appendChild(document.createTextNode(""));
        me.pos = -1;
    };
};

// Make sure that the sub namespace exists.
//System.Diagnostics = System.Diagnostics ? System.Diagnostics : {}

//System.Diagnostics.TraceInternal = function(){
//	this.Write = function(){
//	}
//
//}
System.Diagnostics = System.Diagnostics ? System.Diagnostics : {};
System.Type.RegisterNamespace("System.Diagnostics");

System.Diagnostics.TraceEventType = function () {
    /// <summary>Identifies the type of event that has caused the trace.</summary>
    /// <field name="Critical" type="Number" integer="true" static="true">Fatal error or application crash.</field>
    /// <field name="Error" type="Number" integer="true" static="true">Recoverable error.</field>
    /// <field name="Information" type="Number" integer="true" static="true">Informational message.</field>
};


System.Diagnostics.TraceEventType.prototype = {
    Critical: 0,
    Error: 1,
    Information: 2
};

System.Type.RegisterEnum("System.Diagnostics.TraceEventType");

//System.Diagnostics.TraceEventType.registerEnum



///// <summary>
/////// Identifies the type of event that has caused the trace.
/////// </summary>
/////// <filterpriority>2</filterpriority>
////System.Diagnostics.TraceEventType = {
////    /// <summary>Fatal error or application crash.</summary>
////    Critical: 0x1,
////    /// <summary>Recoverable error.</summary>
////    Error: 0x2,
////    /// <summary>Informational message.</summary>
////    Information: 0x8,
////    /// <summary>Resumption of a logical operation.</summary>
////    Resume: 0x800,
////    /// <summary>Starting of a logical operation.</summary>
////    Start: 0x100,
////    /// <summary>Stopping of a logical operation.</summary>
////    Stop: 0x200,
////    /// <summary>Suspension of a logical operation.</summary>
////    Suspend: 0x400,
////    /// <summary>Changing of correlation identity.</summary>
////    Transfer: 0x1000,
////    /// <summary>Debugging trace.</summary>
////    Verbose: 0x10,
////    /// <summary>Noncritical problem.</summary>
////    Warning: 0x4
////}



System.Diagnostics.TraceListener = function (obj) {
    if (arguments[0] === System.Diagnostics.TraceInternal ||
        arguments[0].GetType().Name === "TraceListener") return arguments[0];
};

System.Diagnostics.TraceListener.prototype = {
    Filter: null,
    Flush: function () {
        /// <summary>
        /// Flushes the output buffer, and causes buffered data to be written to the Trace.Listeners.
        /// </summary>
    },
    Ident: function () {
        /// <summary>
        /// Increases the current IndentLevel by one.
        /// </summary>
    },
    TraceEvent: function (eventType, id, format, args) {
        //var params = new System.Array();
        //if (arguments.length > 4) {
        //	params = new System.Array(arguments.length - 3);
        //	System.Array.Copy(arguments, 3, params, 0, arguments.length - 3);
        //}
    },
    Unindent: function () {
        /// <summary>
        /// Decreases the current IndentLevel by one.
        /// </summary>
    },
    Write: function (message, category) {
        /// <summary>
        /// Writes a message to the trace listeners in the Trace.Listeners collection.
        /// </summary>
        /// <param name="message">A message to write.</param>
        /// <param name="category">A category name used to organize the output.</param>
        if (this.Filter === null || this.Filter.ShouldTrace(null, "", TraceEventType.Verbose, 0, message)) {
            if (category === null) {
                this.Write(message);
            } else {
                this.Write(category + ": " + (message === null ? "" : message));
            }
        }
    },
    WriteLine: function (message) {
        /// <summary>
        /// Writes a message to the trace listeners in the Trace.Listeners collection.
        /// </summary>
        /// <param name="message">A message to write.</param>
    },
    Fail: function (message, detailMessage) {
        /// <summary>
        /// Emits an error message and a detailed error message to the listener.
        /// </summary>
        /// <param name="message">A message to emit.</param>
        /// <param name="detailMessage">A detailed message to emit.</param>
        var builder = new System.Text.StringBuilder();
        builder.Append("TraceListenerFail");
        builder.Append(" ");
        builder.Append(message);
        if (detailMessage) {
            builder.Append(" ");
            builder.Append(detailMessage);
        }
        this.WriteLine(builder.ToString());
    }
};

System.Type.RegisterClass("System.Diagnostics.TraceListener");

System.Diagnostics.TraceInternal = new function () {
    this.IdentLevel = 0;
    //---------------------------------------------------------
    this._invoke = function (methodName, args) {
        var listeners = System.Diagnostics.Trace.Listeners();
        for (var i = 0; i < listeners.length; i++) {
            var listener = new System.Diagnostics.TraceListener(listeners[i]);
            listener[methodName].apply(listener, args);
            if (it.AutoFlush) listener.Flush();
        }
    };
    //---------------------------------------------------------
    this.Write = function (message) {
        this._invoke.apply(this, ["Write", message]);
    };
    //---------------------------------------------------------
    this.WriteLine = function (message) {
        this._invoke.apply(thistory, ["WriteLine", message]);
    };
    //---------------------------------------------------------
    this.Indent = function () {
        if (indentLevel < 0x7fffffff) indentLevel++;
        var listeners = System.Diagnostics.Trace.Listeners();
        for (var i = 0; i < listeners.length; i++) {
            var listener = new System.Diagnostics.TraceListener(listeners[i]);
            listener.IndentLevel = this.IndentLevel;
        }
    };
    //---------------------------------------------------------
    this.TraceEvent = function (eventType, id, format, args) {
        this._invoke.apply(this, ["TraceEvent", arguments]);
    };
    //---------------------------------------------------------
    this.Unindent = function () {
        if (indentLevel > 0) indentLevel--;
        var listeners = System.Diagnostics.Trace.Listeners();
        for (var i = 0; i < listeners.length; i++) {
            var listener = new System.Diagnostics.TraceListener(listeners[i]);
            listener.IndentLevel = this.IndentLevel;
        }
    };
};

System.Diagnostics.Trace = new System.Diagnostics.TraceListener(System.Diagnostics.TraceInternal);

System.Diagnostics.Trace.AutoFlush = false;
System.Diagnostics.Trace.Listeners = [];

System.Extensions.Apply.apply(this);

//==============================================================================
// END
//------------------------------------------------------------------------------


//=============================================================================
// Jocys.com JavaScript.NET Classes               (In C# Object Oriented Style)
// Created by Evaldas Jocys <evaldas@jocys.com>
//=============================================================================
/// <reference path="System.debug.js" />
//=============================================================================
// Namespaces
//-----------------------------------------------------------------------------
// <PropertyGroup>
//		<RootNamespace>System.IO</RootNamespace>
// <PropertyGroup>
//-----------------------------------------------------------------------------

System.IO = System.IO ? System.IO : {};
System.Type.RegisterNamespace("System.IO");

//=============================================================================

System.IO.Directory = function () { };
System.Type.RegisterClass("System.IO.Directory");

System.IO.Directory.CreateDirectory = function (path) {
    /// <summary>
    /// Creates all directories and subdirectories as specified by path.
    /// </summary>
    /// <param type="String" type="path">The directory path to create.</param>
    /// <returns type"">A folder info as specified by path.</returns>
    /// <remarks>
    /// ASP GetFolder Method
    /// http://msdn2.microsoft.com/en-us/library/f1xtf7ta.aspx
    /// http://msdn2.microsoft.com/en-us/library/bkx696eh.aspx
    /// File Object Properties:
    /// Attributes, DateCreated, DateLastAccessed, DateLastModified
    /// Drive, Name, ParentFolder, Path, ShortName, ShortPath, Size, Type
    /// </remarks>
    // Create object to manipulate folders and files.
    var folderInfo = null;
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var pathPhysical = new String(path);
    // If folder path is not physical then...
    if (pathPhysical.indexOf(":") === -1) {
        // Convert path to Physical.
        pathPhysical = Server.MapPath(path);
    }
    // Check if folder exist and create it if not.
    var arrPath = new Array;
    var regex = new RegExp("\\\\", "g");
    arrPath = pathPhysical.split(regex);
    var pathTemp = "";
    // Route thru folders of path.
    for (var i = 0; i < arrPath.length; i++) {
        // Get folder name;
        var folderName = arrPath[i];
        if (i > 0) pathTemp += "\\";
        pathTemp += folderName;
        // If this is not root folder (drive letter) then...
        if (i > 0) {
            // If this folder does not exist then...
            if (!fso.FolderExists(pathTemp)) {
                // Create this folder.
                Trace.Write("Create folder: " + pathTemp);
                try {
                    fso.CreateFolder(pathTemp);
                    folderInfo = fso.GetFolder(pathTemp);
                } catch (ex) {
                    //Trace.Write("Failed to create folder.");
                }
            }
        }
    }
    return folderInfo;
};

System.IO.Directory.GetItems = function (path, searchPattern, typeIsFiles) {
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var f = fso.GetFolder(path);
    var fc = new Enumerator(typeIsFiles ? f.Files : f.SubFolders);
    //Trace.Write(f.Name);
    var items = [];
    var pattern = "";
    pattern = searchPattern ? searchPattern : ".*";
    var regExp = new RegExp(pattern);
    var name = "";
    for (; !fc.atEnd(); fc.moveNext()) {
        // Get name from file object;
        var item = fc.item();
        var isMatch = item.Name.match(regExp) !== null;
        if (isMatch) items.push(item);
    }
    return items;
};


System.IO.Directory.GetFiles = function (path, searchPattern) {
    /// <summary>
    /// Returns the names of files in the specified directory that match the specified
    /// search pattern.
    /// </summary>
    /// <param type="String" name="path">The directory to search.</param>
    /// <param type="String" name="path">The search string (Regular Expression) to match against the names of files in path.</param>
    /// <returns type="String[]">
    /// A String array containing the names of files in the specified directory that
    /// match the specified search pattern. File names include the full path.
    /// </returns>
    /// <remarks>
    /// http://msdn2.microsoft.com/en-us/library/hww8txat.aspx
    /// </remarks>
    return System.IO.Directory.GetItems(path, searchPattern, true);
};

System.IO.Directory.GetDirectories = function (path, searchPattern) {
    /// <summary>
    /// Returns the names of directories in the specified directory that match the specified
    /// search pattern.
    /// </summary>
    return System.IO.Directory.GetItems(path, searchPattern, false);
};

//=============================================================================
// Namespaces
//-----------------------------------------------------------------------------

System.IO.File = function () { };
System.Type.RegisterClass("System.IO.File");

System.IO.File.ReadAllText = function (path) {
    /// <summary>
    /// Opens a text file, reads all lines of the file, and then closes the file.
    /// </summary>
    /// <param name="path">The file to open for reading.</param>
    /// <returns>A string array containing all lines of the file.</returns>
    var useScripting = true;
    if (useScripting) {
        var ForReading = 1, ForWriting = 2, ForAppending = 8;
        var TristateUseDefault = -2; // Opens the file using the system default.
        var TristateTrue = -1; // Opens the file as Unicode.
        var TristateFalse = 0; // Opens the file as ASCII.
        var fdo = new ActiveXObject("Scripting.FileSystemObject");
        var textStream = fso.OpenTextFile(path, ForReading);
        var content = "";
        content = textStream.ReadAll();
        textStream.Close();
        textStream = null;
        return content;
    } else {
        // Read Binary.
        var adTypeBinary = 1, adTypeText = 2, adSaveCreateOverWrite = 2;
        // Create Stream object.
        var binaryStream = Server.CreateObject("ADODB.Stream");
        // Specify stream type - we want To get binary data.
        binaryStream.Type = adTypeBinary;
        // Open the stream.
        binaryStream.Open();
        // Load the file data from disk To stream object.
        binaryStream.LoadFromFile(path);
        // Open the stream And get binary data from the object.
        var results = binaryStream.Read();
        binaryStream = null;
        return results;
    }
};

System.IO.File.WriteAllText = function (path, contents, encoding) {
    /// <summary>
    /// Creates a new file, writes the specified string array to the file using the
    /// specified encoding, and then closes the file. If the target file already
    /// exists, it is overwritten.
    /// </summary>
    /// <param type="String" name="path">The file to write to.</param>
    /// <param type="String" name="contents">The string to write to the file.</param>
    /// <param type="String" name="encoding">An encoding (CharSet) to apply.</param>
    /// <returns>void</returns>
    // If type of contents is String then...
    if (typeof contents === "string") {
        var ForReading = 1, ForWriting = 2, ForAppending = 8;
        var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
        var textStream = fileSystem.CreateTextFile(path);
        textStream.Write(contents);
        textStream.Close();
        textStream = null;
    } else {
        var adTypeBinary = 1, adTypeText = 2, adSaveCreateOverWrite = 2;
        // Create Stream object
        var binaryStream = Server.CreateObject("ADODB.Stream");
        // Specify stream type - we want To save text/string data.
        binaryStream.Type = adTypeBinary;
        // Specify charset For the source text (unicode) data.
        if (encoding !== null) binaryStream.CharSet = encoding;
        // Open the stream.
        binaryStream.Open();
        // Write binary data To the object.
        try { binaryStream.Write(contents); } catch (ex) { /* */ }
        // Save binary data To disk.
        //Response.Write("valFilePath = "+valFilePath+"<br />");
        binaryStream.SaveToFile(path, adSaveCreateOverWrite);
        binaryStream = null;
    }
};

System.IO.File.Delete = function (path, force) {
    /// <summary>
    /// Deletes the specified file.
    /// </summary>
    /// <param type="String" name="path">The name of the file to be deleted.</param>
    /// <returns>void</returns>
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    force = force === true;
    return fso.DeleteFile(path, force);
};

System.IO.File.Exists = function (path) {
    /// <summary>
    /// Determines whether the specified file exists.
    /// </summary>
    /// <param name="path">The file to check.</param>
    /// <returns>True if file exists; otherwise false.</returns>
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    return fso.FileExists(path);
};

System.IO.File.Move = function (sourceFileName, destFileName) {
    /// <summary>
    /// Moves a specified file to a new location, providing the option to specify
    /// a new file name.
    /// </summary>
    /// <param type="String" name="sourceFileName">The name of the file to move.</param>
    /// <param type="String" name="destFileName">The new path for the file.</param>
    /// <returns>void</returns>
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    return fso.MoveFile(sourceFileName, destFileName);
};

//=============================================================================
// Path
//-----------------------------------------------------------------------------

System.IO.Path = function () { };
System.Type.RegisterClass("System.IO.Path");

System.IO.Path = function () {
    /// <summary>
    /// Performs operations on System.String instances that contain file or directory
    /// path information. These operations are performed in a cross-platform manner.
    /// </summary>
    /// <remarks>
    /// Converted from C# System.IO.Path.
    /// </remarks>
    //---------------------------------------------------------
    // Declare public properties
    this.AltDirectorySeparatorChar = '/';
    this.DirectorySeparatorChar = '\\';
    this.ERROR_SUCCESS = 0;
    this.InternalInvalidPathChars = ['"', '<', '>', '|', '\0', '\b', '\x0010', '\x0011', '\x0012', '\x0014', '\x0015', '\x0016', '\x0017', '\x0018', '\x0019'];
    this.InvalidPathChars = ['"', '<', '>', '|', '\0', '\b', '\x0010', '\x0011', '\x0012', '\x0014', '\x0015', '\x0016', '\x0017', '\x0018', '\x0019'];
    this.MAX_DIRECTORY_PATH = 0xf8;
    this.MAX_PATH = 260;
    this.PathSeparator = ';';
    this.VolumeSeparatorChar = ':';
    //---------------------------------------------------------
    this.CheckInvalidPathChars = function (path) {
        var iipc = new RegExp("[" + this.InternalInvalidPathChars.toString().replace(",", "", "g") + "]");
        var isInvalid = path.match(iipc) ? true : false;
        return isInvalid;
    };
    //---------------------------------------------------------
    this.FixupPath = function (path) {
        //var newPath = "";
        //int errorCode = nGetFullPathHelper(path, InternalInvalidPathChars, string.WhitespaceChars, DirectorySeparatorChar, AltDirectorySeparatorChar, VolumeSeparatorChar, false, out newPath);
        //if (errorCode != 0)
        //{
        //    __Error.WinIOError(errorCode, path);
        //}
        //return newPath;
        return path;
    };
    //---------------------------------------------------------
    this.IsDirectorySeparator = function (c) {
        return c === this.AltDirectorySeparatorChar ||
            c === this.DirectorySeparatorChar;
    };
    //---------------------------------------------------------
    this.GetRootLength = function (path) {
        if (!this.CheckInvalidPathChars(path)) {
            var num = 0;
            var length = path.length;
            if (length >= 1 && this.IsDirectorySeparator(path.charAt(0))) {
                num = 1;
                if (length >= 2 && this.IsDirectorySeparator(path.charAt(1))) {
                    num = 2;
                    var num3 = 2;
                    while (num < length && (path.charAt(num) !== this.DirectorySeparatorChar && path.charAt(num) !== this.AltDirectorySeparatorChar || --num3 > 0)) {
                        num++;
                    }
                }
                return num;
            }
            if (length >= 2 && path.charAt(1) === this.VolumeSeparatorChar) {
                num = 2;
                if (length >= 3 && this.IsDirectorySeparator(path.charAt(2))) {
                    num++;
                }
            }
            return num;
        }
    };
    //---------------------------------------------------------
    this.GetDirectoryName = function (path) {
        /// <summary>
        /// Returns the directory information for the specified path string.
        /// </summary>
        /// <param type="String" type="path">The path of a file or directory.</param>
        /// <returns type="String">
        ///  A System.String containing directory information for path, or null if path
        ///  denotes a root directory, is the empty string (""), or is null
        /// </returns>
        if (path !== null) {
            var isInvalid = this.CheckInvalidPathChars(path);
            path = this.FixupPath(path);
            var rootLength = this.GetRootLength(path);
            if (path.length > rootLength) {
                var length = path.length;
                if (length === rootLength) {
                    return null;
                }
                while (length > rootLength && path.charAt(--length) !== this.DirectorySeparatorChar && path.charAt(length) !== this.AltDirectorySeparatorChar) {
                    /* */
                }
                return path.substr(0, length);
            }
        }
        return null;
    };
    //---------------------------------------------------------
    this.GetExtension = function (path) {
        /// <summary>
        /// Returns the extension of the specified path string.
        /// </summary>
        /// <param type="String" type="path">The path of a file or directory.</param>
        /// <returns type="String">
        /// A System.String containing the extension of the specified path (including
        /// the ".")
        /// </returns>
        if (path !== null) {
            if (!this.CheckInvalidPathChars(path)) {
                var length = path.length;
                var startIndex = length;
                while (--startIndex >= 0) {
                    var ch = path.charAt(startIndex);
                    if (ch === '.') {
                        if (startIndex !== length - 1) {
                            return path.substr(startIndex, length - startIndex);
                        }
                        return "";
                    }
                    if (ch === this.DirectorySeparatorChar || ch === this.AltDirectorySeparatorChar || ch === this.VolumeSeparatorChar) {
                        break;
                    }
                }
                return "";
            }
        }
    };
    //---------------------------------------------------------
    this.GetFileName = function (path) {
        /// <summary>
        /// Returns the file name and extension of the specified path string.
        /// </summary>
        /// <param type="String" type="path">The path of a file or directory.</param>
        /// <returns type="String">
        /// A System.String consisting of the characters after the last directory character
        /// in path. If the last character of path is a directory or volume separator
        /// character, this method returns System.String.Empty. If path is null, this
        /// method returns null.
        /// </returns>
        if (path !== null) {
            if (!this.CheckInvalidPathChars(path)) {
                var length = path.length;
                var num2 = length;
                while (--num2 >= 0) {
                    var ch = path.charAt(num2);
                    if (ch === this.DirectorySeparatorChar || ch === this.AltDirectorySeparatorChar || ch === this.VolumeSeparatorChar) {
                        return path.substr(num2 + 1, length - num2 - 1);
                    }
                }
            }
        }
        return path;
    };
    //---------------------------------------------------------
    this.GetFileNameWithoutExtension = function (path) {
        /// <summary>
        /// Returns the file name of the specified path string without the extension.
        /// </summary>
        /// <param type="String" type="path">The path of a file or directory.</param>
        /// <returns type="String">
        /// A System.String containing the string returned by System.IO.Path.GetFileName(System.String),
        /// minus the last period (.) and all characters following it.
        /// </returns>
        path = this.GetFileName(path);
        if (path === null) {
            return null;
        }
        var length = path.lastIndexOf('.');
        if (length === -1) {
            return path;
        }
        return path.substr(0, length);
    };
    //---------------------------------------------------------
    this.HasExtension = function (path) {
        /// <summary>
        /// Determines whether a path includes a file name extension.
        /// </summary>
        /// <param type="String" type="path">The path of a file or directory.</param>
        /// <returns type="Bool">
        /// true if the characters that follow the last directory separator (\\ or /)
        /// or volume separator (:) in the path include a period (.) followed by one
        /// or more characters; otherwise, false.
        /// </returns>
        if (path !== null) {
            if (!this.CheckInvalidPathChars(path)) {
                var length = path.length;
                while (--length >= 0) {
                    var ch = path.charAt(length);
                    if (ch === '.') {
                        return length !== path.length - 1;
                    }
                    if (ch === this.DirectorySeparatorChar || ch === this.AltDirectorySeparatorChar || ch === this.VolumeSeparatorChar) {
                        break;
                    }
                }
            }
        }
        return false;
    };
    //---------------------------------------------------------
    this.GetPathRoot = function (path) {
        if (path === null) {
            return null;
        }
        path = this.FixupPath(path);
        return path.substr(0, this.GetRootLength(path));
    };
    //---------------------------------------------------------
    this.IsPathRooted = function (path) {
        /// <summary>
        /// Gets a value indicating whether the specified path string contains absolute
        /// or relative path information.
        /// </summary>
        /// <param type="String" type="path">The path of a file or directory.</param>
        /// <returns type="Bool">
        /// true if path contains an absolute path; otherwise, false.
        /// </returns>
        if (path !== null) {
            if (!this.CheckInvalidPathChars(path)) {
                var length = path.length;
                if (length >= 1 && (path.charAt(0) === this.DirectorySeparatorChar || path.charAt(0) === this.AltDirectorySeparatorChar) || length >= 2 && path.charAt(1) === this.VolumeSeparatorChar) {
                    return true;
                }
            }
        }
        return false;
    };
    //---------------------------------------------------------
    this.Combine = function (path1, path2) {
        /// <summary>
        /// Combines two path strings.
        /// </summary>
        /// <param type="String" type="path1">The first path.</param>
        /// <param type="String" type="path2">The second path.</param>
        /// <returns type="Bool">
        /// A string containing the combined paths. If one of the specified paths is
        /// a zero-length string, this method returns the other path. If path2 contains
        /// an absolute path, this method returns path2.
        /// </returns>
        if (path1 !== null && path2 !== null) {
            if (!(this.CheckInvalidPathChars(path1) || this.CheckInvalidPathChars(path2))) {
                if (path2.length === 0) {
                    return path1;
                }
                if (path1.length === 0) {
                    return path2;
                }
                if (this.IsPathRooted(path2)) {
                    return path2;
                }
                var ch = path1.charAt(path1.length - 1);
                if (ch !== this.DirectorySeparatorChar && ch !== this.AltDirectorySeparatorChar && ch !== this.VolumeSeparatorChar) {
                    return path1 + this.DirectorySeparatorChar + path2;
                }
                return path1 + path2;
            }
        }
    };
    //---------------------------------------------------------
    this.Initialize = function () {
    };
    this.Initialize.apply(this, arguments);
};



//=============================================================================
// CLASS: System.IO.Stream
//-----------------------------------------------------------------------------

System.IO.Stream = function () {
    /// <summary>
    /// Initializes a new instance of the <see cref="T:System.IO.Stream" /> class. 
    /// </summary>
    /// <param name="buffer">The array of unsigned bytes from which to create the current stream.</param>
    /// <remarks>Created for encryption. System.IO.FileStream can be created with same functions.
    /// in order to encrypt/decrypt directry to/from file.
    /// </remarks>
    //---------------------------------------------------------
    // Public Properties
    this.Buffer = [];
    // The length of the stream in bytes
    this.Capacity = 0;
    // Number of bytes allocated for this stream.
    this.Length = 0;
    // Current position within the stream.
    this.Position = 0;
    // Gets a value indicating whether the current stream supports writing.
    this.CanWrite = true;
    this.CanRead = true;
    //---------------------------------------------------------
    // Private Properties.
    var isServerSide = false;
    var stream = null;
    var adTypeBinary = 1, adTypeText = 2, adSaveCreateOverWrite = 2;
    //---------------------------------------------------------
    this.Read = function (buffer, offset, count) {
        /// <summary>
        /// Reads a block of bytes from the current stream and writes the data to 'buffer'.
        /// <symmary>
        /// <param name="buffer">The buffer to read data to.</param>
        /// <param name="offset">The byte offset in buffer at which to begin reading.</param>
        /// <param name="count">The maximum number of bytes to read.</param>
        /// <returns> The total number of bytes read into the buffer. This can be less than the number of bytes requested if that many bytes are not currently available, or zero (0) if the end of the stream has been reached.</returns>
        if (offset + count > buffer.length) {
            throw new System.Exception("The sum of 'offset' and 'count' is larger than the 'buffer' length.");
        }
        var num = 0;
        if (isServerSide) {
            /* */
        } else {
            num = Math.min(count, this.Buffer.length - this.Position);
            for (var i = 0; i < num; i++) {
                buffer[offset + i] = this.Buffer[this.Position + i];
            }
            this.Position += num;
        }
        return num;
    };
    //---------------------------------------------------------
    this.ToArray = function () {
        /// <summary>
        /// Writes the stream contents to a byte array, regardless of the System.IO.MemoryStream.Position
        ///  property.
        /// <symmary>
        /// <returns>A new byte array.</returns>
        var array = [];
        if (isServerSide) {
            /* */
        } else {
            array = this.Buffer.slice(0, this.Buffer.length);
        }
        return array;
    };
    //---------------------------------------------------------
    this.Flush = function () {
        /// <summary>
        /// Flush stream.
        /// <symmary>
        if (isServerSide) {
            /* */
        } else {
            /* */
        }
    };
    //---------------------------------------------------------
    this.Write = function (buffer, offset, count) {
        /// <summary>
        /// Writes a block of bytes to the current stream using data read from 'buffer'.
        /// <symmary>
        /// <param name="buffer">The buffer to write data from.</param>
        /// <param name="offset">The byte offset in buffer at which to begin writing from.</param>
        /// <param name="count">The maximum number of bytes to write.</param>
        if (offset + count > buffer.length) {
            throw new System.Exception("The sum of 'offset' and 'count' is greater than the 'buffer' length.");
        }
        if (isServerSide) {
            //stream.Write(contents);
        } else {

            for (var i = 0; i < count; i++) {
                this.Buffer[this.Position + i] = buffer[offset + i];
            }
            this.Position += count;
        }
    };
    //---------------------------------------------------------
    this.WriteTo = function (stream) {
        /// <summary>
        /// Writes the entire contents of this memory stream to another stream.
        /// <summary>
        /// <param name="stream">The stream to write this memory stream to.</param>
        if (isServerSide) {
            /* */
        } else {
            stream.Write(this.Buffer, 0, this.Buffer.length);
        }
    };
    //---------------------------------------------------------
    this.Close = function () {
        /// <summary>
        /// Closes the current stream and releases any resources (such as sockets and file handles) associated with the current stream.
        /// </summary>
        if (isServerSide) {
            stream.Close();
        } else {
            this.Dispose(true);
        }
    };
    //---------------------------------------------------------
    this.CopyTo = function (destination, bufferSize) {
        if (arguments.length === 1) bufferSize = 0x1000;
        var num = 0;
        var buffer = new System.Byte(bufferSize);
        while ((num = this.Read(buffer, 0, buffer.length)) !== 0) {
            destination.Write(buffer, 0, num);
        }
    };
    //---------------------------------------------------------
    this.Dispose = function () {
        //delete this.Buffer;
        //delete this.Stream;
        if (arguments.length === 0) this.Dispose_0();
        if (arguments.length === 1) this.Dispose_1(true);
    };
    this.Dispose_0 = function () {
        this.Close();
    };
    this.Dispose_1 = function (disposing) {
    };
    //---------------------------------------------------------
    this.Initialize = function () {
        // isServerSide = (typeof(Response) == "object");
        if (isServerSide) {
            // Create Stream object
            stream = Server.CreateObject("ADODB.Stream");
            // Specify stream type - we want To save text/string data.
            stream.Type = adTypeBinary;
            // Open the stream.
            stream.Open();
        } else {
            if (arguments[0]) {
                var buffer = arguments[0];
                this.Write(buffer, 0, buffer.length);
                this.Capacity = buffer.length;
                this.Length = buffer.length;
                this.Position = 0;
            }
        }
    };
    this.Initialize.apply(this, arguments);
};
System.Type.RegisterClass("System.IO.Stream");

//=============================================================================
// CLASS: System.IO.MemoryStream
//-----------------------------------------------------------------------------

System.IO.MemoryStream = function (buffer) {
    /// <summary>
    /// Initializes a new instance of the System.IO.MemoryStream class with an expandable
    /// capacity initialized to zero.
    /// </summary>
    var base = System.Type.Inherits(this, new System.IO.Stream());
    this.Initialize.apply(this, arguments);
};
System.Type.RegisterClass("System.IO.MemoryStream");

//=============================================================================
// CLASS: System.IO.MemoryStream
//-----------------------------------------------------------------------------

System.IO.InvalidDataException = function (message) {
    /// <summary>The exception that is thrown when a data stream is in an invalid format.</summary>
    /// <param name="message"" type="String" optional="true" mayBeNull="true">The error message that explains the reason for the exception.</param>
    var base = new System.Type.Inherits(this, new System.Exception());
    this.message = "";
    this.message += message ? message : "Invalid Data.";
    var err = Error.create(this.message, { name: this.GetType().FullName });
    err.popStackFrame();
    return err;
};
System.Type.RegisterClass("System.IO.InvalidDataException");

//==============================================================================
// END
//------------------------------------------------------------------------------


//=============================================================================
// Jocys.com JavaScript.NET Classes               (In C# Object Oriented Style)
// Created by Evaldas Jocys <evaldas@jocys.com>
//=============================================================================
/// <reference path="System.debug.js" />
//=============================================================================
// Namespaces
//-----------------------------------------------------------------------------
// <PropertyGroup>
//		<RootNamespace>System.Text</RootNamespace>
// <PropertyGroup>
//-----------------------------------------------------------------------------

System.Char.UNICODE_PLANE00_END = 0xFFFF;
// The starting code point for Unicode plane 1.  Plane 1 contains 0x010000 ~ 0x01FFFF.
System.Char.UNICODE_PLANE01_START = 0x10000;
// The end code point for Unicode plane 16.
// This is the maximum code point value allowed for Unicode.
// Plane 16 contains 0x100000 ~ 0x10ffff.
System.Char.UNICODE_PLANE16_END = 0x10FFFF;
System.Char.HIGH_SURROGATE_START = 0xD800;
System.Char.HIGH_SURROGATE_END = 0xDBFF;
System.Char.LOW_SURROGATE_START = 0xDC00;
System.Char.LOW_SURROGATE_END = 0xDFFF;

System.Char.IsHighSurrogate = function (s, index) {
    /// <summary>Indicates whether the char at the specified position in a string is a high surrogate.</summary>
    /// <param name="s">A string.</param>
    /// <param name="index">The position of the character to evaluate in s.</param>
    /// <returns>True if the numeric value of the specified character in the s parameter is high surrogate; otherwise, false.</returns>
    var code = s.charCodeAt(index);
    // From: ‭110110 0000000000‬
    // To:   110110 1111111111‬
    return 0xD800 <= code && code <= 0xDBFF;
};

System.Char.IsLowSurrogate = function (s, index) {
    /// <summary>Indicates whether the char at the specified position in a string is a low surrogate.</summary>
    /// <param name="s">A string.</param>
    /// <param name="index">The position of the character to evaluate in s.</param>
    /// <returns>True if the numeric value of the specified character is low surrogate; otherwise, false.</returns>
    var code = s.charCodeAt(index);
    // From: 110111 0000000000‬
    // To:   ‭110111 1111111111‬
    return 0xDC00 <= code && code <= 0xDFFF;
};


System.Char._ConvertToUtf32_1 = function (highSurrogate, lowSurrogate) {
    /// <summary>Converts the value of a UTF-16 encoded surrogate pair into a Unicode code point.</summary>
    /// <param name="highSurrogate">A high surrogate code unit.</param>
    /// <param name="lowSurrogate">A low surrogate code unit.</param>
    /// <returns>The 21-bit Unicode code point represented by the highSurrogate and lowSurrogate parameters.</returns>
    if (typeof highSurrogate === "string" && typeof lowSurrogate === "string") {
        highSurrogate = highSurrogate.charCodeAt(0);
        lowSurrogate = lowSurrogate.charCodeAt(0);
    }
    return (highSurrogate - 0xD800) * 0x400 + lowSurrogate - 0xDC00 + 0x10000;
};

System.Char._ConvertToUtf32_2 = function (s, index) {
    /// <summary>
    /// Converts the value of a UTF - 16 encoded character or surrogate pair at a specified
    /// position in a string into a Unicode code point.
    /// </summary >
    /// <param name="s"> A string that contains a character or surrogate pair.</param>
    /// <param name="index"> The index position of the character or surrogate pair in s.</param>
    /// <returns>The 21-bit Unicode code point represented by the highSurrogate and lowSurrogate parameters.</returns>
    if (index < s.length - 1 && System.Char.IsHighSurrogate(s, index) && System.Char.IsLowSurrogate(s, index + 1)) {
        var highSurrogate = s.charCodeAt(index);
        var lowSurrogate = s.charCodeAt(index + 1);
        return System.Char._ConvertToUtf32_1(highSurrogate, lowSurrogate);
    } else {
        return s.charCodeAt(index);
    }
};

System.Char.ConvertToUtf32 = function () {
    if (typeof arguments[0] === "string" && typeof arguments[1] === "number") {
        return System.Char._ConvertToUtf32_2(arguments[0], arguments[1]);
    } else {
        return System.Char._ConvertToUtf32_1(arguments[0], arguments[1]);
    }
};

System.Char.ConvertFromUtf32 = function (utf32) {
    /// <summary>Converts the specified Unicode code point into a UTF-16 encoded string.</summary>
    /// <param name="utf32">A 21-bit Unicode code point.</param>
    /// <returns>A string consisting of one surrogate pair</returns>
    //
    // If this is a Unicode plane 1 (BMP) character then...
    if (utf32 < 0x10000)
        return String.fromCharCode(utf32);
    // Convert it to a surrogate pair in UTF-16.
    utf32 -= 0x10000;
    var highSurrogate = utf32 / 0x400 + 0xD800;
    var lowSurrogate = utf32 % 0x400 + 0xDC00;
    var c1 = String.fromCharCode(highSurrogate);
    var c2 = String.fromCharCode(lowSurrogate);
    return c1 + c2;
};

//-----------------------------------------------------------------------------

System.Type.RegisterNamespace("System.Text");

// HtmlDecode http://lab.msdn.microsoft.com/annotations/htmldecode.js
//   client side version of the useful Server.HtmlDecode method
//   takes one string (encoded) and returns another (decoded)

System.Text.PadZeros = function (num, totalLen) {
    /// <summary>
    /// This function returns a string padded with leading zeros
    /// </summary>
    // Initialize return value as string
    var numStr = num.toString();
    var numZeros = totalLen - numStr.length; // Calculate no. of zeros
    if (numZeros > 0) {
        for (var i = 1; i <= numZeros; i++) {
            numStr = "0" + numStr;
        }
    }
    return numStr;
};

System.Text.Trim = function (valText, valSymbols) {
    /// <summary>
    /// Trim symbols from string.
    /// </summary>
    if (valSymbols === null) valSymbols = " ";
    var trimS = new RegExp("^[" + valSymbols + "]+", "g");
    var trimE = new RegExp("[" + valSymbols + "]+$", "g");
    var newText = "";
    newText = valText.replace(trimS, "");
    newText = newText.replace(trimE, "");
    return newText;
};

System.Text.ToTitleCase = function (s) {
    /// <summary>
    /// Converts the first character of a word to uppercase in the string.
    /// </summary>
    var r1 = new RegExp("([A-Z])([A-Z]+)", "ig");
    // Declare private function ConvertCase.
    function ConvertCase(a, b, c) {
        // b = $1, c = $2.
        return b.toUpperCase() + c.toLowerCase();
    }
    var results = s.replace(r1, ConvertCase);
    return results;
};


System.Text.ToCamelCase = function (s) {
    /// <summary>
    /// Camel words of the string (firstLetterIsLowerRestCapital).
    /// </summary>
    var r1 = new RegExp("([A-Z])([A-Z]+)", "ig");
    // Declare private function ConvertCase.
    function ConvertCase(a, b, c) {
        // b = $1, c = $2.
        return b.toUpperCase() + c.toLowerCase();
    }
    var results = s.replace(r1, ConvertCase);
    return results;
};

System.Text.HtmlSymbolCodes = {
    /// <summary>
    /// 
    /// </summary>
    0x0022: "quot",
    0x0026: "amp",
    0x003c: "lt",
    0x003e: "gt",
    0x00a0: "nbsp",
    0x00a1: "iexcl",
    0x00a2: "cent",
    0x00a3: "pound",
    0x00a4: "curren",
    0x00a5: "yen",
    0x00a6: "brvbar",
    0x00a7: "sect",
    0x00a8: "uml",
    0x00a9: "copy",
    0x00aa: "ordf",
    0x00ab: "laquo",
    0x00ac: "not",
    0x00ad: "shy",
    0x00ae: "reg",
    0x00af: "macr",
    0x00b0: "deg",
    0x00b1: "plusmn",
    0x00b2: "sup2",
    0x00b3: "sup3",
    0x00b4: "acute",
    0x00b5: "micro",
    0x00b6: "para",
    0x00b7: "middot",
    0x00b8: "cedil",
    0x00b9: "sup1",
    0x00ba: "ordm",
    0x00bb: "raquo",
    0x00bc: "frac14",
    0x00bd: "frac12",
    0x00be: "frac34",
    0x00bf: "iquest",
    0x00c0: "Agrave",
    0x00c1: "Aacute",
    0x00c2: "Acirc",
    0x00c3: "Atilde",
    0x00c4: "Auml",
    0x00c5: "Aring",
    0x00c6: "AElig",
    0x00c7: "Ccedil",
    0x00c8: "Egrave",
    0x00c9: "Eacute",
    0x00ca: "Ecirc",
    0x00cb: "Euml",
    0x00cc: "Igrave",
    0x00cd: "Iacute",
    0x00ce: "Icirc",
    0x00cf: "Iuml",
    0x00d0: "ETH",
    0x00d1: "Ntilde",
    0x00d2: "Ograve",
    0x00d3: "Oacute",
    0x00d4: "Ocirc",
    0x00d5: "Otilde",
    0x00d6: "Ouml",
    0x00d7: "times",
    0x00d8: "Oslash",
    0x00d9: "Ugrave",
    0x00da: "Uacute",
    0x00db: "Ucirc",
    0x00dc: "Uuml",
    0x00dd: "Yacute",
    0x00de: "THORN",
    0x00df: "szlig",
    0x00e0: "agrave",
    0x00e1: "aacute",
    0x00e2: "acirc",
    0x00e3: "atilde",
    0x00e4: "auml",
    0x00e5: "aring",
    0x00e6: "aelig",
    0x00e7: "ccedil",
    0x00e8: "egrave",
    0x00e9: "eacute",
    0x00ea: "ecirc",
    0x00eb: "euml",
    0x00ec: "igrave",
    0x00ed: "iacute",
    0x00ee: "icirc",
    0x00ef: "iuml",
    0x00f0: "eth",
    0x00f1: "ntilde",
    0x00f2: "ograve",
    0x00f3: "oacute",
    0x00f4: "ocirc",
    0x00f5: "otilde",
    0x00f6: "ouml",
    0x00f7: "divide",
    0x00f8: "oslash",
    0x00f9: "ugrave",
    0x00fa: "uacute",
    0x00fb: "ucirc",
    0x00fc: "uuml",
    0x00fd: "yacute",
    0x00fe: "thorn",
    0x00ff: "yuml",
    0x0152: "OElig",
    0x0153: "oelig",
    0x0160: "Scaron",
    0x0161: "scaron",
    0x0178: "Yuml",
    0x0192: "fnof",
    0x02c6: "circ",
    0x02dc: "tilde",
    0x0391: "Alpha",
    0x0392: "Beta",
    0x0393: "Gamma",
    0x0394: "Delta",
    0x0395: "Epsilon",
    0x0396: "Zeta",
    0x0397: "Eta",
    0x0398: "Theta",
    0x0399: "Iota",
    0x039a: "Kappa",
    0x039b: "Lambda",
    0x039c: "Mu",
    0x039d: "Nu",
    0x039e: "Xi",
    0x039f: "Omicron",
    0x03a0: "Pi",
    0x03a1: "Rho",
    0x03a3: "Sigma",
    0x03a4: "Tau",
    0x03a5: "Upsilon",
    0x03a6: "Phi",
    0x03a7: "Chi",
    0x03a8: "Psi",
    0x03a9: "Omega",
    0x03b1: "alpha",
    0x03b2: "beta",
    0x03b3: "gamma",
    0x03b4: "delta",
    0x03b5: "epsilon",
    0x03b6: "zeta",
    0x03b7: "eta",
    0x03b8: "theta",
    0x03b9: "iota",
    0x03ba: "kappa",
    0x03bb: "lambda",
    0x03bc: "mu",
    0x03bd: "nu",
    0x03be: "xi",
    0x03bf: "omicron",
    0x03c0: "pi",
    0x03c1: "rho",
    0x03c2: "sigmaf",
    0x03c3: "sigma",
    0x03c4: "tau",
    0x03c5: "upsilon",
    0x03c6: "phi",
    0x03c7: "chi",
    0x03c8: "psi",
    0x03c9: "omega",
    0x03d1: "thetasym",
    0x03d2: "upsih",
    0x03d6: "piv",
    0x2002: "ensp",
    0x2003: "emsp",
    0x2009: "thinsp",
    0x200c: "zwnj",
    0x200d: "zwj",
    0x200e: "lrm",
    0x200f: "rlm",
    0x2013: "ndash",
    0x2014: "mdash",
    0x2018: "lsquo",
    0x2019: "rsquo",
    0x201a: "sbquo",
    0x201c: "ldquo",
    0x201d: "rdquo",
    0x201e: "bdquo",
    0x2020: "dagger",
    0x2021: "Dagger",
    0x2022: "bull",
    0x2026: "hellip",
    0x2030: "permil",
    0x2032: "prime",
    0x2033: "Prime",
    0x2039: "lsaquo",
    0x203a: "rsaquo",
    0x203e: "oline",
    0x2044: "frasl",
    0x20ac: "euro",
    0x2111: "image",
    0x2118: "weierp",
    0x211c: "real",
    0x2122: "trade",
    0x2135: "alefsym",
    0x2190: "larr",
    0x2191: "uarr",
    0x2192: "rarr",
    0x2193: "darr",
    0x2194: "harr",
    0x21b5: "crarr",
    0x21d0: "lArr",
    0x21d1: "uArr",
    0x21d2: "rArr",
    0x21d3: "dArr",
    0x21d4: "hArr",
    0x2200: "forall",
    0x2202: "part",
    0x2203: "exist",
    0x2205: "empty",
    0x2207: "nabla",
    0x2208: "isin",
    0x2209: "notin",
    0x220b: "ni",
    0x220f: "prod",
    0x2211: "sum",
    0x2212: "minus",
    0x2217: "lowast",
    0x221a: "radic",
    0x221d: "prop",
    0x221e: "infin",
    0x2220: "ang",
    0x2227: "and",
    0x2228: "or",
    0x2229: "cap",
    0x222a: "cup",
    0x222b: "int",
    0x2234: "there4",
    0x223c: "sim",
    0x2245: "cong",
    0x2248: "asymp",
    0x2260: "ne",
    0x2261: "equiv",
    0x2264: "le",
    0x2265: "ge",
    0x2282: "sub",
    0x2283: "sup",
    0x2284: "nsub",
    0x2286: "sube",
    0x2287: "supe",
    0x2295: "oplus",
    0x2297: "otimes",
    0x22a5: "perp",
    0x22c5: "sdot",
    0x2308: "lceil",
    0x2309: "rceil",
    0x230a: "lfloor",
    0x230b: "rfloor",
    0x2329: "lang",
    0x232a: "rang",
    0x25ca: "loz",
    0x2660: "spades",
    0x2663: "clubs",
    0x2665: "hearts",
    0x2666: "diams"
};

System.Text.HtmlChars = {};

for (var property in System.Text.HtmlSymbolCodes) {
    var name = System.Text.HtmlSymbolCodes[property];
    System.Text.HtmlChars[name] = String.fromCharCode(property);
}

System.Text.HtmlDecode = function (s) {
    /// <summary>
    /// 
    /// </summary>
    var out = "";
    if (s !== null) {
        var l = s.length;
        for (var i = 0; i < l; i++) {
            var ch = s.charAt(i);
            if (ch === '&') {
                var semicolonIndex = s.indexOf(';', i + 1);
                if (semicolonIndex > 0) {
                    var entity = s.substring(i + 1, semicolonIndex);
                    if (entity.length > 1 && entity.charAt(0) === '#') {
                        if (entity.charAt(1) === 'x' || entity.charAt(1) === 'X') {
                            ch = String.fromCharCode(eval('0' + entity.substring(1)));
                        } else {
                            ch = String.fromCharCode(eval(entity.substring(1)));
                        }
                    } else {
                        ch = System.Text.HtmlChars[entity] ? System.Text.HtmlChars[entity] : '';
                    }
                    i = semicolonIndex;
                }
            }
            out += ch;
        }
    }
    return out;
};

//==============================================================================
// CLASS: System.Text.StringArray
//------------------------------------------------------------------------------

System.Text.StringArray = {};

System.Text.StringArray.ToArray = function (values) {
    /// <summary>
    /// 
    /// </summary>
};

System.Text.StringArray.AddValue = function (values, value, addValue) {
    /// <summary>
    /// 
    /// </summary>
    // Replace semi-comas with comas.
    var rxSemi = new RegExp(";", "g");
    values = values.replace(rxSemi, ",");
    // Remove all non allowed chars.
    var rxNonAllowedChars = new RegExp("[^a-z0-9,\\\\]", "gi");
    // Replace line ends with comas.
    values = values.replace(new RegExp("^.*<", "g"), ",");
    values = values.replace(rxNonAllowedChars, "");
    // Make sure that one coma is at the front and at the end.
    values = "," + System.Text.Trim(values, ",") + ",";
    // Remove old value.
    var valueToAdd = System.Text.Trim(value, " ");
    values = values.replace("," + valueToAdd + ",", ",", "gi");
    // Remove last coma;
    values = System.Text.Trim(values, ",");
    //	//var rgxComas = new RegExp(",,","g");
    //	//values = values.replace(rgxComas,", ");
    if (addValue !== false) {
        // Remove text from outside '<' and '>' brackets.
        var rgxFilter1 = new RegExp("^.*<", "g");
        var rgxFilter2 = new RegExp(">.*$", "g");
        valueToAdd = valueToAdd.replace(rgxFilter1, "");
        valueToAdd = valueToAdd.replace(rgxFilter2, "");
        // Add value.
        values = values + "," + valueToAdd;
    }
    // Remove comas from both sides.
    values = System.Text.Trim(values, ",");

    // Add spaces.
    var rxComa = new RegExp(",", "gi");
    values = values.replace(rxComa, ", ");
    return values;
};

System.Text.StringArray.IsMatch = function (values, value) {
    /// <summary>
    /// 
    /// </summary>
    var rxNonAllowedChars = new RegExp("[^a-z0-9,\\\\]", "gi");
    values = values.replace(rxNonAllowedChars, "");
    var regExp = new RegExp("^" + value + ",|," + value + ",|," + value + "$|^" + value + "$", "gi");
    var match = values.match(regExp);
    var isMatch = match !== null;
    return isMatch;
};


System.Type.RegisterNamespace("System.Text.RegularExpressions.Templates");

//=============================================================================

// w[.w]@w[.w].[w]
System.Text.RegularExpressions.Templates.Email = new RegExp("^[A-Z0-9_%-]+(|([\.][A-Z0-9_%-]+)+)@[A-Z0-9_%-]+(|([\.][A-Z0-9_%-]+)+)$", "i");
System.Text.RegularExpressions.Templates.EmailStrict = new RegExp("^[A-Z0-9_%-]+(|([\.][A-Z0-9_%-]+)+)@[A-Z0-9_%-]+(|([\.][A-Z0-9_%-]+)+)[\.](([0-9]{1,3})|([A-Z]{2,3})|(aero|coop|info|museum|name))$", "i");

//System.Text.RegularExpressions.Templates.EmailStrict = new RegExp("^([a-zA-Z0-9_\-\.])+@(([0-2]?[0-5]?[0-5]\.[0-2]?[0-5]?[0-5]\.[0-2]?[0-5]?[0-5]\.[0-2]?[0-5]?[0-5])|((([a-zA-Z0-9\-])+\.)+([a-zA-Z\-])+))$","i");

System.Text.RegularExpressions.GetByTag = function (tagName, ignoreCase) {
    // Create regular expression. Replace will be global (g - replace all).
    // The non-greedy repeats are possible by appending a '?' after the repeat;
    // a non-greedy repeat is one which will match the shortest possible string.
    var regex = new RegExp("<\s*" + tagName + "[^>]*>(.*?)<\s*/" + tagName + "\s*>", "g");
    // Set ignore case (by default case sensitive).
    regex.ignoreCase = ignoreCase === true;
    // Return results.
    return regex;
};

System.Text.RegularExpressions.GetMatch = function (text, matchPattern, variable) {
    // Get first match;
    var results = "";
    if (variable === null) variable = "$1";
    var regex = new RegExp(matchPattern);
    if (text.match(regex) !== null) {
        var textMatch = text.match(regex)[0];
        // extract variable;
        results = textMatch.replace(regex, variable);
    }
    return results;
};

System.Text.RegularExpressions.GetEscapedPattern = function (s) {
    /// <summary>
    /// Get Regular expression pattern from string. All chars will be converted to \uNNNN form.
    /// </summary>
    /// <param name="s">String to convert</param>
    /// <returns>Regular expression pattern</returns>
    var pattern = "";
    for (var i = 0; i < s.length; i++) {
        var hex = s.charCodeAt(i).toString(16);
        pattern += "\\u" + "0000".substr(0, 4 - hex.length) + hex + "";
    }
    return pattern;
};

System.Text.RegularExpressions.Trim = function (text, symbols, escapePattern) {
    /// <summary>
    /// Trim symbols from string. Trim space by default.
    /// </summary>
    /// <returns name="s" type="String">Trimmed string.</returns>
    if (!symbols) symbols = " ";
    var pattern = symbols;
    if (escapePattern) {
        pattern = System.Text.RegularExpressions.GetEscapedPattern(symbols);
    }
    //Trace.Write("call System.Text.RegularExpressions.Trim(text, '"+pattern+"')");
    var trimLeft = new RegExp("^[" + pattern + "]+", "gm");
    var trimRight = new RegExp("[" + pattern + "]+$", "gm");
    var newText = text.replace(trimLeft, "").replace(trimRight, "");
    return newText;
};

System.Text.RegularExpressions.Replace = function (text, findPattern, replacePattern, ignoreCase) {
    text = new String(text);
    // Create regular expression. Replace will be global (g - replace all).
    var regexFind = new RegExp(findPattern, "g");
    // Create regular expression.
    var regexRepl = new RegExp(replacePattern);
    // Set ignore case (by default case sensitive).
    regexFind.ignoreCase = ignoreCase === true;
    // Return results.
    return text.replace(regexFind, replacePattern);
};

//=============================================================================
// CLASS: ControlChars
//-----------------------------------------------------------------------------

System.Text.ControlChars = {
    Tab: 0x9, 	// Tab
    Vt: 0xB, 	// Vertical Tab
    Ff: 0xC, 	// Form Feed
    Space: 0x20, // Space
    Lf: 0xA, 	// Line Feed
    Bs: 0x8, 	// Backspace
    Ht: 0x9, 	// Horizontal Tab
    Dq: 0x22, 	// Double Quote
    Sq: 0x27, 	// Single Quote
    Bh: 0x5C		// Backslash \
};

System.Text.UtfSignatures = {
    Utf16Le: 0xFFFF, // UTF-16 LE (Little Endian) - Windows
    Utf16Be: 0xFEFF, // UTF-16 BE (Big Endian) - Macintosh
    Utf8: 0xEFBBBF		// UTF-8
};


//=============================================================================
// CLASS: StringBuilder
//-----------------------------------------------------------------------------

System.Text.StringBuilder = function (value) {
    //---------------------------------------------------------
    // Private properties.
    var _parts = [];
    //---------------------------------------------------------
    this.Append = function (value, count) {
        var results = true;
        // if value is undefined.
        if (typeof value === 'undefined') {
            results = false;
        } else {
            var c = count ? count : 1;
            for (var i = 0; i < c; i++) {
                _parts.push(value);
            }
        }
        return results;
    };
    //---------------------------------------------------------
    this.AppendLine = function (value) {
        if (typeof value === 'undefined')
            value = "";
        return this.Append(value + '\r\n');
    };
    //---------------------------------------------------------
    this.AppendFormat = function (format, args) {
        var value = String.Format.apply(this, arguments);
        return this.Append(value);
    };
    //---------------------------------------------------------
    this.Clear = function () {
        if (_parts.length > 0) {
            _parts.splice(0, _parts.length);
        }
    };
    //---------------------------------------------------------
    this.IsEmpty = function () {
        return _parts.length === 0;
    };
    //---------------------------------------------------------
    this.ToString = function (delimiter) {
        return _parts.join(delimiter || '');
    };
    //---------------------------------------------------------
    this.ToArray = function (delimiter) {
        return _parts;
    };
    //---------------------------------------------------------
    this.InitializeClass = function () {
        if (value) this.Append(value);
    };
    this.InitializeClass();
};
System.Type.RegisterClass("System.Text.StringBuilder");

//=============================================================================
// CLASS: Encoding
//-----------------------------------------------------------------------------

System.Text.Encoding = function () { };

System.Type.RegisterClass("System.Text.Encoding");

//=============================================================================
// CLASS: Encoder.UTF8
//-----------------------------------------------------------------------------

// https://referencesource.microsoft.com/#mscorlib/system/text/utf8encoding.cs
// UTF-8, a transformation format of ISO 10646:
// http://www.ietf.org/rfc/rfc3629.txt
// Transformation:
// http://www.czyborra.com/utf/
//
//   The table below summarizes the format of these different octet types.
//   The letter x indicates bits available for encoding bits of the
//   character number.
//
//   Bytes | Bits | Char HEX number range | UTF-8 octet sequence (binary)
//   ------+------+-----------------------+-------------------------------------
//      1  |   7  | 0000 0000 - 0000 007F | 0xxxxxxx
//      2  |  11  | 0000 0080 - 0000 07FF | 110xxxxx 10xxxxxx
//      3  |  16  | 0000 0800 - 0000 FFFF | 1110xxxx 10xxxxxx 10xxxxxx
//      4  |  21  | 0001 0000 - 0010 FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
//   ------+------+-----------------------+-------------------------------------
//
System.Text.UTF8Encoder = function () {
    //---------------------------------------------------------
    // Private properties.
    var me = this;
    //---------------------------------------------------------
    this.GetBytes = function (s) {
        /// <summary>Encodes all the characters in the specified string into a sequence of bytes.</summary>
        /// <param name="s">The string containing the characters to encode.</param>
        /// <returns>A byte array containing the results of encoding the specified set of characters.</returns>
        var bytes = [];
        var c = 0;
        for (var i = 0; i < s.length; i++) {
            // If high surrogate code then...
            c = System.Char._ConvertToUtf32_2(s, i);
            // If this is a Unicode Supplementary character then...
            if (c > 0xFFFF)
                i++;
            // Convert char code to bytes.
            if (c < 0x80) {
                bytes.push(c);
            } else if (c < 0x800) {
                bytes.push(0xC0 | c >> 6);
                bytes.push(0x80 | c & 0x3F);
            } else if (c < 0x10000) {
                bytes.push(0xE0 | c >> 12);
                bytes.push(0x80 | c >> 6 & 0x3F);
                bytes.push(0x80 | c & 0x3F);
            } else if (c < 0x200000) {
                bytes.push(0xF0 | c >> 18);
                bytes.push(0x80 | c >> 12 & 0x3F);
                bytes.push(0x80 | c >> 6 & 0x3F);
                bytes.push(0x80 | c & 0x3F);
            } else {
                // If char is unknown then push "?".
                bytes.push(0x3F);
            }
        }
        return bytes;
    };
    //---------------------------------------------------------
    this.GetString = function (bytes, index, count) {
        /// <summary>decodes a sequence of bytes from the specified byte array into a string.</summary>
        /// <param name="bytes">The byte array containing the sequence of bytes to decode.</param>
        /// <param name="index">The index of the first byte to decode.</param>
        /// <param name="count">The number of bytes to decode.</param>
        /// <returns>String containing the results of decoding the specified sequence of bytes.</returns>
        if (typeof index === "undefined")
            index = 0;
        if (typeof count === "undefined")
            count = bytes.length - index;
        var s = "";
        var bytesUsed = { Value: 0 };
        var used = 0;
        while (used < count) {
            s += this.ReadChar(bytes, index + used, bytesUsed);
            used += bytesUsed.Value;
            // If no more bytes to read then...
            if (bytesUsed.Value === 0)
                // Break loop.
                break;
        }
        return s;
    };
    //---------------------------------------------------------
    // Reference Parameters:
    //
    // var bytesUsed = { Value: 0 };
    //
    this.ReadChar = function (bytes, index, out_bytesUsed) {
        /// <summary>Read char from byte array.</summary>
        /// <param name="bytes">The byte array containing the sequence of bytes to decode.</param>
        /// <param name="index">The index of the first byte to decode.</param>
        /// <param name="out_bytesUsed">Contains the number of bytes that were used in decoding.</param>
        /// <returns>Decoded character from the specified sequence of bytes.</returns>
        if (typeof index === "undefined")
            index = 0;
        var c = 0;
        var i = index;
        var ln = bytes.length;
        // If 1 byte (0xxxxxxx) char then...
        if (bytes[i] >> 7 === 0x00) {
            c = bytes[i] & 0x7F;
            out_bytesUsed.Value = 1;
        }
        // If 2 byte (110xxxxx) char and all bytes available then...
        else if (bytes[i] >> 5 === 0x06 && ln > i + 1) {
            c = (bytes[i++] & 0x1F) << 6 | bytes[i] & 0x3F;
            out_bytesUsed.Value = 2;
        }
        // If 3 byte (1110xxxx) char and all bytes available then...
        else if (bytes[i] >> 4 === 0x0E && ln > i + 2) {
            c = (bytes[i++] & 0x0F) << 12 | (bytes[i++] & 0x3F) << 6 | bytes[i] & 0x3F;
            out_bytesUsed.Value = 3;
        }
        // If 4 byte (11110xxx) char and all bytes available then...
        else if (bytes[i] >> 3 === 0x1E && ln > i + 3) {
            c = (bytes[i++] & 0x07) << 18 | (bytes[i++] & 0x3F) << 12 | (bytes[i++] & 0x3F) << 6 | bytes[i] & 0x3F;
            out_bytesUsed.Value = 4;
        }
        // If unknown byte then...
        else {
            c = 0x3F;
            out_bytesUsed.Value = 1;
        }
        return System.Char.ConvertFromUtf32(c);
    };
    //---------------------------------------------------------
    this.InitializeClass = function () {
    };
    this.InitializeClass();
};
System.Type.RegisterClass("System.Text.UTF8Encoder");

// Make it static.
System.Text.Encoding.UTF8 = new System.Text.UTF8Encoder();

//=============================================================================
// CLASS: Encoder.Unicode (UTF-16)
//-----------------------------------------------------------------------------

System.Text.UnicodeEncoder = function () {
    //---------------------------------------------------------
    // Private properties.
    var me = this;
    //---------------------------------------------------------
    this.GetBytes = function (s) {
        /// <summary>Encodes all the characters in the specified string into a sequence of bytes.</summary>
        /// <param name="s">The string containing the characters to encode.</param>
        /// <returns>A byte array containing the results of encoding the specified set of characters.</returns>
        var bytes = [];
        var c = 0;
        for (var i = 0; i < s.length; i++) {
            c = s.charCodeAt(i);
            // If this is a Unicode Supplementary character then...
            if (c > 0xFFFF) {
                // Create a high surrogate code unit.
                bytes.push(0xDC00 | c & 0x03FF);
                // Create a low surrogate code unit.
                bytes.push(0xD7C0 + (c >> 10));
            } else {
                bytes.push(c & 0xFF);
                bytes.push(c >> 8);
            }
        }
        return bytes;
    };
    //---------------------------------------------------------
    this.GetString = function (bytes, index, count) {
        /// <summary>decodes a sequence of bytes from the specified byte array into a string.</summary>
        /// <param name="bytes">The byte array containing the sequence of bytes to decode.</param>
        /// <param name="index">The index of the first byte to decode.</param>
        /// <param name="count">The number of bytes to decode.</param>
        /// <returns>String containing the results of decoding the specified sequence of bytes.</returns>
        if (typeof index === "undefined")
            index = 0;
        if (typeof count === "undefined")
            count = bytes.length - index;
        var s = "";
        var bytesUsed = { Value: 0 };
        var used = 0;
        while (used < count) {
            s += this.ReadChar(bytes, index + used, bytesUsed);
            used += bytesUsed.Value;
            // If no more bytes to read then...
            if (bytesUsed.Value === 0)
                // Break loop.
                break;
        }
        return s;
    };
    //---------------------------------------------------------
    // Reference Parameters:
    //
    // var bytesUsed = { Value: 0 };
    //
    this.ReadChar = function (bytes, index, out_bytesUsed) {
        /// <summary>Read char from byte array.</summary>
        /// <param name="bytes">The byte array containing the sequence of bytes to decode.</param>
        /// <param name="index">The index of the first byte to decode.</param>
        /// <param name="out_bytesUsed">Contains the number of bytes that were used in decoding.</param>
        /// <returns>Decoded character from the specified sequence of bytes.</returns>
        if (typeof index === "undefined")
            index = 0;
        var i = index;
        var b1 = bytes[i++];
        var b2 = bytes[i++];
        var code = b2 << 8 | b1;
        var s = String.fromCharCode(code);
        out_bytesUsed.Value = 2;
        // If next 2 bytes available and high surrogate then...
        if (i < bytes.length - 1 && 0xD800 <= code && code <= 0xDBFF) {
            b1 = bytes[i++];
            b2 = bytes[i++];
            code = b2 << 8 | b1;
            // If low surrogate then...
            if (0xDC00 <= code && code <= 0xDFFF) {
                s += String.fromCharCode(code);
                out_bytesUsed.Value = 4;
            }
        }
        return s;
    };
    //---------------------------------------------------------
    this.InitializeClass = function () {
    };
    this.InitializeClass();
};
System.Type.RegisterClass("System.Text.UnicodeEncoder");

// Make it static.
System.Text.Encoding.Unicode = new System.Text.UnicodeEncoder();

//=============================================================================
// CLASS: Encoder.UTF32
//-----------------------------------------------------------------------------

System.Text.UTF32Encoder = function () {
    //---------------------------------------------------------
    // Private properties.
    var me = this;
    //---------------------------------------------------------
    this.GetBytes = function (s) {
        /// <summary>Encodes all the characters in the specified string into a sequence of bytes.</summary>
        /// <param name="s">The string containing the characters to encode.</param>
        /// <returns>A byte array containing the results of encoding the specified set of characters.</returns>
        var bytes = [];
        var c = 0;
        for (var i = 0; i < s.length; i++) {
            // If high surrogate code then...
            c = System.Char._ConvertToUtf32_2(s, i);
            // Push bytes.
            bytes.push(c & 0xFF);
            bytes.push(c >> 8 & 0xFF);
            bytes.push(c >> 16 & 0xFF);
            bytes.push(c >> 24 & 0xFF);
            // If this is a Unicode Supplementary character then...
            if (c > 0xFFFF)
                i++;
        }
        return bytes;
    };
    //---------------------------------------------------------
    this.GetString = function (bytes, index, count) {
        /// <summary>decodes a sequence of bytes from the specified byte array into a string.</summary>
        /// <param name="bytes">The byte array containing the sequence of bytes to decode.</param>
        /// <param name="index">The index of the first byte to decode.</param>
        /// <param name="count">The number of bytes to decode.</param>
        /// <returns>String containing the results of decoding the specified sequence of bytes.</returns>
        if (typeof index === "undefined")
            index = 0;
        if (typeof count === "undefined")
            count = bytes.length - index;
        var s = "";
        var bytesUsed = { Value: 0 };
        var used = 0;
        while (used < count) {
            s += this.ReadChar(bytes, index + used, bytesUsed);
            used += bytesUsed.Value;
            // If no more bytes to read then...
            if (bytesUsed.Value === 0)
                // Break loop.
                break;
        }
        return s;
    };
    //---------------------------------------------------------
    // Reference Parameters:
    //
    // var bytesUsed = { Value: 0 };
    //
    this.ReadChar = function (bytes, index, out_bytesUsed) {
        /// <summary>Read char from byte array.</summary>
        /// <param name="bytes">The byte array containing the sequence of bytes to decode.</param>
        /// <param name="index">The index of the first byte to decode.</param>
        /// <param name="out_bytesUsed">Contains the number of bytes that were used in decoding.</param>
        /// <returns>Decoded character from the specified sequence of bytes.</returns>
        if (typeof index === "undefined")
            index = 0;
        var i = index;
        var b1 = 0;
        var b2 = 0;
        var b3 = 0;
        var b4 = 0;
        var code = 0;
        b1 = bytes[i++];
        b2 = bytes[i++];
        b3 = bytes[i++];
        b4 = bytes[i];
        code = b4 << 24 | b3 << 16 | b2 << 8 | b1;
        out_bytesUsed.Value = 4;
        var s = System.Char.ConvertFromUtf32(code);
        return s;
    };
    //---------------------------------------------------------
    this.InitializeClass = function () {
    };
    this.InitializeClass();
};
System.Type.RegisterClass("System.Text.UTF32Encoder");

// Make it static.
System.Text.Encoding.UTF32 = new System.Text.UTF32Encoder();

//=============================================================================
// CLASS: Encoder.ASCII
//-----------------------------------------------------------------------------

System.Text.ASCIIEncoder = function () {
    //---------------------------------------------------------
    // Private properties.
    var me = this;
    //---------------------------------------------------------
    this.GetBytes = function (s) {
        /// <summary>
        /// Get array of bytes.
        /// </summary>
        var bytes = [];
        var c = 0;
        for (var i = 0; i < s.length; i++) {
            c = s.charCodeAt(i);
            // Reduce to 16 bytes.
            if (c > 0xFF) {
                bytes.push(0x3F);
            } else {
                bytes.push(c);
            }
        }
        return bytes;
    };
    //---------------------------------------------------------
    this.GetString = function (bytes, index, count) {
        /// <summary>decodes a sequence of bytes from the specified byte array into a string.</summary>
        /// <param name="bytes">The byte array containing the sequence of bytes to decode.</param>
        /// <param name="index">The index of the first byte to decode.</param>
        /// <param name="count">The number of bytes to decode.</param>
        /// <returns>String containing the results of decoding the specified sequence of bytes.</returns>
        if (typeof index === "undefined")
            index = 0;
        if (typeof count === "undefined")
            count = bytes.length - index;
        var s = "";
        var bytesUsed = { Value: 0 };
        var used = 0;
        while (used < count) {
            s += this.ReadChar(bytes, index + used, bytesUsed);
            used += bytesUsed.Value;
            // If no more bytes to read then...
            if (bytesUsed.Value === 0)
                // Break loop.
                break;
        }
        return s;
    };
    //---------------------------------------------------------
    // Reference Parameters:
    //
    // var bytesUsed = { Value: 0 };
    //
    this.ReadChar = function (bytes, index, out_bytesUsed) {
        /// <summary>Read char from byte array.</summary>
        /// <param name="bytes">The byte array containing the sequence of bytes to decode.</param>
        /// <param name="index">The index of the first byte to decode.</param>
        /// <param name="out_bytesUsed">Contains the number of bytes that were used in decoding.</param>
        /// <returns>Decoded character from the specified sequence of bytes.</returns>
        if (typeof index === "undefined")
            index = 0;
        out_bytesUsed.Value = 1;
        var s = String.fromCharCode(bytes[index]);
        return s;
    };
    //---------------------------------------------------------
    // Reference Parameters:
    //
    // var bytesUsed = { Value: 0 };
    // var charsUsed = { Value: 0 };
    // var completed = { Value: 0 };
    //
    this.Convert = function (bytes, byteIndex, byteCount, chars, charIndex, charCount, flush, out_bytesUsed, out_charsUsed, out_completed) {
        /// <summary>Converts an array of encoded bytes to UTF-16 encoded characters and stores the result in a byte array.</summary>
        /// <param name="bytes">A byte array to convert.</param>
        /// <param name="byteIndex">The first element of bytes to convert.</param>
        /// <param name="byteCount">The number of elements of bytes to convert.</param>
        /// <param name="chars">An array to store the converted characters.</param>
        /// <param name="charIndex">The first element of chars in which data is stored.</param>
        /// <param name="charCount">The maximum number of elements of chars to use in the conversion.</param>
        /// <param name="flush">True to indicate that no further data is to be converted; otherwise, false.</param>
        /// <param name="bytesUsed">Number of bytes that were used in the conversion.</param>
        /// <param name="charsUsed">number of characters from chars that were produced by the conversion.</param>
        /// <param name="completed">True if all the characters specified by byteCount were converted; otherwise, false.</param>
        for (var i = 0; i < byteCount; i++) {
            var c = String.fromCharCode(bytes[byteIndex + i]);
            chars[charIndex + i] = c;
            out_bytesUsed.Value = i;
            out_charsUsed.Value = i;
            if (charCount >= i)
                break;
        }
        out_completed.Value = true;
    };
    //---------------------------------------------------------
    this.InitializeClass = function () {
    };
    this.InitializeClass();
};
System.Type.RegisterClass("System.Text.ASCIIEncoder");

// Make it static.
System.Text.Encoding.ASCII = new System.Text.ASCIIEncoder();

//==============================================================================
// END
//------------------------------------------------------------------------------



//=============================================================================
// Jocys.com JavaScript.NET Classes               (In C# Object Oriented Style)
// Created by Evaldas Jocys <evaldas@jocys.com>
//=============================================================================
/// <reference path="System.debug.js" />
//=============================================================================
// Namespaces
//-----------------------------------------------------------------------------
// <PropertyGroup>
//		<RootNamespace>System.Convert</RootNamespace>
// <PropertyGroup>
//-----------------------------------------------------------------------------

/// <reference path="System.debug.js" />
System.Convert = System.Convert ? System.Convert : {};
System.Type.RegisterNamespace("System.Convert");

//=============================================================================
// System.Base64FormattingOptions Enum
//-----------------------------------------------------------------------------

System.Base64FormattingOptions = function () {
    /// <summary>Specifies whether relevant methods insert line breaks in their output.</summary>
    /// <field name="None" type="Number" integer="true" static="true">Does not insert line breaks after every 76 characters in the string representation.</field>
    /// <field name="InsertLineBreaks" type="Number" integer="true" static="true">Inserts line breaks after every 76 characters in the string representation.</field>
};

System.Base64FormattingOptions.prototype = {
    None: 0,
    InsertLineBreaks: 1
};

System.Type.RegisterEnum("System.Base64FormattingOptions");

//=============================================================================

System.Convert.Base64Array = function () {
    /// <summary>
    /// Array which makes base64 encoding and decoding faster.
    /// </ summary>
    // Declare string of available chars inside base64.
    this.S = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    this.CA = [];
    this.IA = [];
    //---------------------------------------------------------
    // INIT: Class
    //---------------------------------------------------------
    this.InitializeClass = function () {
        var c = "";
        for (var i = 0; i < this.S.length; i++) {
            c = this.S.charAt(i);
            this.CA[i] = c;
            this.IA[c] = i;
        }
    };
    this.InitializeClass();
};

System.Convert.ToBase64String = function (b, options) {
    /// <summary>
    /// Converts the value of an array of 8-bit unsigned integers to its equivalent
    /// System.String representation encoded with base 64 digits.
    /// </summary>
    /// <param type="byte[]" name="b">An array of 8-bit unsigned integers.</param>
    /// <param type="int" name="options">Specify: 1 - to insert a line break every 76 characters, 0 - to not insert line breaks.</param>
    /// <returns type="string">
    /// The System.String representation, in base 64, of the contents of inArray.
    /// </returns>
    /// <remarks>
    /// A very fast and memory efficient class to encode and decode to and from BASE64
    /// in full accordance with RFC 2045. Based on http://migbase64.sourceforge.net/
    /// Converted to JavaScript by Evaldas Jocys [evaldas@jocys.com], http://www.jocys.com
    /// </remarks>
    var insertBreaks = options === System.Base64FormattingOptions.InsertLineBreaks || options === true;
    var B64 = new System.Convert.Base64Array();
    // Check special case
    var bLen = b ? b.length : 0;
    if (bLen === 0) return new Array(0);
    // Length of even 24-bits.
    var eLen = Math.floor(bLen / 3) * 3;
    // Returned character count.
    var cCnt = (bLen - 1) / 3 + 1 << 2;
    var dLen = cCnt + (insertBreaks ? (cCnt - 1) / 76 << 1 : 0); // Length of returned array
    var dArr = new Array(dLen);
    // Encode even 24-bits.
    for (var s = 0, d = 0, cc = 0; s < eLen;) {
        // Copy next three bytes into lower 24 bits of int, paying attension to sign.
        var i = (b[s++] & 0xff) << 16 | (b[s++] & 0xff) << 8 | b[s++] & 0xff;
        // Encode the int into four chars.
        dArr[d++] = B64.CA[i >>> 18 & 0x3f];
        dArr[d++] = B64.CA[i >>> 12 & 0x3f];
        dArr[d++] = B64.CA[i >>> 6 & 0x3f];
        dArr[d++] = B64.CA[i & 0x3f];
        // Add optional line separator as specified in RFC 2045.
        if (insertBreaks && ++cc === 19 && d < dLen - 2) {
            dArr[d++] = '\r';
            dArr[d++] = '\n';
            cc = 0;
        }
    }
    // Pad and encode last bits if source isn't even 24 bits.
    var left = bLen - eLen; // 0 - 2.
    if (left > 0) {
        // Prepare the int.
        var j = (b[eLen] & 0xff) << 10 | (left === 2 ? (b[bLen - 1] & 0xff) << 2 : 0);
        // Set last four chars.
        dArr[dLen - 4] = B64.CA[j >> 12];
        dArr[dLen - 3] = B64.CA[j >>> 6 & 0x3f];
        dArr[dLen - 2] = left === 2 ? B64.CA[j & 0x3f] : '=';
        dArr[dLen - 1] = '=';
    }
    return dArr.join("");
};

System.Convert.FromBase64String = function (s, fix) {
    /// <summary>
    /// Converts the specified System.String, which encodes binary data as base 64
    /// digits, to an equivalent 8-bit unsigned integer array.
    /// </summary>
    /// <param type="string" name="s">A string.</param>
    /// <param type="bool" name="fix">Fix base64 string by removing all ilegal chars.</param>
    /// <returns type="byte[]">
    /// An array of 8-bit unsigned integers equivalent to s.
    /// </returns>
    /// <remarks>
    /// A very fast and memory efficient class to encode and decode to and from BASE64
    /// in full accordance with RFC 2045. Based on http://migbase64.sourceforge.net/
    /// Converted to JavaScript by Evaldas Jocys [evaldas@jocys.com], http://www.jocys.com
    /// </remarks>
    var B64 = new System.Convert.Base64Array();
    // Check special case
    if (fix) {
        // Remove illegal chars
        var regex = new RegExp("[^" + B64.S + "]", "g");
        s = s.replace(regex, "");
    }
    var sLen = s.length;
    if (sLen === 0) return new Array(0);
    // Start and end index after trimming.
    var sIx = 0, eIx = sLen - 1;
    // Get the padding count (=) (0, 1 or 2).
    var pad = s.charAt(eIx) === '=' ? s.charAt(eIx - 1) === '=' ? 2 : 1 : 0;  // Count '=' at end.
    // Content count including possible separators.
    var cCnt = eIx - sIx + 1;
    var sepLn = s.charAt(76) === '\r' ? cCnt / 78 : 0;
    var sepCnt = sLen > 76 ? sepLn << 1 : 0;
    // The number of decoded bytes.
    var len = ((cCnt - sepCnt) * 6 >> 3) - pad;
    // Preallocate byte[] of exact length.
    var bytes = new Array(len);
    // Decode all but the last 0 - 2 bytes.
    var d = 0;
    var eLen = Math.floor(len / 3) * 3;
    var i;
    for (var cc = 0; d < eLen;) {
        // Assemble three bytes into an var from four "valid" characters.
        i = B64.IA[s.charAt(sIx++)] << 18 |
            B64.IA[s.charAt(sIx++)] << 12 |
            B64.IA[s.charAt(sIx++)] << 6 |
            B64.IA[s.charAt(sIx++)];
        // Add the bytes
        bytes[d++] = i >> 16;
        bytes[d++] = (i & 0xFFFF) >> 8;
        bytes[d++] = i & 0xFF;
        // If line separator, jump over it.
        if (sepCnt > 0 && ++cc === 19) {
            sIx += 2;
            cc = 0;
        }
    }
    if (d < len) {
        // Decode last 1-3 bytes (incl '=') into 1-3 bytes.
        i = 0;
        for (var j = 0; sIx <= eIx - pad; j++) {
            i |= B64.IA[s.charAt(sIx++)] << 18 - j * 6;
        }
        for (var r = 16; d < len; r -= 8) {
            var cropBits = Math.pow(2, r + 8) - 1;
            bytes[d++] = (i & cropBits) >> r;
        }
    }
    return bytes;
};

System.Convert.ToBase64UrlString = function (b, options) {
    /// <summary>
    /// Converts the value of an array of 8-bit unsigned integers to its equivalent
    /// System.String representation encoded with Base64URL digits.
    /// </summary>
    /// <param type="byte[]" name="b">An array of 8-bit unsigned integers.</param>
    /// <param type="int" name="options">Specify: 1 - to insert a line break every 76 characters, 0 - to not insert line breaks.</param>
    /// <returns type="string">
    /// The System.String representation, in Base64URL, of the contents of inArray.
    /// </returns>
    //
    // Use standard base64 encoder.
    var s = System.Convert.ToBase64String(b, options);
    // Remove trailing '='.
    s = s.replace(new RegExp("[=]+$", "g"), "");
    // Replace base64 characters to be URL compatible.
    s = s.replace(new RegExp("[+]", "g"), "-");
    s = s.replace(new RegExp("[/]", "g"), "_");
    return s;
};

System.Convert.FromBase64UrlString = function (s, fix) {
    /// <summary>
    /// Converts the specified System.String, which encodes binary data as Base64URL
    /// digits, to an equivalent 8-bit unsigned integer array.
    /// </summary>
    /// <param type="string" name="s">A string.</param>
    /// <param type="bool" name="fix">Fix base64 string by removing all ilegal chars.</param>
    /// <returns type="byte[]">
    //
    // Restore base64 characters.
    s = s.replace(new RegExp("[-]", "g"), "+");
    s = s.replace(new RegExp("[_]", "g"), "/");
    // Restore trailing '='.
    var len = s.length % 4;
    if (len === 2)
        s += "==";
    if (len === 3)
        s += "=";
    // Use standard base64 encoder.
    var b = System.Convert.FromBase64String(s);
    return b;
};

System.Type.RegisterNamespace("System.Web.HttpServerUtility");
System.Web.HttpServerUtility.UrlTokenDecode = System.Convert.FromBase64UrlString;
System.Web.HttpServerUtility.UrlTokenEncode = System.Convert.ToBase64UrlString;

System.Convert.HexStringToBytes = function (s) {
    /// <summary>
    /// Convert hex string to array of bytes.
    /// </summary>
    /// <param type="string" name="s">Hex string.</param>
    /// <returns type="byte[]">
    /// An array of 8-bit integers.
    /// </returns>
    // If hex prefix exists then...
    if (s.indexOf("0x") === 0 || s.indexOf("0X") === 0) {
        // Remove hex prefix.
        s = s.substring(2);
    }
    // if not even length. Then add leading zero.
    if (s.length % 2 === 1) s = "0" + s;
    var bytes = [];
    for (var i = 0; i < s.length; i += 2) {
        bytes[i / 2] = parseInt(s.slice(i, i + 2), 16);
    }
    return bytes;
};

System.Convert.BytesToHexString = function (bytes, separator) {
    /// <summary>
    /// Array of bytes to hex string.
    /// </summary>
    /// <param type="byte[]" name="bytes">An array of 8-bit integers.</param>
    /// <returns type="string">
    /// Hex string.
    /// </returns>
    var sb = [];
    var s = "";
    if (!bytes) return;
    for (var i = 0; i < bytes.length; i++) {
        var b = bytes[i];
        if (b <= 0xF) sb.push('0' + b.toString(16));
        else sb.push(b.toString(16));
    }
    var sep = separator ? separator : "";
    return sb.join(sep);
};

//==============================================================================
// END
//------------------------------------------------------------------------------


//=============================================================================
// Jocys.com JavaScript.NET Classes               (In C# Object Oriented Style)
// Created by Evaldas Jocys <evaldas@jocys.com>
//=============================================================================
/// <reference path="System.debug.js" />
//=============================================================================
// Namespaces
//-----------------------------------------------------------------------------
// <PropertyGroup>
//		<RootNamespace>System</RootNamespace>
// <PropertyGroup>
//-----------------------------------------------------------------------------
// You can't use simple: 'System = System ? System : {};' line because it
// brakes JavaScript IntelliSense.
// Uncomment these lines to see JavaScript IntelliSense.
//eval("_system = System");
//var System = {};
//eval("System = _system ? _system : {}");
//=============================================================================

//=============================================================================
// CLASS: BitConverter
//-----------------------------------------------------------------------------

System._bitConverter = function () {
    /// <summary>
    /// </summary>
    /// <remarks>
    /// Some parst of code were taken from:
    /// 
    /// </remarks>	
    //---------------------------------------------------------
    // Public Properties.	
    this.IsLittleEndian;
    //---------------------------------------------------------
    // Private properties.
    var me = this;
    var cMask = {};
    cMask[System.TypeCode.Boolean] = 0x1;
    cMask[System.TypeCode.Byte] = 0xFF;
    cMask[System.TypeCode.SByte] = 0x7F;
    cMask[System.TypeCode.Int16] = 0x7FFF;
    cMask[System.TypeCode.Int32] = 0x7FFFFFFF;
    cMask[System.TypeCode.UInt16] = 0xFFFF;
    cMask[System.TypeCode.UInt32] = 0xFFFFFFFF;
    var sBits = {};
    sBits[System.TypeCode.Boolean] = 1;
    sBits[System.TypeCode.Byte] = 8;
    sBits[System.TypeCode.SByte] = 8;
    sBits[System.TypeCode.Int16] = 16;
    sBits[System.TypeCode.Int32] = 32;
    sBits[System.TypeCode.UInt16] = 16;
    sBits[System.TypeCode.UInt32] = 32;
    //---------------------------------------------------------
    this.GetBytes = function (value, typeCode) {
        /// <summary>
        /// Convert number to bytes[4].
        /// </summary>
        /// <param name="value">Value to contvert</param>
        /// <param name="typeCode">Type of value</param>
        // If value is number.
        switch (typeof value) {
            case "boolean":
                return value ? [1] : [0];
            case "number":
                switch (typeCode) {
                    case System.TypeCode.Single: return this.GetBytesFromNumber(value, 32);
                    case System.TypeCode.Double: return this.GetBytesFromNumber(value, 64);
                    case System.TypeCode.Int16:
                    case System.TypeCode.UInt16: return this.GetBytesFromInt16Le(value);
                    case System.TypeCode.Int32:
                    case System.TypeCode.UInt32: return this.GetBytesFromInt32Le(value);
                    default: return this.GetBytesFromInt32Le(value);
                }
            case "object":
                // Value is array of numbers.
                switch (typeCode) {
                    case System.TypeCode.Single: return this.GetBytesFromNumber(value, 32);
                    case System.TypeCode.Double: return this.GetBytesFromNumber(value, 64);
                    case System.TypeCode.Int16:
                    case System.TypeCode.UInt16:
                    case System.TypeCode.Int32:
                    case System.TypeCode.UInt32: return this.GetBytesFromInt32ArrayLe(value);
                    default: return this.GetBytesFromInt32ArrayLe(value);
                }
            default:
                // Unknown type.
                break;
        }
    };
    //---------------------------------------------------------
    this.ToSingle = function (value, startIndex) {
        var bytes = value.slice(startIndex, startIndex + 4);
        return this.ToNumber(bytes);
    };
    //---------------------------------------------------------
    this.ToDouble = function (value, startIndex) {
        var bytes = value.slice(startIndex, startIndex + 8);
        return this.ToNumber(bytes);
    };
    //---------------------------------------------------------
    this.ToBoolean = function (value, startIndex) {
        /// <summary>
        /// Returns a 16-bit signed integer converted from 2 bytes at a specified
        ///  position in a byte array.
        /// </summary>
        /// <param name="value">An array of bytes.</param>
        /// <param name="startIndex">The starting position within value.</param>
        return value[startIndex] & 0x1 ? true : false;
    };
    //---------------------------------------------------------
    this.ToInt16Le = function (value, startIndex) {
        /// <summary>
        /// Returns a 16-bit signed integer converted from 2 bytes at a specified
        ///  position in a byte array.
        /// </summary>
        /// <param name="value">An array of bytes.</param>
        /// <param name="startIndex">The starting position within value.</param>
        return this.GetSigned(this.ToInt16ArrayLe(value, startIndex, 2)[0], System.TypeCode.Int16);
    };
    //---------------------------------------------------------
    this.ToInt16Be = function (value, startIndex) {
        /// <summary>
        /// Returns a 16-bit signed integer converted from 2 big-endian bytes at a specified
        /// position in a byte array.
        /// </summary>
        /// <param name="value">An array of bytes.</param>
        /// <param name="startIndex">The starting position within value.</param>
        return this.GetSigned(this.ToInt16ArrayBe(value, startIndex, 2)[0], System.TypeCode.Int16);
    };
    //---------------------------------------------------------	
    this.ToInt16 = this.ToInt16Le;
    //---------------------------------------------------------
    this.ToUInt16Le = function (value, startIndex) {
        /// <summary>
        /// Convert byte[] to UInt16[] with little-endian byte order.
        /// </summary>
        return this.GetUnsigned(this.ToInt16Le(value, startIndex), System.TypeCode.Int16);
    };
    //---------------------------------------------------------
    this.ToUInt16Be = function (value, startIndex) {
        /// <summary>
        /// Convert byte[] to UInt16[] with little-endian byte order.
        /// </summary>
        return this.GetUnsigned(this.ToInt16Be(value, startIndex), System.TypeCode.Int16);
    };
    //---------------------------------------------------------	
    this.ToUInt16 = this.ToUInt16Le;
    //---------------------------------------------------------
    this.ToInt32Le = function (value, startIndex) {
        /// <summary>
        /// Returns a 32-bit signed integer converted from 4 bytes at a specified
        ///  position in a byte array.
        /// </summary>
        /// <param name="value">An array of bytes.</param>
        /// <param name="startIndex">The starting position within value.</param>
        return this.ToInt32ArrayLe(value, startIndex, 4)[0];
    };
    //---------------------------------------------------------
    this.ToInt32Be = function (value, startIndex) {
        /// <summary>
        /// Returns a 32-bit signed integer converted from 4 big-endian bytes at a specified
        /// position in a byte array.
        /// </summary>
        /// <param name="value">An array of bytes.</param>
        /// <param name="startIndex">The starting position within value.</param>
        return this.ToInt32ArrayBe(value, startIndex, 4)[0];
    };
    //---------------------------------------------------------	
    this.ToInt32 = this.ToInt32Le;
    //---------------------------------------------------------
    this.ToUInt32Le = function (value, startIndex) {
        /// <summary>
        /// Convert byte[] to UInt32[] with little-endian byte order.
        /// </summary>
        return this.GetUnsigned(this.ToInt32Le(value, startIndex), System.TypeCode.Int32);
    };
    //---------------------------------------------------------
    this.ToUInt32Be = function (value, startIndex) {
        /// <summary>
        /// Convert byte[] to UInt32[] with little-endian byte order.
        /// </summary>
        return this.GetUnsigned(this.ToInt32Be(value, startIndex), System.TypeCode.Int32);
    };
    //---------------------------------------------------------	
    this.ToUInt32 = this.ToUInt32Le;
    //---------------------------------------------------------
    this._GetBytesFromInt = function (value, typeCode, bigEndian) {
        var sizeBits = sBits[typeCode];
        var sizeBytes = (sizeBits ? sizeBits : 32) / 8;
        var bytes = new Array(sizeBytes);
        for (b = 0; b < sizeBytes; b++) {
            m = bigEndian
                ? sizeBytes - 1 - b
                : b;
            bytes[m] = value >> b * 8 & 0xff;
        }
        return bytes;
    };
    //---------------------------------------------------------
    this.GetBytesFromInt16Le = function (value) {
        return this._GetBytesFromInt(value, System.TypeCode.Int16, false);
    };
    this.GetBytesFromInt16Be = function (value) {
        return this._GetBytesFromInt(value, System.TypeCode.Int16, true);
    };
    this.GetBytesFromInt32Le = function (value) {
        return this._GetBytesFromInt(value, System.TypeCode.Int32, false);
    };
    this.GetBytesFromInt32Be = function (value) {
        return this._GetBytesFromInt(value, System.TypeCode.Int32, true);
    };
    //---------------------------------------------------------	
    this.GetBitsLe = function (array, typeCode) {
        /// <summary>
        /// Convert bytes into little-endian bit array
        /// </summary>
        var length = array.length;
        var bpn = sBits[typeCode];
        // Treat array as Int32[].
        bpn = bpn ? bpn : 32;
        var bits = new Array(length * bpn);
        for (var i = 0; i < length; i++) {
            var value = array[i];
            for (var b = 0; b < bpn; b++) {
                bits[i * bpn + b] = value & 0x1;
                value = value >> 1;
            }
        }
        return bits;
    };
    //---------------------------------------------------------	
    this.GetBitsBe = function (array, typeCode) {
        /// <summary>
        /// Convert bytes into big-endian bit array
        /// </summary>
        var length = array.length;
        var bpn = sBits[typeCode];
        // Treat array as Int32[].
        bpn = bpn ? bpn : 32;
        var bits = new Array(length * bpn);
        for (var i = 0; i < length; i++) {
            var value = array[i];
            for (var b = 0; b < bpn; b++) {
                bits[i * bpn + bpn - 1 - b] = value & 0x1;
                value = value >> 1;
            }
        }
        return bits;
    };
    //---------------------------------------------------------	
    this.GetBits = this.GetBitsLe;
    //---------------------------------------------------------
    this.GetUnsigned = function (value, typeCode) {
        /// <summary>
        /// Convert signed integers to unsigned integers.
        /// For example: convert SBytes array [-127:127] to Bytes array [0:255].
        /// </summary>
        /// <param name="typeCode">Signed value type</param>
        var results;
        var umask = cMask[typeCode + 1];
        // If value is number.
        if (typeof value === "number") {
            results = (value & umask) << 0 >>> 0;
        } else {
            // Value is array of numbers.
            umask = cMask[typeCode + 1];
            var length = value.length;
            results = new Array(length);
            for (var i = 0; i < length; i++) {
                var n = value[i];
                results[i] = n & umask << 0 >>> 0;
            }
        }
        return results;
    };
    //---------------------------------------------------------
    this.GetSigned = function (value, typeCode) {
        /// <summary>
        /// Convert unsigned integers to signed integers.
        /// For example: Convert Bytes array [0:255] to SBytes array [-127:127].
        /// </summary>
        /// <param name="typeCode">Unsigned value type</param>
        var results;
        var umask = cMask[typeCode];
        var smask = cMask[typeCode - 1];
        // If value is number.
        if (typeof value === "number") {
            results = value > smask ? -(-value & umask) : value;
        } else {
            // Value is array of numbers.
            var length = value.length;
            results = new Array(length);
            for (var i = 0; i < length; i++) {
                var n = value[i];
                results[i] = n > smask ? -(-n & umask) : n;
            }
        }
        return results;
    };
    //---------------------------------------------------------
    function _GetBytesFromIntArray(array, startIndex, count, typeCode, bigEndian) {
        // Convert Int<Bits> array to bytes. 
        /// <summary>
        /// Convert IntN[] to byte[].
        /// </summary>
        var sizeBits = sBits[typeCode];
        var sizeBytes = (sizeBits ? sizeBits : 32) / 8;
        startIndex = startIndex ? startIndex : 0;
        count = count ? count : array.length - startIndex;
        var bytes = new Array(count * sizeBytes);
        var i, b, m;
        var length = startIndex + count;
        for (i = startIndex; i < length; i++) {
            for (b = 0; b < sizeBytes; b++) {
                m = bigEndian
                    ? i * sizeBytes + sizeBytes - 1 - b
                    : i * sizeBytes + b;
                bytes[m] = array[i] >> b * 8 & 0xff;
            }
        }
        return bytes;
    }
    //---------------------------------------------------------
    this.GetBytesFromInt16ArrayLe = function (value, startIndex, count) {
        return _GetBytesFromIntArray(value, startIndex, count, System.TypeCode.Int16, false);
    };
    this.GetBytesFromInt16ArrayBe = function (value, startIndex, count) {
        return _GetBytesFromIntArray(value, startIndex, count, System.TypeCode.Int16, true);
    };
    this.GetBytesFromInt32ArrayLe = function (value, startIndex, count) {
        return _GetBytesFromIntArray(value, startIndex, count, System.TypeCode.Int32, false);
    };
    this.GetBytesFromInt32ArrayBe = function (value, startIndex, count) {
        return _GetBytesFromIntArray(value, startIndex, count, System.TypeCode.Int32, true);
    };
    //---------------------------------------------------------
    function _ToIntArray(bytes, startIndex, count, typeCode, bigEndian) {
        // Convert bytes to Int<Bits> array. 
        var sizeBits = sBits[typeCode];
        var sizeBytes = (sizeBits ? sizeBits : 32) / 8;
        startIndex = startIndex ? startIndex : 0;
        count = count ? count : bytes.length - startIndex;
        var mask = (1 << 8) - 1;
        var array = Array();
        var v, m;
        for (var i = 0; i < count; i++) {
            var bi = (i - i % sizeBytes) / sizeBytes;
            v = bytes[startIndex + i] & mask;
            m = i % sizeBytes * 8;
            if (bigEndian) m = sizeBits - 8 - m;
            array[bi] |= v << m;
        }
        return array;
    }
    //---------------------------------------------------------
    this.ToInt16ArrayLe = function (value, startIndex, count) {
        /// <summary>
        /// Returns a 16-bit signed integer converted from 2 bytes at a specified
        /// position in a little-endian byte array. [56, 14, ...] > [56+14*256, ...
        /// </summary>
        /// <param name="value">An array of bytes.</param>
        /// <param name="startIndex">The starting position within value.</param>
        /// <param name="count">How many bytes to read.</param>
        return _ToIntArray(value, startIndex, count, System.TypeCode.Int16, false);
    };
    //---------------------------------------------------------
    this.ToInt16ArrayBe = function (value, startIndex, count) {
        /// <summary>
        /// Returns a 16-bit signed integer converted from 2 bytes at a specified
        /// position in a big-endian byte array. [56, 14, ...] > [56*256+14, ...
        /// </summary>
        /// <param name="value">An array of bytes.</param>
        /// <param name="startIndex">The starting position within value.</param>
        /// <param name="count">How many bytes to read.</param>
        return _ToIntArray(value, startIndex, count, System.TypeCode.Int16, true);
    };
    //---------------------------------------------------------
    this.ToInt32ArrayLe = function (value, startIndex, count) {
        /// <summary>
        /// Convert byte[] to Int32[] with little-endian byte order.
        /// </summary>
        return _ToIntArray(value, startIndex, count, System.TypeCode.Int32, false);
    };
    //---------------------------------------------------------
    this.ToInt32ArrayBe = function (value, startIndex, count) {
        /// <summary>
        /// Returns a 32-bit signed integer converted from 4 bytes at a specified
        /// position in a byte array.
        /// </summary>
        /// <param name="value">An array of bytes.</param>
        /// <param name="startIndex">The starting position within value.</param>
        return _ToIntArray(value, startIndex, count, System.TypeCode.Int32, true);
    };
    //---------------------------------------------------------
    this.Int16EndianSwap = function (x) {
        x = x >> 8 |
            x << 8;
        return x;
    };
    //---------------------------------------------------------
    this.Int32EndianSwap = function (x) {
        x = x >> 24 |
            x << 8 & 0x00FF0000 |
            x >> 8 & 0x0000FF00 |
            x << 24;
        return x;
    };
    //---------------------------------------------------------
    this.Int64EndianSwap = function (x) {
        // Swap number bytes.
        x = x >> 56 |
            x << 40 & 0x00FF000000000000 |
            x << 24 & 0x0000FF0000000000 |
            x << 8 & 0x000000FF00000000 |
            x >> 8 & 0x00000000FF000000 |
            x >> 24 & 0x0000000000FF0000 |
            x >> 40 & 0x000000000000FF00 |
            x << 56;
        return x;
    };
    //---------------------------------------------------------
    this.ToString = function (bytes, separator, format) {
        /// <summary>
        /// Array of bytes to hex string.
        /// </summary>
        /// <param name="bytes">An array of 8-bit integers.</param>
        /// <param name="separator">Default separator is '-'.</param>
        /// <returns type="string">Hex string.</returns>
        var sb = [];
        var s = "";
        if (!bytes) return;
        // Formats: X[1-N];
        format = format ? format : "X2";
        var len = parseInt(format.substr(1));
        var pfx = "";
        var i;
        for (i = 0; i < len; i++) pfx += "0";
        for (i = 0; i < bytes.length; i++) {
            // If number is negative (sByte: -127; 127) makes it byte.
            var b = bytes[i] & 0xFF;
            var hex = b.toString(16).toUpperCase();
            sb.push(pfx.substr(0, len - hex.length) + hex);
        }
        var sep = typeof separator === "undefined" ? '-' : separator;
        return sb.join(sep);
    };
    //---------------------------------------------------------
    this.SemSingleToBytes = function (sign, exponent, mantissa) {
        /// <summary>
        /// Combine SEM of single number to byte[4] array.
        /// </summary>
        /// <param name="sign">Sign (1-bit).</param>
        /// <param name="exponent">Biased exponent (8-bits).</param>
        /// <param name="mantissa">mantissa fraction (23-bits).</param>
        var B = new Array(4);
        // Round.
        mantissa = Math.pow(2, 23) * mantissa + 0.5;
        B[3] = 0xFF & mantissa;
        B[2] = 0xFF & mantissa >> 8;
        B[1] = 0x7F & mantissa >> 16 | (exponent & 1) << 7;
        B[0] = sign << 7 | exponent >> 1;
        return B;
    };
    //---------------------------------------------------------
    this.SemDoubleToBytes = function (sign, exponent, mantissa) {
        /// <summary>
        /// Combine SEM of double number to byte[8] array.
        /// </summary>
        /// <param name="sign">Sign (1-bit).</param>
        /// <param name="exponent">Biased exponent (11-bits).</param>
        /// <param name="mantissa">mantissa fraction (52-bits).</param>
        var B = new Array(4);
        mantissa = Math.pow(2, 52) * mantissa;
        B[3] = 0xFFFF & mantissa;
        B[2] = 0xFFFF & mantissa >> 16;
        // Integers are only 32-bit.
        mantissa /= Math.pow(2, 32);
        B[1] = 0xFFFF & mantissa;
        B[0] = sign << 15 | exponent << 4 | 0x000F & mantissa >> 16;
        // Convert Int16[] to bytes[];
        return this.GetBytesFromInt16ArrayBe(B, 0, B.length);
    };
    //---------------------------------------------------------
    this.GetBytesFromNumber = function (Qty, NumW) {
        this.Number = Qty;
        var Bin;
        this.nb01 = "";  // , OutW = NumW/4
        var Inf = { 32: { d: 0x7F, c: 0x80, b: 0, a: 0 }, 64: { d: 0x7FF0, c: 0, b: 0, a: 0 } };
        var ExW = { 32: 8, 64: 11 }[NumW];
        var MtW = NumW - ExW - 1;
        var sign;
        var exponent;
        var mantissa;
        if (isNaN(Qty)) {
            Bin = Inf[NumW];
            Bin.a = 1;
            sign = false;
            exponent = Math.pow(2, ExW) - 1;
            mantissa = Math.pow(2, -MtW);
        }
        if (!Bin) {
            sign = Qty < 0 || 1 / Qty < 0; // OK for +-0
            if (!isFinite(Qty)) {
                Bin = Inf[NumW];
                if (this.Sign) Bin.d += 1 << NumW / 4 - 1;
                exponent = Math.pow(2, ExW) - 1;
                mantissa = 0;
            }
        }
        if (!Bin) {
            exponent = { 32: 127, 64: 1023 }[NumW];
            mantissa = Math.abs(Qty);
            while (mantissa >= 2) {
                exponent++;
                mantissa /= 2;
            }
            while (mantissa < 1 && this.Exponent > 0) {
                exponent--;
                mantissa *= 2;
            }
            if (exponent <= 0) {
                mantissa /= 2;
                // "Zero or Denormal";
            }
            if (NumW === 32 && this.Exponent > 254) {
                // "Too big for Single";
                Bin = { d: sign ? 0xFF : 0x7F, c: 0x80, b: 0, a: 0 };
                exponent = Math.pow(2, ExW) - 1;
                mantissa = 0;
            }
        }
        var array;
        if (!Bin) {
            if (NumW === 32) array = this.SemSingleToBytes(sign, exponent, mantissa);
            if (NumW === 64) array = this.SemDoubleToBytes(sign, exponent, mantissa);
        } else {
            array = [Bin.a, Bin.b, Bin.c, Bin.d];
            // Convert Int16[] to bytes[];
            if (NumW === 64) array = this.GetBytesFromInt16ArrayBe(array, 0, array.length);
        }
        // Reverse from big-endian to little-endian;
        return array.reverse();
    };
    //---------------------------------------------------------
    this.ToNumber = function (value) {
        // Reverse from little-endian to big-endian;
        var bytes = value.reverse();
        var bits = this.GetBitsBe(bytes, System.TypeCode.Byte);
        var BinStr = this.GetBitsBe(bytes, System.TypeCode.Byte).join('');
        var ExW = { 32: 8, 64: 11 }[BinStr.length];
        var M = BinStr.match(new RegExp("^(.)(.{" + ExW + "})(.*)$"));
        // M[1] sign, M[2] exponent, M[3] mantissa.
        var sign = bits[0] === 1 ? "-" : "+";
        var denorm = +M[2] === 0;
        var expo = parseInt(M[2], 2) - Math.pow(2, ExW - 1) + 1;
        var array = DecimalDigits(bits, ExW);
        // Prepend digit point.
        array.unshift(+!denorm, ".");
        if (denorm) expo++;
        while (expo < 0) {
            expo++;
            Halve(array);
        }
        while (expo > 0) {
            expo--;
            Twice(array);
        }
        var value1 = sign + array.join("").replace(/(\d)0+$/, "$1");
        return +eval(value1);
    };
    //---------------------------------------------------------
    function Add(A, P) {
        var C = 0;
        var K = P.length;
        var T;
        while (K--) {
            T = (A[K] | 0) + P[K] + C;
            A[K] = T % 10;
            C = T > 9;
        }
    }
    //---------------------------------------------------------
    function Halve(P) {
        var C = 0;
        var L = P.length;
        var T;
        for (var K = 0; K < L; K++) {
            if ((T = P[K]) !== ".") {
                T += 10 * C;
                C = T & 1;
                P[K] = T >> 1;
            }
        }
        if (C) P[K] = 5;
    }
    //---------------------------------------------------------
    function DecimalDigits(bits, ExW) {
        var A = [0];
        var P = [10];
        // Route througth mantisa bits.
        var index = ExW + 1;
        var length = bits.length;
        for (var i = index; i < length; i++) {
            Halve(P);
            if (bits[i] === 1) Add(A, P);
        }
        // A, P decimal fraction parts.
        return A;
    }
    //---------------------------------------------------------
    function Twice(A) {
        var K = A.length;
        C = 0;
        T;
        while (K--) {
            if ((T = A[K]) !== ".") {
                T = 2 * T + C;
                A[K] = T % 10;
                C = T > 9;
            }
        }
        // Prepend.
        if (C) A.unshift(1);
    }
    //---------------------------------------------------------
    this._isLittleEndian = function () {
        // 0x1234 - hex number (= 0x12 * 0x100 + 34)
        // In Little Endian little end (least significant byte, LSB) is stored first.
        // 0x1234 -> [0x34, 0x12]
        // In Big Endian big end (most significant byte, MSB) is stored first.
        // 0x1234 -> [0x12, 0x34]
        //
        // Windows NT was designed around Little Endian architecture.
        //
        // binary representations of 1.0:
        // memory/array index:     0  1  2  3  4  5  6  7
        // big endian:            3f f0 00 00 00 00 00 00
        // little endian:         00 00 00 00 00 00 f0 3f
        // arm fpa little endian: 00 00 f0 3f 00 00 00 00
        var bytes = this.GetBytes(-1.5, System.TypeCode.Double);
        return bytes[0] === 0;
    };
    //---------------------------------------------------------
    this.Initialize = function () {
        this.IsLittleEndian = this._isLittleEndian();
    };
    this.Initialize.apply(this, arguments);
};

System.BitConverter = new System._bitConverter();

System.BitConverter.ToArrayDefinition = function (bytes, cols, format) {
    var sb = [];
    var s = "<br />\r\nvar a = [<br />\r\n";
    cols = cols ? cols : 8;
    // Formats: X[1-N];
    format = format ? format : "X4";
    var len = parseInt(format.substr(1));
    var pfx = "";
    var i;
    for (i = 0; i < len; i++) pfx += "0";
    for (i = 0; i < bytes.length; i++) {
        var hex = bytes[i].toString(16).toUpperCase();
        sb.push(pfx.substr(0, len - hex.length) + hex);
        if (!((i + 1) % cols)) {
            s += "0x";
            s += sb.join(", 0x");
            if (i < bytes.length - 1) s += ",";
            s += "<br />\r\n";
            sb = [];
        }
    }
    if (sb.length > 0) {
        s += "0x";
        s += sb.join(", 0x");
        s += "<br />\r\n";
    }
    s += "];";
    return s;
};

//==============================================================================
// END
//------------------------------------------------------------------------------


//=============================================================================
// Jocys.com JavaScript.NET Classes               (In C# Object Oriented Style)
// Created by Evaldas Jocys <evaldas@jocys.com>
//=============================================================================
/// <reference path="System.debug.js" />
//=============================================================================
// Namespaces
//-----------------------------------------------------------------------------
// <PropertyGroup>
//		<RootNamespace>System</RootNamespace>
// <PropertyGroup>
//-----------------------------------------------------------------------------
System.Type.RegisterNamespace("System");
//=============================================================================


//=============================================================================
// Extensions
//-----------------------------------------------------------------------------
System.BigInt = function () {
    /// <summary>
    /// </summary>
    /// <remarks>
    ///	var big = new System.Numerics.BigInteger();
    /// Code refactored from MS.NET System.Security.Cryptography.BigInt class
    /// </remarks>
    //---------------------------------------------------------
    // Store numbers
    var u = System.BigInt.Utils;
    this.digits = [];

    this.Clear = function () {
        this.digits = [];
    };

    this.CopyFrom = function (a) {
        this.digits = [a.digits.length];
        System.Array.Copy(a.digits, 0, this.digits, 0, a.digits.length);
    };

    this.Clone = function () {
        var bi = new System.BigInt();
        bi.CopyFrom(this);
        return bi;
    };

    this.Divide = function (b) {
    };

    this.Multiply = function (b) {
        System.BigInt.Multiply(this, b, this);
    };

    this.Equals = function (obj) {
        return System.BigInt.Equals(this, obj);
    };

    this.GetHashCode = function () {
    };

    this.IsNegative = function () {
        return u.IsNegative(this.digits);
    };

    this.IsZero = function () {
        return true;
    };

    //#region Convert
    // Decimal: (mbs) "..." (lbs) - Big Endian
    // Hexadecimal (mbs) 0x... (lbs) - Big Endian
    // HexString (lbs) xx-xx-xx-xx... (mbs) - Little Endian, xx - Big Endian.

    this.FromHex = function (s) { this.FromString(s, 16); };
    this.ToHex = function () { return this.ToString(16); };
    this.FromDecimal = function (s) { this.FromString(a, 10); };
    this.ToDecimal = function () { return this.ToString(10); };

    this.FromString = function (s, base) {
        // if number is negative;
        var isNegative = false;
        if (s.indexOf("-") === 0) {
            isNegative = true;
            s = s.substring(1, s.length);
        }
        if (s.indexOf("x") > -1) {
            s = s.substring(s.indexOf("x") + 1, s.length);
            this.digits = u.FromString(s, 16, 0);
        } else if (typeof base === "undefined") {
            this.digits = u.FromString(s, 10, 0);
        } else {
            this.digits = u.FromString(s, base, 0);
        }
        if (isNegative) {
            u.Negate_(this.digits);
        }
    };

    this.ToString = function (base) {
        var s;
        var d = this.digits;
        var isNegative = this.IsNegative();
        if (isNegative) {
            d = u.Negate(d);
        }
        if (typeof base === "undefined") s = u.ToString(d, base);
        else s = u.ToString(d, base);
        if (isNegative) s = "-" + s;
        return s;
    };

    function GetByteArraySize(array, byteValue) {
        var length = array.length;
        while (length-- > 0) {
            if (array[length] !== byteValue) break;
        }
        return length + 1;
    }

    this.ToByteArray = function () {
        // return 
        var d = u.Clone(this.digits);
        var b = u.ToArray(d, 256);
        // If array is negative.
        var isNegative = this.IsNegative();
        if (isNegative) b[b.length - 1] = 0xFF;
        var size = GetByteArraySize(b, isNegative ? 0xFF : 0x00);
        // If last bit of array is negative ( = 1).
        var bNeg = (b[size - 1] & 0x80) !== 0;
        // If BigInt is negative but byte array is positive then...
        if (isNegative && !bNeg) {
            b.push(0xFF);
            size++;
            // Here you will have byte array where highest bit = 1.
            // You can extend array by adding 0xFF bytes.
        }
        // If BigInt is positive but byte array is negative then...
        if (!isNegative && bNeg) {
            // add positive byte.
            b.push(0x00);
            size++;
            // Here you will have byte array where highest bit = 0.
            // You can extend array by adding 0x00 bytes.
        }
        return b.slice(0, size);
    };

    this.FromByteArray = function (bytes) {
        // If last bit of array is negative (= 1).
        var bNeg = ((bytes[bytes.length - 1]) & 0x80) !== 0;
        //if (bNeg){
        // If last byte is all ones.
        // if (bytes[bytes.length-1] == 0xFF);
        //}
        this.digits = u.FromArray(bytes, 256);
    };

    //---------------------------------------------------------
    function initialize0() {
        m_maxbytes = System.BigInt.MaxBytes;
        this.digits = new System.Byte(1);
    }

    function initialize2(b) {
        m_maxbytes = System.BigInt.MaxBytes;
        this.digits = new System.Byte(1);
        this.SetDigit(0, b);
    }

    function initialize() {
        var a = arguments[0];
        switch (typeof (a)) {
            case "string":
                this.FromString.apply(this, arguments);
                break;
            default:
                this.FromString.apply(this, ["0"]);
        }

        //		if("number" == typeof a) this.fromNumber.apply(this, arguments);
        //		else if(b == null && "string" != typeof a) this.FromString.apply(this, arguments);

        // bigInt  FromString(s,b,n,m)    //return a bigInt for number represented in string s in base b with at least n bits and m array elements

        //		else this.fromString(a,b);
        //		if (arguments.length == 0){
        //			initialize0.apply(this, arguments);
        //		}else if (typeof(arguments[0]) == "string") {
        //			initialize1.apply(this, arguments);
        //		}else if ((typeof(arguments[0]) == "number")){
        //			initialize2.apply(this, arguments);
        //		}else{
        //			initialize0.apply(this, arguments);
        //		}
    }
    initialize.apply(this, arguments);
};

//#region Operators

/// <summary>
/// Compares two numbers and returns an integer that indicates their relationship to one another.
/// </summary>
/// <param name="a">BigInt</param>
/// <param name="b">BigInt</param>
/// <returns>
/// -1 (a) is less than (b).
///  0 (a) is equals (b).
///  1 (a) is greater than (b). 
/// </returns>
System.BigInt.Compare = function (a, b) {
    if (a === null && b === null) return 0;
    if (a === null) return -1;
    if (b === null) return 1;
    var size = a.Size();
    var num2 = b.Size();
    if (size === num2) {
        while (size-- > 0) {
            if (a.digits[size] !== b.digits[size]) {
                return (a.digits[size] < b.digits[size]) ? -1 : 1;
            }
        }
        return 0;
    }
    else {
        return (size < num2) ? -1 : 1;
    }
};

System.BigInt.Equals = function (a, b) {
    return System.BigInt.Compare(a, b) === 0;
};

System.BigInt.MoreThan = function (a, b) {
    return System.BigInt.Compare(a, b) === 1;
};

System.BigInt.LessThan = function (a, b) {
    return System.BigInt.Compare(a, b) === -1;
};

System.BigInt._Utils = function () {

    ////////////////////////////////////////////////////////////////////////////////////////
    // Big Integer Library v. 5.4
    // Created 2000, last modified 2009
    // Leemon Baird
    // www.leemon.com
    //
    // Version history:
    // v 5.4  3 Oct 2009
    //   - added "var i" to greaterShift() so i is not global. (Thanks to PŽter Szab— for finding that bug)
    //
    // v 5.3  21 Sep 2009
    //   - added randProbPrime(k) for probable primes
    //   - unrolled loop in mont_ (slightly faster)
    //   - millerRabin now takes a bigInt parameter rather than an int
    //
    // v 5.2  15 Sep 2009
    //   - fixed capitalization in call to int2bigInt in randBigInt
    //     (thanks to Emili Evripidou, Reinhold Behringer, and Samuel Macaleese for finding that bug)
    //
    // v 5.1  8 Oct 2007 
    //   - renamed inverseModInt_ to inverseModInt since it doesn't change its parameters
    //   - added functions GCD and randBigInt, which call GCD_ and randBigInt_
    //   - fixed a bug found by Rob Visser (see comment with his name below)
    //   - improved comments
    //
    // This file is public domain.   You can use it for any purpose without restriction.
    // I do not guarantee that it is correct, so use it at your own risk.  If you use 
    // it for something interesting, I'd appreciate hearing about it.  If you find 
    // any bugs or make any improvements, I'd appreciate hearing about those too.
    // It would also be nice if my name and URL were left in the comments.  But none 
    // of that is required.
    //
    // This code defines a bigInt library for arbitrary-precision integers.
    // A bigInt is an array of integers storing the value in chunks of bpe bits, 
    // little endian (buff[0] is the least significant word).
    // Negative bigInts are stored two's complement.  Almost all the functions treat
    // bigInts as nonnegative.  The few that view them as two's complement say so
    // in their comments.  Some functions assume their parameters have at least one 
    // leading zero element. Functions with an underscore at the end of the name put
    // their answer into one of the arrays passed in, and have unpredictable behavior 
    // in case of overflow, so the caller must make sure the arrays are big enough to 
    // hold the answer.  But the average user should never have to call any of the 
    // underscored functions.  Each important underscored function has a wrapper function 
    // of the same name without the underscore that takes care of the details for you.  
    // For each underscored function where a parameter is modified, that same variable 
    // must not be used as another argument too.  So, you cannot square x by doing 
    // multMod_(x,x,n).  You must use squareMod_(x,n) instead, or do y=dup(x); multMod_(x,y,n).
    // Or simply use the multMod(x,x,n) function without the underscore, where
    // such issues never arise, because non-underscored functions never change
    // their parameters; they always allocate new memory for the answer that is returned.
    //
    // These functions are designed to avoid frequent dynamic memory allocation in the inner loop.
    // For most functions, if it needs a BigInt as a local variable it will actually use
    // a global, and will only allocate to it only when it's not the right size.  This ensures
    // that when a function is called repeatedly with same-sized parameters, it only allocates
    // memory on the first call.
    //
    // Note that for cryptographic purposes, the calls to Math.random() must 
    // be replaced with calls to a better pseudorandom number generator.
    //
    // In the following, "bigInt" means a bigInt with at least one leading zero element,
    // and "integer" means a nonnegative integer less than radix.  In some cases, integer 
    // can be negative.  Negative bigInts are 2s complement.
    // 
    // The following functions do not modify their inputs.
    // Those returning a bigInt, string, or Array will dynamically allocate memory for that value.
    // Those returning a boolean will return the integer 0 (false) or 1 (true).
    // Those returning boolean or int will not allocate memory except possibly on the first 
    // time they're called with a given parameter size.
    // 
    // bigInt  add(x,y)               //return (x+y) for bigInts x and y.  
    // bigInt  addInt(x,n)            //return (x+n) where x is a bigInt and n is an integer.
    // string  bigInt2str(x,base)     //return a string form of bigInt x in a given base, with 2 <= base <= 95
    // int     bitSize(x)             //return how many bits long the bigInt x is, not counting leading zeros
    // bigInt  dup(x)                 //return a copy of bigInt x
    // boolean equals(x,y)            //is the bigInt x equal to the bigint y?
    // boolean equalsInt(x,y)         //is bigint x equal to integer y?
    // bigInt  expand(x,n)            //return a copy of x with at least n elements, adding leading zeros if needed
    // Array   findPrimes(n)          //return array of all primes less than integer n
    // bigInt  GCD(x,y)               //return greatest common divisor of bigInts x and y (each with same number of elements).
    // boolean greater(x,y)           //is x>y?  (x and y are nonnegative bigInts)
    // boolean greaterShift(x,y,shift)//is (x <<(shift*bpe)) > y?
    // bigInt  int2bigInt(t,n,m)      //return a bigInt equal to integer t, with at least n bits and m array elements
    // bigInt  inverseMod(x,n)        //return (x**(-1) mod n) for bigInts x and n.  If no inverse exists, it returns null
    // int     inverseModInt(x,n)     //return x**(-1) mod n, for integers x and n.  Return 0 if there is no inverse
    // boolean isZero(x)              //is the bigInt x equal to zero?
    // boolean millerRabin(x,b)       //does one round of Miller-Rabin base integer b say that bigInt x is possibly prime? (b is bigInt, 1<b<x)
    // boolean millerRabinInt(x,b)    //does one round of Miller-Rabin base integer b say that bigInt x is possibly prime? (b is int,    1<b<x)
    // bigInt  mod(x,n)               //return a new bigInt equal to (x mod n) for bigInts x and n.
    // int     modInt(x,n)            //return x mod n for bigInt x and integer n.
    // bigInt  mult(x,y)              //return x*y for bigInts x and y. This is faster when y<x.
    // bigInt  multMod(x,y,n)         //return (x*y mod n) for bigInts x,y,n.  For greater speed, let y<x.
    // boolean negative(x)            //is bigInt x negative?
    // bigInt  powMod(x,y,n)          //return (x**y mod n) where x,y,n are bigInts and ** is exponentiation.  0**0=1. Faster for odd n.
    // bigInt  randBigInt(n,s)        //return an n-bit random BigInt (n>=1).  If s=1, then the most significant of those n bits is set to 1.
    // bigInt  randTruePrime(k)       //return a new, random, k-bit, true prime bigInt using Maurer's algorithm.
    // bigInt  randProbPrime(k)       //return a new, random, k-bit, probable prime bigInt (probability it's composite less than 2^-80).
    // bigInt  str2bigInt(s,b,n,m)    //return a bigInt for number represented in string s in base b with at least n bits and m array elements
    // bigInt  sub(x,y)               //return (x-y) for bigInts x and y.  Negative answers will be 2s complement
    // bigInt  trim(x,k)              //return a copy of x with exactly k leading zero elements
    //
    //
    // The following functions each have a non-underscored version, which most users should call instead.
    // These functions each write to a single parameter, and the caller is responsible for ensuring the array 
    // passed in is large enough to hold the result. 
    //
    // void    addInt_(x,n)          //do x=x+n where x is a bigInt and n is an integer
    // void    add_(x,y)             //do x=x+y for bigInts x and y
    // void    copy_(x,y)            //do x=y on bigInts x and y
    // void    copyInt_(x,n)         //do x=n on bigInt x and integer n
    // void    GCD_(x,y)             //set x to the greatest common divisor of bigInts x and y, (y is destroyed).  (This never overflows its array).
    // boolean inverseMod_(x,n)      //do x=x**(-1) mod n, for bigInts x and n. Returns 1 (0) if inverse does (doesn't) exist
    // void    mod_(x,n)             //do x=x mod n for bigInts x and n. (This never overflows its array).
    // void    mult_(x,y)            //do x=x*y for bigInts x and y.
    // void    multMod_(x,y,n)       //do x=x*y  mod n for bigInts x,y,n.
    // void    powMod_(x,y,n)        //do x=x**y mod n, where x,y,n are bigInts (n is odd) and ** is exponentiation.  0**0=1.
    // void    randBigInt_(b,n,s)    //do b = an n-bit random BigInt. if s=1, then nth bit (most significant bit) is set to 1. n>=1.
    // void    randTruePrime_(ans,k) //do ans = a random k-bit true random prime (not just probable prime) with 1 in the msb.
    // void    sub_(x,y)             //do x=x-y for bigInts x and y. Negative answers will be 2s complement.
    //
    // The following functions do NOT have a non-underscored version. 
    // They each write a bigInt result to one or more parameters.  The caller is responsible for
    // ensuring the arrays passed in are large enough to hold the results. 
    //
    // void addShift_(x,y,ys)       //do x=x+(y<<(ys*bpe))
    // void carry_(x)               //do carries and borrows so each element of the bigInt x fits in bpe bits.
    // void divide_(x,y,q,r)        //divide x by y giving quotient q and remainder r
    // int  divInt_(x,n)            //do x=floor(x/n) for bigInt x and integer n, and return the remainder. (This never overflows its array).
    // int  eGCD_(x,y,d,a,b)        //sets a,b,d to positive bigInts such that d = GCD_(x,y) = a*x-b*y
    // void halve_(x)               //do x=floor(|x|/2)*sgn(x) for bigInt x in 2's complement.  (This never overflows its array).
    // void leftShift_(x,n)         //left shift bigInt x by n bits.  n<bpe.
    // void linComb_(x,y,a,b)       //do x=a*x+b*y for bigInts x and y and integers a and b
    // void linCombShift_(x,y,b,ys) //do x=x+b*(y<<(ys*bpe)) for bigInts x and y, and integers b and ys
    // void mont_(x,y,n,np)         //Montgomery multiplication (see comments where the function is defined)
    // void multInt_(x,n)           //do x=x*n where x is a bigInt and n is an integer.
    // void rightShift_(x,n)        //right shift bigInt x by n bits.  0 <= n < bpe. (This never overflows its array).
    // void squareMod_(x,n)         //do x=x*x  mod n for bigInts x,n
    // void subShift_(x,y,ys)       //do x=x-(y<<(ys*bpe)). Negative answers will be 2s complement.
    //
    // The following functions are based on algorithms from the _Handbook of Applied Cryptography_
    //    powMod_()           = algorithm 14.94, Montgomery exponentiation
    //    eGCD_,inverseMod_() = algorithm 14.61, Binary extended GCD_
    //    GCD_()              = algorothm 14.57, Lehmer's algorithm
    //    mont_()             = algorithm 14.36, Montgomery multiplication
    //    divide_()           = algorithm 14.20  Multiple-precision division
    //    squareMod_()        = algorithm 14.16  Multiple-precision squaring
    //    randTruePrime_()    = algorithm  4.62, Maurer's algorithm
    //    millerRabin()       = algorithm  4.24, Miller-Rabin algorithm
    //
    // Profiling shows:
    //     randTruePrime_() spends:
    //         10% of its time in calls to powMod_()
    //         85% of its time in calls to millerRabin()
    //     millerRabin() spends:
    //         99% of its time in calls to powMod_()   (always with a base of 2)
    //     powMod_() spends:
    //         94% of its time in calls to mont_()  (almost always with x==y)
    //
    // This suggests there are several ways to speed up this library slightly:
    //     - convert powMod_ to use a Montgomery form of k-ary window (or maybe a Montgomery form of sliding window)
    //         -- this should especially focus on being fast when raising 2 to a power mod n
    //     - convert randTruePrime_() to use a minimum r of 1/3 instead of 1/2 with the appropriate change to the test
    //     - tune the parameters in randTruePrime_(), including c, m, and recLimit
    //     - speed up the single loop in mont_() that takes 95% of the runtime, perhaps by reducing checking
    //       within the loop when all the parameters are the same length.
    //
    // There are several ideas that look like they wouldn't help much at all:
    //     - replacing trial division in randTruePrime_() with a sieve (that speeds up something taking almost no time anyway)
    //     - increase bpe from 15 to 30 (that would help if we had a 32*32->64 multiplier, but not with JavaScript's 32*32->32)
    //     - speeding up mont_(x,y,n,np) when x==y by doing a non-modular, non-Montgomery square
    //       followed by a Montgomery reduction.  The intermediate answer will be twice as long as x, so that
    //       method would be slower.  This is unfortunate because the code currently spends almost all of its time
    //       doing mont_(x,x,...), both for randTruePrime_() and powMod_().  A faster method for Montgomery squaring
    //       would have a large impact on the speed of randTruePrime_() and powMod_().  HAC has a couple of poorly-worded
    //       sentences that seem to imply it's faster to do a non-modular square followed by a single
    //       Montgomery reduction, but that's obviously wrong.
    ////////////////////////////////////////////////////////////////////////////////////////

    //globals
    var bpe = 0;         //bits stored per array element
    var mask = 0;        //AND this with an array element to chop it down to bpe bits
    var radix = 0;
    var digitsStr = "";
    var one = [];

    //the following global variables are scratchpad memory to 
    //reduce dynamic memory allocation in the inner loop
    t = new Array(0);
    ss = t;       //used in mult_()
    s0 = t;       //used in multMod_(), squareMod_() 
    s1 = t;       //used in powMod_(), multMod_(), squareMod_() 
    s2 = t;       //used in powMod_(), multMod_()
    s3 = t;       //used in powMod_()
    s4 = t; s5 = t; //used in mod_()
    s6 = t;       //used in bigInt2str()
    s7 = t;       //used in powMod_()
    T = t;        //used in GCD_()
    sa = t;       //used in mont_()
    mr_x1 = t; mr_r = t; mr_a = t;                                      //used in millerRabin()
    eg_v = t; eg_u = t; eg_A = t; eg_B = t; eg_C = t; eg_D = t;               //used in eGCD_(), inverseMod_()
    md_q1 = t; md_q2 = t; md_q3 = t; md_r = t; md_r1 = t; md_r2 = t; md_tt = t; //used in mod_()

    primes = t; pows = t; s_i = t; s_i2 = t; s_R = t; s_rm = t; s_q = t; s_n1 = t;
    s_a = t; s_r2 = t; s_n = t; s_b = t; s_d = t; s_x1 = t; s_x2 = t, s_aa = t; //used in randTruePrime_()

    rpprb = t; //used in randProbPrimeRounds() (which also uses "primes")

    ////////////////////////////////////////////////////////////////////////////////////////


    //return array of all primes less than integer n
    function findPrimes(n) {
        var i, s, p, ans;
        s = new Array(n);
        for (i = 0; i < n; i++)
            s[i] = 0;
        s[0] = 2;
        p = 0;    //first p elements of s are primes, the rest are a sieve
        for (; s[p] < n;) {                  //s[p] is the pth prime
            for (i = s[p] * s[p]; i < n; i += s[p]) //mark multiples of s[p]
                s[i] = 1;
            p++;
            s[p] = s[p - 1] + 1;
            for (; s[p] < n && s[s[p]]; s[p]++); //find next prime (where s[p]==0)
        }
        ans = new Array(p);
        for (i = 0; i < p; i++)
            ans[i] = s[i];
        return ans;
    }


    //does a single round of Miller-Rabin base b consider x to be a possible prime?
    //x is a bigInt, and b is an integer, with b<x
    function millerRabinInt(x, b) {
        if (mr_x1.length !== x.length) {
            mr_x1 = dup(x);
            mr_r = dup(x);
            mr_a = dup(x);
        }

        copyInt_(mr_a, b);
        return millerRabin(x, mr_a);
    }

    //does a single round of Miller-Rabin base b consider x to be a possible prime?
    //x and b are bigInts with b<x
    function millerRabin(x, b) {
        var i, j, k, s;

        if (mr_x1.length !== x.length) {
            mr_x1 = dup(x);
            mr_r = dup(x);
            mr_a = dup(x);
        }

        copy_(mr_a, b);
        copy_(mr_r, x);
        copy_(mr_x1, x);

        addInt_(mr_r, -1);
        addInt_(mr_x1, -1);

        //s=the highest power of two that divides mr_r
        k = 0;
        for (i = 0; i < mr_r.length; i++)
            for (j = 1; j < mask; j <<= 1)
                if (x[i] & j) {
                    s = (k < mr_r.length + bpe ? k : 0);
                    i = mr_r.length;
                    j = mask;
                } else
                    k++;

        if (s)
            rightShift_(mr_r, s);

        powMod_(mr_a, mr_r, x);

        if (!equalsInt(mr_a, 1) && !equals(mr_a, mr_x1)) {
            j = 1;
            while (j <= s - 1 && !equals(mr_a, mr_x1)) {
                squareMod_(mr_a, x);
                if (equalsInt(mr_a, 1)) {
                    return 0;
                }
                j++;
            }
            if (!equals(mr_a, mr_x1)) {
                return 0;
            }
        }
        return 1;
    }

    //returns how many bits long the bigInt is, not counting leading zeros.
    function bitSize(x) {
        var j, z, w;
        for (j = x.length - 1; (x[j] === 0) && (j > 0); j--);
        for (z = 0, w = x[j]; w; (w >>= 1), z++);
        z += bpe * j;
        return z;
    }

    //return a copy of x with at least n elements, adding leading zeros if needed
    function expand(x, n) {
        var ans = int2bigInt(0, (x.length > n ? x.length : n) * bpe, 0);
        copy_(ans, x);
        return ans;
    }

    //return a k-bit true random prime using Maurer's algorithm.
    function randTruePrime(k) {
        var ans = int2bigInt(0, k, 0);
        randTruePrime_(ans, k);
        return trim(ans, 1);
    }

    //return a k-bit random probable prime with probability of error < 2^-80
    function randProbPrime(k) {
        if (k >= 600) return randProbPrimeRounds(k, 2); //numbers from HAC table 4.3
        if (k >= 550) return randProbPrimeRounds(k, 4);
        if (k >= 500) return randProbPrimeRounds(k, 5);
        if (k >= 400) return randProbPrimeRounds(k, 6);
        if (k >= 350) return randProbPrimeRounds(k, 7);
        if (k >= 300) return randProbPrimeRounds(k, 9);
        if (k >= 250) return randProbPrimeRounds(k, 12); //numbers from HAC table 4.4
        if (k >= 200) return randProbPrimeRounds(k, 15);
        if (k >= 150) return randProbPrimeRounds(k, 18);
        if (k >= 100) return randProbPrimeRounds(k, 27);
        return randProbPrimeRounds(k, 40); //number from HAC remark 4.26 (only an estimate)
    }

    //return a k-bit probable random prime using n rounds of Miller Rabin (after trial division with small primes)	
    function randProbPrimeRounds(k, n) {
        var ans, i, divisible, B;
        B = 30000;  //B is largest prime to use in trial division
        ans = int2bigInt(0, k, 0);

        //optimization: try larger and smaller B to find the best limit.

        if (primes.length === 0)
            primes = findPrimes(30000);  //check for divisibility by primes <=30000

        if (rpprb.length !== ans.length)
            rpprb = dup(ans);

        for (; ;) { //keep trying random values for ans until one appears to be prime
            //optimization: pick a random number times L=2*3*5*...*p, plus a 
            //   random element of the list of all numbers in [0,L) not divisible by any prime up to p.
            //   This can reduce the amount of random number generation.

            randBigInt_(ans, k, 0); //ans = a random odd number to check
            ans[0] |= 1;
            divisible = 0;

            //check ans for divisibility by small primes up to B
            for (i = 0; (i < primes.length) && (primes[i] <= B); i++)
                if (modInt(ans, primes[i]) === 0 && !equalsInt(ans, primes[i])) {
                    divisible = 1;
                    break;
                }

            //optimization: change millerRabin so the base can be bigger than the number being checked, then eliminate the while here.

            //do n rounds of Miller Rabin, with random bases less than ans
            for (i = 0; i < n && !divisible; i++) {
                randBigInt_(rpprb, k, 0);
                while (!greater(ans, rpprb)) //pick a random rpprb that's < ans
                    randBigInt_(rpprb, k, 0);
                if (!millerRabin(ans, rpprb))
                    divisible = 1;
            }

            if (!divisible)
                return ans;
        }
    }

    //return a new bigInt equal to (x mod n) for bigInts x and n.
    function mod(x, n) {
        var ans = dup(x);
        mod_(ans, n);
        return trim(ans, 1);
    }

    //return (x+n) where x is a bigInt and n is an integer.
    function addInt(x, n) {
        var ans = expand(x, x.length + 1);
        addInt_(ans, n);
        return trim(ans, 1);
    }

    //return x*y for bigInts x and y. This is faster when y<x.
    function mult(x, y) {
        var ans = expand(x, x.length + y.length);
        mult_(ans, y);
        return trim(ans, 1);
    }

    //return (x**y mod n) where x,y,n are bigInts and ** is exponentiation.  0**0=1. Faster for odd n.
    function powMod(x, y, n) {
        var ans = expand(x, n.length);
        powMod_(ans, trim(y, 2), trim(n, 2), 0);  //this should work without the trim, but doesn't
        return trim(ans, 1);
    }

    //return (x-y) for bigInts x and y.  Negative answers will be 2s complement
    function sub(x, y) {


        var xN = negative(x);
        var yN = negative(y);
        var x1 = x;
        var y1 = y;
        var z;
        // Make positive.
        if (xN) x1 = negate(x);
        if (yN) y1 = negate(y);
        if (xN) {
            if (yN) {
                if (greater(x1, y1)) {
                    z = sub(x1, y1);
                    negate_(z);
                    return z;
                } else {
                    return sub(y1, x1);
                }
            } else {
                z = add(x1, y);
                negate_(z);
                return z;
            }
        } else {
            if (yN) {
                return add(x, y1);
            } else {
                if (!greater(x1, y1)) {
                    z = sub(y1, x);
                    negate_(z);
                    return z;
                }
            }
        }

        var ans = expand(x, x.length > y.length ? x.length + 1 : y.length + 1);
        sub_(ans, y);
        return trim(ans, 1);
    }

    //return (x+y) for bigInts x and y.  
    function add(x, y) {
        var xN = negative(x);
        var yN = negative(y);
        var x1 = x;
        var y1 = y;
        var z;
        // Make positive.
        if (xN) x1 = negate(x);
        if (yN) y1 = negate(y);
        if (xN) {
            if (yN) {
                z = add(x1, y1);
                negate_(z);
                return z;
            } else {
                if (greater(y1, x1)) {
                    return sub(y1, x1);
                } else {
                    z = sub(x1, y1);
                    negate_(z);
                    return z;
                }
            }
        } else {
            if (yN) {
                if (greater(x1, y1)) {
                    return sub(x1, y1);
                } else {
                    z = sub(y1, x1);
                    negate_(z);
                    return z;
                }
            }
        }



        var ans = expand(x, (x.length > y.length ? x.length + 1 : y.length + 1));
        add_(ans, y);
        return trim(ans, 1);
    }

    //return (x**(-1) mod n) for bigInts x and n.  If no inverse exists, it returns null
    function inverseMod(x, n) {
        var ans = expand(x, n.length);
        var s;
        s = inverseMod_(ans, n);
        return s ? trim(ans, 1) : null;
    }

    //return (x*y mod n) for bigInts x,y,n.  For greater speed, let y<x.
    function multMod(x, y, n) {
        var ans = expand(x, n.length);
        multMod_(ans, y, n);
        return trim(ans, 1);
    }

    //generate a k-bit true random prime using Maurer's algorithm,
    //and put it into ans.  The bigInt ans must be large enough to hold it.
    function randTruePrime_(ans, k) {
        var c, m, pm, dd, j, r, B, divisible, z, zz, recSize;

        if (primes.length === 0)
            primes = findPrimes(30000);  //check for divisibility by primes <=30000

        if (pows.length === 0) {
            pows = new Array(512);
            for (j = 0; j < 512; j++) {
                pows[j] = Math.pow(2, j / 511. - 1.);
            }
        }

        //c and m should be tuned for a particular machine and value of k, to maximize speed
        c = 0.1;  //c=0.1 in HAC
        m = 20;   //generate this k-bit number by first recursively generating a number that has between k/2 and k-m bits
        recLimit = 20; //stop recursion when k <=recLimit.  Must have recLimit >= 2

        if (s_i2.length !== ans.length) {
            s_i2 = dup(ans);
            s_R = dup(ans);
            s_n1 = dup(ans);
            s_r2 = dup(ans);
            s_d = dup(ans);
            s_x1 = dup(ans);
            s_x2 = dup(ans);
            s_b = dup(ans);
            s_n = dup(ans);
            s_i = dup(ans);
            s_rm = dup(ans);
            s_q = dup(ans);
            s_a = dup(ans);
            s_aa = dup(ans);
        }

        if (k <= recLimit) {  //generate small random primes by trial division up to its square root
            pm = (1 << ((k + 2) >> 1)) - 1; //pm is binary number with all ones, just over sqrt(2^k)
            copyInt_(ans, 0);
            for (dd = 1; dd;) {
                dd = 0;
                ans[0] = 1 | (1 << (k - 1)) | Math.floor(Math.random() * (1 << k));  //random, k-bit, odd integer, with msb 1
                for (j = 1; (j < primes.length) && ((primes[j] & pm) === primes[j]); j++) { //trial division by all primes 3...sqrt(2^k)
                    if (0 === (ans[0] % primes[j])) {
                        dd = 1;
                        break;
                    }
                }
            }
            carry_(ans);
            return;
        }

        B = c * k * k;    //try small primes up to B (or all the primes[] array if the largest is less than B).
        if (k > 2 * m)  //generate this k-bit number by first recursively generating a number that has between k/2 and k-m bits
            for (r = 1; k - k * r <= m;)
                r = pows[Math.floor(Math.random() * 512)];   //r=Math.pow(2,Math.random()-1);
        else
            r = .5;

        //simulation suggests the more complex algorithm using r=.333 is only slightly faster.

        recSize = Math.floor(r * k) + 1;

        randTruePrime_(s_q, recSize);
        copyInt_(s_i2, 0);
        s_i2[Math.floor((k - 2) / bpe)] |= (1 << ((k - 2) % bpe));   //s_i2=2^(k-2)
        divide_(s_i2, s_q, s_i, s_rm);                        //s_i=floor((2^(k-1))/(2q))

        z = bitSize(s_i);

        for (; ;) {
            for (; ;) {  //generate z-bit numbers until one falls in the range [0,s_i-1]
                randBigInt_(s_R, z, 0);
                if (greater(s_i, s_R))
                    break;
            }                //now s_R is in the range [0,s_i-1]
            addInt_(s_R, 1);  //now s_R is in the range [1,s_i]
            add_(s_R, s_i);   //now s_R is in the range [s_i+1,2*s_i]

            copy_(s_n, s_q);
            mult_(s_n, s_R);
            multInt_(s_n, 2);
            addInt_(s_n, 1);    //s_n=2*s_R*s_q+1

            copy_(s_r2, s_R);
            multInt_(s_r2, 2);  //s_r2=2*s_R

            //check s_n for divisibility by small primes up to B
            for (divisible = 0, j = 0; (j < primes.length) && (primes[j] < B); j++)
                if (modInt(s_n, primes[j]) === 0 && !equalsInt(s_n, primes[j])) {
                    divisible = 1;
                    break;
                }

            if (!divisible)    //if it passes small primes check, then try a single Miller-Rabin base 2
                if (!millerRabinInt(s_n, 2)) //this line represents 75% of the total runtime for randTruePrime_ 
                    divisible = 1;

            if (!divisible) {  //if it passes that test, continue checking s_n
                addInt_(s_n, -3);
                for (j = s_n.length - 1; (s_n[j] === 0) && (j > 0); j--);  //strip leading zeros
                for (zz = 0, w = s_n[j]; w; (w >>= 1), zz++);
                zz += bpe * j;                             //zz=number of bits in s_n, ignoring leading zeros
                for (; ;) {  //generate z-bit numbers until one falls in the range [0,s_n-1]
                    randBigInt_(s_a, zz, 0);
                    if (greater(s_n, s_a))
                        break;
                }                //now s_a is in the range [0,s_n-1]
                addInt_(s_n, 3);  //now s_a is in the range [0,s_n-4]
                addInt_(s_a, 2);  //now s_a is in the range [2,s_n-2]
                copy_(s_b, s_a);
                copy_(s_n1, s_n);
                addInt_(s_n1, -1);
                powMod_(s_b, s_n1, s_n);   //s_b=s_a^(s_n-1) modulo s_n
                addInt_(s_b, -1);
                if (isZero(s_b)) {
                    copy_(s_b, s_a);
                    powMod_(s_b, s_r2, s_n);
                    addInt_(s_b, -1);
                    copy_(s_aa, s_n);
                    copy_(s_d, s_b);
                    GCD_(s_d, s_n);  //if s_b and s_n are relatively prime, then s_n is a prime
                    if (equalsInt(s_d, 1)) {
                        copy_(ans, s_aa);
                        return;     //if we've made it this far, then s_n is absolutely guaranteed to be prime
                    }
                }
            }
        }
    }

    //Return an n-bit random BigInt (n>=1).  If s=1, then the most significant of those n bits is set to 1.
    function randBigInt(n, s) {
        var a, b;
        a = Math.floor((n - 1) / bpe) + 2; //# array elements to hold the BigInt with a leading 0 element
        b = int2bigInt(0, 0, a);
        randBigInt_(b, n, s);
        return b;
    }

    //Set b to an n-bit random BigInt.  If s=1, then the most significant of those n bits is set to 1.
    //Array b must be big enough to hold the result. Must have n>=1
    function randBigInt_(b, n, s) {
        var i, a;
        for (i = 0; i < b.length; i++)
            b[i] = 0;
        a = Math.floor((n - 1) / bpe) + 1; //# array elements to hold the BigInt
        for (i = 0; i < a; i++) {
            b[i] = Math.floor(Math.random() * (1 << (bpe - 1)));
        }
        b[a - 1] &= (2 << ((n - 1) % bpe)) - 1;
        if (s === 1)
            b[a - 1] |= (1 << ((n - 1) % bpe));
    }

    //Return the greatest common divisor of bigInts x and y (each with same number of elements).
    function GCD(x, y) {
        var xc, yc;
        xc = dup(x);
        yc = dup(y);
        GCD_(xc, yc);
        return xc;
    }

    //set x to the greatest common divisor of bigInts x and y (each with same number of elements).
    //y is destroyed.
    function GCD_(x, y) {
        var i, xp, yp, A, B, C, D, q, sing;
        if (T.length !== x.length)
            T = dup(x);

        sing = 1;
        while (sing) { //while y has nonzero elements other than y[0]
            sing = 0;
            for (i = 1; i < y.length; i++) //check if y has nonzero elements other than 0
                if (y[i]) {
                    sing = 1;
                    break;
                }
            if (!sing) break; //quit when y all zero elements except possibly y[0]

            for (i = x.length; !x[i] && i >= 0; i--);  //find most significant element of x
            xp = x[i];
            yp = y[i];
            A = 1; B = 0; C = 0; D = 1;
            while ((yp + C) && (yp + D)) {
                q = Math.floor((xp + A) / (yp + C));
                qp = Math.floor((xp + B) / (yp + D));
                if (q !== qp)
                    break;
                t = A - q * C; A = C; C = t;    //  do (A,B,xp, C,D,yp) = (C,D,yp, A,B,xp) - q*(0,0,0, C,D,yp)      
                t = B - q * D; B = D; D = t;
                t = xp - q * yp; xp = yp; yp = t;
            }
            if (B) {
                copy_(T, x);
                linComb_(x, y, A, B); //x=A*x+B*y
                linComb_(y, T, D, C); //y=D*y+C*T
            } else {
                mod_(x, y);
                copy_(T, x);
                copy_(x, y);
                copy_(y, T);
            }
        }
        if (y[0] === 0)
            return;
        t = modInt(x, y[0]);
        copyInt_(x, y[0]);
        y[0] = t;
        while (y[0]) {
            x[0] %= y[0];
            t = x[0]; x[0] = y[0]; y[0] = t;
        }
    }

    //do x=x**(-1) mod n, for bigInts x and n.
    //If no inverse exists, it sets x to zero and returns 0, else it returns 1.
    //The x array must be at least as large as the n array.
    function inverseMod_(x, n) {
        var k = 1 + 2 * Math.max(x.length, n.length);

        if (!(x[0] & 1) && !(n[0] & 1)) {  //if both inputs are even, then inverse doesn't exist
            copyInt_(x, 0);
            return 0;
        }

        if (eg_u.length !== k) {
            eg_u = new Array(k);
            eg_v = new Array(k);
            eg_A = new Array(k);
            eg_B = new Array(k);
            eg_C = new Array(k);
            eg_D = new Array(k);
        }

        copy_(eg_u, x);
        copy_(eg_v, n);
        copyInt_(eg_A, 1);
        copyInt_(eg_B, 0);
        copyInt_(eg_C, 0);
        copyInt_(eg_D, 1);
        for (; ;) {
            while (!(eg_u[0] & 1)) {  //while eg_u is even
                halve_(eg_u);
                if (!(eg_A[0] & 1) && !(eg_B[0] & 1)) { //if eg_A==eg_B==0 mod 2
                    halve_(eg_A);
                    halve_(eg_B);
                } else {
                    add_(eg_A, n); halve_(eg_A);
                    sub_(eg_B, x); halve_(eg_B);
                }
            }

            while (!(eg_v[0] & 1)) {  //while eg_v is even
                halve_(eg_v);
                if (!(eg_C[0] & 1) && !(eg_D[0] & 1)) { //if eg_C==eg_D==0 mod 2
                    halve_(eg_C);
                    halve_(eg_D);
                } else {
                    add_(eg_C, n); halve_(eg_C);
                    sub_(eg_D, x); halve_(eg_D);
                }
            }

            if (!greater(eg_v, eg_u)) { //eg_v <= eg_u
                sub_(eg_u, eg_v);
                sub_(eg_A, eg_C);
                sub_(eg_B, eg_D);
            } else {                   //eg_v > eg_u
                sub_(eg_v, eg_u);
                sub_(eg_C, eg_A);
                sub_(eg_D, eg_B);
            }

            if (equalsInt(eg_u, 0)) {
                if (negative(eg_C)) //make sure answer is nonnegative
                    add_(eg_C, n);
                copy_(x, eg_C);

                if (!equalsInt(eg_v, 1)) { //if GCD_(x,n)!=1, then there is no inverse
                    copyInt_(x, 0);
                    return 0;
                }
                return 1;
            }
        }
    }

    //return x**(-1) mod n, for integers x and n.  Return 0 if there is no inverse
    function inverseModInt(x, n) {
        var a = 1, b = 0, t;
        for (; ;) {
            if (x === 1) return a;
            if (x === 0) return 0;
            b -= a * Math.floor(n / x);
            n %= x;

            if (n === 1) return b; //to avoid negatives, change this b to n-b, and each -= to +=
            if (n === 0) return 0;
            a -= b * Math.floor(x / n);
            x %= n;
        }
    }

    //this deprecated function is for backward compatibility only. 
    function inverseModInt_(x, n) {
        return inverseModInt(x, n);
    }


    //Given positive bigInts x and y, change the bigints v, a, and b to positive bigInts such that:
    //     v = GCD_(x,y) = a*x-b*y
    //The bigInts v, a, b, must have exactly as many elements as the larger of x and y.
    function eGCD_(x, y, v, a, b) {
        var g = 0;
        var k = Math.max(x.length, y.length);
        if (eg_u.length !== k) {
            eg_u = new Array(k);
            eg_A = new Array(k);
            eg_B = new Array(k);
            eg_C = new Array(k);
            eg_D = new Array(k);
        }
        while (!(x[0] & 1) && !(y[0] & 1)) {  //while x and y both even
            halve_(x);
            halve_(y);
            g++;
        }
        copy_(eg_u, x);
        copy_(v, y);
        copyInt_(eg_A, 1);
        copyInt_(eg_B, 0);
        copyInt_(eg_C, 0);
        copyInt_(eg_D, 1);
        for (; ;) {
            while (!(eg_u[0] & 1)) {  //while u is even
                halve_(eg_u);
                if (!(eg_A[0] & 1) && !(eg_B[0] & 1)) { //if A==B==0 mod 2
                    halve_(eg_A);
                    halve_(eg_B);
                } else {
                    add_(eg_A, y); halve_(eg_A);
                    sub_(eg_B, x); halve_(eg_B);
                }
            }

            while (!(v[0] & 1)) {  //while v is even
                halve_(v);
                if (!(eg_C[0] & 1) && !(eg_D[0] & 1)) { //if C==D==0 mod 2
                    halve_(eg_C);
                    halve_(eg_D);
                } else {
                    add_(eg_C, y); halve_(eg_C);
                    sub_(eg_D, x); halve_(eg_D);
                }
            }

            if (!greater(v, eg_u)) { //v<=u
                sub_(eg_u, v);
                sub_(eg_A, eg_C);
                sub_(eg_B, eg_D);
            } else {                //v>u
                sub_(v, eg_u);
                sub_(eg_C, eg_A);
                sub_(eg_D, eg_B);
            }
            if (equalsInt(eg_u, 0)) {
                if (negative(eg_C)) {   //make sure a (C)is nonnegative
                    add_(eg_C, y);
                    sub_(eg_D, x);
                }
                multInt_(eg_D, -1);  ///make sure b (D) is nonnegative
                copy_(a, eg_C);
                copy_(b, eg_D);
                leftShift_(v, g);
                return;
            }
        }
    }


    //is bigInt x negative?
    function negative(x) {
        return ((x[x.length - 1] >> (bpe - 1)) & 1);
    }

    function signum(x) {
        return negative(x) ? -1 : 0;
    }


    //is (x << (shift*bpe)) > y?
    //x and y are nonnegative bigInts
    //shift is a nonnegative integer
    function greaterShift(x, y, shift) {
        var i, kx = x.length, ky = y.length;
        k = ((kx + shift) < ky) ? (kx + shift) : ky;
        for (i = ky - 1 - shift; i < kx && i >= 0; i++)
            if (x[i] > 0)
                return 1; //if there are nonzeros in x to the left of the first column of y, then x is bigger
        for (i = kx - 1 + shift; i < ky; i++)
            if (y[i] > 0)
                return 0; //if there are nonzeros in y to the left of the first column of x, then x is not bigger
        for (i = k - 1; i >= shift; i--)
            if (x[i - shift] > y[i]) return 1;
            else if (x[i - shift] < y[i]) return 0;
        return 0;
    }

    //is x > y? (x and y both nonnegative)
    var greater = function (x, y) {
        var i;
        var k = (x.length < y.length) ? x.length : y.length;

        for (i = x.length; i < y.length; i++)
            if (y[i])
                return 0;  //y has more digits

        for (i = y.length; i < x.length; i++)
            if (x[i])
                return 1;  //x has more digits

        for (i = k - 1; i >= 0; i--)
            if (x[i] > y[i])
                return 1;
            else if (x[i] < y[i])
                return 0;
        return 0;
    };

    //divide x by y giving quotient q and remainder r.  (q=floor(x/y),  r=x mod y).  All 4 are bigints.
    //x must have at least one leading zero element.
    //y must be nonzero.
    //q and r must be arrays that are exactly the same length as x. (Or q can have more).
    //Must have x.length >= y.length >= 2.
    function divide_(x, y, q, r) {
        var kx, ky;
        var i, j, y1, y2, c, a, b;
        copy_(r, x);
        for (ky = y.length; y[ky - 1] === 0; ky--); //ky is number of elements in y, not including leading zeros

        //normalize: ensure the most significant element of y has its highest bit set  
        b = y[ky - 1];
        for (a = 0; b; a++)
            b >>= 1;
        a = bpe - a;  //a is how many bits to shift so that the high order bit of y is leftmost in its array element
        leftShift_(y, a);  //multiply both by 1<<a now, then divide both by that at the end
        leftShift_(r, a);

        //Rob Visser discovered a bug: the following line was originally just before the normalization.
        for (kx = r.length; r[kx - 1] === 0 && kx > ky; kx--); //kx is number of elements in normalized x, not including leading zeros

        copyInt_(q, 0);                      // q=0
        while (!greaterShift(y, r, kx - ky)) {  // while (leftShift_(y,kx-ky) <= r) {
            subShift_(r, y, kx - ky);             //   r=r-leftShift_(y,kx-ky)
            q[kx - ky]++;                       //   q[kx-ky]++;
        }                                   // }

        for (i = kx - 1; i >= ky; i--) {
            if (r[i] === y[ky - 1])
                q[i - ky] = mask;
            else
                q[i - ky] = Math.floor((r[i] * radix + r[i - 1]) / y[ky - 1]);

            //The following for(;;) loop is equivalent to the commented while loop, 
            //except that the uncommented version avoids overflow.
            //The commented loop comes from HAC, which assumes r[-1]==y[-1]==0
            //  while (q[i-ky]*(y[ky-1]*radix+y[ky-2]) > r[i]*radix*radix+r[i-1]*radix+r[i-2])
            //    q[i-ky]--;    
            for (; ;) {
                y2 = (ky > 1 ? y[ky - 2] : 0) * q[i - ky];
                c = y2 >> bpe;
                y2 = y2 & mask;
                y1 = c + q[i - ky] * y[ky - 1];
                c = y1 >> bpe;
                y1 = y1 & mask;

                if (c === r[i] ? y1 === r[i - 1] ? y2 > (i > 1 ? r[i - 2] : 0) : y1 > r[i - 1] : c > r[i])
                    q[i - ky]--;
                else
                    break;
            }

            linCombShift_(r, y, -q[i - ky], i - ky);    //r=r-q[i-ky]*leftShift_(y,i-ky)
            if (negative(r)) {
                addShift_(r, y, i - ky);         //r=r+leftShift_(y,i-ky)
                q[i - ky]--;
            }
        }

        rightShift_(y, a);  //undo the normalization step
        rightShift_(r, a);  //undo the normalization step
    }

    //do carries and borrows so each element of the bigInt x fits in bpe bits.
    function carry_(x) {
        var i, k, c, b;
        k = x.length;
        c = 0;
        for (i = 0; i < k; i++) {
            c += x[i];
            b = 0;
            if (c < 0) {
                b = -(c >> bpe);
                c += b * radix;
            }
            x[i] = c & mask;
            c = (c >> bpe) - b;
        }
    }

    //return x mod n for bigInt x and integer n.
    function modInt(x, n) {
        var i, c = 0;
        for (i = x.length - 1; i >= 0; i--)
            c = (c * radix + x[i]) % n;
        return c;
    }

    //convert the integer t into a bigInt with at least the given number of bits.
    //the returned array stores the bigInt in bpe-bit chunks, little endian (buff[0] is least significant word)
    //Pad the array with leading zeros so that it has at least minSize elements.
    //There will always be at least one leading 0 element.
    function int2bigInt(t, bits, minSize) {
        var i, k;
        k = Math.ceil(bits / bpe) + 1;
        k = minSize > k ? minSize : k;
        buff = new Array(k);
        copyInt_(buff, t);
        return buff;
    }

    //return the bigInt given a string representation in a given base.  
    //Pad the array with leading zeros so that it has at least minSize elements.
    //If base=-1, then it reads in a space-separated list of array elements in decimal.
    //The array will always have at least one leading zero, unless base=-1.
    function str2bigInt(s, base, minSize) {
        var d, i, j, x, y, kk;
        var k = s.length;
        if (base === -1) { //comma-separated list of array elements in decimal
            x = new Array(0);
            for (; ;) {
                y = new Array(x.length + 1);
                for (i = 0; i < x.length; i++)
                    y[i + 1] = x[i];
                y[0] = parseInt(s, 10);
                x = y;
                d = s.indexOf(',', 0);
                if (d < 1)
                    break;
                s = s.substring(d + 1);
                if (s.length === 0)
                    break;
            }
            if (x.length < minSize) {
                y = new Array(minSize);
                copy_(y, x);
                return y;
            }
            return x;
        }

        x = int2bigInt(0, base * k, 0);
        for (i = 0; i < k; i++) {
            d = digitsStr.indexOf(s.substring(i, i + 1), 0);
            if (base <= 36 && d >= 36)  //convert lowercase to uppercase if base<=36
                d -= 26;
            if (d >= base || d < 0) {   //stop at first illegal character
                break;
            }
            multInt_(x, base);
            addInt_(x, d);
        }

        for (k = x.length; k > 0 && !x[k - 1]; k--); //strip off leading zeros
        k = minSize > k + 1 ? minSize : k + 1;
        y = new Array(k);
        kk = k < x.length ? k : x.length;
        for (i = 0; i < kk; i++)
            y[i] = x[i];
        for (; i < k; i++)
            y[i] = 0;
        return y;
    }

    //is bigint x equal to integer y?
    //y must have less than bpe bits
    function equalsInt(x, y) {
        var i;
        if (x[0] !== y)
            return 0;
        for (i = 1; i < x.length; i++)
            if (x[i])
                return 0;
        return 1;
    }

    //are bigints x and y equal?
    //this works even if x and y are different lengths and have arbitrarily many leading zeros
    function equals(x, y) {
        var i;
        var k = x.length < y.length ? x.length : y.length;
        for (i = 0; i < k; i++)
            if (x[i] !== y[i])
                return 0;
        if (x.length > y.length) {
            for (; i < x.length; i++)
                if (x[i])
                    return 0;
        } else {
            for (; i < y.length; i++)
                if (y[i])
                    return 0;
        }
        return 1;
    }

    //is the bigInt x equal to zero?
    function isZero(x) {
        var i;
        for (i = 0; i < x.length; i++)
            if (x[i])
                return 0;
        return 1;
    }

    //convert a bigInt into a string in a given base, from base 2 up to base 95.
    //Base -1 prints the contents of the array representing the number.
    function bigInt2str(x, base) {
        var i, t, s = "";

        if (s6.length !== x.length)
            s6 = dup(x);
        else
            copy_(s6, x);

        if (base === -1) { //return the list of array contents
            for (i = x.length - 1; i > 0; i--)
                s += x[i] + ',';
            s += x[0];
        }
        else { //return it in the given base
            while (!isZero(s6)) {
                t = divInt_(s6, base);  //t=s6 % base; s6=floor(s6/base);
                s = digitsStr.substring(t, t + 1) + s;
            }
        }
        if (s.length === 0)
            s = "0";
        return s;
    }

    //returns a duplicate of bigInt x
    function dup(x) {
        var i;
        buff = new Array(x.length);
        copy_(buff, x);
        return buff;
    }

    //do x=y on bigInts x and y.  x must be an array at least as big as y (not counting the leading zeros in y).
    function copy_(x, y) {
        var i;
        var k = x.length < y.length ? x.length : y.length;
        for (i = 0; i < k; i++)
            x[i] = y[i];
        for (i = k; i < x.length; i++)
            x[i] = 0;
    }

    //do x=y on bigInt x and integer y.  
    function copyInt_(x, n) {
        var i, c;
        for (c = n, i = 0; i < x.length; i++) {
            x[i] = c & mask;
            c >>= bpe;
        }
    }

    //do x=x+n where x is a bigInt and n is an integer.
    //x must be large enough to hold the result.
    function addInt_(x, n) {
        var i, k, c, b;
        x[0] += n;
        k = x.length;
        c = 0;
        for (i = 0; i < k; i++) {
            c += x[i];
            b = 0;
            if (c < 0) {
                b = -(c >> bpe);
                c += b * radix;
            }
            x[i] = c & mask;
            c = (c >> bpe) - b;
            if (!c) return; //stop carrying as soon as the carry is zero
        }
    }

    //right shift bigInt x by n bits.  0 <= n < bpe.
    function rightShift_(x, n) {
        var i;
        var k = Math.floor(n / bpe);
        if (k) {
            for (i = 0; i < x.length - k; i++) //right shift x by k elements
                x[i] = x[i + k];
            for (; i < x.length; i++)
                x[i] = 0;
            n %= bpe;
        }
        for (i = 0; i < x.length - 1; i++) {
            x[i] = mask & ((x[i + 1] << (bpe - n)) | (x[i] >> n));
        }
        x[i] >>= n;
    }

    //do x=floor(|x|/2)*sgn(x) for bigInt x in 2's complement
    function halve_(x) {
        var i;
        for (i = 0; i < x.length - 1; i++) {
            x[i] = mask & ((x[i + 1] << (bpe - 1)) | (x[i] >> 1));
        }
        x[i] = (x[i] >> 1) | (x[i] & (radix >> 1));  //most significant bit stays the same
    }

    //left shift bigInt x by n bits.
    function leftShift_(x, n) {
        var i;
        var k = Math.floor(n / bpe);
        if (k) {
            for (i = x.length; i >= k; i--) //left shift x by k elements
                x[i] = x[i - k];
            for (; i >= 0; i--)
                x[i] = 0;
            n %= bpe;
        }
        if (!n)
            return;
        for (i = x.length - 1; i > 0; i--) {
            x[i] = mask & ((x[i] << n) | (x[i - 1] >> (bpe - n)));
        }
        x[i] = mask & (x[i] << n);
    }

    //do x=x*n where x is a bigInt and n is an integer.
    //x must be large enough to hold the result.
    function multInt_(x, n) {
        var i, k, c, b;
        if (!n)
            return;
        k = x.length;
        c = 0;
        for (i = 0; i < k; i++) {
            c += x[i] * n;
            b = 0;
            if (c < 0) {
                b = -(c >> bpe);
                c += b * radix;
            }
            x[i] = c & mask;
            c = (c >> bpe) - b;
        }
    }

    //do x=floor(x/n) for bigInt x and integer n, and return the remainder
    function divInt_(x, n) {
        var i, r = 0, s;
        for (i = x.length - 1; i >= 0; i--) {
            s = r * radix + x[i];
            x[i] = Math.floor(s / n);
            r = s % n;
        }
        return r;
    }

    //do the linear combination x=a*x+b*y for bigInts x and y, and integers a and b.
    //x must be large enough to hold the answer.
    function linComb_(x, y, a, b) {
        var i, c, k, kk;
        k = x.length < y.length ? x.length : y.length;
        kk = x.length;
        for (c = 0, i = 0; i < k; i++) {
            c += a * x[i] + b * y[i];
            x[i] = c & mask;
            c >>= bpe;
        }
        for (i = k; i < kk; i++) {
            c += a * x[i];
            x[i] = c & mask;
            c >>= bpe;
        }
    }

    //do the linear combination x=a*x+b*(y<<(ys*bpe)) for bigInts x and y, and integers a, b and ys.
    //x must be large enough to hold the answer.
    function linCombShift_(x, y, b, ys) {
        var i, c, k, kk;
        k = x.length < ys + y.length ? x.length : ys + y.length;
        kk = x.length;
        for (c = 0, i = ys; i < k; i++) {
            c += x[i] + b * y[i - ys];
            x[i] = c & mask;
            c >>= bpe;
        }
        for (i = k; c && i < kk; i++) {
            c += x[i];
            x[i] = c & mask;
            c >>= bpe;
        }
    }

    //do x=x+(y<<(ys*bpe)) for bigInts x and y, and integers a,b and ys.
    //x must be large enough to hold the answer.
    function addShift_(x, y, ys) {
        var i, c, k, kk;
        k = x.length < ys + y.length ? x.length : ys + y.length;
        kk = x.length;
        for (c = 0, i = ys; i < k; i++) {
            c += x[i] + y[i - ys];
            x[i] = c & mask;
            c >>= bpe;
        }
        for (i = k; c && i < kk; i++) {
            c += x[i];
            x[i] = c & mask;
            c >>= bpe;
        }
    }

    //do x=x-(y<<(ys*bpe)) for bigInts x and y, and integers a,b and ys.
    //x must be large enough to hold the answer.
    function subShift_(x, y, ys) {
        var i, c, k, kk;
        k = x.length < ys + y.length ? x.length : ys + y.length;
        kk = x.length;
        for (c = 0, i = ys; i < k; i++) {
            c += x[i] - y[i - ys];
            x[i] = c & mask;
            c >>= bpe;
        }
        for (i = k; c && i < kk; i++) {
            c += x[i];
            x[i] = c & mask;
            c >>= bpe;
        }
    }

    //do x=x-y for bigInts x and y.
    //x must be large enough to hold the answer.
    //negative answers will be 2s complement
    function sub_(x, y) {
        //		var xN = negative(x);
        //		var yN = negative(y);
        //		var z, y1;
        //		if (xN) negate_(x);
        //		if (yN) y1 = negate(y);
        //		if (xN){
        //			if (yN){
        //				if (greater(x, y1)){
        //					sub_(x, y1);
        //					negate_(x);
        //					return;
        //				}else{
        //					z = sub(y1, x);
        //					copy_(x, z);
        //					return;
        //				}
        //			}else{
        //				add_(x, y);
        //				negate_(x);
        //				return;
        //			}
        //		}else{
        //			if (yN){
        //				add_(x, y);
        //				return;
        //			}else{
        //				if (!greater(x, y)){
        //					z = sub(y, x);
        //					copy_(x, z);
        //					negate_(x);
        //					return; 
        //				}
        //			}
        //		}


        var i, c, k, kk;
        k = x.length < y.length ? x.length : y.length;
        for (c = 0, i = 0; i < k; i++) {
            c += x[i] - y[i];
            x[i] = c & mask;
            c >>= bpe;
        }
        for (i = k; c && i < x.length; i++) {
            c += x[i];
            x[i] = c & mask;
            c >>= bpe;
        }
    }

    //do x=x+y for bigInts x and y.
    //x must be large enough to hold the answer.
    function add_(x, y) {
        var xN = negative(x);
        var yN = negative(y);
        var z, y1;
        //		if (xN) negate_(x);
        if (yN) y1 = negate(y);
        if (xN) {
            //			if (yN){
            //				add_(x, y1);
            //				negate_(x);
            //				return;
            //			}else{
            //				if (greater(y1, x)){
            //					z = sub(y1, x);
            //					copy_(x, z);
            //					return;
            //				}else{
            //					sub_(x, y1);
            //					negate_(x);
            //					return;
            //				}
            //			}	
        } else {
            if (yN) {
                if (greater(x, y1)) {
                    sub_(x, y1);
                    return;
                } else {
                    z = sub(y1, x);
                    copy_(x, z);
                    negate_(x);
                    return;
                }
            }
        }

        var i, c, k, kk;
        k = x.length < y.length ? x.length : y.length;
        for (c = 0, i = 0; i < k; i++) {
            c += x[i] + y[i];
            x[i] = c & mask;
            c >>= bpe;
        }
        for (i = k; c && i < x.length; i++) {
            c += x[i];
            x[i] = c & mask;
            c >>= bpe;
        }
    }

    //do x=x*y for bigInts x and y.  This is faster when y<x.
    function mult_(x, y) {
        var i;
        if (ss.length !== 2 * x.length)
            ss = new Array(2 * x.length);
        copyInt_(ss, 0);
        for (i = 0; i < y.length; i++)
            if (y[i])
                linCombShift_(ss, x, y[i], i);   //ss=1*ss+y[i]*(x<<(i*bpe))
        copy_(x, ss);
    }

    //do x=x mod n for bigInts x and n.
    function mod_(x, n) {
        if (s4.length !== x.length)
            s4 = dup(x);
        else
            copy_(s4, x);
        if (s5.length !== x.length)
            s5 = dup(x);
        divide_(s4, n, s5, x);  //x = remainder of s4 / n
    }

    //do x=x*y mod n for bigInts x,y,n.
    //for greater speed, let y<x.
    function multMod_(x, y, n) {
        var i;
        if (s0.length !== 2 * x.length)
            s0 = new Array(2 * x.length);
        copyInt_(s0, 0);
        for (i = 0; i < y.length; i++)
            if (y[i])
                linCombShift_(s0, x, y[i], i);   //s0=1*s0+y[i]*(x<<(i*bpe))
        mod_(s0, n);
        copy_(x, s0);
    }

    //do x=x*x mod n for bigInts x,n.
    function squareMod_(x, n) {
        var i, j, d, c, kx, kn, k;
        for (kx = x.length; kx > 0 && !x[kx - 1]; kx--);  //ignore leading zeros in x
        k = kx > n.length ? 2 * kx : 2 * n.length; //k=# elements in the product, which is twice the elements in the larger of x and n
        if (s0.length !== k)
            s0 = new Array(k);
        copyInt_(s0, 0);
        for (i = 0; i < kx; i++) {
            c = s0[2 * i] + x[i] * x[i];
            s0[2 * i] = c & mask;
            c >>= bpe;
            for (j = i + 1; j < kx; j++) {
                c = s0[i + j] + 2 * x[i] * x[j] + c;
                s0[i + j] = c & mask;
                c >>= bpe;
            }
            s0[i + kx] = c;
        }
        mod_(s0, n);
        copy_(x, s0);
    }

    //return x with exactly k leading zero elements
    function trim(x, k) {
        var i, y;
        for (i = x.length; i > 0 && !x[i - 1]; i--);
        y = new Array(i + k);
        copy_(y, x);
        return y;
    }

    //do x=x**y mod n, where x,y,n are bigInts and ** is exponentiation.  0**0=1.
    //this is faster when n is odd.  x usually needs to have as many elements as n.
    function powMod_(x, y, n) {
        var k1, k2, kn, np;
        if (s7.length !== n.length)
            s7 = dup(n);

        //for even modulus, use a simple square-and-multiply algorithm,
        //rather than using the more complex Montgomery algorithm.
        if ((n[0] & 1) === 0) {
            copy_(s7, x);
            copyInt_(x, 1);
            while (!equalsInt(y, 0)) {
                if (y[0] & 1)
                    multMod_(x, s7, n);
                divInt_(y, 2);
                squareMod_(s7, n);
            }
            return;
        }

        //calculate np from n for the Montgomery multiplications
        copyInt_(s7, 0);
        for (kn = n.length; kn > 0 && !n[kn - 1]; kn--);
        np = radix - inverseModInt(modInt(n, radix), radix);
        s7[kn] = 1;
        multMod_(x, s7, n);   // x = x * 2**(kn*bp) mod n

        if (s3.length !== x.length)
            s3 = dup(x);
        else
            copy_(s3, x);

        for (k1 = y.length - 1; k1 > 0 & !y[k1]; k1--);  //k1=first nonzero element of y
        if (y[k1] === 0) {  //anything to the 0th power is 1
            copyInt_(x, 1);
            return;
        }
        for (k2 = 1 << (bpe - 1); k2 && !(y[k1] & k2); k2 >>= 1);  //k2=position of first 1 bit in y[k1]
        for (; ;) {
            if (!(k2 >>= 1)) {  //look at next bit of y
                k1--;
                if (k1 < 0) {
                    mont_(x, one, n, np);
                    return;
                }
                k2 = 1 << (bpe - 1);
            }
            mont_(x, x, n, np);

            if (k2 & y[k1]) //if next bit is a 1
                mont_(x, s3, n, np);
        }
    }


    //do x=x*y*Ri mod n for bigInts x,y,n, 
    //  where Ri = 2**(-kn*bpe) mod n, and kn is the 
    //  number of elements in the n array, not 
    //  counting leading zeros.  
    //x array must have at least as many elemnts as the n array
    //It's OK if x and y are the same variable.
    //must have:
    //  x,y < n
    //  n is odd
    //  np = -(n^(-1)) mod radix
    function mont_(x, y, n, np) {
        var i, j, c, ui, t, ks;
        var kn = n.length;
        var ky = y.length;

        if (sa.length !== kn)
            sa = new Array(kn);

        copyInt_(sa, 0);

        for (; kn > 0 && n[kn - 1] === 0; kn--); //ignore leading zeros of n
        for (; ky > 0 && y[ky - 1] === 0; ky--); //ignore leading zeros of y
        ks = sa.length - 1; //sa will never have more than this many nonzero elements.  

        //the following loop consumes 95% of the runtime for randTruePrime_() and powMod_() for large numbers
        for (i = 0; i < kn; i++) {
            t = sa[0] + x[i] * y[0];
            ui = ((t & mask) * np) & mask;  //the inner "& mask" was needed on Safari (but not MSIE) at one time
            c = (t + ui * n[0]) >> bpe;
            t = x[i];

            //do sa=(sa+x[i]*y+ui*n)/b   where b=2**bpe.  Loop is unrolled 5-fold for speed
            j = 1;
            for (; j < ky - 4;) {
                c += sa[j] + ui * n[j] + t * y[j]; sa[j - 1] = c & mask; c >>= bpe; j++;
                c += sa[j] + ui * n[j] + t * y[j]; sa[j - 1] = c & mask; c >>= bpe; j++;
                c += sa[j] + ui * n[j] + t * y[j]; sa[j - 1] = c & mask; c >>= bpe; j++;
                c += sa[j] + ui * n[j] + t * y[j]; sa[j - 1] = c & mask; c >>= bpe; j++;
                c += sa[j] + ui * n[j] + t * y[j]; sa[j - 1] = c & mask; c >>= bpe; j++;
            }
            for (; j < ky;) { c += sa[j] + ui * n[j] + t * y[j]; sa[j - 1] = c & mask; c >>= bpe; j++; }
            for (; j < kn - 4;) {
                c += sa[j] + ui * n[j]; sa[j - 1] = c & mask; c >>= bpe; j++;
                c += sa[j] + ui * n[j]; sa[j - 1] = c & mask; c >>= bpe; j++;
                c += sa[j] + ui * n[j]; sa[j - 1] = c & mask; c >>= bpe; j++;
                c += sa[j] + ui * n[j]; sa[j - 1] = c & mask; c >>= bpe; j++;
                c += sa[j] + ui * n[j]; sa[j - 1] = c & mask; c >>= bpe; j++;
            }
            for (; j < kn;) { c += sa[j] + ui * n[j]; sa[j - 1] = c & mask; c >>= bpe; j++; }
            for (; j < ks;) { c += sa[j]; sa[j - 1] = c & mask; c >>= bpe; j++; }
            sa[j - 1] = c & mask;
        }

        if (!greater(n, sa))
            sub_(sa, n);
        copy_(x, sa);
    }

    //------------------------------------------------------------
    // add, add_, sub, sub_ methods were modified to support negative big ints.
    //------------------------------------------------------------

    function negate(x) {
        var y = dup(x);
        multInt_(y, -1);
        return y;
    }

    function negate_(x) {
        multInt_(x, -1);
    }

    this.ToArray = function (x, base) {
        var i, t;
        var s = [];
        if (s6.length !== x.length)
            s6 = dup(x);
        else
            copy_(s6, x);

        if (base === -1) { //return the list of array contents
            for (i = 0; i < x.length; i++) s.push(x[i]);
        }
        else { //return it in the given base
            while (!isZero(s6)) {
                t = divInt_(s6, base);  //t=s6 % base; s6=floor(s6/base);
                s.push(t);
            }
        }
        if (s.length === 0) s.push(0);
        return s;
    };

    this.FromArray = function (s, base, minSize) {
        var d, i, j, x, y, kk;

        var k = s.length;
        x = int2bigInt(0, base * k, 0);
        for (i = 0; i < k; i++) {
            d = s[i];
            if (d >= base || d < 0) {   //stop at first illegal character
                break;
            }
            multInt_(x, base);
            addInt_(x, d);
        }

        for (k = x.length; k > 0 && !x[k - 1]; k--); //strip off leading zeros
        k = minSize > k + 1 ? minSize : k + 1;
        y = new Array(k);
        kk = k < x.length ? k : x.length;
        for (i = 0; i < kk; i++)
            y[i] = x[i];
        for (; i < k; i++)
            y[i] = 0;
        return y;
    };

    var greater2 = greater;

    greater = function (x, y) {

        return greater2(x, y) === 1;

    };

    this.ToBytes = function (x) { return this.ToArray(x, 256); };
    this.FromBytes = function (bytes) { return this.FromArray(bytes, 256, 0); };

    this._initialize = function () {

        this.ElementSize = bpe;
        this.ElementMask = mask;
        this.ElementRadix = radix;

        radix = mask + 1;  //equals 2^bpe.  A single 1 bit to the left of the last bit of mask.
        //the digits for converting to different bases
        digitsStr = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_=!@#$%^&*()[]{}|;:,.<>/?`~ \\\'\"+-';

        //initialize the global variables
        for (bpe = 0; (1 << (bpe + 1)) > (1 << bpe); bpe++);  //bpe=number of bits in the mantissa on this platform
        bpe >>= 1;                   //bpe=number of bits in one element of the array representing the bigInt
        mask = (1 << bpe) - 1;           //AND the mask with an integer to get its bpe least significant bits
        radix = mask + 1;              //2^bpe.  a single 1 bit to the left of the first bit of mask
        one = int2bigInt(1, 1, 1);     //constant used in powMod_()

        this.Add = add;
        this.AddInt = addInt;
        this.ToString = bigInt2str;
        this.BitCount = bitSize;
        this.Clone = dup;
        this.Equals = equals;
        this.EqualsInt = equalsInt;
        this.Expand = expand;
        this.GetPrimes = findPrimes;
        this.GCD = GCD;
        this.MoreThan = greater;
        this.MoreThanShitf = greaterShift;
        this.FromInt = int2bigInt;
        this.InverseMod = inverseMod;
        this.InverseModInt = inverseModInt;
        this.IsZero = isZero;
        this.IsProbPrime = millerRabin;
        this.IsPronPrimeInt = millerRabinInt;
        this.Mod = mod;
        this.ModInt = modInt;
        this.Multiply = mult;
        this.MultiplyMod = multMod;
        this.IsNegative = negative;
        this.PowMod = powMod;
        this.NewBigInt = randBigInt;
        this.NewPrime = randTruePrime;
        this.NewProbPrime = randProbPrime;
        this.FromString = str2bigInt;
        this.Subtract = sub;
        this.Trim = trim;

        this.Negate = negate;
        this.Negate_ = negate_;

        this.Add_ = add_;
        this.AddInt_ = addInt_;
        this.Clone_ = copy_;
        this.CloneInt_ = copyInt_;
        this.GCD_ = GCD_;
        this.InverseMod_ = inverseMod_;
        this.Mod_ = mod_;
        this.Multiply_ = mult_;
        this.MultiplyMod_ = multMod_;
        this.PowMod_ = powMod_;
        this.NewBigInt_ = randBigInt_;
        this.NewPrime_ = randTruePrime_;
        this.Subtract_ = sub_;

        this.AddShift_ = addShift_;
        this.Carry_ = carry_;
        this.Divide_ = divide_;
        this.DivideInt_ = divInt_;
        this.eGCD_ = eGCD_;
        this.Halve_ = halve_;
        this.LeftShift_ = leftShift_;
        this.LinComb_ = linComb_;
        this.LinCombShift_ = linCombShift_;
        this.MontMultiply_ = mont_;
        this.MultiplyInt_ = multInt_;
        this.RightShift_ = rightShift_;
        this.SquareMod_ = squareMod_;
        this.SubtractShift_ = subShift_;

    };
    this._initialize.apply(this, arguments);

};

System.BigInt.Utils = new System.BigInt._Utils();

System.BigInt.Add = function (a, b) {
    var bi = new System.BigInt();
    bi.digits = System.BigInt.Utils.Add(a.digits, b.digits);
    return bi;
};
System.BigInt.Divide = function (a, b, qBi, rBi) {
    qBi.digits = new Array(a.digits.length);
    rBi.digits = new Array(a.digits.length);
    System.BigInt.Utils.Divide_(a.digits, b.digits, qBi.digits, rBi.digits);
};
System.BigInt.Negate = function (a) {
    System.BigInt.Utils.Negate_(a.digits);
};
System.BigInt.Multiply = function (a, b) {
    var bi = new System.BigInt();
    bi.digits = System.BigInt.Utils.Multiply(a.digits, b.digits);
    return bi;
};
System.BigInt.Subtract = function (a, b) {
    var bi = new System.BigInt();
    bi.digits = System.BigInt.Utils.Subtract(a.digits, b.digits);
    return bi;
};

//==============================================================================
// END
//------------------------------------------------------------------------------


//=============================================================================
// Jocys.com JavaScript.NET Classes               (In C# Object Oriented Style)
// Created by Evaldas Jocys <evaldas@jocys.com>
//=============================================================================
/// <reference path="System.debug.js" />
//=============================================================================
// Namespaces
//-----------------------------------------------------------------------------
// <PropertyGroup>
//		<RootNamespace>System.Security.Cryptography</RootNamespace>
// <PropertyGroup>
//-----------------------------------------------------------------------------
System.Type.RegisterNamespace("System.Security.Cryptography");
//=============================================================================

System.Security.Cryptography.CryptographicException = function (message) {
    this.message = message;
    this.toString = function () { return this.name + ": " + this.message; };
    var err = Error.create(this.message, { name: this.GetType().FullName });
    err.popStackFrame();
    return err;
};
System.Type.RegisterClass("System.Security.Cryptography.CryptographicException");


System.Security.Cryptography.Rfc2898DeriveBytes = function (password, salt, iterations) {
    /// <summary>
    /// RFC2898 (PKCS#5 v2) Key derivation for Password Based Encryption 
    /// Parameters
    /// </summary>
    /// <param name="password">The password to derive the key for.</param>
    /// <param name="salt">The key salt to use to derive the key.</param>
    /// <remarks>
    /// Recreated as class by Evaldas Jocys (http://www.jocys.com)
    ///
    /// Original Author: Sebastien Pouliot (sebastien@ximian.com)
    /// (C) 2003 Motus Technologies Inc. (http://www.motus.com)
    /// Copyright (C) 2004-2005 Novell, Inc (http://www.novell.com)
    ///
    /// Permission is hereby granted, free of charge, to any person obtaining
    /// a copy of this software and associated documentation files (the
    /// "Software"), to deal in the Software without restriction, including
    /// without limitation the rights to use, copy, modify, merge, publish,
    /// distribute, sublicense, and/or sell copies of the Software, and to
    /// permit persons to whom the Software is furnished to do so, subject to
    /// the following conditions:
    /// 
    /// The above copyright notice and this permission notice shall be
    /// included in all copies or substantial portions of the Software.
    /// 
    /// IMPORTANT NOTE:
    /// 
    /// It seems that original Mono RFC2898 implementation have a bug.
    /// Mono developers blame it on Microsoft but actualy Mono are wrong.
    /// You check it by getting bytes bytes: 
    /// Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes("password", "saltsalt", 100);
    /// bytes[] b48 = pdb.GetBytes(48) // Get 48 bytes.
    /// pdb.Reset(); // Reset RFC2898
    /// bytes[] b32 = pdb.GetBytes(32) // Get 32 bytes.
    /// bytes[] b16 = pdb.GetBytes(16) // Get 16 bytes.
    /// then convert them to hex string with BitConverter.ToString(bNN);
    /// and see that [b48] is not equal to [b32 + b16];
    ///
    /// Workaroud for Mono. You can get correct bytes by doing:
    /// byte[] data = pdb.GetBytes(48);
    /// and then split the first 32 bytes for the key and the last 16 bytes
    /// for the IV.
    /// </remarks>
    //---------------------------------------------------------
    // Public properties.
    this.IterationCount = 1000;
    this.Password;
    this.Salt;
    this.Hmac;
    // HMACSHA1 == 160 bits == 20 bytes.
    this.HmacLength = 20;
    //---------------------------------------------------------
    // Private properties.
    var _buffer;
    var _pos = 0;
    var _f = 0;
    //---------------------------------------------------------
    this.F = function (s, c, i) {
        var data = new Array(s.length + 4);
        System.Buffer.BlockCopy(s, 0, data, 0, s.length);
        // JS: Replace 'undefined' values with 0.
        for (var b = 0; b < 4; b++) data[s.length + b] = 0;
        var int4 = System.BitConverter.GetBytes(i);
        System.Array.Reverse(int4, 0, 4);
        System.Buffer.BlockCopy(int4, 0, data, s.length, 4);
        // this is like j=0
        var u1 = this.Hmac.ComputeHash(this.Password, data);
        data = u1;
        // so we start at j=1
        for (var j = 1; j < c; j++) {
            var un = this.Hmac.ComputeHash(this.Password, data);
            // xor
            for (var k = 0; k < this.HmacLength; k++) {
                u1[k] = (u1[k] ^ un[k]) & 0xff;
            }
            data = un;
        }
        return u1;
    };
    //---------------------------------------------------------
    this.GetBytes = function (cb) {
        /// <summary>
        /// Returns pseudo-random key bytes.
        /// </summary>
        /// <param name="cb">The number of pseudo-random key bytes to generate.</param>
        /// <returns>A byte array filled with pseudo-random key bytes.</returns>
        //Trace.Write("hs:"+this.Hmac.ComputeHash(this.Password, "data"));
        var l = Math.floor(cb / this.HmacLength);
        var r = Math.floor(cb % this.HmacLength); // remainder
        if (r !== 0) l++; // rounding up
        var result = new Array(cb);
        var rpos = 0;
        var count = 0;
        if (_pos > 0) {
            count = Math.min(this.HmacLength - _pos, cb);
            System.Buffer.BlockCopy(_buffer, _pos, result, 0, count);
            if (count >= cb) return result;
            _pos = 0;
            //rpos = this.HmacLength - cb; // Mono buggy line.
            rpos = (rpos + count) % cb; // Microsoft correct line.
            r = cb - rpos;
        }
        for (var i = 1; i <= l; i++) {
            _buffer = this.F(this.Salt, this.IterationCount, ++_f);
            count = i === l ? r : this.HmacLength;
            System.Buffer.BlockCopy(_buffer, _pos, result, rpos, count);
            var bpos = rpos; // Microsoft correct line. 
            //rpos += _pos + count; // Mono buggy line//
            rpos = (rpos + _pos + count) % cb; // Microsoft correct line. 
            _pos = count === this.HmacLength ? 0 : count;
            if (bpos + count >= cb) return result;
        }
        return result;
    };
    //---------------------------------------------------------
    function Reset() {
        _buffer = null;
        _pos = 0;
        _f = 0;
    }
    //---------------------------------------------------------
    this.Initialize = function () {
        var password = arguments[0];
        var salt = arguments[1];
        var iterations = arguments[2];
        // Convert from string to bytes if neccessary.
        if (typeof password === "string") password = System.Text.Encoding.UTF8.GetBytes(password);
        if (typeof salt === "string") salt = System.Text.Encoding.UTF8.GetBytes(salt);
        this.Password = password;
        //Trace.Write("Salt: "+salt);
        this.Salt = salt;
        if (iterations) this.IterationCount = iterations;
        this.Hmac = new System.Security.Cryptography.HMACSHA1();
    };
    this.Initialize.apply(this, arguments);
};
System.Type.RegisterClass("System.Security.Cryptography.Rfc2898DeriveBytes");

System.Security.Cryptography.ICryptoTransform = function (algorithm, encryption, rgbIV) {
    /// <summary>
    /// Defines the basic operations of cryptographic transformations.
    /// </summary>
    //---------------------------------------------------------
    // Private Properties.
    var iv = [];
    var algo = null;
    var encrypt = false;
    var blockSizeByte = 0;
    var temp = [];
    var temp2 = [];
    var workBuff = [];
    var workout = [];
    var feedBackByte = 0;
    var feedBackIter = 0;
    var m_disposed = false;
    var lastBlock = false;
    var _rng;
    //---------------------------------------------------------
    // Public Properties.
    this.InputBlockSize = 0;
    this.OutputBlockSize = 0;
    this.CanTransformMultipleBlocks = true;
    this.CanReuseTransform = false;
    //---------------------------------------------------------
    this._Transform = function (input, output) {
        /// <summary>
        /// </summary>
        /// <param type="byte[]" name="input"></param>
        /// <param type="byte[]" name="output"></param>
        /// <remarks>
        /// Each block MUST be BlockSizeValue in size!!!
        /// i.e. Any padding must be done before calling this method
        /// </remarks>
        switch (algo.Mode) {
            case System.Security.Cryptography.CipherMode.ECB:
                ECB(input, output);
                break;
            case System.Security.Cryptography.CipherMode.CBC:
                CBC(input, output);
                break;
            case System.Security.Cryptography.CipherMode.CFB:
                CFB(input, output);
                break;
            case System.Security.Cryptography.CipherMode.OFB:
                OFB(input, output);
                break;
            case System.Security.Cryptography.CipherMode.CTS:
                CTS(input, output);
                break;
            default:
                var msg = "Unkown CipherMode" + algo.Mode;
                throw msg;
        }
    };
    //---------------------------------------------------------
    // Electronic Code Book (ECB)
    function ECB(input, output) {
        var outputBuffer;
        if (encrypt) {
            outputBuffer = algo.Encrypt(algo.Key, input, System.Security.Cryptography.CipherMode.ECB);
            //var outputBuffer = input;
            System.Buffer.BlockCopy(outputBuffer, 0, output, 0, blockSizeByte);
        } else {
            outputBuffer = algo.Decrypt(algo.Key, input, System.Security.Cryptography.CipherMode.ECB);
            System.Buffer.BlockCopy(outputBuffer, 0, output, 0, blockSizeByte);
        }
        //Trace.Write("call ECB(input["+input.length+"] = "+System.BitConverter.ToString(input)+", output["+output.length+"] = "+System.BitConverter.ToString(output)+")");
    }
    //---------------------------------------------------------
    // Cipher-Block-Chaining (CBC)
    function CBC(input, output) {
        var i = 0;
        if (encrypt) {
            for (i = 0; i < blockSizeByte; i++) temp[i] ^= input[i];
            ECB(temp, output);
            System.Buffer.BlockCopy(output, 0, temp, 0, blockSizeByte);
        } else {
            System.Buffer.BlockCopy(input, 0, temp2, 0, blockSizeByte);
            ECB(input, output);
            for (i = 0; i < blockSizeByte; i++) output[i] ^= temp[i];
            System.Buffer.BlockCopy(temp2, 0, temp, 0, blockSizeByte);
        }
        //Trace.Write("call CBC(input["+input.length+"] = "+System.BitConverter.ToString(input)+", output["+output.length+"] = "+System.BitConverter.ToString(output)+")");
    }
    //---------------------------------------------------------
    // Cipher-FeedBack (CFB)
    function CFB(input, output) {
        var x = 0;
        var i = 0;
        if (encrypt) {
            for (x = 0; x < feedBackIter; x++) {
                // temp is first initialized with the IV.
                ECB(temp, temp2);
                for (i = 0; i < feedBackByte; i++) {
                    output[i + x] = temp2[i] ^ input[i + x];
                }
                System.Buffer.BlockCopy(temp, feedBackByte, temp, 0, blockSizeByte - feedBackByte);
                System.Buffer.BlockCopy(output, x, temp, blockSizeByte - feedBackByte, feedBackByte);
            }
        } else {
            for (x = 0; x < feedBackIter; x++) {
                // we do not really decrypt this data!
                encrypt = true;
                // temp is first initialized with the IV
                ECB(temp, temp2);
                encrypt = false;
                System.Buffer.BlockCopy(temp, feedBackByte, temp, 0, blockSizeByte - feedBackByte);
                System.Buffer.BlockCopy(input, x, temp, blockSizeByte - feedBackByte, feedBackByte);
                for (i = 0; i < feedBackByte; i++) {
                    output[i + x] = temp2[i] ^ input[i + x];
                }
            }
        }
    }
    //---------------------------------------------------------
    // Output-FeedBack (OFB)
    function OFB(input, utput) {
        throw "OFB isn't supported";
    }
    //---------------------------------------------------------
    // Cipher Text Stealing (CTS)
    function CTS(input, output) {
        throw "CTS  isn't supported";
    }
    //---------------------------------------------------------
    function CheckInput(inputBuffer, inputOffset, inputCount) {
        if (!inputBuffer) throw "inputBuffer is can't be null";
        if (inputOffset < 0) throw "inputOffset is out of range";
        if (inputCount < 0) throw "inputCount is out of range";
        // ordered to avoid possible integer overflow.
        if (inputOffset > inputBuffer.length - inputCount) {
            throw "inputBuffer is out of range (overflow)";
        }
    }
    //---------------------------------------------------------
    this.TransformBlock = function (inputBuffer, inputOffset, inputCount, outputBuffer, outputOffset) {
        /// <summary>
        /// Transforms the specified region of the input byte array and copies the resulting
        /// transform to the specified region of the output byte array.
        /// </summary>
        /// <param name="inputBuffer">The input for which to compute the transform.</param>
        /// <param name="inputOffset">The offset into the input byte array from which to begin using data.</param>
        /// <param name="inputCount">The number of bytes in the input byte array to use as data.</param>
        /// <param name="outputBuffer">The output to which to write the transform.</param>
        /// <param name="outputOffset">The offset into the output byte array from which to begin writing data.</param>
        /// <returns>The number of bytes written.</returns>
        if (m_disposed)
            throw new System.ObjectDisposedException("Object is disposed.");
        //Trace.Write("call this.TransformBlock(inputBuffer["+inputBuffer.length+"], "+inputOffset+", "+inputCount+", outputBuffer["+outputBuffer.length+"], "+outputOffset+")");
        CheckInput(inputBuffer, inputOffset, inputCount);
        // check output parameters
        if (outputBuffer === null)
            throw new System.ArgumentNullException("outputBuffer");
        if (outputOffset < 0)
            throw new System.ArgumentOutOfRangeException("outputOffset", "< 0");
        // ordered to avoid possible integer overflow
        if (outputOffset > outputBuffer.length - inputCount)
            throw new System.ArgumentException("outputBuffer", "Overflow");
        return this._InternalTransformBlock(inputBuffer, inputOffset, inputCount, outputBuffer, outputOffset);
    };
    //---------------------------------------------------------
    function KeepLastBlock() {
        return !encrypt
            //&& (algo.Mode != System.Security.Cryptography.CipherMode.ECB)
            && algo.Padding !== System.Security.Cryptography.PaddingMode.Zeros
            && algo.Padding !== System.Security.Cryptography.PaddingMode.None;
    }
    //---------------------------------------------------------
    this._InternalTransformBlock = function (inputBuffer, inputOffset, inputCount, outputBuffer, outputOffset) {
        //Trace.Write("call _InternalTransformBlock(inputBuffer["+inputBuffer.length+"], "+inputOffset+", "+inputCount+", outputBuffer["+outputBuffer.length+"], "+outputOffset+")");
        var offs = inputOffset;
        var full = 0;
        // this way we don't do a modulo every time we're called
        // and we may save a division
        if (inputCount !== blockSizeByte) {
            if (inputCount % blockSizeByte !== 0) {
                throw new System.Security.Cryptography.CryptographicException("Invalid input block size.");
            }
            full = inputCount / blockSizeByte;
        } else {
            full = 1;
        }
        if (KeepLastBlock()) full--;
        var total = 0;
        if (lastBlock) {
            this._Transform(workBuff, workout);
            System.Buffer.BlockCopy(workout, 0, outputBuffer, outputOffset, blockSizeByte);
            outputOffset += blockSizeByte;
            total += blockSizeByte;
            lastBlock = false;
        }
        for (var i = 0; i < full; i++) {
            System.Buffer.BlockCopy(inputBuffer, offs, workBuff, 0, blockSizeByte);
            this._Transform(workBuff, workout);
            System.Buffer.BlockCopy(workout, 0, outputBuffer, outputOffset, blockSizeByte);
            offs += blockSizeByte;
            outputOffset += blockSizeByte;
            total += blockSizeByte;
        }
        if (KeepLastBlock()) {
            System.Buffer.BlockCopy(inputBuffer, offs, workBuff, 0, blockSizeByte);
            lastBlock = true;
        }
        return total;
    };
    //---------------------------------------------------------
    function Random(buffer, start, length, zeroBytes) {
        if (typeof _rng === "undefined") {
            _rng = new System.Security.Cryptography.RNGCryptoServiceProvider();
        }
        var random = new System.Byte(length);
        if (zeroBytes) {
            _rng.GetBytes(random);
        } else {
            _rng.GetNonZeroBytes(random);
        }
        System.Buffer.BlockCopy(random, 0, buffer, start, length);
    }
    //---------------------------------------------------------
    function ThrowBadPaddingException(padding, length, position) {
        var msg = "Bad " + padding + " padding.";
        if (length >= 0) msg += " Invalid length " + length + ".";
        if (position >= 0) msg += " Error found at position " + position + ".";
        throw new System.Security.Cryptography.CryptographicException(msg);
    }
    //---------------------------------------------------------
    this._Padding = function (inputBuffer, inputOffset, inputCount) {
        var rem = blockSizeByte - inputCount;
        var paddingSize = rem > 0 ? rem : blockSizeByte;
        var paddedInput = new System.Byte(paddingSize);
        var blocksCount = 1;
        var newBlock = [];
        var i = 0;
        // Fill padded Input.
        switch (algo.Padding) {
            case System.Security.Cryptography.PaddingMode.None:
                if (rem !== 0) {
                    throw new System.Security.Cryptography.CryptographicException("Invalid block length");
                }
                break;
            case System.Security.Cryptography.PaddingMode.Zeros:
                // ... MM 00 00 00 00 00 00 00 (Message | Zero )
                for (i = 0; i < paddedInput.length; i++) {
                    paddedInput[i] = 0;
                }
                if (rem === 0) blocksCount = 2;
                break;
            case System.Security.Cryptography.PaddingMode.ANSIX923:
                // ... MM 00 00 00 00 00 00 PL (Message | Zero | Padding Length)
                paddedInput[paddedInput.length - 1] = paddingSize;
                if (rem === 0) blocksCount = 2;
                break;
            case System.Security.Cryptography.PaddingMode.ISO10126:
                // ... MM RR RR RR RR RR RR PL (Message | Random | Padding Length)
                Random(paddedInput, 0, paddedInput.length - 1, true);
                paddedInput[paddedInput.length - 1] = paddingSize;
                if (rem === 0) blocksCount = 2;
                break;
            case System.Security.Cryptography.PaddingMode.PKCS7:
                // ... MM PL PL PL PL PL PL PL  (Message | Padding Length)
                for (i = 0; i < paddedInput.length; i++) {
                    paddedInput[i] = paddingSize;
                }
                if (rem === 0) blocksCount = 2;
                break;
            case System.Security.Cryptography.PaddingMode.RsaEsPkcs:
                // ... MM 00 RR RR RR RR 02 00 (Message | 00 | Random Non Zero | 02 | 00)
                Random(paddedInput, 1, paddedInput.length - 2, false);
                paddedInput[0] = 0;
                paddedInput[paddedInput.length - 2] = 2;
                paddedInput[paddedInput.length - 1] = 0;
                if (rem === 0) blocksCount = 2;
                break;
            case System.Security.Cryptography.PaddingMode.RsaEsOaep:
                var oaep = new System.Security.Cryptography.PKCS1Padding();
                var mgf = new System.Security.Cryptography.PKCS1MaskGenerationMethod();
                var hash = new System.Security.Cryptography.SHA1CryptoServiceProvider();
                var rng = new System.Security.Cryptography.RNGCryptoServiceProvider();
                newBlock = oaep.RsaEsOaepEncrypt(algo, hash, mgf, rng, inputBuffer);
                break;
            default:
                break;
        }
        var iBuffer = new System.Byte(blockSizeByte * blocksCount);
        var oBuffer = new System.Byte(blockSizeByte * blocksCount);
        if (newBlock.length === 0) {
            // Copy data to temp input buffer.
            System.Buffer.BlockCopy(inputBuffer, inputOffset, iBuffer, 0, inputCount);
            // Copy padding to temp input buffer.
            if (rem > 0 || rem === 0 && blocksCount === 2) {
                System.Buffer.BlockCopy(paddedInput, 0, iBuffer, inputCount, paddingSize);
            }
        } else {
            System.Buffer.BlockCopy(newBlock, inputOffset, iBuffer, 0, inputCount + paddingSize);
        }
        var result = {};
        result["blocksCount"] = blocksCount;
        result["iBuffer"] = iBuffer;
        result["oBuffer"] = oBuffer;
        return result;
    };
    //---------------------------------------------------------
    function ConvertIntToByteArray(dwInput, counter) {
        var bytes = System.BitConverter.GetBytesFromInt32Be(dwInput);
        System.Buffer.BlockCopy(bytes, 0, counter, 0, bytes.length);
    }
    //---------------------------------------------------------
    this._PaddingRemove = function (res, inputOffset, inputCount) {
        // total may be 0 (e.g. PaddingMode.None)
        var total = res.length;
        var padding = 0;
        var newBlock = [];
        var i = 0;
        switch (algo.Padding) {
            case System.Security.Cryptography.PaddingMode.ANSIX923:
                padding = total > 0 ? res[total - 1] : 0;
                if (padding === 0 || padding > blockSizeByte) {
                    System.Security.Cryptography.ThrowBadPaddingException(algo.Padding, padding, -1);
                }
                for (i = padding; i > 0; i--) {
                    if (res[total - 1 - i] !== 0x00)
                        System.Security.Cryptography.ThrowBadPaddingException(algo.Padding, -1, i);
                }
                total -= padding;
                break;
            case System.Security.Cryptography.PaddingMode.ISO10126:
                padding = total > 0 ? res[total - 1] : 0;
                if (padding === 0 || padding > blockSizeByte)
                    System.Security.Cryptography.ThrowBadPaddingException(algo.Padding, padding, -1);
                total -= padding;
                break;
            case System.Security.Cryptography.PaddingMode.PKCS7:
                padding = total > 0 ? res[total - 1] : 0;
                if (padding === 0 || padding > blockSizeByte) {
                    Trace.Write(padding + ", " + blockSizeByte);
                    System.Security.Cryptography.ThrowBadPaddingException(algo.Padding, padding, -1);
                }
                for (i = padding - 1; i > 0; i--) {
                    if (res[total - 1 - i] !== padding) {
                        System.Security.Cryptography.ThrowBadPaddingException(algo.Padding, -1, i);
                    }
                }
                total -= padding;
                break;
            case System.Security.Cryptography.PaddingMode.RsaEsPkcs:
                if (res[total - 1] !== 0x00)
                    System.Security.Cryptography.ThrowBadPaddingException(algo.Padding, -1, total - 1);
                if (res[total - 2] !== 0x02)
                    System.Security.Cryptography.ThrowBadPaddingException(algo.Padding, -1, total - 2);
                // Route trough block bytes.
                for (i = total - 1 - 2; i > 0; i--) {
                    // If zero byte (message and padding separator) found then...
                    if (res[i] === 0x00) {
                        // Set message size.
                        total = i;
                        break;
                    }
                }
                break;
            case System.Security.Cryptography.PaddingMode.RsaEsOaep:
                var oaep = new System.Security.Cryptography.PKCS1Padding();
                var mgf = new System.Security.Cryptography.PKCS1MaskGenerationMethod();
                var hash = new System.Security.Cryptography.SHA1CryptoServiceProvider();
                newBlock = oaep.RsaEsOaepDecrypt(algo, hash, mgf, res);
                return newBlock;
            case System.Security.Cryptography.PaddingMode.None: // nothing to do - it's a multiple of block size
            case System.Security.Cryptography.PaddingMode.Zeros: // nothing to do - user must unpad himself
                break;
        }
        // return output without padding
        if (total > 0) {
            var data = new System.Byte(total);
            System.Buffer.BlockCopy(res, 0, data, 0, total);
            // Zeroize decrypted data (copy with padding)
            System.Array.Clear(res, 0, res.length);
            return data;
        } else {
            return new System.Byte(0);
        }
    };
    //---------------------------------------------------------
    this._FinalEncrypt = function (inputBuffer, inputOffset, inputCount) {
        //Trace.Write("call FinalEncrypt(inputBuffer["+inputBuffer.length+"], inputOffset = "+inputOffset+", inputCount = "+inputCount);
        var result = this._Padding(inputBuffer, inputOffset, inputCount);
        var blocksCount = result.blocksCount;
        var iBuffer = result.iBuffer;
        var oBuffer = result.oBuffer;
        // Encrypt temp buffer.
        for (var i = 0; i < blocksCount; i++) {
            var offset = i * blockSizeByte;
            this._InternalTransformBlock(iBuffer, offset, blockSizeByte, oBuffer, offset);
        }
        return oBuffer;
    };
    //---------------------------------------------------------
    this._FinalDecrypt = function (inputBuffer, inputOffset, inputCount) {
        if (inputCount % blockSizeByte > 0) {
            throw new System.Security.Cryptography.CryptographicException("Invalid input block size.");
        }
        var total = inputCount;
        if (lastBlock) total += blockSizeByte;
        var res = new System.Byte(total);
        var outputOffset = 0;
        while (inputCount > 0) {
            var len = this._InternalTransformBlock(inputBuffer, inputOffset, blockSizeByte, res, outputOffset);
            inputOffset += blockSizeByte;
            outputOffset += len;
            inputCount -= blockSizeByte;
        }
        if (lastBlock) {
            this._Transform(workBuff, workout);
            System.Buffer.BlockCopy(workout, 0, res, outputOffset, blockSizeByte);
            outputOffset += blockSizeByte;
            lastBlock = false;
        }
        return this._PaddingRemove(res, inputOffset, inputCount);
    };
    //---------------------------------------------------------
    this.TransformFinalBlock = function (inputBuffer, inputOffset, inputCount) {
        /// <summary>
        /// Transforms the specified region of the specified byte array.
        /// </summary>
        /// <param name="inputBuffer">The input for which to compute the transform.</param>
        /// <param name="inputOffset">The offset into the byte array from which to begin using data.</param>
        /// <param name="inputCount">The number of bytes in the byte array to use as data.</param>
        /// <returns>The computed transform.</returns>		Trace.Write("call this.TransformFinalBlock(inputBuffer["+inputBuffer.length+"], "+inputOffset+", "+inputCount+")");
        if (m_disposed) throw new ObjectDisposedException("Object is disposed");
        CheckInput(inputBuffer, inputOffset, inputCount);
        if (encrypt) {
            return this._FinalEncrypt(inputBuffer, inputOffset, inputCount);
        } else {
            return this._FinalDecrypt(inputBuffer, inputOffset, inputCount);
        }
    };
    //---------------------------------------------------------
    this.Initialize = function (algorithm, encryption) {
        algo = algorithm;
        encrypt = encryption;
        if (algo) {
            blockSizeByte = algo.BlockSize >> 3;
            this.InputBlockSize = blockSizeByte;
            this.OutputBlockSize = blockSizeByte;
            // Mode buffers
            temp = new System.Byte(blockSizeByte);
            System.Buffer.BlockCopy(algo.IV, 0, temp, 0, Math.min(blockSizeByte, algo.IV.length));
            temp2 = new System.Byte(blockSizeByte);
            feedBackByte = algo.FeedbackSize >> 3;
            if (feedBackByte !== 0)
                feedBackIter = blockSizeByte / feedBackByte;
            // Transform buffers
            workBuff = new System.Byte(blockSizeByte);
            workout = new System.Byte(blockSizeByte);
        }
    };
    this.Initialize.apply(this, arguments);
};
System.Type.RegisterClass("System.Security.Cryptography.ICryptoTransform");

System.Security.Cryptography.RNGCryptoServiceProvider = function () {
    //---------------------------------------------------------
    // Private Properties.
    var rnd;
    //---------------------------------------------------------
    this.GetBytes = function (data) {
        /// <summary>
        /// Fills an array of bytes with a sequence of random values.
        /// </summary>
        /// <param name="inputBuffer">The array to fill with a sequence of random values.</param>
        var length = data.length;
        for (var i = 0; i < length; i++) {
            data[i] = rnd.Next(0, 256);
        }
    };
    //---------------------------------------------------------
    this.GetNonZeroBytes = function (data) {
        /// <summary>
        /// Fills an array of bytes with a sequence of random nonzero values.
        /// </summary>
        /// <param name="inputBuffer">The array to fill with a sequence of random nonzero values.</param>
        var length = data.length;
        for (var i = 0; i < length; i++) {
            data[i] = rnd.Next(1, 256);
        }
    };
    //---------------------------------------------------------
    this.Dispose = function () {
        m_disposed = true;
    };
    //---------------------------------------------------------
    this.Initialize = function () {
        rnd = new System.Random();
    };
    this.Initialize.apply(this, arguments);
};
System.Type.RegisterClass("System.Security.Cryptography.RNGCryptoServiceProvider");

//-----------------------------------------------------------------------------
// CryptoStream
//-----------------------------------------------------------------------------

System.Security.Cryptography.CryptoStream = function (stream, transform, mode) {
    /// <summary>
    /// Initializes a new instance of the System.Security.Cryptography.CryptoStream
    /// class with a target data stream, the transformation to use, and the mode
    /// of the stream.
    /// </summary>
    /// <param name="stream">The stream on which to perform the cryptographic transformation.</param>
    /// <param name="transform">The cryptographic transformation that is to be performed on the stream.</param>
    /// <param name="mode">One of the System.Security.Cryptography.CryptoStreamMode values.</param>
    /// <remarks>
    /// Ported to JavaScript Class:
    ///	Evaldas Jocys (evaldas@jocys.com)
    /// Original code:
    /// http://www.koders.com/csharp/fid5A0E65C1F90484C7C61C3D7A0A9A1B6FA80F3691.aspx?s=CryptoStream
    ///
    /// Authors:
    ///	Thomas Neidhart (tome@sbox.tugraz.at)
    ///	Sebastien Pouliot (sebastien@ximian.com)
    ///
    /// Portions (C) 2002, 2003 Motus Technologies Inc. (http://www.motus.com)
    /// Copyright (C) 2004-2005 Novell, Inc (http://www.novell.com)
    ///
    /// Permission is hereby granted, free of charge, to any person obtaining
    /// a copy of this software and associated documentation files (the
    /// "Software"), to deal in the Software without restriction, including
    /// without limitation the rights to use, copy, modify, merge, publish,
    /// distribute, sublicense, and/or sell copies of the Software, and to
    /// permit persons to whom the Software is furnished to do so, subject to
    /// the following conditions:
    /// 
    /// The above copyright notice and this permission notice shall be
    /// included in all copies or substantial portions of the Software.
    /// 
    /// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    /// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    /// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    /// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
    /// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
    /// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
    /// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
    /// </remarks>
    //---------------------------------------------------------
    // Private Properties.
    var _stream;
    var _transform;
    var _mode;
    var _currentBlock = [];
    var _disposed = false;
    var _flushedFinalBlock = false;
    var _partialCount = 0;
    var _endOfStream = false;
    var _waitingBlock = [];
    var _waitingCount = 0;
    var _transformedBlock = [];
    var _transformedPos = 0;
    var _transformedCount = 0;
    var _workingBlock = [];
    var _workingCount = 0;
    //---------------------------------------------------------
    this.Read = function (buffer, offset, count) {
        var result = 0;
        if (count === 0 || _transformedPos === _transformedCount && _endOfStream) {
            return result;
        }
        if (_waitingBlock === null) {
            _transformedBlock = new System.Byte(_transform.OutputBlockSize << 2);
            _transformedPos = 0;
            _transformedCount = 0;
            _waitingBlock = new System.Byte(_transform.InputBlockSize);
            _waitingCount = _stream.Read(_waitingBlock, 0, _waitingBlock.length);
        }
        while (count > 0) {
            // transformed but not yet returned
            var length = _transformedCount - _transformedPos;
            // need more data - at least one full block must be available if we haven't reach the end of the stream
            if (length < _transform.InputBlockSize) {
                var transformed = 0;
                // load a new block
                _workingCount = _stream.Read(_workingBlock, 0, _workingBlock.length);
                _endOfStream = _workingCount < _transform.InputBlockSize;
                if (!_endOfStream) {
                    // transform the waiting block
                    transformed = _transform.TransformBlock(_waitingBlock, 0, _waitingBlock.length, _transformedBlock, _transformedCount);
                    // transfer temporary to waiting
                    System.Buffer.BlockCopy(_workingBlock, 0, _waitingBlock, 0, _workingCount);
                    _waitingCount = _workingCount;
                } else {
                    if (_workingCount > 0) {
                        // transform the waiting block
                        transformed = _transform.TransformBlock(_waitingBlock, 0, _waitingBlock.length, _transformedBlock, _transformedCount);
                        // transfer temporary to waiting
                        System.Buffer.BlockCopy(_workingBlock, 0, _waitingBlock, 0, _workingCount);
                        _waitingCount = _workingCount;
                        length += transformed;
                        _transformedCount += transformed;
                    }
                    var input = _transform.TransformFinalBlock(_waitingBlock, 0, _waitingCount);
                    transformed = input.length;
                    System.Buffer.BlockCopy(input, 0, _transformedBlock, _transformedCount, input.length);
                    // zeroize this last block
                    System.Array.Clear(input, 0, input.length);
                }
                length += transformed;
                _transformedCount += transformed;
            }
            // compaction
            if (_transformedPos > _transform.InputBlockSize) {
                System.Buffer.BlockCopy(_transformedBlock, _transformedPos, _transformedBlock, 0, length);
                _transformedCount -= _transformedPos;
                _transformedPos = 0;
            }
            length = count < length ? count : length;
            if (length > 0) {
                System.Buffer.BlockCopy(_transformedBlock, _transformedPos, buffer, offset, length);
                _transformedPos += length;
                result += length;
                offset += length;
                count -= length;
            }
            // there may not be enough data in the stream for a 
            // complete block
            if (length !== _transform.InputBlockSize && _waitingCount !== _transform.InputBlockSize || _endOfStream) {
                count = 0; // no more data can be read
            }
        }
        return result;
    };
    //---------------------------------------------------------
    this.Write = function (buffer, offset, count) {
        //Trace.Write("call this.Write(bufer, "+offset+", "+count+")");
        // Partial block (in progress)
        if (_partialCount > 0 && _partialCount !== _transform.InputBlockSize) {
            //Trace.Write("Partial block (in progress)");
            var remainder = _transform.InputBlockSize - _partialCount;
            remainder = count < remainder ? count : remainder;
            System.Buffer.BlockCopy(buffer, offset, _workingBlock, _partialCount, remainder);
            _partialCount += remainder;
            offset += remainder;
            count -= remainder;
        }
        var bufferPos = offset;
        //Trace.Write("call bufferPos = "+bufferPos);
        //Trace.Write("aaa: "+System.BitConverter.ToString(buffer));
        var len = 0;
        while (count > 0) {
            if (_partialCount === _transform.InputBlockSize) {
                // use partial block to avoid (re)allocation
                //Trace.Write("_workingBlock: "+System.BitConverter.ToString(_workingBlock));
                //Trace.Write("_currentBlock: "+System.BitConverter.ToString(_currentBlock));
                //Trace.Write("_partialCount = "+_partialCount);
                len = _transform.TransformBlock(_workingBlock, 0, _partialCount, _currentBlock, 0);
                _stream.Write(_currentBlock, 0, len);
                // reset
                _partialCount = 0;
            }
            //Trace.Write("_partialCount = "+_partialCount+"; _transform.CanTransformMultipleBlocks = "+_transform.CanTransformMultipleBlocks);
            if (_transform.CanTransformMultipleBlocks) {
                // Transform all except the last block (which may be the last block
                // of the stream and require TransformFinalBlock.
                var numBlock = Math.floor((_partialCount + count) / _transform.InputBlockSize);
                var multiSize = numBlock * _transform.InputBlockSize;
                //Trace.Write("numBlock = "+numBlock+"; multiSize = "+multiSize);
                if (numBlock > 0) {
                    var multiBlocks = new System.Byte(multiSize);
                    len = _transform.TransformBlock(buffer, offset, multiSize, multiBlocks, 0);
                    _stream.Write(multiBlocks, 0, len);
                    // copy last block into _currentBlock
                    _partialCount = count - multiSize;
                    System.Buffer.BlockCopy(buffer, offset + multiSize, _workingBlock, 0, _partialCount);
                } else {
                    System.Buffer.BlockCopy(buffer, offset, _workingBlock, _partialCount, count);
                    _partialCount += count;
                }
                count = 0; // the last block, if any, is in _workingBlock
            } else {
                len = Math.min(_transform.InputBlockSize - _partialCount, count);
                System.Buffer.BlockCopy(buffer, bufferPos, _workingBlock, _partialCount, len);
                bufferPos += len;
                _partialCount += len;
                count -= len;
                // here block may be full, but we wont TransformBlock it until next iteration
                // so that the last block will be called in FlushFinalBlock using TransformFinalBlock
            }
        }
    };
    //---------------------------------------------------------
    this.Flush = function () {
        if (_stream !== null) _stream.Flush();
    };
    //---------------------------------------------------------
    this.FlushFinalBlock = function () {
        _flushedFinalBlock = true;
        var finalBuffer = _transform.TransformFinalBlock(_workingBlock, 0, _partialCount);
        if (_stream !== null) {
            _stream.Write(finalBuffer, 0, finalBuffer.length);
            if (_stream.GetType().FullName === "System.Security.Cryptography.CryptoStream") {
                // for cascading crypto streams.
                _stream.FlushFinalBlock();
            }
            _stream.Flush();
        }
        // Zeroize.
        System.Array.Clear(finalBuffer, 0, finalBuffer.length);
    };
    //---------------------------------------------------------
    this.ToArray = function () {
        return stream.ToArray();
    };
    //---------------------------------------------------------
    this.Close = function () {
        // only flush in write mode (bugzilla 46143)
        if (!_flushedFinalBlock && _mode === System.Security.Cryptography.CryptoStreamMode.Write) {
            this.FlushFinalBlock();
        }
        if (_stream !== null) _stream.Close();
    };
    //---------------------------------------------------------
    this.Dispose = function () {
        if (!_disposed) {
            _disposed = true;
            // always cleared for security reason
            if (_workingBlock !== null)
                System.Array.Clear(_workingBlock, 0, _workingBlock.length);
            if (_currentBlock !== null)
                System.Array.Clear(_currentBlock, 0, _currentBlock.length);
            if (disposing) {
                _stream = null;
                _workingBlock = null;
                _currentBlock = null;
            }
        }
    };
    //---------------------------------------------------------
    this.Initialize = function () {
        _stream = arguments[0];
        _transform = arguments[1];
        _mode = arguments[2];
        _disposed = false;
        if (_transform) {
            _workingBlock = new System.Byte(_transform.InputBlockSize);
            if (_mode === System.Security.Cryptography.CryptoStreamMode.Read) {
                _currentBlock = new System.Byte(_transform.InputBlockSize);
            } else if (_mode === System.Security.Cryptography.CryptoStreamMode.Write) {
                _currentBlock = new System.Byte(_transform.OutputBlockSize);
            }
        }
    };
    this.Initialize.apply(this, arguments);
};
System.Type.RegisterClass("System.Security.Cryptography.CryptoStream");


System.Security.Cryptography.HashAlgorithm = function () {
    // Properties
    this.CanReuseTransform = true;
    this.CanTransformMultipleBlocks = true;
    this.InputBlockSize = 1;
    this.OutputBlockSize = 1;

    this.HashSizeValue = 0;
    this.HashValue = new System.Byte();
    this.State = 0;
    this.HashSize = this.HashSizeValue;

    this._ComputeHash1 = function (buffer) {
        return this._ComputeHash2(buffer, 0, buffer.length);
    };

    this._ComputeHash2 = function (buffer, offset, count) {
        this.HashCore(buffer, offset, count);
        this.HashValue = this.HashFinal();
        var buffer2 = this.Hash();
        this.Initialize();
        return buffer2;
    };

    this.ComputeHash = function () {
        if (arguments.length === 1) {
            var value = arguments[0];
            if (typeof value === "string") value = System.Text.Encoding.UTF8.GetBytes(value);
            var args = new Array(0);
            args[0] = value;
            return this._ComputeHash1.apply(this, args);
        }
        if (arguments.length === 3) return this._ComputeHash2.apply(this, arguments);
    };

    this.HashCore = function (array, ibStart, cbSize) { };
    this.HashFinal = function () { };
    this.Initialize = function () { };

    this.TransformBlock = function (inputBuffer, inputOffset, inputCount, outputBuffer, outputOffset) {
        this.State = 1;
        this.HashCore(inputBuffer, inputOffset, inputCount);
        if (outputBuffer !== null && (inputBuffer !== outputBuffer || inputOffset !== outputOffset)) {
            System.Buffer.BlockCopy(inputBuffer, inputOffset, outputBuffer, outputOffset, inputCount);
        }
        return inputCount;
    };

    this.TransformFinalBlock = function (inputBuffer, inputOffset, inputCount) {
        this.HashCore(inputBuffer, inputOffset, inputCount);
        this.HashValue = this.HashFinal();
        var dst = new System.Byte(inputCount);
        if (inputCount !== 0) {
            System.Buffer.BlockCopy(inputBuffer, inputOffset, dst, 0, inputCount);
        }
        this.State = 0;
        return dst;
    };

    this.Hash = function () {
        return this.HashValue.Clone();
    };

};
System.Type.RegisterClass("System.Security.Cryptography.HashAlgorithm");

// Add some static methods
System.Security.Cryptography.HashAlgorithm.Create = function (hashName) {
    return new System.Security.Cryptography[hashName]();
};

System.Security.Cryptography.PKCS1MaskGenerationMethod = function () {
    function ConvertIntToByteArray(dwInput, counter) {
        var bytes = System.BitConverter.GetBytesFromInt32Be(dwInput);
        System.Buffer.BlockCopy(bytes, 0, counter, 0, bytes.length);
    }
    this.GenerateMask = function (rgbSeed, cbReturn) {
        var algorithm = new System.Security.Cryptography.SHA1CryptoServiceProvider();
        var counter = new System.Byte(4);
        var dst = new System.Byte(cbReturn);
        var num = 0;
        var hLen = 20; // SHA-1
        for (var i = 0; i < dst.length; i += hLen) {
            ConvertIntToByteArray(num++, counter);
            algorithm.TransformBlock(rgbSeed, 0, rgbSeed.length, rgbSeed, 0);
            algorithm.TransformFinalBlock(counter, 0, 4);
            var hash = algorithm.HashValue;
            algorithm.Initialize();
            if (dst.Length - i > hash.length) {
                System.Buffer.BlockCopy(hash, 0, dst, i, hash.length);
            } else {
                System.Buffer.BlockCopy(hash, 0, dst, i, dst.length - i);
            }
        }
        return dst;
    };
};
System.Type.RegisterClass("System.Security.Cryptography.PKCS1MaskGenerationMethod");

System.Security.Cryptography.PKCS1Padding = function () {

    this.RsaEsOaepEncrypt = function (rsa, hash, mgf, rng, encryptedData) {
        /// <summary>
        /// PKCS #1 v2.1 OAEP padding encryption.
        /// </summary>
        /// <param name="key" type="byte[]">RSA public key.</param>
        /// <param name="message" type="byte[]">Message bytes to be encrypted.</param>
        /// <param name="label" type="string">Optional label to be associated with the message; the default value is the empty string</param>
        /// <returns type="byte[]">Padded message.</returns>
        /// <remarks>ftp://ftp.rsasecurity.com/pub/pkcs/pkcs-1/pkcs-1v2-1.pdf</remnarks>
        var key = rsa.ExportParameters(false);
        var message = encryptedData.Clone();
        // Reverse for Microsoft compatibility.
        System.Array.Reverse(message);
        var label = "";
        var lBytes = System.Text.Encoding.UTF8.GetBytes(label);
        var hLen = hash.HashSize / 8;
        var mLen = message.length;
        var kLen = key.Modulus.length;
        var lHash = hash.ComputeHash(lBytes);
        var pLen = kLen - mLen - 2 * hLen - 2;
        var PS = new Array(pLen);
        var i = 0;
        for (i = 0; i < PS.length; i++) PS[i] = 0x00;
        var DB = new Array(hLen + PS.length + 1 + mLen);
        // DB = lHash || PS || 0x01 || M
        System.Buffer.BlockCopy(lHash, 0, DB, 0, hLen);
        System.Buffer.BlockCopy(PS, 0, DB, hLen, PS.length);
        DB[hLen + PS.length] = 0x01;
        System.Buffer.BlockCopy(message, 0, DB, hLen + PS.length + 1, mLen);
        var seed = new Array(hLen);
        rng.GetBytes(seed);
        // Use Microsoft's method to generate mask.
        var dbMask = mgf.GenerateMask(seed, kLen - hLen - 1);
        var maskedDB = new Array(DB.length);
        for (i = 0; i < DB.length; i++) maskedDB[i] = DB[i] ^ dbMask[i];
        // Use Microsoft's method to generate mask.
        var seedMask = mgf.GenerateMask(maskedDB, hLen);
        var maskedSeed = new Array(seed.length);
        for (i = 0; i < seed.length; i++) maskedSeed[i] = seed[i] ^ seedMask[i];
        var EM = new Array(1 + maskedSeed.length + maskedDB.length);
        // EM = 0x00 || maskedSeed || maskedDB
        EM[0] = 0x00;
        System.Buffer.BlockCopy(maskedSeed, 0, EM, 1, maskedSeed.length);
        System.Buffer.BlockCopy(maskedDB, 0, EM, 1 + maskedSeed.length, maskedDB.length);
        // Reverse for Microsoft compatibility.
        System.Array.Reverse(EM);
        return EM;
    };
    //---------------------------------------------------------
    this.RsaEsOaepDecrypt = function (rsa, hash, mgf, data) {
        /// <summary>
        /// PKCS #1 v2.1 OAEP padding decryption.
        /// </summary>
        /// <param name="key" type="byte[]">RSA private key.</param>
        /// <param name="message" type="byte[]">Padded message bytes.</param>
        /// <param name="label" type="string">Optional label to be associated with the message; the default value is the empty string</param>
        /// <returns type="byte[]">Unpadded message.</returns>
        /// <remarks>ftp://ftp.rsasecurity.com/pub/pkcs/pkcs-1/pkcs-1v2-1.pdf</remnarks>
        var key = rsa.ExportParameters(true);
        var pMessage = data;
        var label = "";
        var EM = new Array(pMessage.length);
        System.Buffer.BlockCopy(pMessage, 0, EM, 0, pMessage.length);
        // Reverse for Microsoft compatibility.
        System.Array.Reverse(EM);
        var hLen = hash.HashSize / 8;
        var kLen = key.Modulus.length;
        var maskedSeed = EM.slice(1, hLen + 1);
        var maskedDB = EM.slice(hLen + 1, kLen);
        // Use Microsoft's method to generate mask.
        var seedMask = mgf.GenerateMask(maskedDB, hLen);
        var seed = new Array(hLen);
        var i = 0;
        for (i = 0; i < hLen; i++) seed[i] = maskedSeed[i] ^ seedMask[i];
        // Use Microsoft's method to generate mask.
        var dbMask = mgf.GenerateMask(seed, kLen - hLen - 1);
        var DB = new Array(dbMask.length);
        for (i = 0; i < DB.length; i++) DB[i] = maskedDB[i] ^ dbMask[i];
        // DB = lHash || PS || 0x01 || M
        // Get message.
        var message = [];
        for (i = hLen; i < kLen; i++) {
            if (DB[i] === 0x01) {
                message = DB.slice(i + 1, DB.length);
                break;
            }
        }
        // Reverse for Microsoft compatibility.
        System.Array.Reverse(message);
        return message;
    };

};
System.Type.RegisterClass("System.Security.Cryptography.PKCS1Padding");

System.Security.Cryptography.Utils = function () { };

System.Type.RegisterClass("System.Security.Cryptography.Utils");

System.Security.Cryptography.Utils.RsaOaepDecrypt = function (rsa, hash, mgf, encryptedData) { };

System.Security.Cryptography.Utils.PKCS1Padding = System.Security.Cryptography.PKCS1Padding.prototype.RsaPkcs1Padding;

System.Security.Cryptography.Utils.RotateLeft = function (num, cnt) {
    /// <summary>
    /// Bitwise rotate a 32-bit number to the left.
    /// </summary>
    return num << cnt | num >>> 32 - cnt;
};

System.Security.Cryptography.Utils.RotateRight = function (num, cnt) {
    /// <summary>
    /// Bitwise rotate a 32-bit number to the right.
    /// </summary>
    return num >>> cnt | num << 32 - cnt;
};

System.Security.Cryptography.Utils.DWORDToBigEndian = function (block, x, digits) {
    var index = 0;
    for (var i = 0; index < digits; i += 4) {
        block[i] = x[index] >> 0x18 & 0xff;
        block[i + 1] = x[index] >> 0x10 & 0xff;
        block[i + 2] = x[index] >> 8 & 0xff;
        block[i + 3] = x[index] & 0xff;
        index++;
    }
};

System.Security.Cryptography.Utils.DWORDFromBigEndian = function (x, digits, block) {
    var index = 0;
    for (var i = 0; index < digits; i += 4) {
        var n = block[i] << 24 | block[i + 1] << 16 | block[i + 2] << 8 | block[i + 3];
        x[index] = n >>> 0;
        index++;
    }
};

System.Security.Cryptography.Utils.OidToHashAlgorithmName = function (oid) {
    if (oid !== "1.3.14.3.2.26") {
        if (oid === "2.16.840.1.101.3.4.2.1")
            return "SHA256";
        if (oid === "2.16.840.1.101.3.4.2.2")
            return "SHA384";
        if (oid !== "2.16.840.1.101.3.4.2.3")
            throw "Not supported";
        return "SHA512";
    }
    return "SHA1";
};

//-----------------------------------------------------------------------------
// CipherMode
//-----------------------------------------------------------------------------

System.Security.Cryptography.CipherMode = function () {
    /// <summary>Specifies the block cipher mode to use for encryption.</summary>
    /// <field name="CBC" type="Number">The Cipher Block Chaining (CBC) mode introduces feedback. Before each plain text block is encrypted, it is combined with the cipher text of the previous block by a bitwise exclusive OR operation. This ensures that even if the plain text contains many identical blocks, they will each encrypt to a different cipher text block. The initialization vector is combined with the first plain text block by a bitwise exclusive OR operation before the block is encrypted. If a single bit of the cipher text block is mangled, the corresponding plain text block will also be mangled. In addition, a bit in the subsequent block, in the same position as the original mangled bit, will be mangled.</field>
    /// <field name="ECB" type="Number">The Cipher Feedback (CFB) mode processes small increments of plain text into cipher text, instead of processing an entire block at a time. This mode uses a shift register that is one block in length and is divided into sections. For example, if the block size is eight bytes, with one byte processed at a time, the shift register is divided into eight sections. If a bit in the cipher text is mangled, one plain text bit is mangled and the shift register is corrupted. This results in the next several plain text increments being mangled until the bad bit is shifted out of the shift register.</field>
    /// <field name="OFB" type="Number">The Cipher Text Stealing (CTS) mode handles any length of plain text and produces cipher text whose length matches the plain text length. This mode behaves like the CBC mode for all but the last two blocks of the plain text.</field>
    /// <field name="CFB" type="Number">The Electronic Codebook (ECB) mode encrypts each block individually. This means that any blocks of plain text that are identical and are in the same message, or in a different message encrypted with the same key, will be transformed into identical cipher text blocks. If the plain text to be encrypted contains substantial repetition, it is feasible for the cipher text to be broken one block at a time. Also, it is possible for an active adversary to substitute and exchange individual blocks without detection. If a single bit of the cipher text block is mangled, the entire corresponding plain text block will also be mangled.</field>
    /// <field name="CTS" type="Number">The Output Feedback (OFB) mode processes small increments of plain text into cipher text instead of processing an entire block at a time. This mode is similar to CFB; the only difference between the two modes is the way that the shift register is filled. If a bit in the cipher text is mangled, the corresponding bit of plain text will be mangled. However, if there are extra or missing bits from the cipher text, the plain text will be mangled from that point on.</field>
};
System.Security.Cryptography.CipherMode.prototype = {
    CBC: 1,
    ECB: 2,
    OFB: 3,
    CFB: 4,
    CTS: 5
};
System.Type.RegisterEnum("System.Security.Cryptography.CipherMode");

//-----------------------------------------------------------------------------
// PaddingMode
//-----------------------------------------------------------------------------

System.Security.Cryptography.PaddingMode = function () {
    /// <summary>Specifies the type of padding to apply when the message data block is shorter than the full number of bytes needed for a cryptographic operation.</summary>
    /// <field name="ANSIX923" type="Number">The ANSIX923 padding string consists of a sequence of bytes filled with zeros before the length.</field>
    /// <field name="ISO10126" type="Number">The ISO10126 padding string consists of random data before the length.</field>
    /// <field name="None" type="Number">No padding is done.</field>
    /// <field name="PKCS7" type="Number">The PKCS #7 padding string consists of a sequence of bytes, each of which is equal to the total number of padding bytes added.</field>
    /// <field name="Zeros" type="Number">The padding string consists of bytes set to zero.</field>
    /// <field name="RsaEsPkcs" type="Number">PKCS#1 v1.5 padding - Old encryption/decryption scheme as first standardized in version 1.5 of PKCS#1.</field>
    /// <field name="RsaEsOaep" type="Number">Improved encryption/decryption scheme; based on the Optimal Asymmetric Encryption Padding scheme proposed by Mihir Bellare and Phillip Rogaway.</field>
};

System.Security.Cryptography.PaddingMode.prototype = {
    None: 1,
    PKCS7: 2,
    Zeros: 3,
    ANSIX923: 4,
    ISO10126: 5,
    RsaEsPkcs: 6,
    RsaEsOaep: 7
};
System.Type.RegisterEnum("System.Security.Cryptography.PaddingMode");

//-----------------------------------------------------------------------------
// CryptoStreamMode
//-----------------------------------------------------------------------------

System.Security.Cryptography.CryptoStreamMode = function () {
    /// <summary>Specifies the mode of a cryptographic stream.</summary>
    /// <field name="Read" type="Number">Read access to a cryptographic stream.</field>
    /// <field name="Write" type="Number">Write access to a cryptographic stream.</field>
};

System.Security.Cryptography.CryptoStreamMode.prototype = {
    Read: 0,
    Write: 1
};
System.Type.RegisterEnum("System.Security.Cryptography.CryptoStreamMode");

//==============================================================================
// END
//------------------------------------------------------------------------------


//=============================================================================
// Jocys.com JavaScript.NET Classes               (In C# Object Oriented Style)
// Created by Evaldas Jocys <evaldas@jocys.com>
//=============================================================================
/// <reference path="System.debug.js" />
//=============================================================================
// Namespaces
//-----------------------------------------------------------------------------
// <PropertyGroup>
//		<RootNamespace>System.Security.Cryptography</RootNamespace>
// <PropertyGroup>
//-----------------------------------------------------------------------------
System.Type.RegisterNamespace("System.Security.Cryptography");
//=============================================================================

System.Security.Cryptography.SHA1 = function () {
    /// <summary>
    /// Represents SHA1 hash algorithm class.
    /// </summary>
    /// <example>
    /// // Create SHA1 Algorithm (JavaScript Example);
    /// var sha1 = new System.Security.Cryptography.SHA1CryptoServiceProvider();
    /// // Test SHA1 Algorithm: If 'sha1.Test() = true' then everything works OK.
    /// alert("sha1.Test() = "+sha1.Test());
    /// // Convert string to array of bytes.
    /// var bytes = System.Text.Encoding.UTF8.GetBytes("test string");
    /// // Compute hash.
    /// alert("sha1.ComputeHashAsHex(\"test string\")"+sha1.ComputeHashAsHex(bytes);
    /// </example>
    /// <remarks>
    /// A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
    /// in FIPS PUB 180-1
    /// Version 2.1a Copyright Paul Johnston 2000 - 2002.
    /// Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
    /// Distributed under the BSD License
    /// See http://pajhome.org.uk/crypt/md5 for details.
    /// NOTES:
    /// Recreated as class by Evaldas Jocys [2006] - SHA1 (160bit) - System.Security.Cryptography.SHA1
    /// </remarks>
    //---------------------------------------------------------
    // Public properties.
    this.Name = "SHA1";
    // Configurable variables. You may need to tweak these to be compatible with
    // the server-side, but the defaults work in most cases.
    this.chrsz = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

    // Fields
    this._buffer = new System.Byte();
    this._count = 0;
    this._expandedBuffer = [];
    this._stateSHA1 = [];
    //---------------------------------------------------------
    this.ComputeHashAsHex = function (value) {
        var bytes = this.ComputeHash(value);
        return System.BitConverter.ToString(bytes, '');
    };
    //---------------------------------------------------------
    this.ComputeHashAsBase64 = function (value) {
        var bytes = this.ComputeHash(value);
        return System.Convert.ToBase64String(bytes, false);
    };
    //---------------------------------------------------------
    this._HashData = function (partIn, ibStart, cbSize) {
        var count = cbSize;
        var srcOffset = ibStart;
        var dstOffset = this._count & 0x3f;
        this._count += count;
        if (dstOffset > 0 && dstOffset + count >= 0x40) {
            System.Buffer.BlockCopy(partIn, srcOffset, this._buffer, dstOffset, 0x40 - dstOffset);
            srcOffset += 0x40 - dstOffset;
            count -= 0x40 - dstOffset;
            this.SHATransform(this._expandedBuffer, this._stateSHA1, this._buffer);
            dstOffset = 0;
        }
        while (count >= 0x40) {
            System.Buffer.BlockCopy(partIn, srcOffset, this._buffer, 0, 0x40);
            srcOffset += 0x40;
            count -= 0x40;
            this.SHATransform(this._expandedBuffer, this._stateSHA1, this._buffer);
        }
        if (count > 0) {
            System.Buffer.BlockCopy(partIn, srcOffset, this._buffer, dstOffset, count);
        }
    };
    //---------------------------------------------------------
    this.HashCore = function (rgb, ibStart, cbSize) {
        this._HashData(rgb, ibStart, cbSize);
    };
    //---------------------------------------------------------
    this._EndHash = function () {
        var block = new System.Byte(20);
        var num = 0x40 - this._count & 0x3f;
        if (num <= 8) num += 0x40;
        var partIn = new System.Byte(num);
        partIn[0] = 0x80;
        var num2 = this._count * 0x8;
        var n = num2;
        for (var i = 1; i <= 8; i++) {
            partIn[num - i] = n & 0xff;
            n = n >> 0x08;
        }
        this._HashData(partIn, 0, partIn.length);
        DWORDToBigEndian(block, this._stateSHA1, 5);
        this.HashValue = block;
        return block;
    };
    //---------------------------------------------------------
    this.HashFinal = function () {
        return this._EndHash();
    };
    //---------------------------------------------------------
    // block is buffer. all references
    this.SHATransform = function (expandedBuffer, state, block) {
        DWORDFromBigEndian(expandedBuffer, 0x10, block);
        this.SHAExpand(expandedBuffer);
        var v = new Array(5);
        var i = 0;
        for (i = 0; i < 5; i++) v[4 - i] = state[i];
        for (i = 0; i < 80; i += 5) {
            for (var j = 0; j < 5; j++) {
                var x0 = _tf(i, v[(j + 3) % 5], v[(j + 2) % 5], v[(j + 1) % 5]);
                var x1 = as(rl(v[(j + 4) % 5], 5), x0);
                var x2 = expandedBuffer[i + (j + 0) % 5];
                var x3 = as(x1, x2);
                var x4 = as(x3, _ac(i));
                var x5 = v[(j + 0) % 5];
                var x6 = as(x4, x5);
                v[(j + 0) % 5] = x6;
                v[(j + 3) % 5] = rl(v[(j + 3) % 5], 30);
            }
        }
        for (i = 0; i < 5; i++) state[i] = as(state[i], v[4 - i]);
    };
    //---------------------------------------------------------

    function DWORDToBigEndian(block, x, digits) {
        return System.Security.Cryptography.Utils.DWORDToBigEndian(block, x, digits);
    }

    function DWORDFromBigEndian(x, digits, block) {
        return System.Security.Cryptography.Utils.DWORDFromBigEndian(x, digits, block);
    }

    function rl(x, y) {
        return System.Security.Cryptography.Utils.RotateLeft(x, y);
    }

    function as(x, y) {
        /// <summary>
        /// Add integers, wrapping at 2^32. This uses 16-bit operations internally
        /// to work around bugs in some JS interpreters.
        /// </summary>
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return msw << 16 | lsw & 0xFFFF;
    }

    function _tf(i, b, c, d) {
        /// <summary>
        /// Perform the appropriate triplet combination function for the current
        /// iteration.
        /// </summary>
        return i < 20 ? d ^ b & (c ^ d)
            : i < 40 ? b ^ c ^ d
                : i < 60 ? b & c | d & (b | c)
                    : b ^ c ^ d;
    }
    function _ac(i) {
        /// <summary>
        /// Determine the appropriate additive constant for the current iteration
        /// </summary>
        return i < 20 ? 0x5A827999
            : i < 40 ? 0x6ED9EBA1
                : i < 60 ? 0x8F1BBCDC
                    : 0xCA62C1D6;
    }
    this.SHAExpand = function (x) {
        for (var i = 0x10; i < 80; i++) {
            x[i] = rl(x[i - 3] ^ x[i - 8] ^ x[i - 14] ^ x[i - 16], 1);
        }
    };
    //---------------------------------------------------------
    this.DWORDFromBigEndian = function (x, digits, block) {
        var index = 0;
        for (var i = 0; index < digits; i += 4) {
            var n = block[i] << 0x18 | block[i + 1] << 0x10 | block[i + 2] << 8 | block[i + 3];
            x[index] = n >>> 0;
            index++;
        }
    };
    //---------------------------------------------------------
    this.Initialize = function () {
        this.InitializeState();
        System.Array.Clear(this._buffer, 0, this._buffer.length);
        System.Array.Clear(this._expandedBuffer, 0, this._expandedBuffer.length);
    };
    this.InitializeState = function () {
        this._count = 0;
        this._stateSHA1[0] = 0x67452301;
        this._stateSHA1[1] = 0xefcdab89;
        this._stateSHA1[2] = 0x98badcfe;
        this._stateSHA1[3] = 0x10325476;
        this._stateSHA1[4] = 0xc3d2e1f0;
    };
    //---------------------------------------------------------
    this._initialize = function () {
        var base = new System.Security.Cryptography.HashAlgorithm();
        for (var property in base) {
            if (typeof this[property] === "undefined") {
                //alert(property);
                this[property] = base[property];
            }
        }
        this.HashSizeValue = 160;
        this.HashSize = 160;
        this._stateSHA1 = new System.Byte(5); // uint[]
        this._buffer = new System.Byte(0x40); // byte[]
        this._expandedBuffer = new System.Byte(80); // uint[]
        this.InitializeState();



    };
    this._initialize.apply(this, arguments);
};

System.Security.Cryptography.SHA1CryptoServiceProvider = System.Security.Cryptography.SHA1;

//==============================================================================
// END
//------------------------------------------------------------------------------


//=============================================================================
// Jocys.com JavaScript.NET Classes               (In C# Object Oriented Style)
// Created by Evaldas Jocys <evaldas@jocys.com>
//=============================================================================
/// <reference path="System.debug.js" />
//=============================================================================
// Namespaces
//-----------------------------------------------------------------------------
// <PropertyGroup>
//		<RootNamespace>System.Security.Cryptography</RootNamespace>
// <PropertyGroup>
//-----------------------------------------------------------------------------
System.Type.RegisterNamespace("System.Security.Cryptography");
//=============================================================================

System.Security.Cryptography.HMACSHA1 = function (key) {
    /// <summary>
    /// Represents HMAC-SHA1 hash algorithm class.
    /// </summary>
    /// <remarks>
    /// A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
    /// in FIPS PUB 180-1
    /// Version 2.1a Copyright Paul Johnston 2000 - 2002.
    /// Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
    /// Distributed under the BSD License
    /// See http://pajhome.org.uk/crypt/md5 for details.
    /// NOTES:
    /// Recreated as class by Evaldas Jocys [2006] - SHA1 (160bit) - System.Security.Cryptography.SHA1
    /// </remarks>
    //---------------------------------------------------------
    // Public properties.
    this.Name = "HMACSHA1";
    this.Algorithm;
    this.Key;
    this.HashSize = 160;
    this.HashName = "SHA1";
    //---------------------------------------------------------
    this.ComputeHash = function (key, data) {
        if (!data) {
            data = key;
            key = this.Key;
        }
        // Convert input to byte[] if needed.
        if (typeof key === "string") key = System.Text.Encoding.UTF8.GetBytes(key);
        if (typeof data === "string") data = System.Text.Encoding.UTF8.GetBytes(data);
        return this._ComputeHash(key, data);
    };
    //---------------------------------------------------------
    this.ComputeHashAsHex = function (key, data) {
        var bytes = this.ComputeHash(key, data);
        return System.BitConverter.ToString(bytes, '');
    };
    //---------------------------------------------------------
    this.ComputeHashAsBase64 = function (key, data) {
        var bytes = this.ComputeHash(key, data);
        return System.Convert.ToBase64String(bytes, false);
    };
    //---------------------------------------------------------
    this._ComputeHash = function (key, data) {
        /// <summary>
        /// ComputeHash of a key and some data.
        /// </summary>
        // if no data then...
        if (!data) {
            data = key;
            key = this.Key;
        }
        // If key contains more than 64 bytes then use checksum of it as a key.
        if (key.length > 64) key = this.Algorithm.ComputeHash(key);
        var ipad = new Array(64), opad = new Array(64);
        for (var i = 0; i < 64; i++) {
            ipad[i] = key[i] ^ 0x36;
            opad[i] = key[i] ^ 0x5C;
        }
        var hash = this.Algorithm.ComputeHash(ipad.concat(data));
        return this.Algorithm.ComputeHash(opad.concat(hash));
    };
    //---------------------------------------------------------
    this.Initialize = function () {
        this.Algorithm = new System.Security.Cryptography.SHA1();
        this.Key = arguments[0];
    };
    this.Initialize.apply(this, arguments);
};

//==============================================================================
// END
//------------------------------------------------------------------------------


//=============================================================================
// Jocys.com JavaScript.NET Classes               (In C# Object Oriented Style)
// Created by Evaldas Jocys <evaldas@jocys.com>
//=============================================================================
/// <reference path="System.debug.js" />
//=============================================================================
// Namespaces
//-----------------------------------------------------------------------------
// <PropertyGroup>
//		<RootNamespace>System.Security.Cryptography</RootNamespace>
// <PropertyGroup>
//-----------------------------------------------------------------------------
System.Type.RegisterNamespace("System.Security.Cryptography");
//=============================================================================

// Maximum Message Size for OAEP Padding Scheme:
//
// OAEP SHA1 160-bit:
// 214 bytes = 256 (2048-bit RSA) - 1 prefix - 20 seed - 20 label - 1 separator
// OAEP SHA256 256-bit
// 190 bytes = 256 (2048-bit RSA) - 1 prefix - 32 seed - 32 label - 1 separator
//
// https://www.codeproject.com/Articles/421656/RSA-Library-with-Private-Key-Encryption-in-Csharp
//
//                     +----------+---------+-------+
//                DB = |  pHash   |    PS   |   M   |
//                     +----------+---------+-------+
//                                    |
//          +----------+              V
//          |   Seed   |--> MGF ---> XOR
//          +----------+              |
//                |                   |
//       +--+     V                   |
//       |00|    XOR <----- MGF <-----|
//       +--+     |                   |
//         |      |                   |
//         V      V                   V
//       +--+----------+----------------------------+
// EM =  |00|maskedSeed|          maskedDB          |
//       +--+----------+----------------------------+
//
// DB - Data block to be encrypted, consists of pHash, PS and M.
//
// pHash - Hash of a predefined parameter list in the form of a byte array. It is used to make sure that the parameters at the encryption side and decryption side are the same, but, in most implementations its ignored and is optional. In that case, the Hash of an empty byte array is used instead.
//
// PS - A string of '0's followed by a 1. Used to fill the unused space in case, the message is shorter than the maximum allowed message length.
//
// M - Actual message to be encrypted.
//
// Seed - A random array of bytes, the length being equal to the length of hash function being used.
//
// MGF - Mask Generation Function, it is used to generate a variable length hash from a given input random input.
//
// XOR - Bit-wise Ex-OR operation.
//
// maskedSeed - The masked seed, which is part of the padded text. It is later (while decoding) used to get the Seed in conjunction with the MGF output of the maskedDB.
//
// maskedDB - The masked Data Block. It is later (while decoding) used to feed the MGF function which is used to obtain the Seed. It is also used to obtain the DB, by using the MGF output of the Seed.
//

System.Security.Cryptography.RSAManaged = function () {
    /// <summary>
    /// Initializes a new instance of the System.Security.Cryptography.RSAManaged
    /// class.
    /// </summary>	
    /// <remarks>
    /// Evaldas Jocys, evaldas@jocys.com, www.jocys.com
    /// </remarks>
    //---------------------------------------------------------
    // Public Properties
    //---------------------------------------------------------
    // Private Properties
    //---------------------------------------------------------
};
System.Type.RegisterClass("System.Security.Cryptography.RSAManaged");

System.Security.Cryptography.RSAParameters = function () {
    /// <summary>
    /// Initializes a new instance of the System.Security.Cryptography.RSACryptoServiceProvider
    /// class using the default key.
    /// </summary>	
    /// <remarks>
    /// Recreated as JavaScript class by:
    /// Evaldas Jocys, evaldas@jocys.com, www.jocys.com
    /// http://www.koders.com/csharp/fidE8DED43C8555D56BAB880F8E5AA4CEC09C62A847.aspx
    /// </remarks>
    //---------------------------------------------------------
    // Public Properties
    this.Exponent = [];
    this.Modulus = [];
    // Non serialized parameters.
    this.D = [];
    this.DP = [];
    this.DQ = [];
    this.InverseQ = [];
    this.P = [];
    this.Q = [];
    //---------------------------------------------------------
    this.Clone = function (includePrivateParameters) {
        var parameters = new System.Security.Cryptography.RSAParameters();
        System.Array.Copy(this.Exponent, parameters.Exponent, this.Exponent.length);
        System.Array.Copy(this.Modulus, parameters.Modulus, this.Modulus.length);
        if (includePrivateParameters) {
            if (this.D) System.Array.Copy(this.D, parameters.D, this.D.length);
            if (this.DP) System.Array.Copy(this.DP, parameters.DP, this.DP.length);
            if (this.DQ) System.Array.Copy(this.DQ, parameters.DQ, this.DQ.length);
            if (this.InverseQ) System.Array.Copy(this.InverseQ, parameters.InverseQ, this.InverseQ.length);
            if (this.P) System.Array.Copy(this.P, parameters.P, this.P.length);
            if (this.Q) System.Array.Copy(this.Q, parameters.Q, this.Q.length);
        }
        return parameters;
    };
    //---------------------------------------------------------
    this.Initialize = function () {
    };
    this.Initialize.apply(this, arguments);
};
System.Type.RegisterClass("System.Security.Cryptography.RSAParameters");

System.Security.Cryptography.RSACryptoServiceProvider = function () {
    /// <summary>
    /// Initializes a new instance of the System.Security.Cryptography.RSACryptoServiceProvider
    /// class using the default key.
    /// </summary>	
    /// <remarks>
    /// Recreated as JavaScript class by:
    /// Evaldas Jocys, evaldas@jocys.com, www.jocys.com
    /// </remarks>
    //---------------------------------------------------------
    // Public Properties
    // Default key in .NET is 1024.
    // Set default key size to 512-bit for slow JavaScript.
    this.KeySize = 512;
    this.BlockSize = 512;
    this.FeedbackSize = 512;
    this.IV = [];
    this.HashSize = 20 * 8; // SHA-1
    //---------------------------------------------------------
    // Private Properties
    var rsaParams = null;
    var rsaParamsBi = null;
    var bi = System.BigInt.Utils;
    //---------------------------------------------------------
    function GetKeyPair() {
        if (rsaParams === null) rsaParams = NewKeyPair.call(this, true);
        return rsaParams;
    }
    //---------------------------------------------------------
    function NewKeyPair(truePrime) {
        // Generate RSA parameters.
        // Note on math:  x^(-1) == 1/x
        var p; // p / Primary 1
        var q; // q / Primary 2
        var n; // n / Modulus.
        var e; // e / Exponent / public exponent / encryption exponent.
        var d; // d / D / secret exponent / decryption exponent.
        // Create public exponent first.
        e = bi.FromString("10001", 16, 0);
        // p and q values should have a length of half the strength in bits.
        var pLen = this.KeySize + 1 >> 1;
        var qLen = this.KeySize - pLen;
        // Generate random primary number 'p'.
        for (; ;) {
            p = truePrime ? bi.NewPrime(pLen) : bi.NewProbPrime(pLen);
            // Prime must not be congruent to 1 modulo e: (p mod e) != 1.
            if (!bi.EqualsInt(bi.Mod(p, e), 1)) break;
        }
        // Generate a modulus of the required length.
        for (; ;) {
            for (; ;) {
                q = truePrime ? bi.NewPrime(qLen) : bi.NewProbPrime(qLen);
                // Prime must be and distinct and not congruent to 1 modulo e: (q mod e) != 1.
                if (!bi.Equals(p, q) && !bi.EqualsInt(bi.Mod(q, e), 1)) break;
            }
            // Modulus: n = p*q
            n = bi.Multiply(p, q);
            if (bi.BitCount(n) === this.KeySize) break;
            // if we get here our primes aren't big enough, make the largest
            // of the two p and try again
            if (bi.MoreThan(q, p)) p = q;
        }
        if (bi.MoreThan(q, p)) {
            // Swap numbers.
            var t = p; p = q; q = t;
        }
        // phi: phi = (p-1)*(q-1)
        var p1 = bi.AddInt(p, -1);
        var q1 = bi.AddInt(q, -1);
        var phi = bi.Multiply(p1, q1);
        // Decryption exponent: (1/e) mod phi
        d = bi.InverseMod(e, phi);
        if (!d) Trace.Write('ERROR: e isn\'t invertible. Try a different prime e. ****');
        // -------------------------
        // Calculate alternative method of representing the private key.
        // Uses the Chinese Remainder Theorem (CRT).
        // The private key is represented as a quintuple (P, Q, dP, dQ, and InvQ), where
        // P and Q are prime factors of n,
        // dP and dQ are known as the CRT exponents,
        // and qInv is the CRT coefficient.
        // The CRT method of decryption is four times faster overall than calculating m = c^d mod n
        //
        // qInv = (1/q) mod p  where p > q
        var qInv = bi.InverseMod(q, p);
        // CRT Exponent: dP = (1/e) mod (p-1)
        var dP = bi.InverseMod(e, p1);
        // CRT Exponent: dQ = (1/e) mod (q-1)
        var dQ = bi.InverseMod(e, q1);
        // Save key.
        var parameters = new System.Security.Cryptography.RSAParameters();
        parameters.Exponent = bi.ToBytes(e);
        parameters.Modulus = bi.ToBytes(n);
        parameters.D = bi.ToBytes(d);
        // Primary Numbers
        parameters.P = bi.ToBytes(p);
        parameters.Q = bi.ToBytes(q);
        // CRT
        parameters.DP = bi.ToBytes(dP);
        parameters.DQ = bi.ToBytes(dQ);
        parameters.InverseQ = bi.ToBytes(qInv);
        // Inverse byte arrays.
        System.Array.Reverse(parameters.Exponent);
        System.Array.Reverse(parameters.Modulus);
        System.Array.Reverse(parameters.D);
        System.Array.Reverse(parameters.P);
        System.Array.Reverse(parameters.Q);
        System.Array.Reverse(parameters.DP);
        System.Array.Reverse(parameters.DQ);
        System.Array.Reverse(parameters.InverseQ);
        return parameters;
    }
    //---------------------------------------------------------
    function getXmlValue(xmlString, tag) {
        var rx = new RegExp("<" + tag + ">(.*?)</" + tag + ">", "gi");
        var tagMatch = xmlString.match(rx);
        if (!tagMatch) return null;
        var base64 = tagMatch[0].replace(rx, "$1");
        var bytes = System.Convert.FromBase64String(base64);
        return bytes;
    }
    //---------------------------------------------------------
    this.ImportParameters = function (parameters) {
        rsaParams = parameters.Clone(true);
        rsaParamsBi = null;
        this.KeySize = rsaParams.Modulus.length * 8;
        this.BlockSize = this.KeySize;
        this.FeedbackSize = this.KeySize;
    };
    //---------------------------------------------------------
    this.ExportParameters = function (includePrivateParameters) {
        var key = GetKeyPair.call(this);
        return key.Clone(includePrivateParameters);
    };
    //---------------------------------------------------------
    this.FromXmlString = function (xmlString) {
        var parameters = new System.Security.Cryptography.RSAParameters();
        // Remove white spaces.
        var tagSpace = new RegExp("\\s", "gi");
        xmlString = xmlString.replace(tagSpace, "");
        parameters.Exponent = getXmlValue(xmlString, "Exponent");
        parameters.Modulus = getXmlValue(xmlString, "Modulus");
        parameters.D = getXmlValue(xmlString, "D");
        parameters.DP = getXmlValue(xmlString, "DP");
        parameters.DQ = getXmlValue(xmlString, "DQ");
        parameters.InverseQ = getXmlValue(xmlString, "InverseQ");
        parameters.P = getXmlValue(xmlString, "P");
        parameters.Q = getXmlValue(xmlString, "Q");
        this.ImportParameters(parameters);
    };
    //---------------------------------------------------------
    this.ToXmlString = function (includePrivateParameters) {
        var parameters = this.ExportParameters(includePrivateParameters);
        var builder = new System.Text.StringBuilder();
        builder.Append("<RSAKeyValue>");
        builder.Append("<Modulus>" + System.Convert.ToBase64String(parameters.Modulus) + "</Modulus>");
        builder.Append("<Exponent>" + System.Convert.ToBase64String(parameters.Exponent) + "</Exponent>");
        if (includePrivateParameters) {
            builder.Append("<P>" + System.Convert.ToBase64String(parameters.P) + "</P>");
            builder.Append("<Q>" + System.Convert.ToBase64String(parameters.Q) + "</Q>");
            builder.Append("<DP>" + System.Convert.ToBase64String(parameters.DP) + "</DP>");
            builder.Append("<DQ>" + System.Convert.ToBase64String(parameters.DQ) + "</DQ>");
            builder.Append("<InverseQ>" + System.Convert.ToBase64String(parameters.InverseQ) + "</InverseQ>");
            builder.Append("<D>" + System.Convert.ToBase64String(parameters.D) + "</D>");
        }
        builder.Append("</RSAKeyValue>");
        return builder.ToString();
    };
    //---------------------------------------------------------
    this.ImportCspBlob = function (keyBlob) {
        /// <summary>Imports a blob that represents RSA key information.</summary>
        //
        // http://msdn.microsoft.com/en-us/library/windows/desktop/aa375601(v=vs.85).aspx
        //
        // byte BlobType
        //      KeyState = 0xC, // The BLOB is a key state BLOB.
        //		OpaqueKey = 0x9, // The key is a session key.
        //		PlainTextKey = 0x8, // The key is a session key.
        //		PrivateKey = 0x7, // The key is a public/private key pair.
        //		PublicKey = 0x6, // The key is a public key.
        //		PublicKeyEx = 0xA, // The key is a public key.
        //		Simple = 0x1, // The key is a session key.
        //		SymmetricWrapKey = 0xB, // The key is a symmetric key. 
        //
        // uint AlgorithmID
        //		CALG_RSA_KEYX = 0x0000a400, // RSA public key exchange algorithm.
        //		CALG_RSA_SIGN = 0x00002400, // RSA public key signature algorithm.
        //
        // RSA Key Structure:
        //
        var ms = new System.IO.MemoryStream(keyBlob);
        var br = new System.IO.BinaryReader(ms);
        //	Blob Header
        var blobType = br.ReadByte();
        var version = br.ReadByte(); // 2 - RSA public key exchange, 3 - Digital Signature.
        var reserved = br.ReadUInt16();
        var algorithm = br.ReadUInt32();
        //	Properties.
        var magic = br.ReadUInt32();  // RSA1 (0x31415352) - public key. RSA2 (0x32415352) - private keys.
        var bitlen = br.ReadUInt32(); // Number of bits in the modulus.
        // Calculate blob size.
        var size = 1 + 1 + 2 + 4 + 4 + 4; // Header.
        size += 4 + bitlen / 8; // Public key.
        size += blobType === 0x7 ? 5 * bitlen / 16 + bitlen / 8 : 0; // Private key.
        if (keyBlob.length !== size)
            throw new System.Exception("Error: RSA Key BLOB wrong size!");
        //	Public Values
        var publicExponent = br.ReadBytes(4); // Exponent
        var modulus = br.ReadBytes(bitlen / 8); // Modulus
        //  Private Values
        var prime1 = null; // P
        var prime2 = null; // Q
        var exponent1 = null; // DP
        var exponent2 = null; // DQ
        var coefficient = null; // InverseQ
        var privateExponent = null; // D
        // If this is Private Key then...
        if (blobType === 0x7) {
            prime1 = br.ReadBytes(bitlen / 16);
            prime2 = br.ReadBytes(bitlen / 16);
            exponent1 = br.ReadBytes(bitlen / 16);
            exponent2 = br.ReadBytes(bitlen / 16);
            coefficient = br.ReadBytes(bitlen / 16);
            privateExponent = br.ReadBytes(bitlen / 8);
        } else {
            prime1 = [];
            prime2 = [];
            exponent1 = [];
            exponent2 = [];
            coefficient = [];
            privateExponent = [];
        }
        // Reverse all byte arrays.
        System.Array.Reverse(publicExponent);
        System.Array.Reverse(modulus);
        System.Array.Reverse(privateExponent);
        System.Array.Reverse(exponent1);
        System.Array.Reverse(exponent2);
        System.Array.Reverse(coefficient);
        System.Array.Reverse(prime1);
        System.Array.Reverse(prime2);
        // Create RSA parameters.
        var parameters = new System.Security.Cryptography.RSAParameters();
        parameters.Exponent = publicExponent;
        parameters.Modulus = modulus;
        parameters.D = privateExponent;
        parameters.DP = exponent1;
        parameters.DQ = exponent2;
        parameters.InverseQ = coefficient;
        parameters.P = prime1;
        parameters.Q = prime2;
        this.ImportParameters(parameters);
    };
    //---------------------------------------------------------
    this.ExportCspBlob = function (includePrivateParameters) {
        /// <summary>Exports a blob that represents RSA key information</summary>
        //	Blob Header
        var blobType = includePrivateParameters ? 0x7 : 0x6;
        var version = 2;
        var reserved = 0;
        var algorithm = 0x0000a400;
        //	Properties.
        var magic = includePrivateParameters ? 0x32415352 : 0x31415352;
        var bitlen = this.KeySize;
        // Calculate blob size.
        var size = 1 + 1 + 2 + 4 + 4 + 4; // Header.
        size += 4 + bitlen / 8; // Public key.
        size += blobType === 0x7 ? 5 * bitlen / 16 + bitlen / 8 : 0; // Private key.
        var ms = new System.IO.MemoryStream();
        var key = GetKeyPair.call(this);
        var clone = key.Clone(includePrivateParameters);
        // Write Header.
        var blobTypeBytes = [blobType];
        var versionBytes = [version];
        var reservedBytes = System.BitConverter.GetBytes(0, System.TypeCode.UInt16);
        var algorithmBytes = System.BitConverter.GetBytes(algorithm, System.TypeCode.UInt32);
        var magicBytes = System.BitConverter.GetBytes(magic, System.TypeCode.UInt32);
        var bitlenBytes = System.BitConverter.GetBytes(bitlen, System.TypeCode.UInt32);
        ms.Write(blobTypeBytes, 0, blobTypeBytes.length);
        ms.Write(versionBytes, 0, versionBytes.length);
        ms.Write(reservedBytes, 0, reservedBytes.length);
        ms.Write(algorithmBytes, 0, algorithmBytes.length);
        ms.Write(magicBytes, 0, magicBytes.length);
        ms.Write(bitlenBytes, 0, bitlenBytes.length);
        // Write Public key values.
        _writeArray(ms, clone.Exponent, 4);
        _writeArray(ms, clone.Modulus, bitlen / 8);
        // Write Private key values.
        if (includePrivateParameters) {
            _writeArray(ms, clone.P, bitlen / 16);
            _writeArray(ms, clone.Q, bitlen / 16);
            _writeArray(ms, clone.DP, bitlen / 16);
            _writeArray(ms, clone.DQ, bitlen / 16);
            _writeArray(ms, clone.InverseQ, bitlen / 16);
            _writeArray(ms, clone.D, bitlen / 8);
        }
        return ms.ToArray();
    };
    //---------------------------------------------------------
    function _writeArray(stream, array, size) {
        System.Array.Reverse(array);
        System.Array.Resize(array, size);
        stream.Write(array, 0, array.length);
    }
    //---------------------------------------------------------
    function Padding(input, fOAEP, encrypt, signOrVerify) {
        if (signOrVerify) {
            this.Padding = System.Security.Cryptography.PaddingMode.PKCS7;
        } else {
            this.Padding = fOAEP
                ? System.Security.Cryptography.PaddingMode.RsaEsOaep
                : System.Security.Cryptography.PaddingMode.RsaEsPkcs;
        }
        this.Mode = System.Security.Cryptography.CipherMode.ECB;
        var crypto = new System.Security.Cryptography.ICryptoTransform(this, true);
        var output = encrypt
            ? crypto._Padding(input, 0, input.length).iBuffer
            : crypto._PaddingRemove(input, 0, input.length);
        return output;
    }
    //---------------------------------------------------------
    function RsaEncryptBlock(block, key, sign) {
        var mBytes = block.Clone();
        System.Array.Reverse(mBytes);
        var n = bi.FromBytes(key.Modulus);
        var m = bi.FromBytes(mBytes);
        // Get encryption key.
        var k = sign
            ? bi.FromBytes(key.D) // private exponent
            : bi.FromBytes(key.Exponent); // public exponent
        // Encrypt: c = m^k mod n
        var c = bi.PowMod(m, k, n);
        var cBytes = bi.ToBytes(c);
        // Expand to block size with empty bytes.
        var bpb = this.KeySize / 8; 			// bytes per block
        for (var i = cBytes.length; i < bpb; i++) cBytes.push(0x00);
        System.Array.Reverse(cBytes);
        return cBytes;
    }
    //---------------------------------------------------------
    function EncryptBytes(key, input, fOAEP, sign) {
        var bpb = this.KeySize / 8 - (fOAEP ? 41 : 11); // bytes per block
        var output = [];               // plaintext array
        var block;                              // current block number
        for (var b = 0; b < input.length / bpb; b++) {
            block = input.slice(b * bpb, (b + 1) * bpb);
            // Reverse bytes for compatibility with RSACryptoServiceProvider.
            System.Array.Reverse(block);
            // Add padding.
            var padded = Padding.call(this, block, fOAEP, true, sign);
            // RSA Encrypt.
            var cBytes = RsaEncryptBlock.call(this, padded, key, sign);
            // Add result to output.
            output = output.concat(cBytes);
        }
        return output;
    }
    //---------------------------------------------------------
    this.Encrypt = function (rgb, fOAEP, sign) {
        /// <summary>
        /// Encrypts data with the System.Security.Cryptography.RSA algorithm.
        /// </summary>
        /// <param name="rgb">The data to be encrypted.</param>
        /// <param name="fOAEP">true to perform direct System.Security.Cryptography.RSA encryption using
        /// OAEP padding (only available on a computer running Microsoft Windows XP or
        /// later); otherwise, false to use PKCS#1 v1.5 padding.
        /// </param>
        /// <returns>The encrypted data.</returns>
        var msg;
        var key = GetKeyPair.call(this);
        sign = typeof sign === "undefined" ? false : true;
        var digitSize = key.Modulus.length;
        if (!fOAEP && rgb.length > digitSize - 11) {
            msg = "The data to be encrypted exceeds the maximum for this modulus of " + digitSize + " bytes. Maximum data size is " + (digitSize - 11) + " bytes.";
            Trace.Write(msg);
            throw new System.Security.Cryptography.CryptographicException(msg);
        }
        if (fOAEP && rgb.length > digitSize - 42) {
            // 41 = 1 (0x00) prefix + 20 seed + 20 label + 1 (0x01) separator.
            msg = "The data to be encrypted exceeds the maximum for this modulus of " + digitSize + " bytes. Maximum data size is " + (digitSize - 42) + " bytes.";
            Trace.Write(msg);
            throw new System.Security.Cryptography.CryptographicException(msg);
        }
        return EncryptBytes.call(this, key, rgb, fOAEP, sign);
    };
    //---------------------------------------------------------
    this.Decrypt = function (rgb, fOAEP, verify) {
        /// <summary>
        /// Decrypts data with the System.Security.Cryptography.RSA algorithm.
        /// </summary>
        /// <param name="rgb">The data to be decrypted.</param>
        /// <param name="fOAEP">true to perform direct System.Security.Cryptography.RSA decryption using
        /// OAEP padding (only available on a computer running Microsoft Windows XP or
        /// later); otherwise, false to use PKCS#1 v1.5 padding.
        /// </param>
        /// <returns>The decrypted data, which is the original plain text before encryption.</returns>
        var key = GetKeyPair.call(this);
        verify = typeof verify === "undefined" ? false : true;
        return DecryptBytes.call(this, key, rgb, fOAEP, verify);
    };
    //---------------------------------------------------------
    this.SignHash = function (hash, hashAlgorithmName, fOAEP) {
        // https://www.cs.cornell.edu/courses/cs5430/2015sp/notes/rsa_sign_vs_dec.php
        // Not C# compatible.
        var signatureBytes = this.Encrypt(hash, fOAEP, true);
        return signatureBytes;
    };
    //---------------------------------------------------------
    this.VerifyHash = function (hash, hashAlgorithmName, signature, fOAEP) {
        // https://www.cs.cornell.edu/courses/cs5430/2015sp/notes/rsa_sign_vs_dec.php
        // Not C# compatible.
        var decryptedHash;
        try {
            decryptedHash = this.Decrypt(signature, fOAEP, true);
        } catch (e) {
            return false;
        }
        if (hash.length !== decryptedHash.length)
            return false;
        for (var i = 0; i < hash.length; i++) {
            if (hash[i] !== decryptedHash[i])
                return false;
        }
        return true;
    };
    //---------------------------------------------------------
    this.SignData = function (data, hashAlgorithmName, fOAEP) {
        var ha;
        if (hashAlgorithmName === "SHA256")
            ha = new System.Security.Cryptography.SHA256();
        else
            ha = new System.Security.Cryptography.SHA1();
        var hash = ha.ComputeHash(data);
        return this.SignHash(hash, hashAlgorithmName, fOAEP);
    };
    //---------------------------------------------------------
    this.VerifyData = function (data, hashAlgorithmName, signature, fOAEP) {
        if (hashAlgorithmName === "SHA256")
            ha = new System.Security.Cryptography.SHA256();
        else
            ha = new System.Security.Cryptography.SHA1();
        var hash = ha.ComputeHash(data);
        return this.VerifyHash(hash, hashAlgorithmName, signature, fOAEP);
    };
    //---------------------------------------------------------
    function RsaDecryptBlock(block, key, verify) {
        var n = bi.FromBytes(key.Modulus);
        var c = bi.FromBytes(block);
        // Get decryption key.
        var k = verify
            ? bi.FromBytes(key.Exponent) // public exponent
            : bi.FromBytes(key.D); // private exponent
        var m;
        // The CRT method of decryption is four times faster overall than calculating c^d mod n.
        // Even though there are more steps in this procedure,
        // the modular exponentation to be carried out uses much shorter exponents and
        // so it is less expensive overall. 
        var CRT = verify ? false : true;
        if (CRT) {
            var dP = bi.FromBytes(key.DP);
            var dQ = bi.FromBytes(key.DQ);
            var qInv = bi.FromBytes(key.InverseQ);
            var p = bi.FromBytes(key.P);
            var q = bi.FromBytes(key.Q);
            // m1 = (c^dP) mod p
            var m1 = bi.PowMod(c, dP, p);
            // m2 = (c^dQ) mod q
            var m2 = bi.PowMod(c, dQ, q);
            // h = (qInv * (m1 + p - m2)) mod p
            var h = bi.MultiplyMod(qInv, bi.Subtract(bi.Add(m1, p), m2), p);
            // m = m2 + (h*q)
            m = bi.Add(m2, bi.Multiply(h, q));
        } else {
            // Decrypt: m = c^k mod n
            m = bi.PowMod(c, k, n);
        }
        if (!bi.MoreThan(n, m)) Trace.Write('ERROR: The message m must be less than p*q');
        var mBytes = bi.ToBytes(m);
        // Expand to block size with empty bytes.
        var bpb = this.KeySize / 8; 			// bytes per block
        for (var i = mBytes.length; i < bpb; i++) mBytes.push(0x00);
        return mBytes;
    }
    //---------------------------------------------------------
    function DecryptBytes(key, input, fOAEP, verify) {
        var bpb = this.KeySize / 8; // bytes per block
        var output = []; // plaintext array
        var block; // current block number
        for (var b = 0; b < input.length / bpb; b++) {
            block = input.slice(b * bpb, (b + 1) * bpb);
            // RSA Decrypt.
            block = RsaDecryptBlock.call(this, block, key, verify);
            // Remove padding.
            var unpadded = Padding.call(this, block, fOAEP, false, verify);
            // Reverse bytes for compatibility with RSACryptoServiceProvider.
            System.Array.Reverse(unpadded);
            // Add result to output.
            output = output.concat(unpadded);
        }
        return output;
    }
    //---------------------------------------------------------
    this.Initialize = function () {
        if (arguments.length === 1) {
            if (typeof arguments[0] === "number") {
                this.KeySize = arguments[0];
                this.BlockSize = this.KeySize;
                this.FeedbackSize = this.KeySize;
            }
        }
    };
    this.Initialize.apply(this, arguments);
};
System.Type.RegisterClass("System.Security.Cryptography.RSACryptoServiceProvider");

System.Security.Cryptography.RsaCreateEventArgs = function () {
    this.UserState = null;
    this.PublicKey = null;
    this.PrivateKey = null;
    this.Error = null;
};
System.Type.RegisterClass("System.Security.Cryptography.RsaCreateEventArgs");

System.Security.Cryptography.RSA = function () { };
System.Type.RegisterClass("System.Security.Cryptography.RSA");

System.Security.Cryptography.RSA.CreateKeyCompleted = function (sender, e) {
    /// <summary>fires when new key is generated</summary>
    /// <param name="sender">RSA class</param>
    /// <param name="e" type="GenerateKeyEventArgs">Results</param>
};

System.Security.Cryptography.RSA.CreateKeyAsync = function (keySize, userState) {
    /// <summary>Create new RSA provider.</summary>
    //---------------------------------------------------------
    function raiseException(message) {
        var e = new System.Security.Cryptography.RsaCreateEventArgs();
        e.UserState = userState;
        e.Error = new System.Exception(message);
        var ev = System.Security.Cryptography.RSA.CreateKeyCompleted;
        if (typeof ev === "function") {
            ev(this, e);
        }
    }
    //---------------------------------------------------------
    function raiseComplete() {
        var e = new System.Security.Cryptography.RsaCreateEventArgs();
        e.UserState = userState;
        e.PublicKey = _publicKey;
        e.PrivateKey = _privateKey;
        var ev = System.Security.Cryptography.RSA.CreateKeyCompleted;
        if (typeof ev === "function") {
            ev(this, e);
        }
    }
    //---------------------------------------------------------
    function ExecPromiseAsync(promise, onComplete, onError) {
        /// <summary>Helper function to execute JavaScript PromiseLive object</summary>
        if (window.crypto) {
            promise.then(onComplete).catch(onError);
        }
        else if (window.msCrypto) {
            promise.oncomplete = onComplete;
            promise.onerror = onError;
        }
    }
    //---------------------------------------------------------
    function convertKey(key, includePrivateParameters) {
        var parameters = new System.Security.Cryptography.RSAParameters();
        var e = System.Convert.FromBase64UrlString(key.e);
        var n = System.Convert.FromBase64UrlString(key.n);
        parameters.Exponent = e;
        parameters.Modulus = n;
        if (includePrivateParameters) {
            var d = System.Convert.FromBase64UrlString(key.d);
            var dp = System.Convert.FromBase64UrlString(key.dp);
            var dq = System.Convert.FromBase64UrlString(key.dq);
            var qi = System.Convert.FromBase64UrlString(key.qi);
            var p = System.Convert.FromBase64UrlString(key.p);
            var q = System.Convert.FromBase64UrlString(key.q);
            // Private parameters.
            parameters.D = d;
            parameters.DP = dp;
            parameters.DQ = dq;
            parameters.InverseQ = qi;
            parameters.P = p;
            parameters.Q = q;
        }
        return parameters;
    }
    //---------------------------------------------------------
    var subtle = null;

    // If Microsoft Internet Explorer then...
    if (window.msCrypto) {
        subtle = window.msCrypto.subtle;
    }
    // If other browsers then...
    else if (window.crypto) {
        subtle = window.crypto.subtle || window.crypto.webkitSubtle;
    }
    else {
        raiseException("Web Cryptography API not found.");
        return;
    }
    if (subtle === null) {
        raiseException("Web Cryptography API Subtle not found.");
        return;
    }

    //=================================================
    // STEP 1: Generate key pair.
    //-------------------------------------------------

    // Set key options.
    var rsaHashedKeyGenParams = {
        // Microsoft use RSA-OAEP (SHA1) for RSA.
        name: "RSA-OAEP", // "RSAES-PKCS1-v1_5"
        // Can be: 512, 1024, 2048, 4096.
        modulusLength: keySize,
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        // Can be: SHA-1, SHA-256, SHA-384, SHA-512.
        hash: { name: "SHA-1" }
    };

    // Mark key as exportable.
    var generatePromise = subtle.generateKey(rsaHashedKeyGenParams, true, ["encrypt", "decrypt"]);

    // Begin generation of the key pair.
    ExecPromiseAsync(generatePromise, generateKey_OnComplete, generateKey_OnError);

    function generateKey_OnError(e) {
        raiseException("generateKey error:" + e);
    }

    var _publicJwk = null;
    var _privateJwk = null;

    function generateKey_OnComplete(e) {
        if (window.crypto) {
            _publicJwk = e.privateKey;
            _privateJwk = e.privateKey;
        } else if (window.msCrypto) {
            _publicJwk = e.target.result.publicKey;
            _privateJwk = e.target.result.privateKey;
        }
        // Continue to STEP 2.
        ExportPrivateKey(_privateJwk);
    }

    //=================================================
    // STEP 2: Export private key.
    //-------------------------------------------------

    var _privateKey;

    function ExportPrivateKey(key) {
        var exportPromise = subtle.exportKey('jwk', key);
        ExecPromiseAsync(exportPromise, exportPrivateKey_OnComplete, exportPrivateKey_OnError);
    }

    function exportPrivateKey_OnError(e) {
        raiseException("exportKey error (private):" + e);
    }

    function exportPrivateKey_OnComplete(e) {
        var key;
        if (window.crypto) {
            key = e;
        }
        else if (window.msCrypto) {
            var bytes = new Uint8Array(e.target.result);
            var json = System.Text.Encoding.ASCII.GetString(bytes);
            key = JSON.parse(json);
        }
        _privateKey = convertKey(key, true);
        _publicKey = _privateKey;
        // Complete
        raiseComplete();
    }

    //=================================================
    // COMPLETE
    //-------------------------------------------------

};



//==============================================================================
// END
//------------------------------------------------------------------------------


/*
 Author  : Venkatesh Nelli
 Version : 3.0
 License : GNU General Public License v3.0
 */

//Secure JS Main Code
(function () {


    var app = angular.module('Secure', []);
    app.service('secure_space', ['$http', network]);

    function network(http) {

        var web_site = location.hostname;

        var pre_path = "";
        if (web_site != "localhost") {
            pre_path = "/" + location.pathname.split("/")[1];
        }

        var end_encrypt_post = function (url_path, data_object, public_key, private_key, success_callback, failure_callback, return_encrypt) {

            return_encrypt = typeof return_encrypt === 'undefined' ? true : return_encrypt;

            if (url_path == "" || url_path == undefined || url_path == null) {
                alert("URL should not be empty !!!");
                return;
            }
            if (data_object == "" || data_object == undefined || data_object == null) {
                alert("Data should not be empty !!!");
                return;
            }
            if (public_key == "" || public_key == undefined || public_key == null) {
                alert("Public KEY should not be empty !!!");
                return;
            }
            if (private_key == "" || private_key == undefined || private_key == null) {
                alert("Private KEY should not be empty !!!");
                return;
            }

            var string_data_object = JSON.stringify(data_object);

            var key_value = random_key_generator(16);
            var iv_value = random_key_generator(16);

            var encrypted_data = Encrypt_Data(string_data_object, key_value, iv_value);

            var key_value_pair = {
                KEY: key_value,
                IV: iv_value
            };


            var new_public_key = public_key;

            var decryptedBytes = System.Text.Encoding.UTF8.GetBytes(JSON.stringify(key_value_pair));
            rsa = new System.Security.Cryptography.RSACryptoServiceProvider();
            rsa.FromXmlString(new_public_key);
            var encryptedBytes = rsa.Encrypt(decryptedBytes, true);
            var encryptedString = System.Convert.ToBase64String(encryptedBytes);


            var data = encryptedString + "." + encrypted_data;

            http({
                method: 'POST',
                url: pre_path + url_path,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data)
            }).then(function (success) {


                if (return_encrypt) {
                    var data_array = success.data.split('.');

                    var new_private_key = private_key;
                    encryptedBytes = System.Convert.FromBase64String(data_array[0]);
                    rsa = new System.Security.Cryptography.RSACryptoServiceProvider();
                    rsa.FromXmlString(new_private_key);
                    decryptedBytes = rsa.Decrypt(encryptedBytes, true);
                    var key_pair = System.Text.Encoding.UTF8.GetString(decryptedBytes);

                    var key_iv_pair = JSON.parse(key_pair);

                    var decrypted_data = Decrypt_Data(data_array[1], key_iv_pair.KEY, key_iv_pair.IV);

                    success_callback(success.status, JSON.parse(decrypted_data), success.statusText, success.xhrStatus);
                }
                else {
                    success_callback(success.status, success.data, success.statusText, success.xhrStatus);

                }
            }, function (error) {
                failure_callback(error.status, error.statusText, error.data, error.xhrStatus);
            });
        };

        var end_encrypt_get = function (url_path, data_object, public_key, private_key, success_callback, failure_callback, return_encrypt) {

            return_encrypt = typeof return_encrypt === 'undefined' ? true : return_encrypt;

            if (url_path == "" || url_path == undefined || url_path == null) {
                alert("URL should not be empty !!!");
                return;
            }
            if (data_object == "" || data_object == undefined || data_object == null) {
                alert("Data should not be empty !!!");
                return;
            }
            if (public_key == "" || public_key == undefined || public_key == null) {
                alert("Public KEY should not be empty !!!");
                return;
            }
            if (private_key == "" || private_key == undefined || private_key == null) {
                alert("Private KEY should not be empty !!!");
                return;
            }


            var key_value = random_key_generator(16);
            var iv_value = random_key_generator(16);

            var string_data_object = JSON.stringify(data_object);

            var encrypted_data = Encrypt_Data(string_data_object, key_value, iv_value);

            var key_value_pair = {
                KEY: key_value,
                IV: iv_value
            };


            var new_public_key = public_key;

            var decryptedBytes = System.Text.Encoding.UTF8.GetBytes(JSON.stringify(key_value_pair));
            rsa = new System.Security.Cryptography.RSACryptoServiceProvider();
            rsa.FromXmlString(new_public_key);
            var encryptedBytes = rsa.Encrypt(decryptedBytes, true);
            var encryptedString = System.Convert.ToBase64String(encryptedBytes);

            var post_url = encryptedString + "." + encrypted_data;


            http({
                method: 'GET',
                url: pre_path + url_path + "?data=" + post_url
            }).then(function (success) {


                if (return_encrypt) {
                    var data_array = success.data.split('.');

                    var new_private_key = private_key;
                    encryptedBytes = System.Convert.FromBase64String(data_array[0]);
                    rsa = new System.Security.Cryptography.RSACryptoServiceProvider();
                    rsa.FromXmlString(new_private_key);
                    decryptedBytes = rsa.Decrypt(encryptedBytes, true);
                    var key_pair = System.Text.Encoding.UTF8.GetString(decryptedBytes);

                    var key_iv_pair = JSON.parse(key_pair);

                    var decrypted_data = Decrypt_Data(data_array[1], key_iv_pair.KEY, key_iv_pair.IV);

                    success_callback(success.status, JSON.parse(decrypted_data), success.statusText, success.xhrStatus);
                }
                else {
                    success_callback(success.status, success.data, success.statusText, success.xhrStatus);

                }
            }, function (error) {
                failure_callback(error.status, error.statusText, error.data, error.xhrStatus);
            });
        };

        var token_encrypt_post = function (url_path, data_object, public_key, private_key, token, success_callback, failure_callback, return_encrypt) {

            return_encrypt = typeof return_encrypt === 'undefined' ? true : return_encrypt;


            if (url_path == "" || url_path == undefined || url_path == null) {
                alert("URL should not be empty !!!");
                return;
            }
            if (data_object == "" || data_object == undefined || data_object == null) {
                alert("Data should not be empty !!!");
                return;
            }
            if (public_key == "" || public_key == undefined || public_key == null) {
                alert("Public KEY should not be empty !!!");
                return;
            }
            if (private_key == "" || private_key == undefined || private_key == null) {
                alert("Private KEY should not be empty !!!");
                return;
            }
            if (token == "" || token == undefined || token == null) {
                alert("Token should not be empty !!!");
                return;
            }
            var string_data_object = JSON.stringify(data_object);

            var key_value = random_key_generator(16);
            var iv_value = random_key_generator(16);

            var encrypted_data = Encrypt_Data(string_data_object, key_value, iv_value);

            var key_value_pair = {
                KEY: key_value,
                IV: iv_value
            };


            var new_public_key = public_key;

            var decryptedBytes = System.Text.Encoding.UTF8.GetBytes(JSON.stringify(key_value_pair));
            rsa = new System.Security.Cryptography.RSACryptoServiceProvider();
            rsa.FromXmlString(new_public_key);
            var encryptedBytes = rsa.Encrypt(decryptedBytes, true);
            var encryptedString = System.Convert.ToBase64String(encryptedBytes);


            var data = token + "." + encryptedString + "." + encrypted_data;

            http({
                method: 'POST',
                url: pre_path + url_path,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data)
            }).then(function (success) {


                if (return_encrypt) {
                    var data_array = success.data.split('.');

                    var new_private_key = private_key;
                    encryptedBytes = System.Convert.FromBase64String(data_array[0]);
                    rsa = new System.Security.Cryptography.RSACryptoServiceProvider();
                    rsa.FromXmlString(new_private_key);
                    decryptedBytes = rsa.Decrypt(encryptedBytes, true);
                    var key_pair = System.Text.Encoding.UTF8.GetString(decryptedBytes);

                    var key_iv_pair = JSON.parse(key_pair);

                    var decrypted_data = Decrypt_Data(data_array[1], key_iv_pair.KEY, key_iv_pair.IV);

                    success_callback(success.status, JSON.parse(decrypted_data), success.statusText, success.xhrStatus);
                }
                else {
                    success_callback(success.status, success.data, success.statusText, success.xhrStatus);

                }
            }, function (error) {
                failure_callback(error.status, error.statusText, error.data, error.xhrStatus);
            });
        };

        var token_encrypt_get = function (url_path, data_object, public_key, private_key, token, success_callback, failure_callback, return_encrypt) {

            return_encrypt = typeof return_encrypt === 'undefined' ? true : return_encrypt;


            if (url_path == "" || url_path == undefined || url_path == null) {
                alert("URL should not be empty !!!");
                return;
            }
            if (data_object == "" || data_object == undefined || data_object == null) {
                alert("Data should not be empty !!!");
                return;
            }
            if (public_key == "" || public_key == undefined || public_key == null) {
                alert("Public KEY should not be empty !!!");
                return;
            }
            if (private_key == "" || private_key == undefined || private_key == null) {
                alert("Private KEY should not be empty !!!");
                return;
            }
            if (token == "" || token == undefined || token == null) {
                alert("Token should not be empty !!!");
                return;
            }

            var key_value = random_key_generator(16);
            var iv_value = random_key_generator(16);

            var string_data_object = JSON.stringify(data_object);

            var encrypted_data = Encrypt_Data(string_data_object, key_value, iv_value);

            var key_value_pair = {
                KEY: key_value,
                IV: iv_value
            };


            var new_public_key = public_key;

            var decryptedBytes = System.Text.Encoding.UTF8.GetBytes(JSON.stringify(key_value_pair));
            rsa = new System.Security.Cryptography.RSACryptoServiceProvider();
            rsa.FromXmlString(new_public_key);
            var encryptedBytes = rsa.Encrypt(decryptedBytes, true);
            var encryptedString = System.Convert.ToBase64String(encryptedBytes);

            var post_url = token + "." + encryptedString + "." + encrypted_data;


            http({
                method: 'GET',
                url: pre_path + url_path + "?data=" + post_url
            }).then(function (success) {

                if (return_encrypt) {
                    var data_array = success.data.split('.');

                    var new_private_key = private_key;
                    encryptedBytes = System.Convert.FromBase64String(data_array[0]);
                    rsa = new System.Security.Cryptography.RSACryptoServiceProvider();
                    rsa.FromXmlString(new_private_key);
                    decryptedBytes = rsa.Decrypt(encryptedBytes, true);
                    var key_pair = System.Text.Encoding.UTF8.GetString(decryptedBytes);

                    var key_iv_pair = JSON.parse(key_pair);

                    var decrypted_data = Decrypt_Data(data_array[1], key_iv_pair.KEY, key_iv_pair.IV);

                    success_callback(success.status, JSON.parse(decrypted_data), success.statusText, success.xhrStatus);
                }
                else {
                    success_callback(success.status, success.data, success.statusText, success.xhrStatus);

                }

            }, function (error) {
                failure_callback(error.status, error.statusText, error.data, error.xhrStatus);
            });
        };

        var encrypt_post = function (url_path, data_object, KEY, success_callback, failure_callback) {
            if (url_path == "" || url_path == undefined || url_path == null) {
                alert("URL should not be empty !!!");
                return;
            }
            if (data_object == "" || data_object == undefined || data_object == null) {
                alert("Data should not be empty !!!");
                return;
            }
            if (KEY == "" || KEY == undefined || KEY == null) {
                alert("Token should not be empty !!!");
                return;
            }

            var payload = JSON.stringify(data_object);
            var number = CryptoJS.enc.Utf8.parse(KEY);
            var data = CryptoJS.enc.Utf8.parse(payload);
            var hash = CryptoJS.HmacSHA256(data, number);
            var signature = CryptoJS.enc.Base64.stringify(hash);
            var data_1 = CryptoJS.enc.Utf8.parse(signature);
            var data_to_sent = base64url(number) + "." + base64url(data) + "." + base64url(data_1);

            http({
                method: 'POST',
                url: pre_path + url_path,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data_to_sent)
            }).then(function (success) {
                success_callback(success.status, success.data, success.statusText, success.xhrStatus);
            }, function (error) {
                failure_callback(error.status, error.statusText, error.data, error.xhrStatus);
            });
        };

        var encrypt_get = function (url_path, data_object, KEY, success_callback, failure_callback) {

            if (url_path == "" || url_path == undefined || url_path == null) {
                alert("URL should not be empty !!!");
                return;
            }
            if (data_object == "" || data_object == undefined || data_object == null) {
                alert("Data should not be empty !!!");
                return;
            }
            if (KEY == "" || KEY == undefined || KEY == null) {
                alert("Token should not be empty !!!");
                return;
            }

            var payload = JSON.stringify(data_object)
            var number = CryptoJS.enc.Utf8.parse(KEY);
            var data = CryptoJS.enc.Utf8.parse(payload);
            var hash = CryptoJS.HmacSHA256(data, number);
            var signature = CryptoJS.enc.Base64.stringify(hash);
            var data_1 = CryptoJS.enc.Utf8.parse(signature);
            var post_url = base64url(number) + "." + base64url(data) + "." + base64url(data_1);

            http({
                method: 'GET',
                url: pre_path + url_path + "?data=" + post_url
            }).then(function (success) {
                success_callback(success.status, success.data, success.statusText, success.xhrStatus);
            }, function (error) {
                failure_callback(error.status, error.statusText, error.data, error.xhrStatus);
            });

        };

        var post = function (url_path, data_object, success_callback, failure_callback) {
            if (url_path == "" || url_path == undefined || url_path == null) {
                alert("URL should not be empty !!!");
                return;
            }
            if (data_object == "" || data_object == undefined || data_object == null) {
                alert("Data should not be empty !!!");
                return;
            }
            http({
                method: 'POST',
                url: pre_path + url_path,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data_object)
            }).then(function (success) {
                success_callback(success.status, success.data, success.statusText, success.xhrStatus);
            }, function (error) {
                failure_callback(error.status, error.statusText, error.data, error.xhrStatus);
            });
        };

        var get = function (url_path, success_callback, failure_callback) {
            if (url_path == "" || url_path == undefined || url_path == null) {
                alert("URL should not be empty !!!");
                return;
            }

            http({
                method: 'GET',
                url: pre_path + url_path
            }).then(function (success) {
                success_callback(success.status, success.data, success.statusText, success.xhrStatus);
            }, function (error) {
                failure_callback(error.status, error.statusText, error.data, error.xhrStatus);
            });
        };

        var token_post = function (url_path, data_object, success_callback, failure_callback) {
            if (url_path == "" || url_path == undefined || url_path == null) {
                alert("URL should not be empty !!!");
                return;
            }
            if (data_object == "" || data_object == undefined || data_object == null) {
                alert("Data should not be empty !!!");
                return;
            }
            http({
                method: 'POST',
                url: pre_path + url_path,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: data_object,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function (success) {
                success_callback(success.status, success.data, success.statusText, success.xhrStatus);
            }, function (error) {
                failure_callback(error.status, error.statusText, error.data, error.xhrStatus);
            });
        };

        var token_get = function (url_path, success_callback, failure_callback) {
            if (url_path == "" || url_path == undefined || url_path == null) {
                alert("URL should not be empty !!!");
                return;
            }

            http({
                method: 'GET',
                url: pre_path + url_path,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function (success) {
                success_callback(success.status, success.data, success.statusText, success.xhrStatus);
            }, function (error) {
                failure_callback(error.status, error.statusText, error.data, error.xhrStatus);
            });
        };

        var access_post = function (url_path, data_object, token, success_callback, failure_callback) {
            if (url_path == "" || url_path == undefined || url_path == null) {
                alert("URL should not be empty !!!");
                return;
            }
            if (data_object != "" || data_object == undefined || data_object == null) {
                alert("Data should not be empty !!!");
                return;
            }
            if (token != "" || token == undefined || token == null) {
                alert("Token should not be empty !!!");
                return;
            }
            http({
                method: 'POST',
                url: pre_path + url_path,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify(data_object),
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'contentType': 'application/json'
                }
            }).then(function (success) {
                success_callback(success.status, success.data, success.statusText, success.xhrStatus);
            }, function (error) {
                failure_callback(error.status, error.statusText, error.data, error.xhrStatus);
            });
        };

        var access_get = function (url_path, token, success_callback, failure_callback) {
            if (url_path == "" || url_path == undefined || url_path == null) {
                alert("URL should not be empty !!!");
                return;
            }

            if (token == "" || token == undefined || token == null) {
                alert("Token should not be empty !!!");
                return;
            }
            http({
                method: 'GET',
                url: pre_path + url_path,
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'contentType': 'application/json'
                }
            }).then(function (success) {
                success_callback(success.status, success.data, success.statusText, success.xhrStatus);
            }, function (error) {
                failure_callback(error.status, error.statusText, error.data, error.xhrStatus);
            });
        };

        var custom_post = function (url_path, data_object, headers, success_callback, failure_callback) {
            if (url_path == "" || url_path == undefined || url_path == null) {
                alert("URL should not be empty !!!");
                return;
            }
            if (data_object == "" || data_object == undefined || data_object == null) {
                alert("Data should not be empty !!!");
                return;
            }
            if (headers == "" || headers == undefined || headers == null) {
                alert("Header should not be empty !!!");
                return;
            }
            http({
                method: 'POST',
                url: pre_path + url_path,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify(data_object),
                headers: headers
            }).then(function (success) {
                success_callback(success.status, success.data, success.statusText, success.xhrStatus);
            }, function (error) {
                failure_callback(error.status, error.statusText, error.data, error.xhrStatus);
            });
        };

        var custom_get = function (url_path, headers, success_callback, failure_callback) {
            if (url_path == "" || url_path == undefined || url_path == null) {
                alert("URL should not be empty !!!");
                return;
            }
            if (headers == "" || headers == undefined || headers == null) {
                alert("Header should not be empty !!!");
                return;
            }
            http({
                method: 'GET',
                url: pre_path + url_path,
                headers: headers
            }).then(function (success) {
                success_callback(success.status, success.data, success.statusText, success.xhrStatus);
            }, function (error) {
                failure_callback(error.status, error.statusText, error.data, error.xhrStatus);
            });
        };

        network = {
            token_encrypt_post: token_encrypt_post,
            token_encrypt_get: token_encrypt_get,
            end_encrypt_get: end_encrypt_get,
            end_encrypt_post: end_encrypt_post,
            encrypt_get: encrypt_get,
            encrypt_post: encrypt_post,
            post: post,
            get: get,
            token_post: token_post,
            token_get: token_get,
            access_post: access_post,
            access_get: access_get,
            custom_post: custom_post,
            custom_get: custom_get
        };

        return network;

    }


    /*
     Author  : Venkatesh Nelli
     Version : 1.0.0
     License : GNU General Public License v3.0
     Description : Used for store data in session with encryption
     */

    app.service("session_service", [function () { return { set: function (e, t) { if ("" == e || null == e || null == e || "" == t || null == t || null == t) return; var r = CryptoJS.SHA1(e).toString(CryptoJS.enc.Base64), n = (o = t, S = CryptoJS.enc.Utf8.parse(i), s = CryptoJS.enc.Utf8.parse(p), CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(o), S, { keySize: 16, iv: s, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString()); var o, S, s; sessionStorage.setItem(r, n) }, get: function (e) { if ("" == e || null == e || null == e) return; var t = CryptoJS.SHA1(e).toString(CryptoJS.enc.Base64), r = sessionStorage.getItem(t); if ("" == r || null == r || null == r) return; return n = r, o = CryptoJS.enc.Utf8.parse(i), S = CryptoJS.enc.Utf8.parse(p), CryptoJS.AES.decrypt(n, o, { keySize: 16, iv: S, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString(CryptoJS.enc.Utf8); var n, o, S }, remove: function (e) { if ("" == e || null == e || null == e) return; var t = CryptoJS.SHA1(e).toString(CryptoJS.enc.Base64); sessionStorage.removeItem(t) }, clear: function () { sessionStorage.clear() }, set_key: function (e) { t = e } } }]); var t = ""; var i = t, p = t


})();

/*
==================================================================================
				$$$$$$$$$$$$$$$$  THE END   $$$$$$$$$$$$$$$$$$
==================================================================================

*/