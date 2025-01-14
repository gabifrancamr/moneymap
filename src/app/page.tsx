import { BtnSignIn } from "@/components/btnSignIn/BtnSignIn";
import { BtnSignUp } from "@/components/btnSignUp/BtnSignUp";
import HomepageBackground from "@/components/homepageBackground/HomepageBackground";
import { Box, Flex, Text } from "@chakra-ui/react";

export default function Home() {
  return (
      <Box position="relative" width="100vw" height="100vh" overflow="hidden">
        <HomepageBackground />

        <Flex
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex="overlay"
          textAlign="center"
          color="white"
          flexDirection={"column"}
          gap={"8"}
          alignItems={"center"}
        >
          <Box>
            <Flex fontSize="5xl" fontWeight="bold" gap={"1"} justifyContent={"center"}>
              <Text>Money</Text>
              <Text color={"green.500"}>Map</Text>
            </Flex>
            <Text fontSize="lg" >
              Manage your finances simply and smartly with Money Map!
            </Text>
          </Box>

          <Flex gap={"2"}>
            <BtnSignIn />
            <BtnSignUp />
          </Flex>
        </Flex>
      </Box>
  );
}
