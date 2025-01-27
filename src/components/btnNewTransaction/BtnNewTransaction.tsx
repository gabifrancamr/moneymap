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
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import FormNewTransaction from "../formNewTransaction/FormNewTransaction";

export function BtnNewTransaction() {
    const [open, setOpen] = useState(false)
    return (
        <DialogRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
            <DialogTrigger cursor={"pointer"}>
                <Button colorPalette={"green"}>New Transaction</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a new transaction</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <FormNewTransaction setOpen={setOpen} />
                </DialogBody>
                <DialogCloseTrigger />
            </DialogContent>
        </DialogRoot>
    )
}