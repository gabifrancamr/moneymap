import { useAppContext } from "@/contexts/AppContext";
import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FaMoneyBillWave } from "react-icons/fa";
import { HeaderMenu } from "../headerMenu/HeaderMenu";
import { Button } from "../ui/button";

export function Header() {
    const { user } = useAppContext()

    return (
        <Flex justifyContent={"space-between"}>
            <Link href={"/dashboard"}>
                <Flex gap={"2"} alignItems={"center"}>
                    <FaMoneyBillWave color="#16a34a" />
                    <Text>MoneyMap</Text>
                </Flex>
            </Link>
            <Flex gap={"0.5rem"} alignItems={"center"}>
                {user?.role === "admin" && (
                    <Link href={"/admin"}>
                        <Button>Admin</Button>
                    </Link>
                )}
                <HeaderMenu />
            </Flex>
        </Flex>
    )
}