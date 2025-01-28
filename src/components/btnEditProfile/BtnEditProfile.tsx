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
import { Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import FormEditProfile from "../formEditProfile/FormEditProfile";

export function BtnEditProfile() {
    const [open, setOpen] = useState(false)
    return (
        <DialogRoot placement={"center"} open={open} onOpenChange={(e) => setOpen(e.open)}>
            <DialogTrigger cursor={"pointer"}>
                <Flex alignItems={"center"} gap={"2"}>
                    <FaUserEdit size={20} />
                    <Text>Edit Profile</Text>
                </Flex>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle textAlign={"center"}>Edit Profile</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <FormEditProfile setOpen={setOpen} />
                </DialogBody>
                <DialogCloseTrigger />
            </DialogContent>
        </DialogRoot>
    )
}