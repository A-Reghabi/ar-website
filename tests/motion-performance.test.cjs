const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// Execute the production event handlers and frame loop against a deterministic
// DOM/Canvas adapter. These counters measure work, not simulated browser FPS.
function mountMotion() {
  let nextFrame = 0;
  const pending = new Map();
  const counters = { stageReads: 0, stageWrites: 0, draws: 0 };
  function element() {
    const handlers = new Map();
    const node = {
      handlers, children: [], dataset: {}, clientWidth: 500, clientHeight: 600,
      style: {
        setProperty() { if (node === stage || node === portrait) counters.stageWrites++; },
        removeProperty() {},
      },
      classList: { add() {}, remove() {}, toggle() {} },
      setAttribute() {}, querySelectorAll() { return []; }, querySelector() { return null; },
      appendChild(child) { this.children.push(child); }, cloneNode() { return element(); },
      getBoundingClientRect() {
        if (node === stage) counters.stageReads++;
        return { left: 100, top: 100, width: 500, height: 600 };
      },
      addEventListener(name, handler) { handlers.set(name, handler); },
    };
    return node;
  }
  const stage = element();
  const portrait = element();
  const canvas = element();
  const context = new Proxy({}, {
    get(_, key) { return key === 'clearRect' ? () => counters.draws++ : () => {}; },
    set() { return true; },
  });
  canvas.getContext = () => context;
  const root = element(); root.lang = 'en'; root.scrollHeight = 2000;
  const body = element();
  const strip = element(); strip.children = [element()];
  const toggle = element();
  const hero = element();
  const aura = element();
  const documentHandlers = new Map();
  const document = {
    documentElement: root, body, hidden: false,
    getElementById(id) { return id === 'motion-toggle' ? toggle : canvas; },
    querySelector(selector) {
      return { '.hero': hero, '.hero-art': stage, '.portrait-shell': portrait, '.pointer-aura': aura, '.tool-strip-inner': strip }[selector];
    },
    querySelectorAll() { return []; }, createElement: element,
    addEventListener(name, handler) { documentHandlers.set(name, handler); },
  };
  const windowHandlers = new Map();
  const window = {
    devicePixelRatio: 1, innerHeight: 900, scrollY: 0,
    matchMedia(query) { return { matches: !query.includes('reduced-motion'), addEventListener() {} }; },
    addEventListener(name, handler) { windowHandlers.set(name, handler); },
  };
  const sandbox = {
    document, window, localStorage: { getItem() { return null; }, setItem() {} },
    MutationObserver: class { observe() {} },
    ResizeObserver: class { observe() {} },
    requestAnimationFrame(callback) { const id = ++nextFrame; pending.set(id, callback); return id; },
    cancelAnimationFrame(id) { pending.delete(id); },
  };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../motion.js'), 'utf8'), sandbox);
  function tick(timestamp) {
    const callbacks = [...pending.values()]; pending.clear();
    callbacks.forEach(callback => callback(timestamp));
  }
  function move(x = 350, y = 400) {
    const event = { clientX: x, clientY: y, pointerType: 'mouse', target: { closest() { return null; } } };
    stage.handlers.get('pointermove')(event);
    documentHandlers.get('pointermove')(event);
  }
  Object.assign(counters, { stageReads: 0, stageWrites: 0, draws: 0 });
  return { counters, tick, move, stage, toggle, pending, document, documentHandlers };
}

test('a burst of mouse events does not read or rewrite the animated stage on every event', () => {
  const scene = mountMotion();
  scene.tick(0);
  Object.assign(scene.counters, { stageReads: 0, stageWrites: 0 });
  for (let event = 0; event < 200; event++) scene.move(120 + event * 2, 180 + event);
  const beforeFrame = { ...scene.counters };
  scene.tick(1000 / 60);
  console.log('200 pointer events:', beforeFrame, 'after next frame:', scene.counters);
  assert.ok(beforeFrame.stageReads <= 1, 'mouse events repeatedly read a transforming element');
  assert.equal(beforeFrame.stageWrites, 0, 'mouse events should store targets, not invalidate styles');
  assert.ok(scene.counters.stageWrites <= 2, 'apply stage rotation once per frame');
});

test('the idle 30Hz canvas budget does not skip frames because of 60Hz timestamp rounding', () => {
  const scene = mountMotion();
  for (let frame = 0; frame <= 60; frame++) scene.tick(frame * 1000 / 60);
  console.log('Canvas redraws over one second at 60Hz:', scene.counters.draws);
  assert.ok(scene.counters.draws >= 28 && scene.counters.draws <= 31);
});

test('pausing clears queued pointer work and restarting creates a single scene loop', () => {
  const scene = mountMotion();
  scene.move(500, 200);
  scene.toggle.handlers.get('click')();
  Object.assign(scene.counters, { stageReads: 0, stageWrites: 0, draws: 0 });
  scene.tick(1000 / 60);
  assert.equal(scene.counters.stageWrites, 0);
  assert.equal(scene.counters.draws, 0);
  scene.toggle.handlers.get('click')();
  assert.equal(scene.pending.size, 1);
});

test('pointer interaction redraws on each 60Hz frame rather than using the idle budget', () => {
  const scene = mountMotion();
  scene.move(500, 200);
  for (let frame = 0; frame <= 60; frame++) scene.tick(frame * 1000 / 60);
  assert.ok(scene.counters.draws >= 58 && scene.counters.draws <= 60);
  assert.equal(scene.counters.stageReads, 0);
  assert.ok(scene.counters.stageWrites <= 122);
});
