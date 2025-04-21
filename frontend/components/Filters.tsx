import { Select, SelectItem } from "@heroui/select"
import { Dispatch, SetStateAction } from "react"

export const types = [
    { label: "Article", value: "ARTICLE" },
    { label: "Video", value: "VIDEO" },
    { label: "Podcast", value: "PODCAST" },
]

type FiltersProps = {
    setSelectedTypes: Dispatch<SetStateAction<string[]>>
}

const Filters = ({ setSelectedTypes }: FiltersProps) => {
    return (
        <Select
            className="max-w-xs"
            label="Filter by Type"
            selectionMode="multiple"
            onChange={(e) => {
                const selectedTypes = e.target.value.split(',').filter(Boolean)
                if (selectedTypes.length > 0) {
                    setSelectedTypes(selectedTypes)
                } else {
                    setSelectedTypes([])
                }
            }}
        >
            {types.map((type) => (
                <SelectItem key={type.value}>{type.label}</SelectItem>
            ))}
        </Select>
    )
}

export default Filters
