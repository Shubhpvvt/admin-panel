const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const c = require("../controllers/gym.controller");

router.get("/", auth, c.getGyms);
router.post("/", auth, c.createGym);
router.put("/:id", auth, c.updateGym);
router.delete("/:id", auth, c.deleteGym);

module.exports = router;
