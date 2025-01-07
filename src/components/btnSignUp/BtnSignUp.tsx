import { Button } from "@/components/ui/button"
import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogRoot,
    DialogTrigger
} from "@/components/ui/dialog"
import SignUpForm from "../signUpForm/SignUpForm"

export function BtnSignUp() {
  return (
    <DialogRoot placement={"center"}>
      <DialogTrigger asChild>
        <Button colorPalette={"green"} variant="solid" size="sm">
          Sign Up
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogBody justifyContent={"center"}>
          <SignUpForm />
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}