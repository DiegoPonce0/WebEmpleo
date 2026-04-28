

export class FavoriteController {
    
    constructor({favoriteModel}) {
        this.favoriteModel = favoriteModel
    }
    
    readAll = async (req, res) => {
        try{
            if (!req.user) {
            return res.status(401).json({ error: 'Not authenticated' });
            }
            const favorites = await this.favoriteModel.getAll(req.user.id);
            if (!favorites) {
                return res.status(401).json({ error: 'Not favorites found' });
            }

            res.json({data: favorites})

        } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
        }
    }

    create = async (req, res) => {
        const { id } = req.params
        try{
            if (!req.user) {
            return res.status(401).json({ error: 'Not authenticated' });
            }
            const favorites = await this.favoriteModel.addFavorite(id, req.user.id)
            res.json({data: favorites})
        } catch (error) {
            console.error(error)
            res.status(500).json({ error });

        }
    };

    delete = async (req, res) => {
        const { id } = req.params;

        try {
            if (!req.user) {
                return res.status(401).json({ error: 'Not authenticated' });
            }
            const deleteFavorite = await this.favoriteModel.removeFavorite(req.user.id, id);
            
            if (!deleteFavorite) {
                return res.status(404).json({ error: 'Job favorite not found' });
            }
            res.json({ message: 'Favorite job deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });

        }
    }
}