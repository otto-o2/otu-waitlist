"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface BurnOverlayProps {
  triggered: boolean;
  onComplete: () => void;
}

export default function BurnOverlay({ triggered, onComplete }: BurnOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const bufferRef = useRef<WebGLBuffer | null>(null);
  const rafRef = useRef<number>(0);
  const progressRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  const [visible, setVisible] = useState(true);

  const DURATION = 1800;

  const VS = `
    attribute vec2 a_position;
    varying vec2 v_uv;
    void main() {
      v_uv = 0.5 * (a_position + 1.0);
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  const FS = `
    precision mediump float;
    varying vec2 v_uv;
    uniform float u_progress;
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec3 u_color;
    uniform vec3 u_fire_color;

    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }
    float noise(vec2 st) {
      vec2 i = floor(st); vec2 f = fract(st);
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
    }
    float fbm(vec2 st) {
      float v = 0.0; float a = 0.5;
      for (int i = 0; i < 5; i++) {
        v += a * noise(st); st *= 2.0; a *= 0.5;
      }
      return v;
    }

    void main() {
      float aspect = u_resolution.x / u_resolution.y;
      float baseLine = -0.15 + u_progress * 1.45;

      vec2 noiseCoord = vec2(
        v_uv.x * aspect * 4.5 + u_time * 0.08,
        v_uv.y * 2.5 + u_time * 0.04
      );
      float edgeNoise = fbm(noiseCoord);
      float mainEdge = baseLine + (edgeNoise - 0.5) * 0.18;

      vec2 thickCoord = vec2(
        v_uv.x * aspect * 9.0 + u_time * 0.05,
        v_uv.y * 4.0 + u_time * 0.03 + 100.0
      );
      float thickNoise = fbm(thickCoord);
      float localThickness = mix(0.01, 0.09, thickNoise);

      float lowerBound = mainEdge - localThickness * 0.4;
      float upperBound = mainEdge + localThickness * 0.6;

      float grain = fbm(vec2(v_uv.x * aspect * 80.0 + u_time * 0.3, v_uv.y * 80.0 + u_time * 0.2));
      float fiber = noise(vec2(v_uv.x * aspect * 200.0 + u_time * 0.2, v_uv.y * 50.0 + u_time * 0.1));
      float combinedGrain = grain * 0.6 + fiber * 0.4;

      if (v_uv.y < lowerBound) {
        gl_FragColor = vec4(u_color, 1.0);
      } else if (v_uv.y < mainEdge) {
        float t = (v_uv.y - lowerBound) / max(mainEdge - lowerBound, 0.001);
        float grainThreshold = 1.0 - pow(t, 1.5) - thickNoise * 0.2;
        if (combinedGrain > grainThreshold) {
          gl_FragColor = vec4(u_fire_color, 1.0);
        } else {
          gl_FragColor = vec4(u_color, 1.0);
        }
      } else if (v_uv.y < upperBound) {
        float t = (v_uv.y - mainEdge) / max(upperBound - mainEdge, 0.001);
        float grainThreshold = pow(t, 1.2) - thickNoise * 0.15;
        if (combinedGrain > grainThreshold) {
          gl_FragColor = vec4(u_fire_color, 1.0 - t * 0.7);
        } else {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }
      } else {
        gl_FragColor = vec4(0.0);
      }
    }
  `;

  // FIX: wrap renderFrame in useCallback so it's stable and can be safely
  // referenced across multiple useEffect calls without stale closure issues
  const renderFrame = useCallback((
    gl: WebGLRenderingContext,
    prog: WebGLProgram,
    buf: WebGLBuffer,
    progress: number,
    time: number,
    w: number,
    h: number
  ) => {
    gl.viewport(0, 0, w, h);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);

    const pos = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    gl.uniform1f(gl.getUniformLocation(prog, "u_progress"), progress);
    gl.uniform1f(gl.getUniformLocation(prog, "u_time"), time);
    gl.uniform2f(gl.getUniformLocation(prog, "u_resolution"), w, h);
    gl.uniform3f(gl.getUniformLocation(prog, "u_color"), 0.039, 0.059, 0.039);
    gl.uniform3f(gl.getUniformLocation(prog, "u_fire_color"), 0.788, 0.416, 0.247);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }, []);

  // init WebGL
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false });
    if (!gl) return;
    glRef.current = gl;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const compileShader = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compileShader(gl.VERTEX_SHADER, VS));
    gl.attachShader(prog, compileShader(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(prog);
    programRef.current = prog;

    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    bufferRef.current = buf;

    renderFrame(gl, prog, buf, 0, 0, canvas.width, canvas.height);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [renderFrame]);

  // FIX: added onComplete to dependency array to prevent stale closure —
  // previously the animation could call an outdated version of onComplete
  // if the parent re-rendered before the animation finished
  useEffect(() => {
    if (!triggered) return;
    startTimeRef.current = null;

    const animate = (now: number) => {
      if (startTimeRef.current === null) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current;
      const rawProgress = Math.min(elapsed / DURATION, 1);
      const p =
        rawProgress < 0.5
          ? 4 * rawProgress * rawProgress * rawProgress
          : 1 - Math.pow(-2 * rawProgress + 2, 3) / 2;

      progressRef.current = p;

      const gl = glRef.current;
      const prog = programRef.current;
      const buf = bufferRef.current;
      const canvas = canvasRef.current;
      if (gl && prog && buf && canvas) {
        renderFrame(gl, prog, buf, p, elapsed / 1000, canvas.width, canvas.height);
      }

      if (rawProgress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setVisible(false);
          onComplete();
        }, 100);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [triggered, onComplete, renderFrame]);

  if (!visible) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 600,
        pointerEvents: triggered ? "none" : "auto",
      }}
    />
  );
}
