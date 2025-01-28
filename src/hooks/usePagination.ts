import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function usePagination() {
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams);
    const pageParam = searchParams?.get('page') || '1'
    const currentPage = parseInt(pageParam, 10) || 1
    const usersPerPage = 5

    const pathname = usePathname();
    const { replace } = useRouter();

    const createPageURL = useCallback((pageNumber: number) => {
        params.set('page', pageNumber.toString());
        replace(`${pathname}?${params.toString()}`);
    }, [params, pathname, replace]);


    return {
        params, currentPage, usersPerPage, createPageURL
    }
}