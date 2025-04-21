import { ContentStatus, ContentType } from "@prisma/client"

export type Content = {
    id?: string | undefined
    title: string
    authors: string[]
    status: ContentStatus
    type: ContentType
    deadline: Date
}