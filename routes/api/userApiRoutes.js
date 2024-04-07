const express = require('express');
const router = express.Router();
const userController = require('../../controllers/Api/UserManageApiController');
const multer = require('multer');
const upload = multer();

router.post('/file/upload/combined', userController.uploadCombinedFile);
router.post('/file/upload/single', userController.uploadSingleFile);
router.post('/file/upload/multiple', userController.uploadMultipleFiles);

module.exports = router;