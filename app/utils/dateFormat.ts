export const formatDateFromMongoDB =(dateFromMongoDB:string) =>{
  // Parse the date string from MongoDB into a Date object
  const date = new Date(dateFromMongoDB);
  
  // Get day, month, and year from the Date object
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  // Format the date in "DD.MM.YYYY" format
  const formattedDate = `${day}.${month}.${year}`;
  
  return formattedDate;
}


