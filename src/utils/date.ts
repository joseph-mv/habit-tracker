
export const dateFormat = (date:Date)=>{
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
  return dates
}

export const getLastMonths = (n:number)=>{
  const months = []
  const today = new Date()
  
  const FirstDay = new Date()
  FirstDay.setDate(1)

  for(let i =0;i<n;i++){
    const month= []
    FirstDay.setMonth(today.getMonth()-i)
    let date = new Date(FirstDay)
    const day =FirstDay.getDay()

    for(let i = 0;i<day; i++){
      month.push(null)
    }
    while (date.getMonth() === FirstDay.getMonth()){
      month.push(new Date(date));
      date.setDate(date.getDate()+1)
    }
    // console.log('last day', date, date.getDay())
    date.setDate(date.getDate() - 1) // go back to last date of previous month
    for(let i = date.getDay();i<6;i++){
      month.push(null)
    }
    // console.log('month',month)
    months.push(month)
    // months.push(FirstDay.toLocaleString('default',{month:'short'}))
  }
  // console.log(months)
  return months.reverse()
}

export const reArrangeArray = (arr:(Date | null)[])=>{
  const newArr:(Date | null)[][]=[]
  let i = 0;
  while(i<arr.length){
    newArr.push(arr.slice(i,i+7))
    i += 7
  }
  return newArr
}