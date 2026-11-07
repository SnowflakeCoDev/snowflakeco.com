// UI-to-Flutter transport only. PregnancyWeekController owns all API operations.
(() => {
  'use strict';
  const channel = 'mamacare-pregnancy-week-controller';
  let frame = null, ready = null, sequence = 0;
  const pending = new Map();
  class ControllerError extends Error {
    constructor(code, fields = {}) { super(code); this.code = code; this.fields = fields; }
  }

  function start() {
    if (ready) return ready;
    if (!['http:','https:'].includes(location.protocol)) return Promise.reject(new ControllerError('controllerUnavailable'));
    ready = new Promise((resolve, reject) => {
      frame = document.createElement('iframe');
      frame.title = 'Flutter pregnancy week controller'; frame.setAttribute('aria-hidden', 'true'); frame.tabIndex = -1;
      frame.style.cssText = 'position:fixed;width:1px;height:1px;left:-100px;top:-100px;border:0;pointer-events:none';
      const timer = setTimeout(() => fail(), 60000);
      function cleanup() { clearTimeout(timer); window.removeEventListener('message', receive); }
      function fail() { cleanup(); frame?.remove(); frame = null; ready = null; reject(new ControllerError('controllerUnavailable')); }
      function receive(event) {
        if (event.origin !== location.origin || event.source !== frame?.contentWindow || typeof event.data !== 'string') return;
        let data; try { data = JSON.parse(event.data); } catch (_) { return; }
        if (data.channel !== channel) return;
        if (data.startupError) fail();
        else if (data.ready) { cleanup(); resolve(); }
      }
      window.addEventListener('message', receive);
      frame.src = 'controller.html?dashboardBridge=pregnancy_week';
      document.body.append(frame);
    });
    return ready;
  }
  window.addEventListener('message', event => {
    if (event.origin !== location.origin || event.source !== frame?.contentWindow || typeof event.data !== 'string') return;
    let data; try { data = JSON.parse(event.data); } catch (_) { return; }
    if (data.channel !== channel || !pending.has(data.id)) return;
    const request = pending.get(data.id); pending.delete(data.id); request.cleanup();
    if (data.error) request.reject(new ControllerError(data.error.code, data.error.fields));
    else request.resolve(data.data);
  });
  async function call(action, payload, signal) {
    await start();
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
    return new Promise((resolve, reject) => {
      const id = ++sequence;
      const abort = () => finish(new DOMException('Aborted', 'AbortError'));
      const cleanup = () => { clearTimeout(timer); signal?.removeEventListener('abort', abort); };
      const finish = error => { pending.delete(id); cleanup(); reject(error); };
      const timer = setTimeout(() => finish(new ControllerError('timeout')), 45000);
      pending.set(id, { resolve, reject, cleanup }); signal?.addEventListener('abort', abort, { once:true });
      frame.contentWindow.postMessage(JSON.stringify({ channel, id, action, payload }), location.origin);
    });
  }
  window.DashboardPregnancyWeekController = {
    list:(locale, signal) => call('list', { locale }, signal),
    detail:(id, locale, signal) => call('detail', { id, locale }, signal),
  };
})();
