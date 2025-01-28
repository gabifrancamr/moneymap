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
        <Box className="box-shadow" rounded={"md"} paddingY={"4"} paddingX={"6"} spaceY={"12"}>
            <Flex justifyContent={"space-between"} alignItems={"center"} gap={"8"} wrap={"wrap"}>
                <Flex gap={"0.5rem"}>
                    <Text color={"green.500"} fontSize={{ base: "lg", md: "2xl", lg: "3xl" }}>Welcome,</Text>
                    <Text fontSize={{ base: "lg", md: "2xl", lg: "3xl" }}>{user.name}</Text>
                </Flex>
                <BtnNewTransaction />
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
                            <StatValueText fontSize={"3xl"}>{priceFromatter.format(summary.total)}</StatValueText>
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
                            <StatValueText color={"green.500"} fontSize={"3xl"}>{priceFromatter.format(summary.income)}</StatValueText>
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
                            <StatValueText color={"red.600"} fontSize={"3xl"}>{priceFromatter.format(summary.outcome)}</StatValueText>
                        </StatRoot>
                    </Box>
                </Flex>
            </Table.ScrollArea>
        </Box>
    )
}