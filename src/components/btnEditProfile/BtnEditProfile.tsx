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
import { FaUserEdit } from "react-icons/fa";
import FormEditProfile from "../formEditProfile/FormEditProfile";

export function BtnEditProfile() {
    return (
        <DialogRoot>
            <DialogTrigger cursor={"pointer"}>
                <Flex alignItems={"center"} gap={"2"}>
                    <FaUserEdit size={20} />
                    <Text>Edit Profile</Text>
                </Flex>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <FormEditProfile />
                </DialogBody>
                <DialogCloseTrigger />
            </DialogContent>
        </DialogRoot>
    )
}