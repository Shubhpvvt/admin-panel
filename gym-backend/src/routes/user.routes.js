const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const controller = require("../controllers/user.controller");

router.get("/", auth, controller.getUsers);
router.put("/:id", auth, controller.updateUser);

module.exports = router;