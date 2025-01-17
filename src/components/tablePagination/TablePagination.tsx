"use client";

import {
    PaginationItem,
    PaginationNextTrigger,
    PaginationPrevTrigger,
    PaginationRoot
} from "@/components/ui/pagination";
import { useAppContext } from "@/contexts/AppContext";
import { usePagination } from "@/hooks/usePagination";
import { HStack } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";


export default function TablePagination() {
  
  const { filteredTransactions } = useAppContext()

  const { currentPage, usersPerPage, params } = usePagination()

  const usersLength = filteredTransactions.length
  const totalPages = Math.ceil(usersLength / usersPerPage)

  const pathname = usePathname();
  const { replace } = useRouter();

  function createPageURL(pageNumber: number){
    params.set('page', pageNumber.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <PaginationRoot
      count={usersLength}
      pageSize={5}
      page={currentPage}
      display={"flex"}
      justifyContent={"center"}
    >
      <HStack>
        <PaginationPrevTrigger
          disabled={currentPage <= 1} 
          onClick={() => createPageURL(currentPage - 1)}
        />
        {[...Array(totalPages)].map((_, index) => (
          <PaginationItem 
            type="page" 
            value={index + 1} 
            key={index} 
            onClick={() => createPageURL(index + 1)} 
          />
        ))}
        <PaginationNextTrigger
          disabled={currentPage >= totalPages}
          onClick={() => createPageURL(currentPage + 1)}
        />
      </HStack>
    </PaginationRoot>
  );
}