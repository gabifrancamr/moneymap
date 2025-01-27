import { useAppContext } from "@/contexts/AppContext";
import { useMemo } from "react";

export function useSummary() {
    const { transactions } = useAppContext()

    const summary = useMemo(() => {
        return transactions.reduce(
            (accum, transaction) => {
                if(transaction.type === 'income') {
                    accum.income += transaction.value
                    accum.total += transaction.value
                } else {
                    accum.outcome += transaction.value
                    accum.total -= transaction.value
                }
                return accum
            }, 
            {
                income: 0,
                outcome: 0,
                total: 0
            }
        )
    }, [transactions])

    return summary
}