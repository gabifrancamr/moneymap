import { Button } from "@/components/ui/button"
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogRoot,
  DialogTrigger
} from "@/components/ui/dialog"
import { Theme } from "@chakra-ui/react"
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
        <Theme appearance="dark">
          <DialogBody justifyContent={"center"}>
            <SignInForm />
          </DialogBody>
          <DialogCloseTrigger />
        </Theme>
      </DialogContent>
    </DialogRoot>
  )
}