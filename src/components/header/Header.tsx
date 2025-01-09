import { Flex, Text } from "@chakra-ui/react";
import { FaMoneyBillWave } from "react-icons/fa";
import { MenuHeader } from "../menuHeader/MenuHeader";
import { ColorModeButton } from "../ui/color-mode";

export function Header() {
    return (
        <Flex justifyContent={"space-between"}>
            <Flex gap={"2"} alignItems={"center"}>
                <FaMoneyBillWave />
                <Text>MoneyMap</Text>
            </Flex>
            <Flex gap={"3"} alignItems={"center"}>
                <MenuHeader />
                <ColorModeButton />
            </Flex>
        </Flex>
    )
}