import { Button } from "@/components/ui/button"
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogRoot,
  DialogTrigger
} from "@/components/ui/dialog"
import { Theme } from "@chakra-ui/react"
import FormSignUp from "../formSignUp/FormSignUp"

export function BtnSignUp() {
  return (
    <DialogRoot placement={"center"}>
      <DialogTrigger asChild>
        <Button colorPalette={"green"} variant="solid" size="sm">
          Sign Up
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Theme appearance="dark">
          <DialogBody justifyContent={"center"}>
            <FormSignUp />
          </DialogBody>
          <DialogCloseTrigger />
        </Theme>
      </DialogContent>
    </DialogRoot>
  )
}