import jobs from '../../jobs.json' with { type: 'json' };
import crypto from 'crypto';
import { DEFAULTS } from '../../config.js';


export class JobModel {
    static async getAll({ location, text, level, technology, limit = DEFAULTS.LIMIT_PAGINATION, offset = DEFAULTS.LIMIT_OFFSET }) {
        let filteredJobs = jobs

        if (text) {
            const searchTerm = text.toLowerCase()
            filteredJobs = filteredJobs.filter(job =>
            job.titulo.toLowerCase().includes(searchTerm) ||
            job.descripcion.toLowerCase().includes(searchTerm)
            );
        }

        if (technology) {
            filteredJobs = filteredJobs.filter(job =>
            job.data.technology.includes(technology)
            );
        }

        if (location) {
            filteredJobs = filteredJobs.filter(job =>
            job.data.modalidad.toLowerCase().includes(location.toLowerCase())
            );
        }

        if (level) {
            filteredJobs = filteredJobs.filter(job =>
            job.data.nivel.toLowerCase().includes(level.toLowerCase())
            );
        }

        const limitNumber = Number(limit);
        const offsetNumber = Number(offset);

        if (isNaN(limitNumber) || isNaN(offsetNumber) || limitNumber < 0 || offsetNumber < 0) {
            return null;
        }

        const paginatedJobs = filteredJobs.slice(offsetNumber, offsetNumber + limitNumber);

        return {total: filteredJobs.length, data: paginatedJobs};
    }
    
    static async getById(id) {
        const job = jobs.find(job => job.id === id);
        if (!job) {
        return null;
    }
        return job;
    }


    static async create({ titulo, empresa, ubicacion, descripcion, data }) {
        if (!titulo || !descripcion || !data || !empresa || !ubicacion) {
            throw new Error('Missing required fields');
        }
        const newJob = {
            id: crypto.randomUUID(),
            titulo,
            empresa,
            ubicacion,
            descripcion,
            data
        };
        jobs.push(newJob);
        return newJob;
    }

    static async update(id, { titulo, empresa, ubicacion, descripcion, data }) {
        const jobIndex = jobs.findIndex(job => job.id === id);
        if (jobIndex === -1) {
            return null;
        }
        const updatedJob = {
            id,
            titulo,
            empresa,
            ubicacion,
            descripcion,
            data
        };
        jobs[jobIndex] = updatedJob;
        return updatedJob;
    }

    static async patch(id, { titulo, empresa, ubicacion, descripcion, data }) {
        const jobIndex = jobs.findIndex(job => job.id === id);
        if (jobIndex === -1) {
            return null;
        }
        const existingJob = jobs[jobIndex];
        const updatedJob = {
            id,
            titulo: titulo || existingJob.titulo,
            empresa: empresa || existingJob.empresa,
            ubicacion: ubicacion || existingJob.ubicacion,
            descripcion: descripcion || existingJob.descripcion,
            data: data || existingJob.data
        };
        jobs[jobIndex] = updatedJob;
        return updatedJob;
    }

    static async delete(id) {
        const jobIndex = jobs.findIndex(job => job.id === id);
        if (jobIndex === -1) {
            return null;
        }
        const deletedJob = jobs.splice(jobIndex, 1)[0];
        return deletedJob;
    }
}