import { StatLabel, StatRoot, StatValueText } from "@/components/ui/stat";
import { useSummary } from "@/hooks/useSummary";
import { User } from "@/types";
import { priceFromatter } from "@/utils/formatter";
import { Box, Flex, HStack, Icon, Table, Text } from "@chakra-ui/react";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { LuDollarSign } from "react-icons/lu";
import { BtnNewTransaction } from "../btnNewTransaction/BtnNewTransaction";

interface SummaryProps {
    user: User
}

export function Summary({ user }: SummaryProps) {
    const summary = useSummary()
    return (
        <Box className="box-shadow" rounded={"md"} paddingY={"4"} paddingX={"6"} spaceY={"6"}>
            <Flex justifyContent={"space-between"} alignItems={"center"} gap={{ base: "1rem", sm: "2rem" }} wrap={"wrap"}>
                <Flex gap={"0.5rem"}>
                    <Text color={"green.500"} fontSize={{ base: "sm", sm: "md", md: "2xl", lg: "3xl" }}>Welcome,</Text>
                    <Text fontSize={{ base: "sm", sm: "md", md: "2xl", lg: "3xl" }}>{user.name}</Text>
                </Flex>
                <BtnNewTransaction />
            </Flex>

            <Table.ScrollArea>
                <Flex flexDirection={{ base: "column", sm: "row" }} justifyContent={"space-between"} gap={"1rem"}>
                    <Box rounded="md" borderColor="green" borderWidth="1px" paddingY={{ base: "0.5rem", md: "1rem" }} paddingX={{ base: "0.5rem", md: "1rem", lg: "3rem" }} width={"100%"}>
                        <StatRoot fontSize={{ base: "lg", md: "2xl", lg: "3xl" }} flexDirection={{ base: "row", sm: "column" }} justifyContent={"space-between"}>
                            <HStack justify="space-between">
                                <StatLabel>Total</StatLabel>
                                <Icon>
                                    <LuDollarSign />
                                </Icon>
                            </HStack>
                            <StatValueText fontSize={{ sm: "lg", md: "2xl" }}>{priceFromatter.format(summary.total)}</StatValueText>
                        </StatRoot>
                    </Box>
                    <Box rounded="md" borderColor="green" borderWidth="1px" paddingY={{ base: "0.5rem", md: "1rem" }} paddingX={{ base: "0.5rem", md: "1rem", lg: "3rem" }} width={"100%"}>
                        <StatRoot fontSize={{ base: "lg", md: "2xl", lg: "3xl" }} flexDirection={{ base: "row", sm: "column" }} justifyContent={"space-between"}>
                            <HStack justify="space-between">
                                <StatLabel>Income</StatLabel>
                                <Icon>
                                    <FaArrowTrendUp />
                                </Icon>
                            </HStack>
                            <StatValueText fontSize={{ sm: "lg", md: "2xl" }} color={"green.500"}>{priceFromatter.format(summary.income)}</StatValueText>
                        </StatRoot>
                    </Box>
                    <Box rounded="md" borderColor="green" borderWidth="1px" paddingY={{ base: "0.5rem", md: "1rem" }} paddingX={{ base: "0.5rem", md: "1rem", lg: "3rem" }} width={"100%"}>
                        <StatRoot fontSize={{ base: "lg", md: "2xl", lg: "3xl" }} flexDirection={{ base: "row", sm: "column" }} justifyContent={"space-between"}>
                            <HStack justify="space-between">
                                <StatLabel>Expense</StatLabel>
                                <Icon>
                                    <FaArrowTrendDown />
                                </Icon>
                            </HStack>
                            <StatValueText fontSize={{ sm: "lg", md: "2xl" }} color={"red.600"}>{priceFromatter.format(summary.outcome)}</StatValueText>
                        </StatRoot>
                    </Box>
                </Flex>
            </Table.ScrollArea>
        </Box>
    )
}