import { StatLabel, StatRoot, StatValueText } from "@/components/ui/stat";
import { useSummary } from "@/hooks/useSummary";
import { User } from "@/types";
import { priceFromatter } from "@/utils/formatter";
import { Box, Flex, HStack, Icon, Text } from "@chakra-ui/react";
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
            <Flex justifyContent={"space-between"} alignItems={"center"} gap={"8"}>
                <Flex gap={"0.5rem"}>
                    <Text color={"green.500"} fontSize={"3xl"}>Welcome,</Text>
                    <Text fontSize={"3xl"}>{user.name}</Text>
                </Flex>
                <BtnNewTransaction />
            </Flex>

            <Flex justifyContent={"space-between"}>
                <Box rounded="md" borderColor="green" borderWidth="1px" padding={"4"} paddingX={{ base: '2', sm: '4', md: '12', lg: '20', xl: '24' }}>
                    <StatRoot gap={"2"}>
                        <HStack justify="space-between">
                            <StatLabel fontSize={"lg"}>Total</StatLabel>
                            <Icon>
                                <LuDollarSign />
                            </Icon>
                        </HStack>
                        <StatValueText fontSize={"3xl"}>{priceFromatter.format(summary.total)}</StatValueText>
                    </StatRoot>
                </Box>
                <Box rounded="md" borderColor="green" borderWidth="1px" padding={"4"} paddingX={{ base: '2', sm: '4', md: '12', lg: '20', xl: '24' }}>
                    <StatRoot gap={"2"}>
                        <HStack justify="space-between">
                            <StatLabel fontSize={"lg"}>Income</StatLabel>
                            <Icon>
                                <FaArrowTrendUp />
                            </Icon>
                        </HStack>
                        <StatValueText color={"green.500"} fontSize={"3xl"}>{priceFromatter.format(summary.income)}</StatValueText>
                    </StatRoot>
                </Box>
                <Box rounded="md" borderColor="green" borderWidth="1px" padding={"4"} paddingX={{ base: '2', sm: '4', md: '12', lg: '20', xl: '24' }}>
                    <StatRoot gap={"2"}>
                        <HStack justify="space-between">
                            <StatLabel fontSize={"lg"}>Outcome</StatLabel>
                            <Icon>
                                <FaArrowTrendDown />
                            </Icon>
                        </HStack>
                        <StatValueText color={"red.600"} fontSize={"3xl"}>{priceFromatter.format(summary.outcome)}</StatValueText>
                    </StatRoot>
                </Box>
            </Flex>
        </Box>
    )
}