
export const Sorting = ( sortIdRef, sortBy, data ) => {
   
    const sortId = ++sortIdRef.current; 
    var sorted ;
    if (sortId === sortIdRef.current) {
        sorted= data.slice();
        sorted.sort((a, b) => {
            for (let i = 0; i < sortBy.length; ++i) {
                if (a[sortBy[i].id] > b[sortBy[i].id])
                    return sortBy[i].desc ? -1 : 1;
                if (a[sortBy[i].id] < b[sortBy[i].id])
                    return sortBy[i].desc ? 1 : -1;
            }
            return 0;
        });

    }
    return sorted;

}
