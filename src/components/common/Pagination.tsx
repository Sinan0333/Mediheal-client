type PaginationProps = {
    currentPage:number
    pageCount:number
    pages:number[]
    handleClick:(page:number)=>void
}
function Pagination({currentPage,pageCount,pages,handleClick}:PaginationProps) {
  return (
    <nav className="flex">
        {
            currentPage === 1 ? "" : <p  className="neumorphic-pagination flex justify-center items-center cursor-pointer py-4 px-4 h-8 rounded-lg hover:bg-gray-300"onClick={()=>handleClick(currentPage-1)}>Previous</p>
        }
        {
            pages.map((page)=>{
                return(
                    <p key={page} className={`${currentPage === page ?"neumorphic-pagination-clicked":"neumorphic-pagination"} flex justify-center items-center cursor-pointer py-2 px-2 w-8 h-8 ml-2 rounded-lg hover:bg-gray-300`} onClick={()=>handleClick(page)}>{page}</p>

                )
            })
        }    
            
        {
            pageCount > 4 && pageCount-1 > currentPage? (
                <>
                    <span className="px-3 py-1">...</span>
                    <p className="neumorphic-pagination flex justify-center items-center cursor-pointer py-2 px-2 w-8 h-8 ml-2 rounded-lg hover:bg-gray-300" onClick={()=>handleClick(pageCount)}>{pageCount}</p>
                </>
            ) : null
        }
        
        {
            currentPage === pageCount ? "" : <p  className="neumorphic-pagination flex justify-center items-center cursor-pointer py-4 px-4 h-8 ml-2  rounded-lg hover:bg-gray-300" onClick={()=>handleClick(currentPage+1)}>Next</p>
        }
    </nav>
  )
}

export default Pagination
