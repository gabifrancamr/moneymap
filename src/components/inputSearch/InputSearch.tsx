import { Button, Flex, Input } from "@chakra-ui/react";

export function InputSearch() {
    return (
        <Flex gap={"2"}>
            <Input colorPalette={"green"} placeholder="Search transaction..." />
            <Button colorPalette={"green"}>Search</Button>
        </Flex>
    )
}