import { Box, Flex, HStack, Icon, Spinner, StatLabel, StatRoot, Table, Text } from "@chakra-ui/react";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { LuDollarSign } from "react-icons/lu";
import { Button } from "../ui/button";

export function Loading() {
    return (
        <Box className="container" paddingX={{ base: "4", md: "8", lg: "24" }} paddingY={{ base: "2rem" }} spaceY={"6"}>
            <Flex gap={"2"} alignItems={"center"} justifyContent={"flex-start"}>
                <FaMoneyBillWave color="#16a34a" />
                <Text>MoneyMap</Text>
            </Flex>

            <Box className="box-shadow" rounded={"md"} paddingY={"4"} paddingX={"6"} spaceY={"12"}>
                <Flex justifyContent={"space-between"} alignItems={"center"} gap={"8"} wrap={"wrap"}>
                    <Flex gap={"0.5rem"}>
                        <Text color={"green.500"} fontSize={"3xl"}>Loading data...</Text>
                    </Flex>
                    <Button disabled colorPalette={"green"}>New Transaction</Button>
                </Flex>

                <Table.ScrollArea>
                    <Flex justifyContent={"space-between"} gap={"1rem"}>
                        <Box rounded="md" borderColor="green" borderWidth="1px" paddingY={"1rem"} paddingX={"3rem"} width={"100%"}>
                            <StatRoot>
                                <HStack justify="space-between">
                                    <StatLabel fontSize={"lg"}>Total</StatLabel>
                                    <Icon>
                                        <LuDollarSign />
                                    </Icon>
                                </HStack>
                                <Spinner size="lg" />
                            </StatRoot>
                        </Box>
                        <Box rounded="md" borderColor="green" borderWidth="1px" paddingY={"1rem"} paddingX={"3rem"} width={"100%"}>
                            <StatRoot>
                                <HStack justify="space-between">
                                    <StatLabel fontSize={"lg"}>Income</StatLabel>
                                    <Icon>
                                        <FaArrowTrendUp />
                                    </Icon>
                                </HStack>
                                <Spinner size="lg" />
                            </StatRoot>
                        </Box>
                        <Box rounded="md" borderColor="green" borderWidth="1px" paddingY={"1rem"} paddingX={"3rem"} width={"100%"}>
                            <StatRoot>
                                <HStack justify="space-between">
                                    <StatLabel fontSize={"lg"}>Expense</StatLabel>
                                    <Icon>
                                        <FaArrowTrendDown />
                                    </Icon>
                                </HStack>
                                <Spinner size="lg" />
                            </StatRoot>
                        </Box>
                    </Flex>
                </Table.ScrollArea>
            </Box>
        </Box>
    )
}