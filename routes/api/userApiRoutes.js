const express = require('express');
const router = express.Router();
const fileController = require('../../controllers/Api/FileManageApiController');
const multer = require('multer');
const upload = multer();

router.post('/file/upload/combined', fileController.uploadCombinedFile);
router.post('/file/upload/single', fileController.uploadSingleFile);
router.post('/file/upload/multiple', fileController.uploadMultipleFiles);

module.exports = router;