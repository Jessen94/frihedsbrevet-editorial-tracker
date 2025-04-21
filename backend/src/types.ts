import { ContentStatus, ContentType } from "@prisma/client"

export type Content = {
    id?: string | undefined
    title: string
    authors: { id: string }[]
    status: ContentStatus
    type: ContentType
    deadline: Date
}