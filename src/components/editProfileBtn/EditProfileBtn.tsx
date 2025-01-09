import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { FaUserCircle } from "react-icons/fa"
import EditProfileForm from "../editProfileForm/EditProfileForm"

export function EditProfileBtn() {
    return (
        <DialogRoot>
            <DialogTrigger asChild>
                <FaUserCircle size={20} style={{ cursor: "pointer"}} />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <EditProfileForm />
                </DialogBody>
                <DialogCloseTrigger />
            </DialogContent>
        </DialogRoot>
    )
}