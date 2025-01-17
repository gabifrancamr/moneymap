import {
    MenuContent,
    MenuItem,
    MenuRoot,
    MenuTrigger,
} from "@/components/ui/menu"
import { useAuth } from "@/hooks/useAuth"
import { Box, Flex, Text } from "@chakra-ui/react"
import { FaUserCircle } from "react-icons/fa"
import { IoLogOutSharp } from "react-icons/io5"
import { BtnEditProfile } from "../btnEditProfile/BtnEditProfile"

export function HeaderMenu() {
    const { logOut } = useAuth()
    return (
        <MenuRoot>
            <MenuTrigger asChild>
                <Box>
                    <FaUserCircle size={20} style={{ cursor: "pointer" }} />
                </Box>
            </MenuTrigger>
            <MenuContent>
                <MenuItem value="edit-profile" cursor={"pointer"}>
                    <BtnEditProfile />
                </MenuItem>
                <MenuItem value="logout" cursor={"pointer"} onClick={logOut}>
                    <Flex alignItems={"center"} gap={"2"}>
                        <IoLogOutSharp size={20} />
                        <Text>Log out</Text>
                    </Flex>
                </MenuItem>
            </MenuContent>
        </MenuRoot>
    )
}