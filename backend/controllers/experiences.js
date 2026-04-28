

export class ExperienceController {
    
    constructor({experienceModel}) {
        this.experienceModel = experienceModel
    }
    
    create = async (req, res) => {
        const { title, company, start_date, end_date, responsibilities } = req.body;

        try {
            const experience = await this.experienceModel.createExperience({
                user_id: req.user.id,
                title,
                company,
                start_date,
                end_date,
                responsibilities
            });

            res.status(201).json({ message: 'Experience created successfully', experience });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    }
    
    update = async (req, res) => {
        try{
            if (!req.user) {
                return res.status(401).json({ error: 'Not authenticated' });
            }
            if (!req.body) {
                return res.status(400).json({ error: 'No data provided' });
            }
            
            const { id } = req.params;
            const { title, company, start_date, end_date, responsibilities } = req.body;
            const experience = await this.experienceModel.updateExperience({
                id,
                user_id: req.user.id,
                title,
                company,
                start_date,
                end_date,
                responsibilities
            });

            if (!experience) {
                return res.status(404).json({ error: 'Experience not found' });
            }
            res.json({ message: 'Experience updated successfully', experience: experience });

        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Server error' });    
        }
    }

    delete = async (req, res) => {
        try {
            if (!req.user) {
                return res.status(401).json({ error: 'Not authenticated' });
            }
            const { id } = req.params;
            const deleteExperience = await this.experienceModel.deleteExperience(req.user.id, id);
            
            if (!deleteExperience) {
                return res.status(404).json({ error: 'Experience not found' });
            }
            res.json({ message: 'Experience deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });

        }
    }

}