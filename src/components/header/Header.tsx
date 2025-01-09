import { Flex, Text } from "@chakra-ui/react";
import { FaMoneyBillWave } from "react-icons/fa";
import { EditProfileBtn } from "../editProfileBtn/EditProfileBtn";
import { ColorModeButton } from "../ui/color-mode";

export function Header() {
    return (
        <Flex justifyContent={"space-between"}>
            <Flex gap={"2"} alignItems={"center"}>
                <FaMoneyBillWave />
                <Text>MoneyMap</Text>
            </Flex>
            <Flex gap={"3"} alignItems={"center"}>
                <EditProfileBtn />
                <ColorModeButton />
            </Flex>
        </Flex>
    )
}