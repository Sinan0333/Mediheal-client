import imageCompression from 'browser-image-compression';

export function base64(file: File | undefined): Promise<string | undefined> {
  return new Promise((resolve) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
    } else {
      resolve(undefined);
    }
  });
}
  

export const convertDateToHumanReadable = (dob:string):string=>{
  const date = new Date(dob);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const day = String(date.getDate()).padStart(2, '0');
  return`${year}-${month}-${day}`;
}


export const convertHumanReadableToDate = (dateString:string )=>{
  const date = new Date(dateString)
  return date.toISOString()
}

export const compressImage = async (file: File) => {
  const options = {
    maxSizeMB: 5, // Maximum size in MB
    useWebWorker: true, // Use web worker for faster compression
  };
  return await imageCompression(file, options);
};