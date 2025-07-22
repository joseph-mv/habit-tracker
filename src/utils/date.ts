
const dateFormat = (date:Date)=>{
  const dd = date.getDate()
  const mm = date.getMonth()+1
  const yyyy = date.getFullYear()
  return (`${dd}/${mm}/${yyyy}`)
}

export const getTodayDate = ():string => {
  const today = new Date();
  return dateFormat(today)
};

export const getLastNDays =(n:number) =>{
  const dates=[]
  const today = new Date()
  for(let i=0;i<n;i++){
    const pastDate = new Date()
    pastDate.setDate(today.getDate()-i)
    dates.push(dateFormat(pastDate))
  }
  console.log(dates)
  return dates
}