// sorts data from greatest to smallest 
export const sortData = (data) =>{
    const sortedData = [...data];

    sortedData.sort((a,b)=> {
        if (a.cases> b.cases){
            return -1;
        }else{
            return 1;
        }
    })
    return sortedData;
}
