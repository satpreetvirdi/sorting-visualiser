const merge= (items :number[], aux: number[],animsArr:number[][],lo:number,mid:number,hi:number)=>{
    for(let k =lo;k<=hi;k++){
        aux[k]=items[k];
    }
    let i=lo,j=mid+1;
    for(let k=lo;k<=hi;k++){
        // base case 
        if(i>mid){
            animsArr.push([aux[j],k]);
            items[k]= aux[j++];
        }else if(j>hi){
            animsArr.push([aux[i],k]);
            items[k] = aux[i++];
        }else if(aux[i]<=aux[j]){
            animsArr.push([aux[i],k]);
            items[k] = aux[i++];
        }else{
            animsArr.push([aux[j],k]);
            items[k]= aux[j++];
        }
    }
}


export const mergeSortAnims = (items: number[], aux: number[], animsArr: number[][], lo: number, hi: number) => {
    if(lo>=hi) return;
    const mid = lo + Math.floor((hi-lo)/2);
    mergeSortAnims(items,aux,animsArr,lo,mid);
    mergeSortAnims(items,aux,animsArr,mid+1,hi);
    merge(items,aux,animsArr, lo,mid,hi);
}