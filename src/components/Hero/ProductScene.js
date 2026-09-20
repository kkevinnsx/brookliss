"use client"

import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js"

// Brookliss Blue — 07_COLOR_SYSTEM.md
const BROOKLISS_BLUE = 0x015c91

// Files inside /public are served from the domain root — never include
// "public" in the path, and never use a relative "../" path here.
const GLB_PATH = "/models/brookliss_matizador_300ml_ft.glb"

/**
 * Vanilla Three.js scene for the Hero section.
 * Follows 16_THREEJS_DIRECTION.md: one Hero Object, cinematic camera,
 * believable PBR materials, continuous but almost imperceptible motion.
 */
export default class ProductScene {
  constructor(container, { onReady, onError } = {}) {
    this.container = container
    this.onReady = onReady
    this.onError = onError
    this.reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    this.clock = new THREE.Clock()
    this.mouse = { x: 0, y: 0 }
    this.targetMouse = { x: 0, y: 0 }
    this.droplets = []
    this.disposed = false
    this.orbRadius = 1.2 // placeholder until the real bottle size is known
    this.bottleBaseY = -0.35
    this.productOffset = {
      x: 0,
      y: 1.15,
      z: 0.55
    }
    this.sceneFocus = new THREE.Vector3()
    this.baseDistance = 9

    this._onResize = this._onResize.bind(this)
    this._animate = this._animate.bind(this)
    this.cameraFitRadius = this.orbRadius
    this._init()
  }

  _init() {
    const { clientWidth: w, clientHeight: h } = this.container

    // Renderer. IMPORTANT: transmission materials (the glass orb) need to
    // render what is *behind* them into a texture. With alpha:true and no
    // scene.background, there is nothing to sample and the sphere renders
    // as a flat opaque disc instead of glass. So: solid clear color + a
    // matching scene.background, both white (identical to the page, so
    // nothing visually changes — it just makes the physics correct).
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setClearColor(0xffffff, 0)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(w, h)
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.0
    this.container.appendChild(this.renderer.domElement)

    this.scene = new THREE.Scene()
    this.scene.background = null

    this.camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 100)
    this.camera.position.set(0, 0.05, this.baseDistance)

    // Soft studio environment for believable reflections — no external HDR needed
    const pmrem = new THREE.PMREMGenerator(this.renderer)
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.08).texture
    pmrem.dispose()

    this._buildLights()
    this._buildOrb(this.orbRadius)
    this._buildGroundShadow()
    this._loadBottle()

    window.addEventListener("resize", this._onResize)
    this._onResize()

    this._raf = requestAnimationFrame(this._animate)
  }

  // 13_LIGHTING_SYSTEM.md hierarchy: ambient -> key -> fill -> accent
  // Accent stays subtle — a rim/brand touch, never the primary light.
  _buildLights() {
    const ambient = new THREE.HemisphereLight(0xffffff, 0xd9e8f0, 0.9)
    this.scene.add(ambient)

    const key = new THREE.DirectionalLight(0xffffff, 1.1) // ~45°/35°
    key.position.set(3.5, 4.5, 5)
    this.scene.add(key)

    const fill = new THREE.DirectionalLight(0xffffff, 0.45) // never equals key
    fill.position.set(-4, 1.5, 3)
    this.scene.add(fill)

    const rim = new THREE.DirectionalLight(0x75c6ed, 0.85)
    rim.position.set(-3, 2, -2)
    this.scene.add(rim)

    const accent = new THREE.PointLight(BROOKLISS_BLUE, 0.5, 10)
    accent.position.set(-2.2, 0.6, 3)
    this.scene.add(accent)
  }

  // Material: "Glass" — 12_MATERIAL_SYSTEM.md. Radius is provisional here
  // _fitToBottle() rebuilds this geometry once the real bottle size is known.
  _buildOrb(radius) {
    const geo = new THREE.TorusGeometry(radius, radius * 0.012, 20, 120)
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0xcff7ff,
      roughness: 0.025,
      metalness: 0.25,
      transmission: 1.80,
      thickness: radius * 0.12,
      ior: 1.33,
      clearcoat: 1,
      clearcoatRoughness: 0.04,
      transparent: true,
      opacity: 0.5,
      envMapIntensity: 1.7,
      depthWrite: false,
    })
    this.orb = new THREE.Mesh(geo, mat)
    this.orb.rotation.z = -0.08
    this.orb.position.z = 0.8
    this.orb.renderOrder = 1
    this.scene.add(this.orb)
  }

  // Material: "Liquid Light" droplets, positioned relative to the real orb radius.
  _buildDroplets(orbRadius) {
    this.droplets.forEach((d) => this.scene.remove(d))
    this.droplets = []

    const geo = new THREE.SphereGeometry(1, 16, 16)
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0xd9f9ff,
      roughness: 0.015,
      transmission: 1.80,
      thickness: 0.18,
      ior: 1.33,
      clearcoat: 1,
      clearcoatRoughness: 0.02,
      transparent: true,
      opacity: 0.68,
      envMapIntensity: 1.8,
      depthWrite: false,
    })

    const droplets = [
      { x: -0.8, y: 0.85, z: 0.96, scale: 0.075 },
      { x: 0.83, y: 0.65, z: 0.98, scale: 0.055 },
      { x: 0.62, y: 1.50, z: 0.94, scale: 0.045 },
      { x: 0.70, y: 0.20, z: 0.94, scale: 0.045 },
      { x: -0.58, y: 0.25, z: 0.92, scale: 0.035 },
      { x: -0.50, y: 0.33, z: 0.92, scale: 0.035 },
    ]

    droplets.forEach((config, index) => {
      const drop = new THREE.Mesh(geo, mat)
      drop.scale.setScalar(orbRadius * config.scale)
      drop.position.set(
        orbRadius * config.x,
        orbRadius * config.y,
        orbRadius * config.z
      )
      drop.userData.phase = index * 1.7
      drop.userData.baseY = drop.position.y
      drop.renderOrder = 2

      this.scene.add(drop)
      this.droplets.push(drop)
    })
  }

  // Soft contact shadow so the orb reads as grounded, not floating in a void
  _buildGroundShadow() {
    const size = 512
    const canvas = document.createElement("canvas")
    canvas.width = canvas.height = size
    const ctx = canvas.getContext("2d")
    const gradient = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    )
    gradient.addColorStop(0, "rgba(3, 48, 99, 0.16)")
    gradient.addColorStop(1, "rgba(4, 12, 173, 0)")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)

    const texture = new THREE.CanvasTexture(canvas)
    const geo = new THREE.PlaneGeometry(1, 1)
    const mat = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
    })
    this.groundShadow = new THREE.Mesh(geo, mat)
    this.groundShadow.rotation.x = -Math.PI / 2
    this.scene.add(this.groundShadow)
  }

  _loadBottle() {
    const loader = new GLTFLoader()
    loader.load(
      GLB_PATH,
      (gltf) => {
        if (this.disposed) return
        this.bottle = gltf.scene
        this.bottle.traverse((obj) => {
          if (!obj.isMesh) return

          obj.renderOrder = 20

          if (obj.material) {
            obj.material.depthWrite = true
            obj.material.depthTest = true
          }
        })
        this._fitToBottle()
        this.scene.add(this.bottle)
        this.onReady?.()
      },
      undefined,
      (err) => {
        console.error(
          `Brookliss bottle failed to load from "${GLB_PATH}". ` +
          `Confirm the file exists at public/models/brookliss_matizador_300ml_ft.glb`,
          err
        )
        this.onError?.(err)
      }
    )
  }

  // Normalizes the bottle, then sizes the orb/droplets/camera around its
  // REAL measured dimensions instead of an assumed constant — this is what
  // was causing the cropped framing.
  _fitToBottle() {
    const rawBox = new THREE.Box3().setFromObject(this.bottle)
    const rawSize = new THREE.Vector3()
    rawBox.getSize(rawSize)
    const rawCenter = new THREE.Vector3()
    rawBox.getCenter(rawCenter)

    // The product is the hero, so it occupies most of the composition.
    const targetHeight = 3.15
    const scale = targetHeight / rawSize.y
    this.bottle.scale.setScalar(scale)
    this.bottle.position.sub(rawCenter.clone().multiplyScalar(scale))
    this.bottle.updateMatrixWorld(true)

    // Rotate around the product's actual center, then measure the final
    // footprint. This keeps the ring centered around the bottle, not around
    // an arbitrary GLB origin.
    this.bottle.rotation.z = -0.18
    this.bottle.updateMatrixWorld(true)
    const framedBox = new THREE.Box3().setFromObject(this.bottle)
    const framedCenter = new THREE.Vector3()
    framedBox.getCenter(framedCenter)
    this.bottle.position.sub(framedCenter)
    this.bottle.position.x += this.productOffset.x
    this.bottle.position.y += this.productOffset.y
    this.bottle.position.z += this.productOffset.z
    this.bottle.updateMatrixWorld(true)

    const box = new THREE.Box3().setFromObject(this.bottle)
    const size = new THREE.Vector3()
    const diagonalRadius = size.length() / 2
    this.cameraFitRadius = Math.max(this.orbRadius, diagonalRadius) * 1.08
    box.getSize(size)
    box.getCenter(this.sceneFocus)
    this.orbRadius = size.y * 0.42

    // Rebuild the glass rim at the measured product scale.
    this.orb.geometry.dispose()
    this.orb.geometry = new THREE.TorusGeometry(
      this.orbRadius,
      this.orbRadius * 0.020,
      20,
      250
    )
    this.orb.position.set(
      0,
      1.15,
      1.1
    )
    this._buildDroplets(this.orbRadius)

    this.groundShadow.scale.setScalar(this.orbRadius * 2.4)
    this.groundShadow.position.set(
      this.sceneFocus.x,
      box.min.y - 0.1,
      this.sceneFocus.z
    )

    this._fitCamera()
  }

  // Places the camera so the whole orb is always visible, regardless of
  // the GLB's real-world scale or the container's aspect ratio.
  _fitCamera() {
    const { clientWidth: w, clientHeight: h } = this.container
    const aspect = w / Math.max(h, 1)
    const vFovRad = THREE.MathUtils.degToRad(this.camera.fov)
    const hFovRad = 2 * Math.atan(Math.tan(vFovRad / 2) * aspect)
    const limitingFov = Math.min(vFovRad, hFovRad)

    const margin = 1.28
    this.baseDistance =
      (this.orbRadius / Math.sin(limitingFov / 2)) * margin

    this.camera.near = this.baseDistance / 50
    this.camera.far = this.baseDistance * 10
    this.camera.position.set(
      this.sceneFocus.x,
      this.sceneFocus.y,
      this.sceneFocus.z + this.baseDistance
    )
    this.camera.lookAt(this.sceneFocus)
    this.camera.updateProjectionMatrix()
  }

  /** nx, ny expected normalized in [-1, 1] — called from the React component's onMouseMove */
  onMouseMove(nx, ny) {
    this.targetMouse.x = nx
    this.targetMouse.y = ny
  }

  _onResize() {
    const { clientWidth: w, clientHeight: h } = this.container
    if (!w || !h) return
    this.camera.aspect = w / h
    this.renderer.setSize(w, h)
    this._fitCamera()
  }

  _animate() {
    if (this.disposed) return
    const t = this.clock.getElapsedTime()

    this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.08
    this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.08

    if (!this.reducedMotion) {
      // ANTES
      this.camera.position.x = this.sceneFocus.x
      this.camera.position.y = this.sceneFocus.y
      this.camera.position.z = this.sceneFocus.z + this.baseDistance
      this.camera.lookAt(this.sceneFocus)

      this.orb.rotation.z =
        this.mouse.x * 0.03

      this.orb.rotation.x =
        this.mouse.y * 0.02
        
      if (this.bottle) {
        this.bottle.rotation.y =
          -0.18 +
          this.mouse.x * 0.10
        this.bottle.rotation.x =
          this.mouse.y * 0.08
        this.bottle.position.y = this.bottleBaseY + Math.sin(t * 0.65) * this.orbRadius * 0.018
      }

      this.droplets.forEach((drop) => {
        drop.position.y =
          drop.userData.baseY +
          Math.sin(t * 0.45 + drop.userData.phase) * this.orbRadius * 0.025
        drop.rotation.y = t * 0.08
      })
    } else {
      this.camera.lookAt(0, 0, 0)
    }

    this.renderer.render(this.scene, this.camera)
    this._raf = requestAnimationFrame(this._animate)
  }

  destroy() {
    this.disposed = true
    cancelAnimationFrame(this._raf)
    window.removeEventListener("resize", this._onResize)

    this.scene.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose()
      if (obj.material) {
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
        mats.forEach((m) => {
          if (m.map) m.map.dispose()
          m.dispose()
        })
      }
    })

    this.renderer.dispose()
    if (this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement)
    }
  }
}
