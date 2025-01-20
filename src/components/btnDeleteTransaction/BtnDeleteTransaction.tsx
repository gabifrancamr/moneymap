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
import { Button, Flex } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import FormDeleteTransaction from "../formDeleteTransaction/FormDeleteTransaction";

interface BtnDeleteTransactionProps {
    transaction: Transaction
}

export default function BtnDeleteTransaction({ transaction }: BtnDeleteTransactionProps) {
    return (
        <DialogRoot>
            <DialogTrigger>
                <Button size={"sm"} colorPalette={"red"}>
                    <FaTrash />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Do you want delete this transaction?</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <Flex alignItems={"center"} justifyContent={"center"} gap={"1rem"}>
                        <FormDeleteTransaction transaction={transaction} />
                        <Button colorPalette={"green"}>Cancel</Button>
                    </Flex>
                </DialogBody>
                <DialogCloseTrigger />
            </DialogContent>
        </DialogRoot>
    )
}