const Reflection= require("../models/reflectionModel");

class Reflect {
    static create (req, res) {
        const data = { 
            success: req.body.success,
            low_point: req.body.low_point,
            take_away: req.body.take_away
         };
        Reflection.insert(res, data);
    }
    
    static take (req, res) {
        const owner_id = req.headers.owner_id;
        Reflection.read(res, owner_id);
    }

    static change (req, res) {
        const data = {
            id: req.params.id, 
            success: req.body.success,
            low_point: req.body.low_point,
            take_away: req.body.take_away
         };
         Reflection.update(res, data);
    }

    static remove (req, res) {
        const id = req.params.id;
        Reflection.delete(res, id);
    }
}

module.exports = Reflect;