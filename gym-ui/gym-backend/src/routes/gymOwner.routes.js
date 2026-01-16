const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const c = require("../controllers/gymOwner.controller");

router.get("/", auth, c.getGymOwners);
router.post("/", auth, c.createGymOwner);     // ✅ ADD
router.put("/:id", auth, c.updateGymOwner);
router.delete("/:id", auth, c.deleteGymOwner); // ✅ DELETE

module.exports = router;
