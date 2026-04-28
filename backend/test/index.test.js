import {test, describe, before, after} from 'node:test'
import assert from 'node:assert'
import app from '../index.js'


let server
const PORT = 3456
const BASE_URL = `http://localhost:${PORT}`

before(async () => {
    return new Promise ((resolve, reject) => {
        server = app.listen(PORT, () => resolve())
        server.on('error', reject)
    })
})

after(async() => {
    return new Promise((resolve, reject) => {
        server.close(err => {
            if (err) reject(err)
            else resolve()
        })
    })
})

describe('GET /jobs', () => {
    test('debe responder con 200 y un array de trabajos', async () => {
        const response = await fetch(`${BASE_URL}/jobs`)
        assert.strictEqual(response.status, 200)
        const json = await response.json()
        assert.ok(Array.isArray(json.data), 'La respuesta debe ser un array')
    })

    test('debe filtrar trabajos por tecnologia', async () => {
        const tech  = 'react'
        const response = await fetch(`${BASE_URL}/jobs?technology=${tech}`)
        assert.strictEqual(response.status, 200)

        const json = await response.json()
        assert.ok(
            json.data.every(job => job.data.technology.includes(tech)),
            `Todos los trabajos deben ser de la tecnología ${tech}`
        )
    })

    test('debe filtrar trabajos por modalidad', async () => {
        const location = 'remoto'
        const response = await fetch(`${BASE_URL}/jobs?location=${location}`)
        assert.strictEqual(response.status, 200)
        const json = await response.json()
        assert.ok(
            json.data.every(job => job.data.modalidad.toLowerCase().includes(location)),
            `Todos los trabajos deben ser de la modalidad ${location}`
        )
    })

    test('debe filtrar trabajos por nivel', async () => {
        const level = 'junior'
        const response = await fetch(`${BASE_URL}/jobs?level=${level}`)
        assert.strictEqual(response.status, 200)
        const json = await response.json()
        assert.ok(
            json.data.every(job => job.data.nivel.toLowerCase().includes(level)),
            `Todos los trabajos deben ser de nivel ${level}`
        )
    })

    test('debe paginar resultados con limit y offset', async () => {
        const limit = 2
        const offset = 1
        const response = await fetch(`${BASE_URL}/jobs?limit=${limit}&offset=${offset}`)
        assert.strictEqual(response.status, 200)

        const json = await response.json()
        assert.strictEqual(json.limit, limit)
        assert.strictEqual(json.offset, offset)
        assert.ok(
            json.data.length === limit,
            'La cantidad de trabajos debe coincidir con el límite'
        )
    })

    test('debe responder con 400 para parámetros inválidos', async () => {
        const response = await fetch(`${BASE_URL}/jobs?limit=-1`)
        assert.strictEqual(response.status, 400)
    })
})

describe('GET /jobs/:id', () => {
    test('debe responder con 200 y el trabajo correspondiente', async () => {
        const response = await fetch(`${BASE_URL}/jobs`)
        const json = await response.json()
        const jobId = json.data[0].id

        const jobResponse = await fetch(`${BASE_URL}/jobs/${jobId}`)
        assert.strictEqual(jobResponse.status, 200)

        const jobJson = await jobResponse.json()
        assert.strictEqual(jobJson.id, jobId)
    })

    test('debe responder con 404 para un ID no existente', async () => {
        const response = await fetch(`${BASE_URL}/jobs/nonexistent-id`)
        assert.strictEqual(response.status, 404)
    })
})

describe('POST /jobs', () => {
    test('debe crear un nuevo trabajo y responder con 201', async () => {
        const newJob = {
            id: crypto.randomUUID(),
            titulo: 'Desarrollador Backend',
            empresa: 'Tech Company',
            ubicacion: 'Remoto',
            descripcion: 'Se busca desarrollador backend con experiencia en Node.js',
            data: {
                technology: ['nodejs', 'express'],
                modalidad: 'remoto',
                nivel: 'senior'
            },
            content: {
                description: 'Responsabilidades del puesto',
                responsibilities: 'Desarrollo de APIs, integración con bases de datos', 
                requirements: 'Experiencia mínima de 5 años en desarrollo backend',
                about: 'Únete a nuestro equipo de tecnología en crecimiento'
            }
        }

        const response = await fetch(`${BASE_URL}/jobs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newJob)
        })

        assert.strictEqual(response.status, 201)
        const json = await response.json()
        assert.strictEqual(json.titulo, newJob.titulo)
        assert.strictEqual(json.empresa, newJob.empresa)
        assert.strictEqual(json.ubicacion, newJob.ubicacion)
        assert.strictEqual(json.descripcion, newJob.descripcion)
        assert.deepStrictEqual(json.data, newJob.data) 
    })
})

describe('PATCH /jobs/:id', () => {
    test('debe actualizar parcialmente un trabajo existente', async () => {
        const response = await fetch(`${BASE_URL}/jobs`)
        const json = await response.json()
        const jobId = json.data[0].id

        const patchData = {
            titulo: 'Desarrollador Backend Senior',
            data: {
                nivel: 'senior'
            }
        }

        const patchResponse = await fetch(`${BASE_URL}/jobs/${jobId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patchData)
        })

        assert.strictEqual(patchResponse.status, 200)
        const patchedJob = await patchResponse.json()
        assert.strictEqual(patchedJob.titulo, patchData.titulo)
        assert.strictEqual(patchedJob.data.nivel, patchData.data.nivel)
    })

    test('debe responder con 404 para un ID no existente', async () => {
        const patchData = {
            titulo: 'Desarrollador Backend Senior',
            data: {
                nivel: 'senior'
            }
        }

        const patchResponse = await fetch(`${BASE_URL}/jobs/nonexistent-id`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patchData)
        })

        assert.strictEqual(patchResponse.status, 404)
    })
})

describe('DELETE /jobs/:id', () => {
    test('debe eliminar un trabajo existente', async () => {
        const response = await fetch(`${BASE_URL}/jobs`)
        const json = await response.json()
        const jobId = json.data[0].id

        const deleteResponse = await fetch(`${BASE_URL}/jobs/${jobId}`, {
            method: 'DELETE'
        })

        assert.strictEqual(deleteResponse.status, 200)
        const deletedJob = await deleteResponse.json()
        assert.strictEqual(deletedJob.id, jobId)
    })

    test('debe responder con 404 para un ID no existente', async () => {
        const deleteResponse = await fetch(`${BASE_URL}/jobs/nonexistent-id`, {
            method: 'DELETE'
        })

        assert.strictEqual(deleteResponse.status, 404)
    })
})