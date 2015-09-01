'use strict'

const createWhiteNoise = function (context) {
  const bufferSize = 2 * context.sampleRate
  const noiseBuffer = context.createBuffer(1, bufferSize, context.sampleRate)
  const output = noiseBuffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1
  }

  const whiteNoise = context.createBufferSource()
  whiteNoise.buffer = noiseBuffer
  whiteNoise.loop = true

  return whiteNoise
}

const context = new window.AudioContext()
let noise = null
let gain = null

const start = function () {
  if (noise != null && gain != null) {
    return
  }

  noise = createWhiteNoise(context)
  gain = context.createGain()
  gain.gain.value = 0.1

  noise.connect(gain)
  gain.connect(context.destination)
  noise.start()
}

const stop = function () {
  if (noise == null && gain == null) {
    return
  }

  noise.disconnect()
  gain.disconnect()
  noise.stop()

  noise = null
  gain = null
}

start()
setTimeout(stop, 10000)
