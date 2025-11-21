#!/usr/bin/env node
import { execSync } from 'child_process'
import { readdirSync, statSync, existsSync, mkdirSync } from 'fs'
import { join, extname, basename } from 'path'

const ASSETS_DIR = './src/assets'
const OUTPUT_DIR = './src/assets'

// Configuración de optimización para web
const FFMPEG_OPTIONS = [
	'-c:v libx264', // Codec H.264 (compatible con todos los navegadores)
	'-crf 28', // Calidad (18-28, menor = mejor calidad pero más grande)
	'-preset medium', // Balance entre velocidad y compresión
	'-movflags +faststart', // Optimizado para streaming web
	'-vf scale=-2:720', // Escalar a 720p (mantiene aspect ratio)
	'-c:a aac', // Codec de audio AAC
	'-b:a 128k', // Bitrate de audio 128kbps
	'-ac 2', // Stereo
].join(' ')

function formatBytes(bytes) {
	if (bytes === 0) return '0 Bytes'
	const k = 1024
	const sizes = ['Bytes', 'KB', 'MB', 'GB']
	const i = Math.floor(Math.log(bytes) / Math.log(k))
	return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

function optimizeVideo(inputPath) {
	const ext = extname(inputPath)
	const name = basename(inputPath, ext)
	const outputPath = join(OUTPUT_DIR, `${name}-optimized${ext}`)

	console.log(`\n🎬 Optimizando: ${basename(inputPath)}`)

	const originalSize = statSync(inputPath).size
	console.log(`   Tamaño original: ${formatBytes(originalSize)}`)

	try {
		const command = `ffmpeg -i "${inputPath}" ${FFMPEG_OPTIONS} "${outputPath}" -y`
		console.log(`   Ejecutando FFmpeg...`)

		execSync(command, { stdio: 'inherit' })

		const optimizedSize = statSync(outputPath).size
		const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1)

		console.log(`   ✅ Tamaño optimizado: ${formatBytes(optimizedSize)}`)
		console.log(`   💾 Reducción: ${savings}%`)
		console.log(`   📁 Guardado en: ${outputPath}`)

		return { original: originalSize, optimized: optimizedSize, savings }
	} catch (error) {
		console.error(`   ❌ Error al optimizar: ${error.message}`)
		return null
	}
}

function main() {
	console.log('🎥 Optimizador de Videos para Web\n')
	console.log('Configuración:')
	console.log('  - Resolución: 720p')
	console.log('  - Codec: H.264 (CRF 28)')
	console.log('  - Audio: AAC 128kbps')
	console.log('  - Optimizado para streaming web\n')

	const files = readdirSync(ASSETS_DIR)
	const videoFiles = files.filter(file =>
		['.mp4', '.mov', '.avi', '.mkv'].includes(extname(file).toLowerCase())
	)

	if (videoFiles.length === 0) {
		console.log('❌ No se encontraron videos en', ASSETS_DIR)
		process.exit(1)
	}

	console.log(`📂 Encontrados ${videoFiles.length} video(s)\n`)

	let totalOriginal = 0
	let totalOptimized = 0
	let successCount = 0

	for (const file of videoFiles) {
		const inputPath = join(ASSETS_DIR, file)
		const result = optimizeVideo(inputPath)

		if (result) {
			totalOriginal += result.original
			totalOptimized += result.optimized
			successCount++
		}
	}

	if (successCount > 0) {
		const totalSavings = ((totalOriginal - totalOptimized) / totalOriginal * 100).toFixed(1)
		console.log('\n' + '='.repeat(50))
		console.log('📊 Resumen:')
		console.log(`   Videos procesados: ${successCount}/${videoFiles.length}`)
		console.log(`   Tamaño original total: ${formatBytes(totalOriginal)}`)
		console.log(`   Tamaño optimizado total: ${formatBytes(totalOptimized)}`)
		console.log(`   Reducción total: ${totalSavings}%`)
		console.log('='.repeat(50))
		console.log('\n⚠️  Recuerda actualizar las referencias en tu código')
		console.log('   Ejemplo: BOOZY2.mp4 → BOOZY2-optimized.mp4')
	}
}

main()
