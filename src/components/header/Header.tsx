import { HStack, Text } from "@chakra-ui/react";
import { FaMoneyBillWave } from "react-icons/fa";
import { ColorModeButton } from "../ui/color-mode";

export function Header() {
    return (
        <HStack justifyContent={"space-between"}>
            <HStack>
                <FaMoneyBillWave />
                <Text>MoneyMap</Text>
            </HStack>
            <ColorModeButton />
        </HStack>
    )
}