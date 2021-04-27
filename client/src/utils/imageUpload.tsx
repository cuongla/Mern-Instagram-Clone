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


export const imageUpload = async (images: any) => {
    let imgArr = [];
    for(const item of images) {
        const formData = new FormData();
        formData.append("file", item);
        formData.append("upload_preset", 'o0mtcbku');
        formData.append("cloud_name", "tinla94");

        const res = await fetch('https://api.cloudinary.com/v1_1/tinla94/image/upload', {
            method: 'POST',
            body: formData
        });

        const data = await res.json();
        console.log(data);
        imgArr.push({ public_id: data.public_id, url: data.secure_url});
    }

    return imgArr;
}