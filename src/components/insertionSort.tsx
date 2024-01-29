export const insertionSortAnims = (items: number[])=>{
    const newArr = [...items];
    const animsArr = [[1]];
    for(let i=1;i<newArr.length;i++){
        let j = i;
        while(j>0 && newArr[j] < newArr[j-1]){
            animsArr.push([j-1,j]);
            const temp = newArr[j-1];
            newArr[j-1] = newArr[j];
            newArr[j] = temp;
            j--
        }
    }
    return {newArr,animsArr};
    
}