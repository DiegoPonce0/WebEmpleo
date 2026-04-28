import { DEFAULTS } from '../config.js';

export class JobController {
 
    constructor({jobModel}) {
        this.jobModel = jobModel
    }

    getAll = async (req, res) => {
        const { location, text, level, technology, limit = DEFAULTS.LIMIT_PAGINATION, offset = DEFAULTS.LIMIT_OFFSET } = req.query

        const results = await this.jobModel.getAll({ location, text, level, technology, limit, offset });

        const limitNumber = Number(limit);
        const offsetNumber = Number(offset);

        if (results === null) {
            return res.status(400).json({ error: 'Invalid limit or offset' });
        }

        return res.json({ 
            total: results.total, 
            limit: limitNumber, 
            offset: offsetNumber,
            data: results.data 
        });
    }

    getById = async (req, res) => {
      const { id } = req.params;
        const job = await this.jobModel.getById(id);
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        return res.json(job);
    }

    create = async (req, res) => {
     const { title, company, location, description, data, content} = req.body;
        
     const newJob = await this.jobModel.create({ 
        title, 
        company, 
        location, 
        short_description: description, 
        technology: data?.technology, 
        modality: data?.modality, 
        level: data?.level, 
        full_description: content?.description, 
        responsibilities: content?.responsibilities, 
        requirements: content?.requirements, 
        about: content?.about 
    });

      return res.status(201).json(newJob);
    }

    update = async (req, res) => {
        const { id } = req.params;
        const { title, company, location, description, data } = req.body;

        const updatedJob = await this.jobModel.update(id, { title, company, location, description, data });
        
        if (!updatedJob) {
            return res.status(404).json({ error: 'Job not found' });
        }
        return res.json(updatedJob);
    }

    patch = async (req, res) => {
        const { id } = req.params;
        const { title, company, location, description, data } = req.body;

        const updatedJob = await this.jobModel.patch(id, { title, company, location, description, data });
        
        if (!updatedJob) {
            return res.status(404).json({ error: 'Job not found' });
        }
        return res.json(updatedJob);
    }

    delete = async (req, res) => {
        const { id } = req.params;
        
        const deleted = await this.jobModel.delete(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Job not found' });
        }
        return res.json(deleted);
    }
}