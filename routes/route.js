const router=require('express').Router();
const {battlePlaces,countBattles,battleByKing,autoSuggestion}=require('../controller')

router.get('/list',battlePlaces)
router.get('/count',countBattles)
router.get('/search',battleByKing)
router.get('/suggest',autoSuggestion)


module.exports=router;