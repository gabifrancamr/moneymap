import { Button } from "@/components/ui/button"
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogRoot,
  DialogTrigger
} from "@/components/ui/dialog"
import { Theme } from "@chakra-ui/react"
import FormSignIn from "../formSignIn/formSignIn"

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
            <FormSignIn />
          </DialogBody>
          <DialogCloseTrigger />
        </Theme>
      </DialogContent>
    </DialogRoot>
  )
}