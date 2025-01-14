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
import FormNewTransaction from "../formNewTransaction/FormNewTransaction";

export function BtnNewTransaction() {
    return (
        <DialogRoot>
            <DialogTrigger cursor={"pointer"}>
                <Button colorPalette={"green"}>New Transaction</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a new transaction</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <FormNewTransaction />
                </DialogBody>
                <DialogCloseTrigger />
            </DialogContent>
        </DialogRoot>
    )
}