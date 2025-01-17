"use client"

import { useAppContext } from "@/contexts/AppContext";
import { Input } from "@chakra-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function InputSearch() {
    const searchParams = useSearchParams()
    const inputSearchParam = searchParams?.get("search") || "";
    const [search, setSearch] = useState(inputSearchParam)

    const { transactions, setFilteredTransactions } = useAppContext()

    const pathname = usePathname();
    const { replace } = useRouter();


    useEffect(() => {
        const params = new URLSearchParams(searchParams);

        if (search.length >= 1) {
            params.set('page', '1');
            params.set("search", search)

            const filtered = transactions.filter(
                (transaction) =>
                    transaction.name.toLowerCase().includes(search.toLowerCase()) ||
                    transaction.type.toLowerCase().includes(search.toLowerCase()) ||
                    transaction.value.toString().includes(search)
            )

            setFilteredTransactions(filtered)
        } else {
            setFilteredTransactions(transactions)
            params.delete("search")
        }

        replace(`${pathname}?${params.toString()}`);
    }, [search, transactions])


    return (
        <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            colorPalette={"green"}
            placeholder="Search Transaction..." 
        />
    );
}
