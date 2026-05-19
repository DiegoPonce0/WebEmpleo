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
    test('should respond with 200 and an array of jobs', async () => {
        const response = await fetch(`${BASE_URL}/jobs`)
        assert.strictEqual(response.status, 200)
        const json = await response.json()
        assert.ok(Array.isArray(json.data), 'The response should be an array')
    })

    test('should filter jobs by technology', async () => {
        const tech  = 'react'
        const response = await fetch(`${BASE_URL}/jobs?technology=${tech}`)
        assert.strictEqual(response.status, 200)

        const json = await response.json()
        assert.ok(
            json.data.every(job => job.data.technology.includes(tech)),
            `All jobs must be of the technology ${tech}`
        )
    })

    test('should filter jobs by location', async () => {
        const location = 'remoto'
        const response = await fetch(`${BASE_URL}/jobs?location=${location}`)
        assert.strictEqual(response.status, 200)
        const json = await response.json()
        assert.ok(
            json.data.every(job => job.data.modalidad.toLowerCase().includes(location)),
            `All jobs must be of the location ${location}`
        )
    })

    test('should filter jobs by level', async () => {
        const level = 'junior'
        const response = await fetch(`${BASE_URL}/jobs?level=${level}`)
        assert.strictEqual(response.status, 200)
        const json = await response.json()
        assert.ok(
            json.data.every(job => job.data.nivel.toLowerCase().includes(level)),
            `All jobs must be of the level ${level}`
        )
    })

    test('should paginate results with limit and offset', async () => {
        const limit = 2
        const offset = 1
        const response = await fetch(`${BASE_URL}/jobs?limit=${limit}&offset=${offset}`)
        assert.strictEqual(response.status, 200)

        const json = await response.json()
        assert.strictEqual(json.limit, limit)
        assert.strictEqual(json.offset, offset)
        assert.ok(
            json.data.length === limit,
            'The number of jobs must match the limit'
        )
    })

    test('should respond with 400 for invalid parameters', async () => {
        const response = await fetch(`${BASE_URL}/jobs?limit=-1`)
        assert.strictEqual(response.status, 400)
    })
})

describe('GET /jobs/:id', () => {
    test('should respond with 200 and the corresponding job', async () => {
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
    test('should create a new job and respond with 201', async () => {
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
                responsibilities: 'API development, integration with databases', 
                requirements: 'Minimum 5 years experience in backend development',
                about: 'Join our growing technology team'
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
    test('should update an existing job', async () => {
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

    test('should respond with 404 for a non-existent ID', async () => {
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
    test('should delete an existing job', async () => {
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

    test('should respond with 404 for a non-existent ID', async () => {
        const deleteResponse = await fetch(`${BASE_URL}/jobs/nonexistent-id`, {
            method: 'DELETE'
        })

        assert.strictEqual(deleteResponse.status, 404)
    })
})