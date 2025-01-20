import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function usePagination() {
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams);
    const pageParam = searchParams?.get('page') || '1'
    const currentPage = parseInt(pageParam, 10) || 1
    const usersPerPage = 5

    const pathname = usePathname();
    const { replace } = useRouter();

    function createPageURL(pageNumber: number) {
        params.set('page', pageNumber.toString());
        replace(`${pathname}?${params.toString()}`);
    };


    return {
        params, currentPage, usersPerPage, createPageURL
    }
}