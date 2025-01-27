"use client"

import { Button, Flex, Text } from '@chakra-ui/react';

export function Error() {

    return (
        <Flex flexDirection={"column"} gap={"1rem"} justifyContent={"center"} alignItems={"center"} height={"100vh"}>
            <Text fontSize={"lg"}>Oops! Unable to load user data.</Text>
            <Text fontSize={"md"}>Please check your connection or try again later.</Text>
            <Button colorPalette={"green"} onClick={() => window.location.reload()}>Try Again</Button>
        </Flex>
    );
}

