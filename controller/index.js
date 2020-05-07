const Battle = require("../model");

exports.battlePlaces = (req, res, next) => {
  Battle.find().distinct("location", function (err, docs) {
    if (err) {
      return res.status(400).json({ error: err });
    }
    return res.status(200).json(docs);
  });
};

exports.countBattles = (req, res, next) => {
  Battle.countDocuments({}, function (err, data) {
    if (err) {
      return res.status(400).json({ error: err });
    }
    return res.status(200).json({ count: data });
  });
};

exports.battleByKing = (req, res, next) => {
  const king = req.query.king;
  const location = req.query.location;
  const type = req.query.type;
  const query = {};
  const kingAttacker = {};
  const kingDefender = {};
  const kingObj = {};
  const locationObj = {};
  const battletypeObj = {};

  if (location) {
    locationObj.location = new RegExp("^" + location, "i");
  }
  if (type) {
    battletypeObj.battle_type = new RegExp("^" + type, "i");
  }
  if (king) {
    kingAttacker.attacker_king = new RegExp("^" + king, "i");
    kingDefender.defender_king = new RegExp("^" + king, "i");
    kingObj["$or"] = [kingAttacker, kingDefender];
  }

  query["$and"] = [kingObj, locationObj, battletypeObj];

  Battle.find(query, function (err, data) {
    if (err) {
      return res.status(400).json({ error: err });
    }
    return res.status(200).json(data);
  });
};

exports.autoSuggestion = (req, res, next) => {
  const keyword = req.query.term;
  const query = Battle.find(
    { $text: { $search: keyword } },
    { score: { $meta: "textScore" } }
  )
    .sort({ score: { $meta: "textScore" } })
    .limit(10);
  query.exec((err, docs) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    return res.status(200).json(docs);
  });
};

