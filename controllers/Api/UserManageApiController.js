const multer = require('multer');
const path = require('path');
const fs = require('fs');
const fileUploadHelper = require('../../helpers/fileUploadHelper');

/**
 * This function is for uploading file from api where if at a time we send either image or video 
*/

exports.uploadSingleFile = async (req, res) => {
    try{
                let fieldName = req.files[0].fieldname;
                let path1;

                try {
                    // Validate the file
                    
                    if(fieldName == "img"){
                        fileUploadHelper.validateImage(req.files[0]);
                        path1 = '../public/uploads/img';
                    }
                    if(fieldName == "video"){
                        fileUploadHelper.validateVideo(req.files[0]);
                        path1 = '../public/uploads/video';
                    }
                    
                } catch (error) {
                    // If validation fails, return error response
                    res.status(500).json({ success: false, message: error.message });
                }

                // Call the file upload helper to handle file upload
                const result = await fileUploadHelper.uploadFile(req.files[0], path1);

                if (result.success) {
                    // Respond with a success message
                    res.status(200).json({ message: 'File uploaded successfully.', filePath: result.filePath });
                } else {
                    // Respond with an error message
                    res.status(500).json({ message: result.message });
                }
            }
    catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal server error' });
    }
}

/**
 * This function is for uploading file from api where if at a time we send image & video both or single one as well 
*/

exports.uploadCombinedFile = async (req, res) => {
    try {

            // Check if multer error occurred
            if (req.fileValidationError) {
                console.error(req.fileValidationError);
                return res.status(400).json({ message: 'Multer validation error occurred.', error: req.fileValidationError });
            }

            // Check if files were uploaded
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ message: 'No files were uploaded.' });
            }

            // Specify the directory where files will be stored
            const dirname = './../public/uploads/'; // Update the directory path as needed

            // Iterate over each uploaded file
            for (const uploadedFile of req.files) {
                // Determine the fieldname of the uploaded file
                const fieldName = uploadedFile.fieldname;

                try {
                    // Validate the file
                    
                    if(fieldName == "img"){
                        fileUploadHelper.validateImage(uploadedFile);
                    }
                    if(fieldName == "video"){
                        fileUploadHelper.validateVideo(uploadedFile);
                    }
                    
                } catch (error) {
                    // If validation fails, return error response
                    res.status(500).json({ success: false, message: error.message });
                }

                // Determine the directory based on the fieldname
                let directory;
                if (fieldName === 'img') {
                    directory = 'img'; // Directory for image files
                } else if (fieldName === 'video') {
                    directory = 'video'; // Directory for video files
                } else {
                    return res.status(400).json({ message: `Invalid fieldname: ${fieldName}` });
                }

                // Call the file upload helper function to save the file
                const result = await fileUploadHelper.uploadFile(uploadedFile, path.join(dirname, directory));

                if (!result.success) {
                    // If an error occurred during file upload, return an error response
                    return res.status(500).json({ message: result.message });
                }
            }

            // If all files were uploaded successfully, respond with a success message
            res.status(200).json({ message: 'Files uploaded successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

/**
 * Upload Multiple Files
*/

exports.uploadMultipleFiles = async (req, res) => {
    try{
       // Check if files were uploaded
       if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'No files were uploaded.' });
    }

    // Specify the directory where files will be stored
    const dirname = './../public/uploads/'; // Update the directory path as needed

    // Iterate over each uploaded file
    for (const uploadedFile of req.files) {

        // Determine the directory based on the fieldname
        let directory;
        if (uploadedFile.fieldname === 'img') {
            fileUploadHelper.validateImage(uploadedFile);
            directory = 'images'; // Directory for image files
        } else if (uploadedFile.fieldname === 'video') {
            fileUploadHelper.validateVideo(uploadedFile);
            directory = 'videos'; // Directory for video files
        } else {
           return  res.status(500).json({ success: false, message: error.message });

            // return res.status(400).json({ message: `Invalid fieldname: ${uploadedFile.fieldname}` });
        }

        // Call the file upload helper function to save the file
        const result = await fileUploadHelper.uploadFile(uploadedFile, path.join(dirname, directory));
    }

     // If all files were uploaded successfully, respond with a success message
     res.status(200).json({ message: 'Files uploaded successfully.' });
    }
    catch (error) {
       return res.status(500).json({ message: error.message });
    }
}