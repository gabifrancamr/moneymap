import { Flex, Text } from "@chakra-ui/react";
import { FaMoneyBillWave } from "react-icons/fa";
import { HeaderMenu } from "../headerMenu/HeaderMenu";

export function Header() {
    return (
        <Flex justifyContent={"space-between"}>
            <Flex gap={"2"} alignItems={"center"}>
                <FaMoneyBillWave color="#16a34a" />
                <Text>MoneyMap</Text>
            </Flex>
            <HeaderMenu />
        </Flex>
    )
}