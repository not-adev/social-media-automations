import fs from 'fs' 
export const DeleteFileFromDisk = (filePath)=>{
    fs.unlink(filePath, (error)=>{
      if (error){
        throw error 
        console.log(error)
      }  
    })
}