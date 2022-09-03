let transformDate = (time)=>{
  let D =  new Date(time);
  let year = D.getFullYear();
  let month = (D.getMonth()+1).toString().padStart(2,0);
  let day =  (D.getDate()).toString().padStart(2,0);
  let housr =  (D.getHours()).toString().padStart(2,0);
  let minutes =  (D.getMinutes()).toString().padStart(2,0);
  return `${year}/${month}/${day} ${housr}:${minutes}`;
}

export default transformDate;