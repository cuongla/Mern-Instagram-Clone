export const checkImage = (file: File) => {
    let err = "";
    
    // check file size
    if(!file) err = "File does not exist.";

    // check file size
    if(file.size > 1024 * 1024) { // 1mb 
        err = "The largest image size is 1mb."
    } 

    if(file.type !== 'image/jpeg' && file.type !== 'image/png') err = 'Image format is incorrect';

    return err.toString();
}