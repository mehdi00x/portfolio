import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-cyber-background',
  standalone: true,
  template: `<canvas #canvas></canvas>`,
  styles: [`
    :host {
      display: block;
      position: absolute;
      inset: 0;
      z-index: 0;
      pointer-events: none;
    }
    canvas { width: 100%; height: 100%; display: block; }
  `],
})
export class CyberBackground implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private renderer!: THREE.WebGLRenderer;
  private animId = 0;
  private destroyed = false;
  private mouseMoveHandler!: (e: MouseEvent) => void;
  private resizeObs!: ResizeObserver;

  ngAfterViewInit() { this.init(); }

  private init() {
    const canvas = this.canvasRef.nativeElement;
    const W = canvas.clientWidth  || window.innerWidth;
    const H = canvas.clientHeight || window.innerHeight;

    // ── Scene ──────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x00070a);
    scene.fog = new THREE.FogExp2(0x00070a, 0.022);

    const camera = new THREE.PerspectiveCamera(52, W / H, 0.1, 120);
    camera.position.set(0, 11, 16);
    camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(W, H, false);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // ── Lighting ───────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x003311, 2.5));
    const blueLight = new THREE.PointLight(0x0044ff, 1.5, 20);
    blueLight.position.set(-8, 3, -5);
    scene.add(blueLight);

    const root = new THREE.Group();
    scene.add(root);

    // CPU/chip lives in its own group so it can be positioned and scaled
    // independently of the rest of the PCB scene (grid, IoT nodes, etc.) —
    // pushed right/back/down so it reads as a secondary background object
    // instead of colliding with the terminal card in the foreground.
    const cpuGroup = new THREE.Group();
    root.add(cpuGroup);

    // Light stays unscaled (added to root, not cpuGroup) and is repositioned
    // to track the CPU directly — nesting it in the scaled group would pull
    // it proportionally closer to the die and make the glow more intense,
    // the opposite of what we want here.
    const cpuLight = new THREE.PointLight(0x00ff41, 2.4, 14);
    root.add(cpuLight);

    // Responsive tiers — the centered terminal card (580px) eats up most of
    // the width on narrower viewports, so the CPU steps back/shrinks (or
    // hides outright) rather than fight the text for space.
    const CPU_LAYOUTS = {
      large:  { pos: [9.6, -0.6, -4.5] as [number, number, number], scale: 0.82 },
      medium: { pos: [8.2, -0.6, -5.4] as [number, number, number], scale: 0.55 },
    };
    const layoutCpu = (w: number) => {
      if (w < 900) {
        cpuGroup.visible = false;
        cpuLight.visible = false;
        return;
      }
      const layout = w < 1300 ? CPU_LAYOUTS.medium : CPU_LAYOUTS.large;
      cpuGroup.visible = true;
      cpuLight.visible = true;
      cpuGroup.position.set(...layout.pos);
      cpuGroup.scale.setScalar(layout.scale);
      cpuLight.position.set(layout.pos[0], layout.pos[1] + 4, layout.pos[2]);
    };
    layoutCpu(W);

    // ── Sprite helper ──────────────────────────────────────────────
    const makeSprite = (text: string, hexColor: string, fs = 13): THREE.Sprite => {
      const cv  = document.createElement('canvas');
      cv.width  = 256; cv.height = 48;
      const ctx = cv.getContext('2d')!;
      ctx.font  = `${fs}px monospace`;
      ctx.fillStyle = hexColor;
      ctx.fillText(text, 4, fs + 10);
      return new THREE.Sprite(
        new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(cv), transparent: true, opacity: 0.9 }),
      );
    };

    // ── PCB Motherboard ────────────────────────────────────────────
    const pcb = new THREE.Mesh(
      new THREE.BoxGeometry(26, 0.12, 20),
      new THREE.MeshPhongMaterial({ color: 0x002211, emissive: 0x000d08 }),
    );
    pcb.position.y = -0.7;
    root.add(pcb);

    const grid = new THREE.GridHelper(24, 24, 0x003a1a, 0x001f0e);
    grid.position.y = -0.63;
    (grid.material as THREE.Material).transparent = true;
    root.add(grid);

    // Copper vias
    for (let i = 0; i < 60; i++) {
      const via = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.14, 8),
        new THREE.MeshPhongMaterial({ color: 0xcc8833, emissive: 0x442200 }),
      );
      via.position.set((Math.random() - 0.5) * 22, -0.62, (Math.random() - 0.5) * 16);
      root.add(via);
    }

    // ── CPU Package ────────────────────────────────────────────────
    cpuGroup.add(new THREE.Mesh(
      new THREE.BoxGeometry(4.2, 0.28, 4.2),
      new THREE.MeshPhongMaterial({ color: 0x0f0f0f, emissive: 0x050505 }),
    ));

    const die = new THREE.Mesh(
      new THREE.BoxGeometry(3.2, 0.09, 3.2),
      new THREE.MeshPhongMaterial({ color: 0x111a22, emissive: 0x000810 }),
    );
    die.position.y = 0.17;
    cpuGroup.add(die);

    // CPU Cores (4×4 grid, centre 2×2 = cache)
    const coreObjs: { mat: THREE.MeshPhongMaterial; phase: number }[] = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const isCache = (i === 1 || i === 2) && (j === 1 || j === 2);
        const mat = new THREE.MeshPhongMaterial({
          color:    isCache ? 0x001533 : 0x002a14,
          emissive: new THREE.Color(0, 0, 0),
        });
        const core = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.06, 0.55), mat);
        core.position.set(-1.2 + i * 0.8, 0.24, -1.2 + j * 0.8);
        cpuGroup.add(core);
        if (!isCache) coreObjs.push({ mat, phase: Math.random() * Math.PI * 2 });
      }
    }

    // Gold pins
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        const pin = new THREE.Mesh(
          new THREE.CylinderGeometry(0.028, 0.028, 0.18, 6),
          new THREE.MeshPhongMaterial({ color: 0xddaa33, emissive: 0x332200 }),
        );
        pin.position.set(-1.5 + i * 0.5, -0.22, -1.5 + j * 0.5);
        cpuGroup.add(pin);
      }
    }

    // CPU labels
    const cpuLbl = makeSprite('Intel x86-64  |  amd64', '#00e5ff', 13);
    cpuLbl.scale.set(3.5, 0.55, 1);
    cpuLbl.position.set(0, 0.9, 2.4);
    cpuGroup.add(cpuLbl);

    const archLbl = makeSprite('Von Neumann · CISC · SSE4', '#005577', 11);
    archLbl.scale.set(3.2, 0.45, 1);
    archLbl.position.set(0, 0.55, 2.4);
    cpuGroup.add(archLbl);

    // ── Memory modules ─────────────────────────────────────────────
    ([
      { pos: [-3.0, 0,  0.3] as [number,number,number], label: 'L1 CACHE', w: 0.9, h: 0.55, d: 0.35, col: 0x001e2e },
      { pos: [ 3.0, 0,  0.3] as [number,number,number], label: 'L2 CACHE', w: 0.9, h: 0.55, d: 0.35, col: 0x001e2e },
      { pos: [   0, 0, -3.2] as [number,number,number], label: 'RAM',       w: 2.2, h: 0.55, d: 0.28, col: 0x00101e },
    ]).forEach(m => {
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(m.w, m.h, m.d),
        new THREE.MeshPhongMaterial({ color: m.col, emissive: 0x000508 }),
      );
      mesh.position.set(m.pos[0], m.pos[1], m.pos[2]);
      root.add(mesh);
      const sp = makeSprite(m.label, '#0088cc', 11);
      sp.scale.set(1.6, 0.38, 1);
      sp.position.set(m.pos[0], m.pos[1] + 0.55, m.pos[2]);
      root.add(sp);
    });

    // ── IoT / Embedded device nodes ────────────────────────────────
    const IOT = [
      { x:  6.5, z:  2.5, label: 'MCU — ATmega328', ledCol: 0x00ff41, textCol: '#00ff41', isVuln: false },
      { x: -6.0, z:  1.5, label: 'SENSOR — DHT22',  ledCol: 0x00e5ff, textCol: '#00e5ff', isVuln: false },
      { x:  5.0, z: -5.0, label: 'GPIO — Pi Zero',   ledCol: 0x00cc88, textCol: '#00cc88', isVuln: false },
      { x: -5.2, z: -4.5, label: 'VULN  CVE-2025',        ledCol: 0xff3333, textCol: '#ff4444', isVuln: true  },
      { x:  0.5, z:  7.0, label: 'UART — ESP32',     ledCol: 0x00ff41, textCol: '#00ff41', isVuln: false },
      { x:  7.5, z: -2.0, label: 'I2C  — EEPROM',    ledCol: 0xffaa00, textCol: '#ffaa00', isVuln: false },
      { x: -7.5, z: -2.0, label: 'SPI  — FLASH',     ledCol: 0x00e5ff, textCol: '#00e5ff', isVuln: false },
    ];

    const iotLeds: { mat: THREE.MeshBasicMaterial; phase: number; color: number; isVuln: boolean }[] = [];

    IOT.forEach(dev => {
      const grp = new THREE.Group();
      grp.position.set(dev.x, 0, dev.z);

      grp.add(new THREE.Mesh(
        new THREE.BoxGeometry(1.8, 0.07, 1.1),
        new THREE.MeshPhongMaterial({ color: 0x002714, emissive: 0x001008 }),
      ));

      const chip = new THREE.Mesh(
        new THREE.BoxGeometry(0.52, 0.07, 0.52),
        new THREE.MeshPhongMaterial({ color: 0x111111 }),
      );
      chip.position.set(-0.3, 0.07, 0);
      grp.add(chip);

      [-0.22, 0.22].forEach(dz => {
        const cap = new THREE.Mesh(
          new THREE.CylinderGeometry(0.055, 0.055, 0.13, 8),
          new THREE.MeshPhongMaterial({ color: 0x334400 }),
        );
        cap.position.set(0.55, 0.1, dz);
        grp.add(cap);
      });

      if (!dev.isVuln) {
        const ant = new THREE.Mesh(
          new THREE.CylinderGeometry(0.015, 0.015, 0.6, 6),
          new THREE.MeshPhongMaterial({ color: 0xaaaaaa }),
        );
        ant.position.set(0.75, 0.38, -0.38);
        grp.add(ant);
      }

      const ledMat = new THREE.MeshBasicMaterial({ color: dev.ledCol });
      const led    = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), ledMat);
      led.position.set(0.68, 0.1, 0.35);
      grp.add(led);
      iotLeds.push({ mat: ledMat, phase: Math.random() * Math.PI * 2, color: dev.ledCol, isVuln: dev.isVuln });

      const sp = makeSprite(dev.label, dev.textCol, 12);
      sp.scale.set(2.0, 0.4, 1);
      sp.position.set(0, 0.6, 0);
      grp.add(sp);

      root.add(grp);
    });

    // ── Copper traces + data packets ───────────────────────────────
    const packets: { pkt: THREE.Mesh; pts: THREE.Vector3[]; t: number; speed: number; dir: number }[] = [];

    const lerpPath = (pts: THREE.Vector3[], t: number): THREE.Vector3 => {
      if (t <= 0) return pts[0].clone();
      if (t >= 1) return pts[pts.length - 1].clone();
      const s   = t * (pts.length - 1);
      const idx = Math.floor(s);
      return new THREE.Vector3().lerpVectors(pts[idx], pts[idx + 1], s - idx);
    };

    IOT.forEach(dev => {
      const sx = Math.sign(dev.x) * 2;
      const waypoints = [
        new THREE.Vector3(0,           -0.63, 0),
        new THREE.Vector3(sx,          -0.63, 0),
        new THREE.Vector3(sx,          -0.63, dev.z * 0.5),
        new THREE.Vector3(dev.x * 0.7, -0.63, dev.z * 0.7),
        new THREE.Vector3(dev.x,       -0.63, dev.z),
      ];

      root.add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(waypoints),
        new THREE.LineBasicMaterial({ color: dev.isVuln ? 0xff4422 : 0xbb7722, transparent: true, opacity: 0.55 }),
      ));
      root.add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(waypoints),
        new THREE.LineBasicMaterial({ color: dev.isVuln ? 0xff2200 : 0x00ff41, transparent: true, opacity: 0.12 }),
      ));

      const pkt = new THREE.Mesh(
        new THREE.SphereGeometry(0.065, 7, 7),
        new THREE.MeshBasicMaterial({ color: dev.isVuln ? 0xff3300 : 0x00ff88 }),
      );
      root.add(pkt);
      packets.push({ pkt, pts: waypoints, t: Math.random(), speed: 0.004 + Math.random() * 0.006, dir: 1 });
    });

    // ── Floating ASM / low-level labels ───────────────────────────
    const ASM = [
      { text: 'MOV RAX, RBP',          col: '#00ff41' },
      { text: 'PUSH RBP',              col: '#00ff41' },
      { text: 'SYSCALL',               col: '#00e5ff' },
      { text: 'XOR EAX, EAX',         col: '#00ff41' },
      { text: 'JMP 0x4011a0',          col: '#ffaa00' },
      { text: 'NOP',                   col: '#005533' },
      { text: 'POP RSP',               col: '#00ff41' },
      { text: 'INT 0x80',              col: '#00e5ff' },
      { text: 'LEA RDI,[RIP+0x1f]',    col: '#00ff41' },
      { text: 'CALL 0x401050',         col: '#ffaa00' },
      { text: 'RET',                   col: '#00ff41' },
      { text: '0xDEADBEEF',            col: '#ff6644' },
      { text: '0x7FFE0000',            col: '#ff6644' },
      { text: 'CVE-2025-47812',        col: '#ff3333' },
      { text: '/bin/sh\\0',            col: '#ff4444' },
      { text: 'socket() syscall=41',   col: '#00cc88' },
      { text: 'bind() → 0.0.0.0:80', col: '#00cc88' },
      { text: 'ld → libc.so.6',      col: '#00aaff' },
    ];

    const asmSprites: THREE.Sprite[] = [];
    ASM.forEach((a, i) => {
      const angle  = (i / ASM.length) * Math.PI * 2;
      const radius = 8.5 + Math.random() * 3.5;
      const y      = -0.2 + Math.random() * 4.5;
      const sp     = makeSprite(a.text, a.col, 12);
      sp.scale.set(2.5, 0.45, 1);
      sp.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      sp.userData['angle']    = angle;
      sp.userData['radius']   = radius;
      sp.userData['y']        = y;
      sp.userData['rotSpeed'] = (Math.random() - 0.5) * 0.004;
      root.add(sp);
      asmSprites.push(sp);
    });

    // ── Register display panel ─────────────────────────────────────
    const REGS = [
      'RAX: 0x0000000000000000',
      'RBX: 0x00007FFE0034B2C0',
      'RIP: 0x0000000000401050',
      'RSP: 0x00007FFF5A3D6B80',
      'RDI: 0xDEADBEEFCAFEBABE',
      'CS:  0x0033  SS: 0x002b',
    ];
    REGS.forEach((r, i) => {
      const col = r.includes('RIP') ? '#ff8844'
        : r.startsWith('RAX') ? '#444444' : '#00bb55';
      const sp = makeSprite(r, col, 11);
      sp.scale.set(3.0, 0.42, 1);
      sp.position.set(-10, 4.5 - i * 0.62, -2);
      root.add(sp);
    });
    const panelLbl = makeSprite('── REGISTERS ──', '#005533', 11);
    panelLbl.scale.set(2.2, 0.38, 1);
    panelLbl.position.set(-10, 4.9 + 0.3, -2);
    root.add(panelLbl);


    // ── Motion preference ──────────────────────────────────────────
    // Respect prefers-reduced-motion: freeze camera orbit + parallax and
    // hold a static, readable composition. Also skip parallax on touch /
    // small screens where it does nothing but cost battery.
    const reducedMotion =
      typeof matchMedia !== 'undefined' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches;
    const enableParallax = !reducedMotion && W >= 900;

    // ── Mouse parallax ─────────────────────────────────────────────
    let mxRaw = 0, myRaw = 0, camX = 0, camY = 0;
    this.mouseMoveHandler = (e: MouseEvent) => {
      mxRaw = (e.clientX / window.innerWidth  - 0.5) * 2;
      myRaw = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (enableParallax) {
      document.addEventListener('mousemove', this.mouseMoveHandler);
    }

    // ── Resize ─────────────────────────────────────────────────────
    this.resizeObs = new ResizeObserver(() => {
      const c = this.canvasRef.nativeElement;
      const w = c.clientWidth, h = c.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      this.renderer.setSize(w, h, false);
      layoutCpu(w);
    });
    this.resizeObs.observe(canvas);

    // ── Animate ────────────────────────────────────────────────────
    let tick = 0;
    const animate = () => {
      if (this.destroyed) return;
      this.animId = requestAnimationFrame(animate);
      tick++;
      const t = tick * 0.016;

      // Slow orbit + mouse parallax — frozen when reduced motion is on.
      camX += (mxRaw * 3 - camX) * 0.03;
      camY += (-myRaw * 2 - camY) * 0.03;
      const orbitAngle = reducedMotion ? 0 : t * 0.055;
      camera.position.x = Math.sin(orbitAngle) * 5 + camX;
      camera.position.z = 14 + Math.cos(orbitAngle) * 3;
      camera.position.y = 10 + camY;
      camera.lookAt(0, 0.5, 0);

      // Pulse CPU cores (slightly dimmer — CPU is now a secondary element)
      coreObjs.forEach(c => {
        const load = 0.35 + 0.65 * Math.abs(Math.sin(t * 2.5 + c.phase));
        c.mat.emissive.setRGB(0, load * 0.23, load * 0.065);
      });

      // CPU glow heartbeat
      cpuLight.intensity = 1.6 + Math.sin(t * 3) * 0.65;
      cpuLight.color.setRGB(0, 0.8 + Math.sin(t * 3) * 0.2, 0.15);

      // IoT LED blink
      iotLeds.forEach(led => {
        const blink = led.isVuln
          ? (Math.sin(t * 8 + led.phase) > 0 ? 1 : 0.05)
          : 0.3 + 0.7 * Math.abs(Math.sin(t * 1.5 + led.phase));
        const c = new THREE.Color(led.color);
        c.multiplyScalar(blink);
        led.mat.color.copy(c);
      });

      // Move trace packets
      packets.forEach(p => {
        p.t += p.speed * p.dir;
        if (p.t >= 1) { p.t = 1; p.dir = -1; }
        if (p.t <= 0) { p.t = 0; p.dir =  1; }
        p.pkt.position.copy(lerpPath(p.pts, p.t));
        p.pkt.scale.setScalar(0.9 + 0.4 * Math.sin(t * 10 + p.t * 6));
      });

      // Orbit ASM labels
      asmSprites.forEach(sp => {
        sp.userData['angle'] += sp.userData['rotSpeed'];
        sp.position.x = Math.cos(sp.userData['angle']) * sp.userData['radius'];
        sp.position.z = Math.sin(sp.userData['angle']) * sp.userData['radius'];
        sp.position.y = sp.userData['y'] + Math.sin(t * 0.4 + sp.userData['angle']) * 0.3;
      });

      // PCB subtle pulse
      (grid.material as THREE.Material).opacity = 0.6 + 0.15 * Math.sin(t * 0.5);

      this.renderer.render(scene, camera);
    };
    animate();
  }

  ngOnDestroy() {
    this.destroyed = true;
    cancelAnimationFrame(this.animId);
    document.removeEventListener('mousemove', this.mouseMoveHandler);
    this.resizeObs?.disconnect();
    this.renderer?.dispose();
  }
}
