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
import { useState } from "react";
import FormNewTransaction from "../formNewTransaction/FormNewTransaction";
import { Button } from "../ui/button";

export function BtnNewTransaction() {
    const [open, setOpen] = useState(false)
    return (
        <DialogRoot placement={"center"} open={open} onOpenChange={(e) => setOpen(e.open)}>
            <DialogTrigger cursor={"pointer"}>
                <Button size={{ base: "xs", sm: "sm", md: "md" }} colorPalette={"green"}>New Transaction</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader textAlign={"center"}>
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