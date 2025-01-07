import { Button } from "@/components/ui/button"
import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogRoot,
    DialogTrigger
} from "@/components/ui/dialog"
import SignInForm from "../signInForm/signInForm"

export function BtnSignIn() {
  return (
    <DialogRoot placement={"center"}>
      <DialogTrigger asChild>
        <Button colorPalette={"green"} variant="solid" size="sm">
          Sign In
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogBody justifyContent={"center"}>
          <SignInForm />
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}