const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const c = require("../controllers/trainer.controller");

router.get("/", auth, c.getTrainers);
router.post("/", auth, c.createTrainer);
router.put("/:id", auth, c.updateTrainer);
router.delete("/:id", auth, c.deleteTrainer);

module.exports = router;
