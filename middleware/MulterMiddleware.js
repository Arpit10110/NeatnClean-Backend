import multer from 'multer';

// Switch to memory storage
const storage = multer.memoryStorage();
const uploadImage = multer({ storage }).single('image');

export default uploadImage;
