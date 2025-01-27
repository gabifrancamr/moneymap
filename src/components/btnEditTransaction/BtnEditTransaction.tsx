"use client"

import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Transaction } from "@/types";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import FormEditTransaction from "../formEditTransaction/FormEditTransaction";

interface BtnEditTransactionProps {
    transaction: Transaction;
}

export default function BtnEditTransaction({ transaction }: BtnEditTransactionProps) {
    const [open, setOpen] = useState(false)
    return (
        <DialogRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
            <DialogTrigger>
                <Button size={"sm"} colorPalette={"green"}>
                    <MdEdit />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Transaction</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <FormEditTransaction transaction={transaction} setOpen={setOpen} />
                </DialogBody>
                <DialogCloseTrigger />
            </DialogContent>
        </DialogRoot>

    )
}