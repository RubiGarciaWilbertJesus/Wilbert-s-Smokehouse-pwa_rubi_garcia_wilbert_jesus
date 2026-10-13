if (!self.define) {
  let e,
    s = {};
  const i = (i, r) => (
    (i = new URL(i + ".js", r).href),
    s[i] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          ((e.src = i), (e.onload = s), document.head.appendChild(e));
        } else ((e = i), importScripts(i), s());
      }).then(() => {
        let e = s[i];
        if (!e) throw new Error(`Module ${i} didn’t register its module`);
        return e;
      })
  );
  self.define = (r, o) => {
    const a =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[a]) return;
    let n = {};
    const c = (e) => i(e, a),
      t = { module: { uri: a }, exports: n, require: c };
    s[a] = Promise.all(r.map((e) => t[e] || c(e))).then((e) => (o(...e), n));
  };
}
define(["./workbox-ee13fbdc"], function (e) {
  "use strict";
  (self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: "icons/LogoSMOKEHOUSE.png", revision: "625d97890c61ce2a85f25f3d2bc42377" },
        { url: "manifest.json", revision: "5de02539a07be6b9a8acca7aa2fa61b3" },
        { url: "index.html", revision: "1cc5e15d06bdda537a06189839c256dd" },
        { url: "catalogo.json", revision: "be8c6670648749069c78e306cd2df3fb" },
        {
          url: "js/notificaciones.js", revision: "a0dc07ca65191a4ae0ef32f93ea55694",
        },
        {
          url: "js/geolocalizacion.js", revision: "7ada55fd626a77d098d448c3b097ee9a",
        },
        { url: "js/csr.js", revision: "93131a49549fd0b942bbabeb5585e428" },
        { url: "js/carrito.js", revision: "6d987f13a138131c4e81a36b79b2d777" },
        { url: "js/app.js", revision: "7da6b975306afd5442935baea94ee8c3" },
        {
          url: "css/estilos.css", revision: "d2f16740d32aeb8860d224415090ae91",
        },
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] },
    ));
});
//# sourceMappingURL=sw.js.map
//# sourceMappingURL=sw.js.map



