"use client"

import { Button } from "@/components/ui/button";
import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { User } from "@/types";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import FormEditUser from "../formEditUser/FormEditUser";

interface BtnEditUserProps {
    user: User
}


export function BtnEditUser({ user }: BtnEditUserProps) {
    const [open, setOpen] = useState(false)
    return (
        <DialogRoot placement={"center"} open={open} onOpenChange={(e) => setOpen(e.open)}>
            <DialogTrigger cursor={"pointer"}>
                <Button size={"sm"} colorPalette={"green"}>
                    <MdEdit />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle textAlign={"center"}>Edit User</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <FormEditUser user={user} setOpen={setOpen} />
                </DialogBody>
                <DialogCloseTrigger />
            </DialogContent>
        </DialogRoot>
    )
}