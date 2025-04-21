import { Button } from "@heroui/button"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal"
import { useForm, Controller } from "react-hook-form"
import { Input } from "@heroui/input"
import { Select, SelectItem } from "@heroui/select"
import { DateInput } from "@heroui/date-input"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { types } from "./Filters"
import { LoginContext } from "../context/loginContext"
import { useContext } from "react"

type CreateContentInput = {
    title: string
    type: string
    deadline: { year: number, month: number, day: number }
}

export const parseDate = ({ year, month, day }: { year: number, month: number, day: number }) => {
    return new Date(year, month, day)
}

const CreateContentModal = ({
    isOpen,
    onOpenChange,
    refetch
}: {
    isOpen: boolean
    onOpenChange: (isOpen: boolean) => void
    refetch: () => void
}) => {
    const { register, handleSubmit, control } = useForm<CreateContentInput>()
    const { user } = useContext(LoginContext)

    const mutation = useMutation({
        mutationFn: async (data: CreateContentInput) => {
            if (!user) {
                throw new Error("User not found")
            }
            const body = {
                authors: [user],
                title: data.title,
                type: data.type,
                deadline: parseDate(data.deadline)
            }
            const response = await axios.put(`http://localhost:3001/create-content`, body, {
                headers: {
                    'x-userid': user?.id
                }
            })
            refetch()
            return response.data
        }
    })
    const onSubmit = (data: CreateContentInput) => {
        mutation.mutate(data)
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <><form onSubmit={handleSubmit(onSubmit)}>
                        <ModalHeader className="flex flex-col gap-1">Create content</ModalHeader>
                        <ModalBody>
                            <Input label="Title" labelPlacement="outside" {...register("title")} />
                            <Select label="Type" labelPlacement="outside" {...register("type")} >
                                {types.map((type) => (
                                    <SelectItem key={type.value}>
                                        {type.label}
                                    </SelectItem>
                                ))}
                            </Select>
                            <Controller
                                name="deadline"
                                control={control}
                                render={({ field }) => (
                                    <DateInput
                                        label="Deadline"
                                        labelPlacement="outside"
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" onPress={() => {
                                onClose()
                            }}>
                                Create
                            </Button>
                            <Button onPress={onClose}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </form>
                    </>
                )}
            </ModalContent>
        </Modal >)
}

export default CreateContentModal;