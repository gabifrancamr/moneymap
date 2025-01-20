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


export default function TablePagination() {
  
  const { filteredTransactions } = useAppContext()

  const { currentPage, usersPerPage, createPageURL } = usePagination()

  const usersLength = filteredTransactions.length
  const totalPages = Math.ceil(usersLength / usersPerPage)

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