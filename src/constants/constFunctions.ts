export const handlePagination = (i:number,currentPage:number,pages:number[],pageCount:number) => {
    
    if(currentPage === pageCount -3 || currentPage === pageCount -1){
    }
    else if(i===currentPage+1){
        pages.push(pages[pages.length-1]+1)
        pages.shift()
    }else if(i===currentPage+2){
        pages.push(pages[pages.length-1]+1,pages[pages.length-1]+2)
        pages.shift()
        pages.shift()
    }else if(i === currentPage+3){
        pages.push(pages[pages.length-1]+1)
        pages.shift()
    }
    else if(i === currentPage+4){
        pages.push(pages[pages.length-1]+1,pages[pages.length-1]+2)
        pages.shift()
        pages.shift()
    }
    else if(i===currentPage-1){
        pages.unshift(pages[0]-1)
        pages.pop()
    }else if(i===currentPage-2){
        pages.unshift(pages[0]-1,pages[0]-2)
        pages.pop()
        pages.pop()
    }else  {
        pages.length=0
        pages.unshift(pageCount-4,pageCount-3,pageCount-2,pageCount-1,pageCount)
    }
}

export const createInitialPages = (pageCount: number): number[] => {
    let array:number[]=[]
    if(pageCount >=5){
        return [1,2,3,4,5]
    }

    for(let i=0;i<pageCount;i++){
        array.push(i+1)
    }
    
    return array
}