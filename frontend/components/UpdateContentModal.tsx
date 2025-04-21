import { Button } from "@heroui/button"
import { Input } from "@heroui/input"
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal"
import { Select, SelectItem } from "@heroui/select"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Controller, useForm } from "react-hook-form"
import { types } from "./Filters"
import { DateInput } from "@heroui/date-input"
import { parseDate } from "./CreateContentModal"
import { LoginContext } from "../context/loginContext"
import { useContext } from "react"

const statuses = [
    { value: "IDEA", label: "Idea" },
    { value: "DRAFT", label: "Draft" },
    { value: "REVIEW", label: "Review" },
    { value: "PUBLISHED", label: "Published" },
]

const UpdateContentModal = ({ isOpen, onOpenChange, contentItem, refetch }: { isOpen: boolean, onOpenChange: () => void, contentItem: any, refetch: () => void }) => {
    const { user } = useContext(LoginContext)
    const mutation = useMutation({
        mutationFn: (data) => axios.put(`http://localhost:3001/update-content`, data,
            {
                headers: {
                    'x-userid': user?.id
                }
            }
        )
    })
    const { register, handleSubmit } = useForm({
        defaultValues: {
            title: contentItem?.title,
            type: contentItem?.type,
            deadline: contentItem?.deadline,
            status: contentItem?.status,
            authors: contentItem?.authors
        }
    })

    const onSubmit = (data: any) => {
        mutation.mutate({
            id: contentItem.id,
            deadline: data.deadline ? parseDate(data.deadline) : null,
            authors: contentItem?.authors,
            ...data
        })
        refetch()
        onOpenChange()
    }


    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader>
                    Update Content
                </ModalHeader>
                <ModalBody className="flex flex-col gap-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input label="Title" labelPlacement="outside" {...register("title")} />
                        <Select label="Type" labelPlacement="outside" {...register("type")} >
                            {types.map((type) => (
                                <SelectItem key={type.value}>
                                    {type.label}
                                </SelectItem>
                            ))}
                        </Select>
                        <Select label="Status" labelPlacement="outside" {...register("status")} >
                            {statuses.map((status) => (
                                <SelectItem key={status.value}>
                                    {status.label}
                                </SelectItem>
                            ))}
                        </Select>
                        <div className="flex gap-2 my-4">
                            <Button type="submit">Update</Button>
                            <Button type="button" onPress={onOpenChange}>Cancel</Button>
                        </div>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default UpdateContentModal;
