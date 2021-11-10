const Reflection= require("../models/reflectionModel");

class Reflect {
    static create (req, res) {
        const data = { 
            success: req.body.success,
            low_point: req.body.low_point,
            take_away: req.body.take_away,
            owner_id: req.auth.id
         };
        Reflection.insert(res, data);
    }
    
    static take (req, res) {
        const owner_id = req.auth.id;
        Reflection.read(res, owner_id);
    }

    static change (req, res) {
        const data = {
            id: req.params.id,
            success: req.body.success,
            low_point: req.body.low_point,
            take_away: req.body.take_away,
            owner_id: req.auth.id
         };
         Reflection.update(res, data);
    }

    static remove (req, res) {
        const data = {
            id: req.params.id,
            owner_id: req.auth.id
        };
        Reflection.delete(res, data);
    }
}

module.exports = Reflect;