import { Flex, Spinner } from "@chakra-ui/react";

export default function Loading() {
    return (
        <Flex height={"100vh"} justifyContent={"center"} alignItems={"center"}>
            <Flex gap={"0.5rem"} alignItems={"center"}>
                <Spinner size="sm" />
                Loading...
            </Flex>
        </Flex>
    )
}