function getDocumentHeight() {
  const body = document.body, html = document.documentElement;
  return Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
};

export default (function() {
  const b = new Bugout("org.index-space", {"announce": ["wss://index-space-p2p.herokuapp.com"]});
  const myAddress = b.address();
  const lastKnownState = {};

  b.on("connections", function(c) {
    console.log("peers:", c);
  });

  b.on("message", function(address, msg) {
    if ((address !== myAddress) && (window.location.pathname === msg.pathname)) {
      lastKnownState[address] = lastKnownState[address] || {}
      if (!lastKnownState[address].cursor) {
        const div = document.createElement("div");
        div.classList.add('magic-mouse');
        document.body.appendChild(div);
        lastKnownState[address].cursor = div;
      }
      lastKnownState[address].cursor.style.left = `${(msg.x * window.innerWidth)}px`;
      lastKnownState[address].cursor.style.top = `${(msg.y * getDocumentHeight())}px`;
    }
  });

  document.onmousemove = function(event) {
    let doc = document.documentElement,
        body = document.body;
    const pageX = event.clientX +
      (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
      (doc && doc.clientLeft || body && body.clientLeft || 0);
    const pageY = event.clientY +
      (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
      (doc && doc.clientTop  || body && body.clientTop  || 0 );
    b.send({
      "x": (pageX / window.innerWidth),
      "y": (pageY / getDocumentHeight()),
      "pathname": window.location.pathname
    });
  }
})();
