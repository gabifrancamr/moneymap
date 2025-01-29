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
import { User } from "@/types";
import { Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import FormDeleteUser from "../formDeleteUser/FormDeleteUser";

interface BtnDeleteUserProps {
    user: User
}

export default function BtnDeleteUser({ user }: BtnDeleteUserProps) {
    const [open, setOpen] = useState(false)
    return (
        <DialogRoot placement={"center"} open={open} onOpenChange={(e) => setOpen(e.open)}>
            <DialogTrigger>
                <Button disabled={user.role === 'admin'} size={"sm"} colorPalette={"red"}>
                    <FaTrash />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Do you want to delete this user?</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <Flex alignItems={"center"} justifyContent={"center"} gap={"1rem"}>
                        <FormDeleteUser user={user} setOpen={setOpen} />
                        <Button colorPalette={"green"} onClick={() => setOpen(false)}>Cancel</Button>
                    </Flex>
                </DialogBody>
                <DialogCloseTrigger />
            </DialogContent>
        </DialogRoot>
    )
}